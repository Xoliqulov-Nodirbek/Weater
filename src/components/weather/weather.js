import { useState, useEffect } from "react";
import "./weater.css";

const Header = () => {
  const [data, setData] = useState({});
  const [input, setInput] = useState("Tashkent");

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=6e6e3e5089ee3ce069310ca7fa8bd82b`
    )
      .then((res) => res.json())
      .then((obj) => setData(obj))
      .catch((error) => console.log(error));
  }, [input]);

  return (
    <>
      <div className="wrapper w-screen h-screen flex justify-center items-center">
        <div>
          <input
            className="block border focus:outline-yellow-500 rounded-md focus:outline-none"
            onKeyUp={(evt) => {
              if (evt.code === "Enter") {
                setInput(evt.target.value);
                evt.target.value = "";
              }
            }}
            type="text"
          />
          <div className="flex">
            <div className="wrapper__inner">
              <h1 className="text-white text-3xl tracking-[1px] mt-2">{data.name}</h1>
              <p className="text-amber-500 mt-[5px]">{`Temperature at ${data.name}: ${data.main?.temp.toFixed(
                0,
                2
              )} *C`}</p>
              <p className="text-amber-500 mt-[5px]">{`Speed at ${data.name}: ${data.wind?.speed} *C`}</p>
              <p className="text-amber-500 mt-[5px]">{`Gust at ${data.name}: ${data.wind?.gust} m/s`}</p>
              {data.weather?.map((e) => (
                <p className="text-amber-500 mt-[5px]" key={e.id}>{`Description: ${e.main}`}</p>
              ))}
            </div>
            {data.weather && (
              <img
                className="object-cover w-[130px] ml-[20px]"
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt="Icon pagoda"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
