import React from 'react';
import sunny from "../assets/images-icon/weather-icons/sunny.png";
import cloudy from "../assets/images-icon/weather-icons/cloudy.png";
import snowy from "../assets/images-icon/weather-icons/snowy.png";
import windy from "../assets/images-icon/weather-icons/windy.png";
import rainy from "../assets/images-icon/weather-icons/rainy.png";
import foggy from '../assets/images-icon/weather-icons/foggy.png';
import partly from "../assets/images-icon/weather-icons/partly-cloudy.png";
import stormy from "../assets/images-icon/weather-icons/stormy.png";
import { useState,useEffect,useRef } from 'react';
import searchy from "../assets/images-icon/weather-icons/search-icon.png";

const Weather = () => {
  const inputref=useRef(null);
  const [weatherdata,setweatherdata]=useState(false);
 
  const allicons={
    "01d":sunny,
    "01n":cloudy,
    "02d":rainy,
    "03d":foggy,
    "05d":partly,
    "09d":stormy,
    "06d":windy,
    "013d":snowy,
  }
  const search=async (city) => {
    if(city===""){
      alert("Please search the country");
    }
    try{
      const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
      const response=await fetch(url);
      const data=await response.json();
      console.log(data);
      

      const icons=allicons[data.weather[0].icon] || sunny;

      setweatherdata({
      humidity:data.main.humidity,
      windspeed:data.wind.speed,
      temperature:Math.floor(data.main.temp),
      location:data.name,
      icons:icons,
      })

      
    }catch(error){
      setweatherdata(false);
      console.error("Incorrect API");

    }
    
  }

  useEffect(()=>{
    
    document.title="Weather Dashboard";
  })
  



  return (
    <>
    <div className="Weather">
      <h1>Weather App</h1>
      <p className='Weather-app'>Search for any city and get a real life Weather Updates</p>
      
    </div>

    <div className='main-head'>
      <input type="text" className='search-city' placeholder='Search for any city' ref={inputref} />
      <img src={searchy} alt="" className="search-image" onClick={()=> search(inputref.current.value)} />

    </div>

    {weatherdata? <><div className="images-weather">
      <img src={weatherdata.icons} alt="" className='image-1' />
  
    </div>

    <div className='temperate'>
      <p className="temperature">{weatherdata.temperature}</p>
      <p className='City'>{weatherdata.location}</p>
      <p className="windspeed">{weatherdata.windspeed} Km/hr</p>
    </div>
    
    </>:<></>}

    

    </>

    
  )
}


export default Weather;
