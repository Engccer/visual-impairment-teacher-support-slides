# PowerPoint 효과음 추가 가이드

생성된 `시각장애인교원_사례_발표.pptx` 파일에 효과음을 추가하는 방법입니다.

## 사전 준비

### 1. 효과음 파일 생성

audio 폴더의 `sound-generator.html` 파일을 브라우저에서 열어 다음 4개 파일을 다운로드하세요:
- start.wav (프레젠테이션 시작)
- next.wav (다음 슬라이드)
- prev.wav (이전 슬라이드)
- end.wav (프레젠테이션 종료)

다운로드한 파일을 `audio/` 폴더에 저장하세요.

## PowerPoint에서 효과음 추가하기

### 방법 1: 슬라이드별 수동 추가 (권장)

#### 슬라이드 1 (표지) - 시작 효과음

1. PowerPoint에서 슬라이드 1 선택
2. **삽입** 탭 → **오디오** → **내 PC의 오디오**
3. `audio/start.wav` 파일 선택
4. 오디오 아이콘이 슬라이드에 나타남
5. 오디오 아이콘 선택 후:
   - **재생** 탭 → **시작**: **자동**으로 설정
   - **볼륨**: 보통 또는 높음
   - **슬라이드 쇼에서 숨기기** 체크 (아이콘 숨김)
6. 오디오 아이콘을 슬라이드 구석으로 이동

#### 슬라이드 2-13 - 넘김 효과음

각 슬라이드에 대해:
1. 슬라이드 선택
2. **전환** 탭으로 이동
3. **소리** 드롭다운 → **다른 소리...**
4. `audio/next.wav` 파일 선택
5. 자동으로 전환 효과음이 설정됨

**또는 일괄 적용:**
1. 슬라이드 2 선택
2. 위 방법으로 효과음 설정
3. 슬라이드 2-13 모두 선택 (Shift+클릭)
4. **전환** 탭 → **모두 적용** 버튼 클릭

#### 슬라이드 14 (마무리) - 종료 효과음

1. 슬라이드 14 선택
2. **전환** 탭 → **소리** → **다른 소리...**
3. `audio/end.wav` 파일 선택

### 방법 2: VBA 매크로로 일괄 추가 (고급)

PowerPoint에서 Alt+F11을 눌러 VBA 편집기를 열고, 다음 코드를 실행:

```vba
Sub AddSoundEffects()
    Dim sld As Slide
    Dim audioPath As String

    ' 효과음 파일 경로 설정 (절대 경로로 변경 필요)
    audioPath = "G:\내 드라이브\KHY\Lectures\251022 중부대 관리자 대상 연수\visual-impairment-teacher-support-slides\audio\"

    For Each sld In ActivePresentation.Slides
        Select Case sld.SlideIndex
            Case 1
                ' 시작 효과음
                sld.Shapes.AddMediaObject2 audioPath & "start.wav", _
                    msoFalse, msoTrue, 10, 10
                sld.Shapes(sld.Shapes.Count).AnimationSettings.PlaySettings.PlayOnEntry = True

            Case 14
                ' 종료 효과음
                sld.SlideShowTransition.SoundEffect.ImportFromFile audioPath & "end.wav"

            Case Else
                ' 넘김 효과음
                sld.SlideShowTransition.SoundEffect.ImportFromFile audioPath & "next.wav"
        End Select
    Next sld

    MsgBox "효과음 추가 완료!", vbInformation
End Sub
```

## 효과음 테스트

1. **F5** 키를 눌러 슬라이드 쇼 시작
2. 각 슬라이드 전환 시 효과음이 재생되는지 확인
3. 볼륨이 너무 크거나 작으면 조정

## 효과음 볼륨 조절

### 개별 조절:
1. 슬라이드에서 오디오 아이콘 선택
2. **재생** 탭 → **볼륨** 조절

### 일괄 조절:
전환 효과음은 개별적으로 볼륨 조절이 불가능합니다.
WAV 파일 자체의 볼륨을 조절해야 합니다.

**온라인 도구:**
- https://audiotrimmer.com/
- https://mp3cut.net/

## 효과음 제거

### 특정 슬라이드:
1. 슬라이드 선택
2. **전환** 탭 → **소리**: **소리 없음**

### 모든 슬라이드:
1. 모든 슬라이드 선택 (Ctrl+A)
2. **전환** 탭 → **소리**: **소리 없음**
3. **모두 적용** 클릭

## 문제 해결

### 효과음이 재생되지 않는 경우:

**원인 1: 파일 경로 문제**
- 해결: WAV 파일을 PowerPoint와 같은 폴더에 복사
- PowerPoint 파일 저장 후 다시 열기

**원인 2: 파일 형식 문제**
- 해결: WAV 파일이 아닌 경우 WAV로 변환
- 온라인 변환기: https://cloudconvert.com/

**원인 3: PowerPoint 설정 문제**
- 파일 → 옵션 → 고급
- "소리 재생" 옵션 확인

### 효과음이 너무 크거나 작은 경우:

1. **재생** 탭에서 볼륨 조절
2. 또는 WAV 파일의 볼륨을 직접 수정

### 배포 시 효과음이 재생되지 않는 경우:

**해결 방법:**
1. PowerPoint 파일 저장
2. 파일 → 내보내기 → 프레젠테이션 패키지 만들기
3. 폴더 또는 CD로 패키징 선택
4. 이렇게 하면 효과음 파일이 함께 패키징됨

## 추가 팁

### 효과음 자동 재생 설정

슬라이드 쇼 시작 시 자동으로 효과음이 재생되도록:
1. 오디오 아이콘 선택
2. **재생** 탭 → **시작**: **자동**
3. **슬라이드 간 재생** 체크 (배경 음악으로 사용 시)

### 페이드 효과 추가

1. 오디오 선택
2. **재생** 탭 → **페이드 인/아웃** 설정
3. 0.5초 정도가 적당

### 효과음 반복 재생 방지

1. 오디오 선택
2. **재생** 탭 → **반복**: 체크 해제

## 완료 체크리스트

- [ ] start.wav를 슬라이드 1에 추가 (자동 재생)
- [ ] next.wav를 슬라이드 2-13 전환에 추가
- [ ] end.wav를 슬라이드 14 전환에 추가
- [ ] 슬라이드 쇼로 전체 테스트
- [ ] 볼륨 적절한지 확인
- [ ] 오디오 아이콘 숨김 처리
- [ ] 파일 저장 및 백업

## 참고사항

- PowerPoint 2010 이상에서 작동
- WAV 파일 권장 (MP3도 가능하지만 호환성 낮음)
- 파일 크기: WAV가 MP3보다 크지만 품질 안정적
- 배포 시 "프레젠테이션 패키징" 기능 필수 사용

---

**문제가 계속되면:**
HTML 버전 (index.html)을 사용하세요. 브라우저에서 바로 실행 가능하며 효과음이 자동으로 재생됩니다.
