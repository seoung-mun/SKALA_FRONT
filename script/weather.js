// 도시(위도/경도)를 선택하면 Open-Meteo API로 실시간 날씨를 조회해 표시한다.
const citySelect = document.querySelector("#city-select");
const weatherBox = document.querySelector("#weather-box");

// 도시 선택이 바뀔 때마다 날씨 조회 실행
citySelect.addEventListener("change", async function () {
  const value = citySelect.value;

  // 미선택/직접입력 옵션은 조회하지 않고 안내 문구만 표시
  if (value === "none" || value === "custom") {
    weatherBox.innerHTML = "<p>도시를 선택하면 정보가 표시됩니다.</p>";
    return;
  }

  // option value는 "위도,경도" 형식 → 숫자 배열로 분리
  const [lat, lon] = value.split(",").map(Number);
  const cityName = citySelect.options[citySelect.selectedIndex].text;

  weatherBox.innerHTML = "<p>실시간 날씨 로딩 중... ⏳</p>";

  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m`;

  try {
    // API 호출 및 응답 유효성 검사 (HTTP 상태 + 데이터 존재 여부)
    const response = await fetch(url);
    if (!response.ok) throw new Error("서버 응답 불안정");

    const data = await response.json();
    if (!data.current) throw new Error("날씨 정보가 없습니다.");

    const temp = data.current.temperature_2m;
    const humidity = data.current.relative_humidity_2m;


    weatherBox.innerHTML = `
      <div class="weather-result">
        <h4>🌍 ${cityName} 실시간 날씨</h4>
        <p>📍 좌표: <strong>${lat}, ${lon}</strong></p>
        <p>🌡️ 현재 기온: <strong>${temp}°C</strong></p>
        <p>💧 현재 습도: <strong>${humidity}%</strong></p>
      </div>
    `;
  } catch (error) {
    // 네트워크 오류나 응답 이상 시 사용자에게 실패 안내
    console.error("에러:", error);
    weatherBox.innerHTML = "<p>⚠️ 날씨 정보를 가져오는데 실패했습니다.</p>";
  }
});
