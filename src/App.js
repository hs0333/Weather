import React, { useState } from "react";
import weatherStore from "./store";
import { styled } from "styled-components";

const MainWrap = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`;

const Main = styled.h1`
  font-size: 20px;
`;

const Search = styled.div`
  text-align: center;

  & input {
    width: 210px;
    height: 24px;
    border: 1px solid #a4a4a4;
    border-radius: 5px;
  }

  & button {
    height: 30px;
    margin: 0 0 0 10px;
    border: none;
    border-radius: 15%;
    background-color: #0080ff;
    color: white;
  }
`;

const Result = styled.div`
  text-align: center;
`;

function App() {
  const { weather, loading, error, setCity, fetchWeather } = weatherStore();
  const [inputCity, setInputCity] = useState("");

  const handleFetchWeather = () => {
    setCity(inputCity); // store의 city 상태 업데이트
    fetchWeather(inputCity); // 날씨 데이터를 가져오는 함수 호출
  };

  return (
    <MainWrap>
      <Main>
        <h1>날씨를 알려드립니다</h1>
        <Search>
          <input
            type="text"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)} // 입력 필드가 변경될 때마다 로컬 상태 업데이트
            placeholder="도시 이름을 영어로 입력해주세요!"
          />

          <button onClick={handleFetchWeather}>검색</button>
        </Search>
        <Result>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error}</p>}
          {weather && (
            <div>
              <h2>{weather.name}</h2>
              <p>온도: {weather.main.temp}°C</p>
              <p>날씨: {weather.weather[0].description}</p>
            </div>
          )}
        </Result>
      </Main>
    </MainWrap>
  );
}

export default App;
