# 오디오 파일

프레젠테이션에 사용되는 효과음 및 제목 음성 파일이 포함되어 있습니다.

## 📂 파일 구성

### 1. 효과음 파일 (Sound Effects)
프레젠테이션 전환 및 액션 시 재생되는 효과음

### 2. 제목 음성 파일 (Title Narrations) ✅
각 슬라이드 제목을 읽어주는 TTS 음성 파일
- slide01_title.mp3 ~ slide14_title.mp3 (총 14개)

## 🎵 빠른 시작: 효과음 생성기 사용 (추천!)

**가장 쉬운 방법:** 같은 폴더에 있는 `sound-generator.html` 파일을 브라우저에서 열어 효과음을 바로 생성하세요!

1. `sound-generator.html` 파일을 더블클릭하여 브라우저에서 열기
2. 각 효과음을 미리 듣고 '다운로드' 버튼 클릭
3. 다운로드한 파일 (start.wav, next.wav, prev.wav, end.wav)을 이 폴더에 저장
4. 완료! (프레젠테이션이 자동으로 WAV 파일을 사용합니다)

---

## 필요한 파일

다음 4개의 오디오 파일이 필요합니다 (MP3 또는 WAV):

1. **start.mp3** - 프레젠테이션 시작 시 재생
   - 추천: 부드럽고 환영하는 느낌의 효과음 (종소리, 차임 등)
   - 길이: 1-2초

2. **next.mp3** - 다음 슬라이드로 넘어갈 때 재생
   - 추천: 가볍고 긍정적인 효과음 (클릭, 스와이프 등)
   - 길이: 0.5-1초

3. **prev.mp3** - 이전 슬라이드로 돌아갈 때 재생
   - 추천: next와 유사하지만 약간 다른 톤의 효과음
   - 길이: 0.5-1초

4. **end.mp3** - 마지막 슬라이드(감사합니다)로 넘어갈 때 재생
   - 추천: 완료/성취감을 주는 효과음 (성공 사운드, 박수 등)
   - 길이: 1-3초

## 무료 효과음 리소스

다음 웹사이트에서 무료 효과음을 다운로드할 수 있습니다:

- **Freesound** - https://freesound.org/
- **Zapsplat** - https://www.zapsplat.com/
- **Mixkit** - https://mixkit.co/free-sound-effects/
- **Pixabay** - https://pixabay.com/sound-effects/

## 검색 키워드 추천

- start: "chime", "bell", "welcome", "notification"
- next: "click", "button", "swipe", "page turn"
- prev: "back", "return", "rewind"
- end: "success", "complete", "achievement", "applause"

## 참고사항

- 모든 파일은 MP3 형식이어야 합니다
- 파일명은 정확히 위의 이름과 일치해야 합니다
- 접근성을 고려하여 너무 크거나 자극적인 소리는 피하세요
- 효과음 볼륨은 적절히 조절되어야 합니다 (너무 크지 않게)
- 라이선스를 확인하고 저작권이 있는 효과음은 사용하지 마세요

## 효과음 비활성화

프레젠테이션 중 효과음을 끄고 싶다면 브라우저 콘솔에서:

```javascript
presentation.toggleSound()
```

를 입력하면 효과음을 켜고 끌 수 있습니다.
