// 외부에서 가져다 쓸 수 있도록 export를 함수 맨 앞에 붙입니다.
export async function getCoordinates(cityName) {
  const name = encodeURIComponent(cityName); // URL에 안전하게 넣기 위해 인코딩
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=1&language=ko&format=json`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("서버 응답 불안정");

    const data = await response.json();
    if (!data.results || data.results.length === 0)
      throw new Error("해당 도시를 찾을 수 없습니다.");

    // 필요한 데이터만 깔끔한 객체로 패킹해서 리턴
    return {
      lat: data.results[0].latitude,
      lon: data.results[0].longitude,
    };
  } catch (error) {
    console.error("API 모듈 에러:", error);
    return null; // 에러 시 빈 값 던지기
  }
}
