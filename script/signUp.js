// 이메일 도메인: 드롭다운 선택값을 입력 필드에 채워주는 기능
const emailDomainSelect = document.getElementById("emailDomainSelect");
const emailDomainInput = document.getElementById("emailDomain");

// "직접입력" 선택 시엔 필드를 비우고 포커스, 그 외엔 선택한 도메인을 자동 입력
emailDomainSelect.addEventListener("change", () => {
  if (emailDomainSelect.value === "direct") {
    emailDomainInput.value = "";
    emailDomainInput.focus();
  } else {
    emailDomainInput.value = emailDomainSelect.value;
  }
});
