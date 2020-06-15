import React,{ FunctionComponent } from 'react';

import ChartTest from './components/Rainfall';


//import Thermostat from '../Thermostat/Thermostat';

export const App: FunctionComponent = props => {
  return (
    <div>   
     
      
      <ChartTest />    
     
      {/* <Thermostat/>   */}
    </div>
  );
};



export default App;