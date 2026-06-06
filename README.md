# Mystic Tarot

React Native + TypeScript + Expo 기반 타로 운세 앱입니다. 회원가입, 로그인, 자체 서버 저장, 외부 AI API 호출 없이 앱 내부 데이터로 3장 카드 리딩을 생성합니다.

## 주요 기능

* 로비, 카드 선택, 결과, 설정 화면
* 78장 타로 카드 이미지와 카드별 해석 데이터
* 7개 운세 카테고리: 오늘의 운세, 연애, 금전, 직장, 인간관계, 선택/고민, 로또 번호
* 카드 선택, 카드 뒤집기, 결과 공개 애니메이션
* 무료 요약 해석과 광고 시청 후 상세 해석 공개
* Google AdMob 하단 배너, 상세 해석 보상형 광고, 결과 화면 전면 광고
* 웹 미리보기에서는 광고 SDK를 로드하지 않고 광고 자리만 표시

## 광고 설정

Android AdMob 앱 ID:

```text
ca-app-pub-4402708884038037~4147084988
```

광고 단위:

```text
Bottom Banner: ca-app-pub-4402708884038037/4952214439
Detailed Reading Rewarded: ca-app-pub-4402708884038037/4628780801
Result Interstitial: ca-app-pub-4402708884038037/3288768655
```

개발 빌드에서는 정책 리스크를 줄이기 위해 Google 테스트 광고 ID를 사용하고, 프로덕션 빌드에서 위 광고 단위 ID를 사용합니다.

## 실행

```bash
npm install
npm start
```

웹에서 확인:

```bash
npm run web
```

## 검증

```bash
npm test
npm run typecheck
npx expo export --platform web --output-dir dist
```

## 개인정보 처리방침

개인정보 처리방침 HTML은 [privacy.html](privacy.html)에 있습니다. 현재 앱은 자체 개인정보 수집, 로그인, 서버 저장, 외부 AI API 호출, 인앱 결제를 제공하지 않으며 Google AdMob 광고를 포함할 수 있습니다.

## 참고

`react-native-google-mobile-ads`는 네이티브 모듈이므로 실제 광고 표시는 Expo Go가 아니라 Android 네이티브 빌드 또는 커스텀 개발 클라이언트에서 확인해야 합니다.
