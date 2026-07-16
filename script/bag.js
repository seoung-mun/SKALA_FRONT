// 여행 가방 물품을 배열에 담아 alert로 보여주는 기능
const myBag = [
  { name: "여권", count: 1 },
  { name: "스마트폰", count: 2 },
  { name: "지갑", count: 1 },
];

// myBag을 순회하여 목록 문자열을 만들고 alert로 출력
function showMyBag() {
  const divider = "-----------------------";
  const lines = myBag.map((item) => `- ${item.name} : ${item.count}개`);
  const message = `🎒 [내 가방 속 물품 목록]\n${divider}\n${lines.join("\n")}\n${divider}\n총 물품 종류: ${myBag.length}가지`;
  alert(message);
}
