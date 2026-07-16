// 세 과목 점수를 입력받아 평균과 등급, 합격 여부를 계산하는 기능

const SUBJECTS = ["HTML", "CSS", "JavaScript"];
const MIN_SCORE = 0;
const MAX_SCORE = 100;
const PASS_SCORE = 60;

// 평균 점수 구간별 등급 (위에서부터 순서대로 검사)
const GRADES = [
  { min: 90, label: "A" },
  { min: 80, label: "B" },
  { min: 70, label: "C" },
  { min: 60, label: "D" },
  { min: 0, label: "F" },
];

// 평균 점수에 해당하는 등급 문자 반환
function getGrade(average) {
  const matched = GRADES.find((grade) => average >= grade.min);
  return matched.label;
}

// 한 과목 점수 입력받기 (0~100 범위 숫자만 통과, 취소하면 null)
function readScore(subject) {
  while (true) {
    const input = prompt(
      `${subject} 점수를 입력해 주세요. (${MIN_SCORE} ~ ${MAX_SCORE})`,
    );

    if (input === null) {
      return null;
    }

    const score = Number(input);

    if (input.trim() === "" || Number.isNaN(score)) {
      alert("숫자만 입력해 주세요.");
      continue;
    }

    if (score < MIN_SCORE || score > MAX_SCORE) {
      alert(`${MIN_SCORE}부터 ${MAX_SCORE} 사이로 입력해 주세요.`);
      continue;
    }

    return score;
  }
}

// 진입점: 전 과목 점수를 받아 총점/평균/등급/합격 여부를 계산해 출력
function checkGrade() {
  let total = 0;

  for (let i = 0; i < SUBJECTS.length; i++) {
    const score = readScore(SUBJECTS[i]);

    if (score === null) {
      alert("입력이 취소되어 계산을 종료합니다.");
      return;
    }

    total = total + score;
  }

  const average = total / SUBJECTS.length;
  const grade = getGrade(average);
  const result =
    average >= PASS_SCORE
      ? "🎉 합격입니다! 우수자로 선정되었습니다."
      : "❌ 불합격입니다. 다음 기회에 힘내세요!";

  alert(
    "====== 📊 성적 결과표 ======\n" +
      "• 총점: " +
      total +
      "점\n" +
      "• 평균: " +
      average.toFixed(1) +
      "점\n" +
      "• 등급: " +
      grade +
      "\n" +
      "---------------------------\n" +
      "• 결과: " +
      result,
  );
}
