import {useState} from "react";
import PropTypes from 'prop-types';
import People from '../People/People'

const Search = ({
    censusData,
    cardTexts
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
    <div>     
      <span>{cardTexts.names} </span>
      <input
        placeholder={cardTexts.names}
        value={searchName}
        onChange={handleNameChange}
        maxLength={25}
      />  
      <span> {cardTexts.ageMin} </span>
      <input
        placeholder='age'        
        value={searchMinAge}
        onChange={handleMinAgeChange}
        type='number'
        min='1'
        max='400'       
      />     
      <span> {cardTexts.heightMin} </span>   
      <input
        placeholder='height'
        value={searchHeight}
        onChange={handleHeightChange}
        maxLength={3}
        type='number'
        min='1'
        max='999'  
      />
      <span> {cardTexts.weightMin} </span>     
      <input
        placeholder='weight'
        value={searchWeight}
        onChange={handleWeightChange}
        maxLength={2}
        type='number'
        min='1'
        max='99'  
      />   
      <span> {cardTexts.hair} </span>   
      <select
        onChange={handleHairChange}
        aria-label="Filter by hair color"
      >  
        <option value=''>All hair colors</option>      
        {allHairTypes.map((hairColor) =>{
          return ( <option>{hairColor}</option> )
        })};       
      </select>
      <span> {cardTexts.professions} </span>   
      <select
        onChange={handleProfessionChange}      
      >        
        <option value=''>All professions</option>      
        {allProfessions.map((profe) =>{
          return ( <option>{profe}</option> )
        })};       
      </select>            
      
      <People 
        censusData = { censusData}
        cardTexts = {cardTexts}
        searchName = {searchName}
        searchMinAge = {searchMinAge}
        searchHeight = {searchHeight}
        searchWeight = {searchWeight}
        searchHair = {searchHair}
        searchProfession = {searchProfession}
      />
    </div>
  )
}

Search.propTypes = {
  censusData: PropTypes.array.isRequired,
  cardTexts: PropTypes.object
}

export default Search
