// 1~50 숫자 맞히기 게임. 최고기록은 localStorage에 저장

const MIN = 1;
const MAX = 50;
const STORAGE_KEY = "upDownBestRecord";

// 저장된 최고기록 불러오기 (없거나 이상한 값이면 null)
function getBestRecord() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      return null;
    }
    const record = Number(stored);
    if (Number.isNaN(record) || record < 1) {
      return null;
    }
    return record;
  } catch (error) {
    return null;
  }
}

// 최고기록 저장
function saveBestRecord(count) {
  try {
    localStorage.setItem(STORAGE_KEY, String(count));
  } catch (error) {}
}

// 숫자 입력받기 (취소/숫자아님/범위밖을 구분해서 반환)
function readGuess() {
  const message = `${MIN}부터 ${MAX} 사이의 숫자를 입력하세요.`;
  const input = prompt(message);

  if (input === null) {
    return { cancelled: true, value: null };
  }

  const guess = Number(input);

  if (input.trim() === "" || Number.isNaN(guess)) {
    alert("숫자만 입력해 주세요.");
    return { cancelled: false, value: null };
  }

  if (guess < MIN || guess > MAX) {
    alert(`${MIN}부터 ${MAX} 사이의 숫자를 입력해 주세요.`);
    return { cancelled: false, value: null };
  }

  return { cancelled: false, value: guess };
}

// 정답을 맞혔을 때 신기록 여부를 판단하고 기록 갱신
function handleWin(tryCount) {
  const best = getBestRecord();
  const isNewRecord = best === null || tryCount < best;

  if (isNewRecord) {
    saveBestRecord(tryCount);
    const prefix =
      best === null ? "🏆 첫 기록!" : `🏆 신기록! (이전 최고 ${best}번)`;
    alert(`${prefix}\n축하합니다! ${tryCount}번 만에 맞추셨습니다.`);
  } else {
    alert(`축하합니다! ${tryCount}번 만에 맞추셨습니다. (최고기록 ${best}번)`);
  }
}

// 한 판 진행: 정답을 뽑고 맞힐 때까지 Up/Down 힌트 반복
function playRound() {
  const answer = Math.floor(Math.random() * MAX) + MIN;
  let tryCount = 0;

  while (true) {
    const result = readGuess();

    if (result.cancelled) {
      alert("게임을 종료합니다.");
      return false;
    }

    if (result.value === null) {
      continue;
    }

    tryCount++;

    if (result.value > answer) {
      alert("Down!");
    } else if (result.value < answer) {
      alert("Up!");
    } else {
      handleWin(tryCount);
      return true;
    }
  }
}

// 진입점: 한 판이 끝나면 다시 할지 물어보고 반복
function startGame() {
  while (playRound()) {
    if (!confirm("다시 하시겠어요?")) {
      break;
    }
  }
}
