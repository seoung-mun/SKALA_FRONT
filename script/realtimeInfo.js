// 역할: 화면(DOM) 담당 — select/버튼 이벤트를 받아 API 결과를 화면에 그린다
// 데이터(fetch)는 weatherAPI.js / geocodingAPI.js가 담당 (모듈 분리)
import { getLiveWeather } from "./weatherAPI.js";
import { getCoordinates } from "./geocodingAPI.js";

const citySelect = document.querySelector("#city-select");
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const weatherBox = document.querySelector("#weather-box");

// 에러 메시지는 weatherBox에 표시하고, 입력창(cityInput)은 빨간 테두리 + 흔들림으로 강조
function showError(message) {
  weatherBox.innerHTML = `<p>${message}</p>`;
  cityInput.classList.add("shake");
}
// 흔들림이 끝나면 클래스를 떼서 빨간색을 없애고, 다음 에러 때 다시 재생되게 한다
cityInput.addEventListener("animationend", function () {
  cityInput.classList.remove("shake");
});

// 좌표(lat, lon)를 받아 실시간 날씨를 화면에 그리는 공통 함수
async function showWeather(lat, lon, cityName) {
  weatherBox.innerHTML = "<p>로딩 중... ⏳</p>";

  const result = await getLiveWeather(lat, lon);
  if (result === null) {
    showError("⚠️ 날씨 정보를 가져오는데 실패했습니다.");
    return;
  }

  weatherBox.innerHTML = `
    <div class="weather-result">
      <h4>🌍 ${cityName} 실시간 날씨</h4>
      <p>🌡️ 현재 기온: <strong>${result.temp}°C</strong></p>
      <p>💧 현재 습도: <strong>${result.humidity}%</strong></p>
    </div>
  `;
}

// 드롭다운 선택이 바뀔 때
citySelect.addEventListener("change", function () {
  const value = citySelect.value;


  if (value === "custom") {
    cityInput.hidden = false;
    searchBtn.hidden = false;
    weatherBox.innerHTML = "<p>도시 이름을 입력하고 조회를 눌러주세요.</p>";
    return;
  }

  // custom이 아니면 직접입력 UI는 다시 숨긴다
  cityInput.hidden = true;
  searchBtn.hidden = true;

  // 2) 안내문 상태로 되돌린 경우
  if (value === "none") {
    weatherBox.innerHTML = "<p>도시를 선택하면 정보가 표시됩니다.</p>";
    return;
  }


  const [lat, lon] = value.split(",").map(Number);
  const cityName = citySelect.options[citySelect.selectedIndex].text;
  showWeather(lat, lon, cityName);
});

// 직접 입력 → 조회 버튼 클릭
searchBtn.addEventListener("click", async function () {
  const cityName = cityInput.value.trim();


  if (!cityName) {
    showError("도시 이름을 입력해주세요.");
    return;
  }

  weatherBox.innerHTML = "<p>좌표를 찾는 중... ⏳</p>";

  // 도시 이름 → 좌표 (geocodingAPI 재활용)
  const coordinates = await getCoordinates(cityName);
  if (coordinates === null) {
    showError("⚠️ 해당 도시를 찾을 수 없습니다.");
    return;
  }

  showWeather(coordinates.lat, coordinates.lon, cityName);
});
