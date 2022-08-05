import { useState, useCallback, useEffect } from 'react';
import { Container, Box, Typography, Grid, TextField } from '@mui/material';
import '../../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserAction } from '../../store/userSlice';
const EMAIL_REGEX =
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{6,16}$');

const Login = () => {
  const dispatch = useDispatch();
  const [joinValue, setJoinValue] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorData, setErrorData] = useState(true);
  const [loading, setLoading] = useState(false);
  const loginUser = useCallback(
    async (email, password) => {
      setLoading(true);
      try {
        const { user } = await signInWithEmailAndPassword(
          getAuth(),
          email,
          password
        );
        dispatch(setUserAction(user));
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const handleInputValue = useCallback(
    (e) => {
      const { name, value } = e.currentTarget;
      setJoinValue({ ...joinValue, [name]: value });
    },
    [joinValue]
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      loginUser(joinValue.email, joinValue.password);
    },
    [joinValue.email, joinValue.password, loginUser]
  );
  useEffect(() => {
    if (
      EMAIL_REGEX.test(joinValue.email) &&
      PW_REGEX.test(joinValue.password)
    ) {
      setErrorData(false);
    }
  }, [joinValue]);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pt: 20,
          pb: 20,
        }}
      >
        <Typography component="h1" variant="h5" mb={5}>
          로그인
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
            <Grid item>
              <Link
                to="/join"
                style={{ textDecoration: 'none', color: '#5d5d5d' }}
              >
                계정이 없나요? 회원가입으로 이동
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
