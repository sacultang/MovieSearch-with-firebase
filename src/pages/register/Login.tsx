import {
  useState,
  useCallback,
  useEffect,
  FormEvent,
  ChangeEvent,
} from 'react';
import { Box, Typography, Grid, TextField } from '@mui/material';
import '../../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../store/userSlice';
import PaddingLayout from './common/PaddingLayout';
import { EMAIL_REGEX, PW_REGEX } from './regex';
import { responseMsg } from './constants';
import { AuthError } from 'firebase/auth';

const Login = () => {
  const dispatch = useDispatch();
  const [joinValue, setJoinValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errorData, setErrorData] = useState(true);
  const [loading, setLoading] = useState(false);

  const loginWidthEmail = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const { user } = await signInWithEmailAndPassword(
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

  const handleLoginSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      loginWidthEmail(joinValue.email, joinValue.password).catch(
        (res: AuthError) => {
          if (res.message === responseMsg.WRONG_PW) {
            alert('패스워드를 확인해주세요');
            return;
          } else if (res.message === responseMsg.NOT_FOUND_USER) {
            alert('아이디를 찾을 수 없습니다');
            return;
          }
        }
      );
    },
    [joinValue.email, joinValue.password, loginWidthEmail]
  );
  useEffect(() => {
    if (
      EMAIL_REGEX.test(joinValue.email) &&
      PW_REGEX.test(joinValue.password)
    ) {
      setErrorData(false);
    } else {
      setErrorData(true);
    }
  }, [joinValue]);
  return (
    <PaddingLayout>
      <Typography component="h1" variant="h5" mb={5}>
        로그인
      </Typography>
      <Box component="form" noValidate onSubmit={handleLoginSubmit}>
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
          로그인
        </LoadingButton>
        <Grid container justifyContent="flex-end" mt={3}>
          <Link to="/join" style={{ textDecoration: 'none', color: '#5d5d5d' }}>
            계정이 없나요? 회원가입으로 이동
          </Link>
        </Grid>
      </Box>
    </PaddingLayout>
  );
};

export default Login;
