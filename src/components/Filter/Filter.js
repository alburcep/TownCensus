import {useState} from "react";
import PropTypes from 'prop-types';
import {searchTexts} from '../../constants/constants';
import { LazyLoadImage } from 'react-lazy-load-image-component';

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
  const [searchHair, setSearchHair] = useState('');
  const [searchProfession, setSearchProfession] = useState('');
 
  const handleNameChange = event => setSearchName(event.target.value);
  const handleMinAgeChange = e => setSearchMinAge(e.target.value);  
  const handleHeightChange = e => setSeacrhHeight(e.target.value);
  const handleHairChange = e => setSearchHair(e.target.value);
  const handleProfessionChange = e => setSearchProfession(e.target.value);

  // console.log(`Hairs: ${allHairTypes} //// Professions: ${allProfessions} `)
  // console.log('allHairTypes ->', allHairTypes)
  //console.log('searchProfession ->', searchProfession)
  // console.log('searchHair ->', searchHair)

  //search gnomes
  const resultsSearch = () => censusData.map(obj => {   
    let cardData = 
      <>
        <p>{`${cardTexts.cardName}: ${obj.name}`}</p>
        <p>{`${cardTexts.cardAge}: ${obj.age}`}</p>
        <p>{`${cardTexts.cardHairColor}: ${obj.hair_color}`}</p>
        <p>{`${cardTexts.cardWeight}: ${obj.weight.toFixed(2)}`}</p>
        <p>{`${cardTexts.cardHeight}: ${obj.height.toFixed(2)}`}</p>
        <p>{cardTexts.cardFriends}:</p>
        <ul>{obj.friends.map((friends) => { return (<li>{friends}</li>) })}</ul>
        <p>{cardTexts.cardProfessions}: </p>
        <ul>{obj.professions.map((prof) => { return ( <li>{prof}</li>) })}</ul>
        <p>----------</p>
      </>
    if(
      searchProfession === '' &&
      obj.name.toLowerCase().includes(searchName.toLowerCase()) &&        
      obj.age >= searchMinAge &&   
      obj.height >= searchHeight && 
      obj.hair_color.includes(searchHair)       
    ){ return <> {cardData} </> } 
    else if(
      obj.professions.indexOf(searchProfession) > -1 &&
      obj.name.toLowerCase().includes(searchName.toLowerCase()) &&        
      obj.age >= searchMinAge &&   
      obj.height >= searchHeight && 
      obj.hair_color.includes(searchHair)   
    ) { return <> {cardData} </> }   
  });

  return (
    <div>     
      <span>{searchTexts.names} </span>
      <input
        placeholder={searchTexts.names}
        value={searchName}
        onChange={handleNameChange}
        maxLength={25}
      />  
      <span> {searchTexts.ageMin} </span>
      <input
        placeholder='age'        
        value={searchMinAge}
        onChange={handleMinAgeChange}
        type='number'
        min='1'
        max='400'       
      />     
      <span> {searchTexts.heightMin} </span>   
      <input
        placeholder='height'
        value={searchHeight}
        onChange={handleHeightChange}
        maxLength={4}
        type='number'
        min='1'
        max='400'  
      />   
      <span> {searchTexts.hair} </span>   
      <select
        onChange={handleHairChange}
        aria-label="Filter by hair color"
      >  
        <option value=''>All hair colors</option>      
        {allHairTypes.map((hairColor) =>{
          return ( <option>{hairColor}</option> )
        })};       
      </select>
      <span> {searchTexts.professions} </span>   
      <select
        onChange={handleProfessionChange}      
      >        
        <option value=''>All professions</option>      
        {allProfessions.map((profe) =>{
          return ( <option>{profe}</option> )
        })};       
      </select>            
      {resultsSearch()}
    </div>
  )
}

Search.propTypes = {
  censusData: PropTypes.array.isRequired,
}

export default Search
