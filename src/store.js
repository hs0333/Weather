import create from "zustand";
import axios from "axios";

const weatherStore = create((set) => ({
  city: "",
  weather: null,
  loading: false,
  error: null,

  // 도시 상태를 업데이트하는 함수
  setCity: (city) => set({ city }),

  // 날씨 데이터를 가져오는 함수
  fetchWeather: async (city) => {
    set({ loading: true, error: null }); // 데이터를 요청할 시 로딩 상태
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=52c73cf02eee23b6724bae2dc7b92c1b&units=metric`
      );
      set({ weather: response.data, loading: false }); // 데이터 요청 성공 시 날씨 상태를 업데이트, 로딩 상태 해제
    } catch (error) {
      set({ error: error.message, loading: false }); // 데이터 요청 실패 시 에러 메세지, 로딩 상태 해제
    }
  },
}));

export default weatherStore;
