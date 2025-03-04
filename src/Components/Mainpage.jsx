import React, { useEffect, useState } from 'react'
import Sun from '../assets/sun.png'
import Weather from "../assets/weather.png"
import './Mainpage.css'
import Windspeed from '../assets/windy.png'
import windnew from '../assets/newWind.png'
import HumidD from '../assets/humidforD.png'
import HumidV3 from '../assets/humidV3.png'
import WindyV3 from '../assets/windyV3.png'

const Mainpage = () => {
  const [temp,setTemp] = useState(0.0);
  const [humidity,setHumidity] = useState(0);
  const [windspeed,setwindSpeed] = useState(0);
  const [city,setCity] = useState("");
  const [weatherstate,setweatherState] = useState("");
  const [inC,setinC] = useState(true);
  const [C,setC] = useState(0.0);
  const [F,setF] = useState(0.0);
  const [isDark,setisDark] = useState(false);

  const setDarkmode = ()=>{
   setisDark(!isDark);
  }
  const handleCity = (e)=>{
    setCity(e.target.value);
  }

  const CtoF = ()=>{
    if(!city){
      alert("Enter the city")
      return;
    }
    setF(Math.round(1.8*(temp - 273) + 32));
    setinC(false);
  }
  const FtoC =()=>{
    if(!city){
      alert("Enter the city")
      return;
    }
    setC(Math.round(temp-273.15))
    setinC(true);
  }


  const getWeather = async()=>{
    if(!city){
      alert("Please Enter the city name");
      return;
    }
    const apiKey = "2a44d2b222289435f19c0dc37b656b14";
	  const url =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    const response = await fetch(url);
    const data = await response.json();
     setTemp(data.main.temp);
     setHumidity(data.main.humidity);
     setwindSpeed(data.wind.speed);
     setC(Math.round(data.main.temp-273.15))
     setweatherState(data.weather[0].main);
    
    console.log(data);
  }
  useEffect(()=>{
    document.body.style.backgroundColor = isDark?"#121212":"white";
  },[isDark])
  return (
    <div className='main-div'>
      <div className='mode-btn-div'>
        <p className='mode-text' style={{color:(isDark?"white":"black")}}>Mode</p>
        <button  onClick={setDarkmode} className='mode-btn'>{isDark?"Light":"Dark"}</button>
        </div>
        <div className='card'>
          <h1  className='heading' style={{color:(isDark?"white":"black")}}>Weather Today</h1>
        <div className="input-div">
            <input type="text" className='city-input' value={city} onChange={handleCity} placeholder='Enter the city name'/>
            <button className="get-btn" onClick={getWeather}>Get Weather</button>
        </div>
        <div className="weather-img-div">
            <img src={Weather} alt="" height={200} />
        </div>
        <div className="temp-div">
          <h3 className='temp' style={{fontFamily:"cursive",color:(isDark?"white":"black")}} >Temperature</h3>
          {inC&&<h1 className='temp' style={{color:(isDark?"white":"black")}}>{C} &deg; C</h1> }
          {!inC && <h1 className='temp' style={{color:(isDark?"white":"black")}}>{F} F</h1> }
          <button onClick={inC?CtoF:FtoC}  className='temp-toggle-btn'>{(inC ?"Get in F":"Get in C")}</button>
          <h2 className='condition' style={{color:(isDark?"white":"black")}}>{weatherstate}</h2>
        </div>

        <div className="other-data-div">
        <div className="humidity-div">
          <h2 className='ot-heading' style={{color:(isDark?"white":"black")}}>Humidity</h2>
          <img src={HumidV3}className='ot-image' alt="humidity image"  height={70}/>
          <h2 className='ot-data' style={{color:(isDark?"white":"black")}}>{humidity}%</h2>
         
        </div>
        <div className="windspeed-div">
          <h2 className="ot-heading" style={{color:(isDark?"white":"black")}}>Wind Speed</h2>
          <img src={WindyV3} alt="windspeed image" className='ot-image'  height={70}/>
          <h2 className='ot-data' style={{color:(isDark?"white":"black")}}>{windspeed} m/s</h2>

        </div>
        </div>

        </div>
    </div>
  )
}

export default Mainpage