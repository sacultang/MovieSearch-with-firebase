# TMDB Movie Search Web Application

## 기술 스택

![React](https://img.shields.io/badge/react-%2320232a?style=flat&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/Redux-764ABC?style=flat&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white)
![firebase](https://img.shields.io/badge/firebase-FFCA28?style=flat&logo=firebase&logoColor=white)
![TMDB](https://img.shields.io/badge/TMDB-01B4E4?style=flat&logo=TheMovieDatabase&logoColor=white)
![MUI](https://img.shields.io/badge/mui-007FFF?style=flat&logo=mui&logoColor=white)

## 데모 바로가기

<p align="center">
    <a href="https://fir-chat-app-b793f.web.app/"><img src="https://github.com/sacultang/MovieSearch-with-firebase/blob/main/movies_1.png" alt="Logo" width="100%"></a>
</p>

## 설치 및 실행

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

## 환경변수 설정

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

## 파일구조

```
- src
    ├─ api
    │   └─ TMDB
    ├─ components
    │   ├─ common
    │   ├─ listModal
    │   │   └─ hooks
    │   ├─ loginAlertModal
    │   ├─ scrollGrid
    │   └─ skeleton
    ├─ constants
    ├─ firebase
    ├─ pages
    │   ├─ detials
    │   ├─ Error
    │   ├─ favorite
    │   ├─ home
    │   │   ├─ common
    │   │   ├─ popular
    │   │   └─ trending
    │   ├─ hooks
    │   ├─ movies
    │   │   └─ hooks
    │   ├─ register
    │   ├─ search
    │   └─ tv
    ├─ router
    │   └─ hooks
    ├─ store
    ├─ theme
    ├─ types
    ├─ utils
    ├─ App.tsx
    └─ index.tsx
```

### Commit prefix

- `ADD`: When you add new functional codes (기능 추가)
- `FIX`: When you fix some errors (오류 수정)
- `DEL`: When you remove functional codes (기능 코드 제거)
- `RFT`: When you refactor codes (코드 리팩토링)
- `CHO`: When you do chore such as moving some files (파일 옮기거나, 이미지 교체하거나 잡일)
- `DOC`: When you write docs (문서 작성 ex. readme)
- `SET`: 세팅
- `TEST`: Test
