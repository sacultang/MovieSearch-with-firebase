# TMDB Movie Search Web Application

![React](https://img.shields.io/badge/react-%2320232a?style=flat&logo=react&logoColor=%2361DAFB)
![firebase](https://img.shields.io/badge/firebase-FFCA28?style=flat&logo=firebase&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=flat&logo=TheMovieDatabase&logoColor=white)

## Demo

<p align="center">
    <a href="https://fir-chat-app-b793f.web.app/"><img src="https://github.com/sacultang/MovieSearch-with-firebase/blob/main/movies_1.png" alt="Logo" width="100%"></a>
</p>

## Start project

```bash
# Clone repository
$ git clone https://github.com/sacultang/MovieSearch-with-firebase

# Access Directory
$ cd MovieSearch-with-firebase

# Install dependencies
$ npm install

or

$ yarn

# Start Application
$ npm start

or

$ yarn start
```

## Observation

To use TMDB API and firebase, create `.env`

```env
// your key

REACT_APP_TMDB_API="YOUR KEY"


REACT_APP_APIKEY="YOUR KEY"
REACT_APP_AUTH_DOMAIN="YOUR KEY"
REACT_APP_PROJECT_ID="YOUR KEY"
REACT_APP_STORAGE_BUCKET="YOUR KEY"
REACT_APP_MESSAGING_SENDER_ID="YOUR KEY"
REACT_APP_APP_ID="YOUR KEY"
REACT_APP_MEASURE_MENT_ID="YOUR KEY"

```

## Git Convention

### Commit prefix

- prefix: 파일명
  - (줄바꿈 아래) 아래 코드 수정한 부분 설명
- feat: 기능 개발 관련
- fix: 오류 개선 / 버그 패치
- refactor: feat에 코드 수정
- docs: 문서화 작업
  - ex) docs: UPDATE README.md
- style: css style 작업
- test: test 관련 (테스트코드, 리펙토링 테스트 코드 추가)
- conf: 환경설정 관련, 빌드 업무 수정, 패키지 매니저, 폴더트리, 파일이름 변경
- build: 빌드 관련
- ci: Continuous Integration 관련
