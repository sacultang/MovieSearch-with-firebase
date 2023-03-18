import {
  useState,
  useCallback,
  useEffect,
  FormEvent,
  ChangeEvent,
} from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';
import '../../firebase';
import {
  getAuth,
  createUserWithEmailAndPassword,
  AuthError,
} from 'firebase/auth';
import { LoadingButton } from '@mui/lab';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../store/userSlice';
import PaddingLayout from './common/PaddingLayout';
import { EMAIL_REGEX, PW_REGEX } from './regex';
import { responseMsg } from './constants';
import { Link } from 'react-router-dom';
const Join = () => {
  const [joinValue, setJoinValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorData, setErrorData] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const postUserData = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const { user } = await createUserWithEmailAndPassword(
          getAuth(),
          email,
          password
        );
        dispatch(setUserAction({ uid: user.uid, email: user.email }));
      } catch (e) {
        const err = e as AuthError;
        throw new Error(err.code);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const handleInputValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.currentTarget;
      setJoinValue({ ...joinValue, [name]: value });
    },
    [joinValue]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      postUserData(joinValue.email, joinValue.password).catch(
        (res: AuthError) => {
          if (res.message === responseMsg.ALREADY_USER) {
            alert('이미 가입된 아이디입니다');
            return;
          }
        }
      );
    },
    [joinValue.email, joinValue.password, postUserData]
  );
  useEffect(() => {
    if (
      EMAIL_REGEX.test(joinValue.email) &&
      PW_REGEX.test(joinValue.password) &&
      joinValue.password === joinValue.confirmPassword
    ) {
      setErrorData(false);
    } else {
      setErrorData(true);
    }
  }, [joinValue]);
  return (
    <PaddingLayout>
      <Typography component="h1" variant="h5" mb={5}>
        회원가입
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="email"
              required
              fullWidth
              label="이메일"
              autoFocus
              autoComplete="off"
              onChange={handleInputValue}
              error={EMAIL_REGEX.test(joinValue.email) ? false : true}
              helperText={
                EMAIL_REGEX.test(joinValue.email)
                  ? ''
                  : 'E-Mail 형식의 아이디를 입력해주세요.'
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="password"
              required
              fullWidth
              label="패스워드"
              type="password"
              autoComplete="off"
              onChange={handleInputValue}
              error={PW_REGEX.test(joinValue.password) ? false : true}
              helperText={
                PW_REGEX.test(joinValue.password)
                  ? ''
                  : '6~16자 영문 대 소문자, 숫자를 사용하세요.'
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="confirmPassword"
              required
              fullWidth
              label="패스워드 확인"
              type="password"
              autoComplete="off"
              onChange={handleInputValue}
              error={
                joinValue.password === joinValue.confirmPassword ? false : true
              }
              helperText={
                joinValue.password === joinValue.confirmPassword
                  ? ''
                  : '비밀번호가 다릅니다'
              }
            />
          </Grid>
        </Grid>
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          disabled={errorData}
          loading={loading}
        >
          회원가입
        </LoadingButton>
        <Grid container justifyContent="flex-end" mt={3}>
          <Link
            to="/login"
            style={{ textDecoration: 'none', color: '#5d5d5d' }}
          >
            이미 회원이신가요? 로그인으로 이동
          </Link>
        </Grid>
      </Box>
    </PaddingLayout>
  );
};

export default Join;
