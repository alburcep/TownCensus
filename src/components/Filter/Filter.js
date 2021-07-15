import {useState} from "react";
import PropTypes from 'prop-types';
import Card from '../Card/Card'
import './Filter.css'

const Filter = ({
    censusData,
    cardTexts,
    searchTexts
}) => {
    
  //Obtaining Array values & sorting them
  const findUniqueArrayValues = array => [...new Set(array)];  
  //obtaining all types of hair 
  const allHairTypes = [ ...new Set(censusData.map(obj => obj.hair_color))].sort();
  //obtaining all professions
  let allProfessions = [];
  censusData.map(obj => 
    obj.professions.map(prof =>
      allProfessions = findUniqueArrayValues(allProfessions.concat(prof.trimStart()).sort())
  ));

  const [searchName, setSearchName] = useState('');
  const [searchMinAge, setSearchMinAge] = useState('');  
  const [searchHeight, setSeacrhHeight] = useState('');
  const [searchWeight, setSeacrhWeight] = useState('');
  const [searchHair, setSearchHair] = useState('');
  const [searchProfession, setSearchProfession] = useState('');
 
  const handleNameChange = event => setSearchName(event.target.value);
  const handleMinAgeChange = e => setSearchMinAge(e.target.value);  
  const handleHeightChange = e => setSeacrhHeight(e.target.value);
  const handleWeightChange = e => setSeacrhWeight(e.target.value);
  const handleHairChange = e => setSearchHair(e.target.value);
  const handleProfessionChange = e => setSearchProfession(e.target.value);
  
  return (
    <>
      <div className='search-wrapper'>        
        <input
          className='search-input'
          placeholder={searchTexts.name}
          value={searchName}
          onChange={handleNameChange}
          maxLength={25}
        />            
        <select
          onChange={handleProfessionChange}      
        >        
          <option value=''>All professions</option>      
          {allProfessions.map((profe, i) =>{
            return ( <option key={i}>{profe}</option> )
          })};       
        </select> 
        <select
          onChange={handleHairChange}
          aria-label="Filter by hair color"
        >  
          <option value=''>All hair colors</option>      
          {allHairTypes.map((hairColor, i) =>{
            return ( <option key={i}>{hairColor}</option> )
          })};       
        </select>      
        <div>  
          <span> {searchTexts.ageMin} </span>
          <input
            placeholder='age'        
            value={searchMinAge}
            onChange={handleMinAgeChange}
            type='number'
            min='1'
            max='400'       
          />
       </div>       
        <div>      
          <span> {searchTexts.heightMin} </span>   
          <input
            placeholder='height'
            value={searchHeight}
            onChange={handleHeightChange}
            maxLength={3}
            type='number'
            min='1'
            max='999'  
          />
        </div>
        <div>
          <span> {searchTexts.weightMin} </span>     
          <input
            placeholder='weight'
            value={searchWeight}
            onChange={handleWeightChange}
            maxLength={2}
            type='number'
            min='1'
            max='99'  
          /> 
        </div>                      
      </div>
      <Card 
        censusData = { censusData}
        cardTexts = {cardTexts}
        searchName = {searchName}
        searchMinAge = {searchMinAge}
        searchHeight = {searchHeight}
        searchWeight = {searchWeight}
        searchHair = {searchHair}
        searchProfession = {searchProfession}
      />
    </>
  )
}

Filter.propTypes = {
  censusData: PropTypes.array.isRequired,
  cardTexts: PropTypes.object
}

export default Filter
