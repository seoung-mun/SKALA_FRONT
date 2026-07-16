// 도시 이름을 입력받아 좌표를 찾고 실시간 날씨를 화면에 보여주는 기능
import { getLiveWeather } from "./weatherAPI.js";
import { getCoordinates } from "./geocodingAPI.js";

const cityForm = document.querySelector("#city-form");
const weatherBox = document.querySelector("#weather-box");

cityForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const cityName = document.querySelector("#city-input").value.trim();

  // 도시 이름을 입력하지 않은 경우
  if (!cityName) {
    weatherBox.innerHTML = "<p>도시 이름을 입력해주세요.</p>";
    return;
  }

  // 도시 이름으로 위도/경도 조회
  const coordinates = await getCoordinates(cityName);

  if (!coordinates) {
    weatherBox.innerHTML = "<p>⚠️ 해당 도시를 찾을 수 없습니다.</p>";
    return;
  }

  const { lat, lon } = coordinates;
  weatherBox.innerHTML = "<p>실시간 날씨 로딩 중... ⏳</p>";

  // 좌표로 실시간 날씨 조회
  const result = await getLiveWeather(lat, lon);

  if (result === null) {
    weatherBox.innerHTML = "<p>⚠️ 날씨 정보를 가져오는데 실패했습니다.</p>";
    return;
  }

  weatherBox.innerHTML = `
    <div class="weather-result">
      <h4>🌍 ${cityName} 실시간 날씨</h4>
      <p>🌡️ 현재 기온: <strong>${result.temp}°C</strong></p>
      <p>💧 현재 습도: <strong>${result.humidity}%</strong></p>
    </div>
  `;
});
