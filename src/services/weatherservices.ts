import { Weather } from "../types/WeatherTypes";
import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: 'http://private-4945e-weather34.apiary-proxy.com/weather34/rain',
})
export default api;

const URL = 'http://private-4945e-weather34.apiary-proxy.com/weather34/rain'; 

export async function fetchWeatherDetails(
    ): Promise<AxiosResponse<Weather>> {
      try {
        let res :any= await axios.get(URL);
        
  
        return res;
      } catch (e) {
        return e.response;
      }
    }