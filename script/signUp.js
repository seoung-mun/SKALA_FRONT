const emailDomainSelect = document.getElementById("emailDomainSelect");
const emailDomainInput = document.getElementById("emailDomain");

emailDomainSelect.addEventListener("change", () => {
  if (emailDomainSelect.value === "direct") {
    emailDomainInput.value = "";
    emailDomainInput.focus();
  } else {
    emailDomainInput.value = emailDomainSelect.value;
  }
});
