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

- `ADD`: When you add new functional codes (기능 추가)
- `FIX`: When you fix some errors (오류 수정)
- `DEL`: When you remove functional codes (기능 코드 제거)
- `RFT`: When you refactor codes (코드 리팩토링)
- `CHO`: When you do chore such as moving some files (파일 옮기거나, 이미지 교체하거나 잡일)
- `DOC`: When you write docs (문서 작성 ex. readme)
- `SET`: 세팅
