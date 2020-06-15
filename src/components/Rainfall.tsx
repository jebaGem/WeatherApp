import React from "react";
import { useEffect, useState } from 'react';
import { Line,Bar } from 'react-chartjs-2';
import api from "../services/weatherservices";
import { Day } from "../types/WeatherTypes";
import './Rainfall.css';
const initialState: Day[] = [{
  day:1,
  amount:0
}]



export default function ChartTest() {

  //variable declarations
  const [ dataChart, setDataChart ] = useState ( {} );
  const [ temperature, setTemperature ] = useState (10);
  const [ pressure, setPressure ] = useState (970);
  const [weatherdata,setweatherdata]= useState(initialState);
  const [ dataLineChart, setDataLineChart ] = useState ( {} );
  let variance:number[]=[]; 
  let lowerBound:number[]=[]
  let upperBound:number[]=[]
  let mean:number[]=[]

  //onchange of pressure slider render the line chart again
  const updatePressure = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPressure(parseInt(event.target.value))
    constructLineChart();
  }

    //onchange of Temperture slider render the line chart again
  const updateTemperature = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTemperature(parseInt(event.target.value));
    constructLineChart();
  }

  //Calculate the chance of rain line chart
  const chanceOfRain=(amount=1) =>{
    let score = Math.log(amount + 1) * Math.log(pressure-929)*Math.log(temperature-4); ;
    let mean = Math.min(Math.max(score, 0), 100)
    let upper_Bound = Math.min(1.5 * mean, 100);
    let lower_Bound = Math.max(0.5 * mean, 0);
     return [upper_Bound,mean,lower_Bound];
  }


  //Construct the line chart
    const constructLineChart=()=>{ 
      for ( let dataObj of weatherdata){
        variance=chanceOfRain(dataObj.amount);
        upperBound.push(variance[0])
       mean.push(variance[1]);
      lowerBound.push(variance[2]);
      }
     
    setDataLineChart({
      labels: ["1", "2", "3", "4", "5", "6","7"],
      datasets: [
        {
          label: "Upperbound",
          data: upperBound,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)"
        },
        {
          label: "Mean",
          data: mean,
          fill: false,
          borderColor: "#742774"
        },
        {
          label: "Lower Bound",
          data: lowerBound,
          fill: false,
          borderColor: "#7878993"
        }
      ]
    })
    }

    //Onload call API to get the data
  useEffect(() => {  
      const fetchData = async () => {
      let rainfallDays:Day[]=[];
      let amount:Day[]=[];  
      await api.get('http://private-4945e-weather34.apiary-proxy.com/weather34/rain')
        .then ( (response)=> {
          setweatherdata(response.data[0].days)          
          for ( let dataObj of response.data[0].days) {
            
             rainfallDays.push(dataObj.day);
             amount.push(dataObj.amount);
              // eslint-disable-next-line react-hooks/exhaustive-deps
              variance=chanceOfRain(dataObj.amount);
              upperBound.push(variance[0])
             mean.push(variance[1]);
            lowerBound.push(variance[2]);
          }         
          
      }); 
      
      setDataLineChart({
        labels: ["1", "2", "3", "4", "5", "6","7"],
        datasets: [
          {
            label: "Upperbound",
            data: upperBound,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)"
          },
          {
            label: "Mean",
            data: mean,
            fill: false,
            borderColor: "#742774"
          },
          {
            label: "Lower Bound",
            data: lowerBound,
            fill: false,
            borderColor: "#7878993"
          }
        ]
      })
      setDataChart({ 
        labels: rainfallDays,
        datasets: [
          { 
            label: 'Days', 
            data: rainfallDays 
          },{
          label:'Amount',
          data:amount
        }
      ]
      });
      
    }
    fetchData();
    
  },[]);
  
  return( 
    <div className='container'>
      <div className="rainfall">
     
      <label>Temperate Slider</label>
      <div className='temp-slider'> 

     <label>{(temperature)?temperature:''}</label>
      <input type="range" id="points" name="points"  value={temperature} min="10" max="35" 
       onChange={(event) => updateTemperature(event)}
      ></input>
      </div>
       <Bar data={ dataChart }/> 
      </div>
      <div className="rainchance">
      <label>Pressure Slider</label>
      <div className='pressure-slider'> 
     <label>{(pressure)?pressure:''}</label>
      <input type="range" id="points" name="points"  value={pressure} min="970" max="1030" 
       onChange={(event) => updatePressure(event)}
      ></input>
      </div>
      <Line data={dataLineChart} />
      </div>
    </div>
  )
}
