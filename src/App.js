import './App.css';
import FecthTownData from './api/FecthTownData';
import {cardTexts, headerTexts} from './constants/constants'
import Header from './components/Header/Header'
import Filter from './components/Filter/Filter';

import {useState, useEffect} from "react";

function App() {

  const [townDataJSON, setTownDataJSON] = useState([]); 
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    FecthTownData().then(
      (dataTownResponse) => {
        setTownDataJSON(dataTownResponse.Brastlewark || 'No town data found')
        setLoading(true)
      });
  }, []);
  console.log('townDataJSON ->', townDataJSON);

  return (    
    <div className="App">     
      <Header 
        headerTexts={headerTexts}
      />
      {loading ?
        <Filter
          censusData={townDataJSON}
          cardTexts={cardTexts}
        /> 
      : 'loading gnomes...'}     
    </div>
  );
}

export default App;
