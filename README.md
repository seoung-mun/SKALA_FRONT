# SKALA-FRONT

SKALA 프론트엔드 기초 과제로 만든 개인 허브 페이지입니다. 프레임워크 없이 HTML, CSS,
바닐라 자바스크립트만으로 프로필과 수업 시간표, 휴일 일과, 여행 앨범, 회원가입 페이지를
한곳에 모았고, 메인 페이지에는 직접 만든 미니 기능(업다운 게임, 성적 계산기, 가방 보기)과
Open-Meteo API를 쓰는 실시간 날씨 위젯을 붙였습니다.

## 소개

`index.html`을 메인 허브로 두고, 여기서 모든 페이지로 이동할 수 있습니다. 구성은 크게
세 갈래입니다.

- 정적 소개 페이지: 프로필, 수업 시간표, 휴일 일과, 여행 앨범
- 회원가입 폼과 결과 페이지
- 메인 페이지에서 동작하는 자바스크립트 기능: 미니 기능 3종(업다운 게임, 성적 계산기,
  가방 보기)과 Open-Meteo API로 데이터를 받아오는 실시간 날씨 위젯

## 기술 스택

- HTML5 (시맨틱 태그, 표 셀 병합, 폼)
- CSS3 (CSS 변수, 그림자 단계, Flexbox/Grid, 미디어 쿼리 반응형)
- 바닐라 자바스크립트 (ES Module의 import/export, fetch와 async/await)
- Google Fonts — Nanum Myeongjo(제목), Noto Sans KR(본문)
- Open-Meteo 날씨/지오코딩 API (별도 키 없이 사용)

## 폴더 구조

```
SKALA_FRONT/
├── html/
│   ├── index.html          메인 허브 (내비게이션, JS 기능 버튼, 날씨 위젯)
│   ├── myProfile.html      자기소개 (ul / ol / dl)
│   ├── myClass.html        수업 시간표 (table, 셀 병합)
│   ├── holiday.html        휴일 일과
│   ├── myTrip.html         여행 앨범 (img / audio / video)
│   ├── signUp.html         회원가입 폼
│   └── signUpResult.html   회원가입 결과 페이지
├── css/
│   └── style.css           전체 스타일
├── script/
│   ├── upDown.js           업다운 게임
│   ├── grade.js            성적 계산기
│   ├── bag.js              내 가방 보기
│   ├── signUp.js           이메일 도메인 자동 입력
│   ├── realtimeInfo.js     날씨 위젯 - 화면(DOM) 담당
│   ├── weatherAPI.js       날씨 위젯 - 날씨 데이터 fetch
│   ├── geocodingAPI.js     날씨 위젯 - 도시명을 좌표로 변환
│   └── weather.js
└── media/                  이미지, 영상, 음원
```

## 실행 방법

VS Code의 Live Server 확장으로 `html/index.html`을 열면 됩니다.

로컬 서버가 필요한 이유는 `realtimeInfo.js`가 `<script type="module">`로 로드되기
때문입니다. `index.html`을 파일(`file://`)로 바로 열면 브라우저 보안 정책(CORS) 때문에
날씨 위젯이 동작하지 않습니다.

## 페이지 설명

| 파일                | 설명                                                     |
| ------------------- | -------------------------------------------------------- |
| `index.html`        | 시작점. 전체 내비게이션과 JS 기능 버튼, 실시간 날씨 위젯 |
| `myProfile.html`    | 좋아하는 음식, 올해 할 일, 나를 설명하는 단어들          |
| `myClass.html`      | 요일별 수업 시간표 (2시간 이상 강의와 점심은 셀 병합)    |
| `holiday.html`      | 휴일 하루를 오전/오후/저녁으로 정리                      |
| `myTrip.html`       | 여행 사진, 브이로그 영상, 배경 음원                      |
| `signUp.html`       | 회원가입 폼. 제출하면 결과 페이지로 이동                 |
| `signUpResult.html` | 회원가입 완료 안내와 주요 페이지 바로가기                |

## 과제 완료 체크리스트

### HTML

- [x] 프로젝트 구성과 index.html 생성
- [x] 나의 소개 (myProfile)
- [x] 나의 강의 일정 (myClass)
- [x] 바로가기 (index 내비게이션)
- [x] 회원가입 (signUp)
- [x] 회원가입 결과 (signUpResult)
- [x] 나의 여행지 (myTrip)
- [x] 포털 사이트형 메인 Hub

### CSS

- [x] 미션1 — 전체 테마 및 텍스트 Styling
- [x] 미션2 — 박스 모델의 이해
- [x] 미션3 — 가독성 높은 회원가입 폼

### JavaScript 실습 과제

- [x] 실시간 날씨 — 모듈 분리 (weatherAPI.js)
- [x] 실시간 날씨 — 비동기 호출 (async/await · fetch)
- [x] 실시간 날씨 — DOM 조작 · 이벤트 처리 (realtimeInfo.js)
- [x] Up-Down 숫자 맞추기 게임 (upDown.js)
- [x] 성적 계산기 (grade.js)
- [x] 내 가방 보기 (bag.js)

### 심화

- [x] CSS 변수로 디자인 토큰 정리 (색 · 폰트 · 그림자 · 모양을 `:root`에 모음)
- [x] 그림자 3단계 elevation과 hover 시 카드가 떠오르는 인터랙션
- [x] 등장 애니메이션(floatIn)과 입력 오류 흔들림(shake) 키프레임
- [x] Flexbox · Grid 레이아웃과 미디어 쿼리 반응형 (768px / 480px)
- [x] 접근성 대응 (prefers-reduced-motion, focus-visible, aria 속성, 표 scope)
- [x] 업다운 게임 최고기록을 localStorage에 저장하고 신기록 판정
- [x] 날씨 위젯 직접 입력 모드 (지오코딩 API를 재활용해 임의 도시 검색)
- [x] 입력 오류 UX (빨간 테두리 + 흔들림, 로딩 상태 표시)
- [x] 회원가입 이메일 도메인 select 연동 자동 입력

## About

SKALA 프론트엔드 기초 과정에서 HTML · CSS · 바닐라 자바스크립트를 익히며 만든 개인 허브
페이지입니다. 시맨틱 마크업, CSS 박스 모델과 반응형 레이아웃, DOM 이벤트 처리와 fetch
비동기 호출, ES Module 분리까지 한 프로젝트 안에서 단계별로 실습했습니다.
