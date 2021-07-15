import {useState} from "react";
import PropTypes from 'prop-types';
import {searchTexts} from '../../constants/constants'
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Search = ({
    censusData,
    cardTexts
}) => {

  const [searchName, setSearchName] = useState("");
  const [searchMinAge, setSearchMinAge] = useState(0);
  const [searchMaxAge, setSearchMaxAge] = useState(1000);
  const [searchHeight, setSeacrhHeight] = useState(1);
  const [searchHair, setSearchHair] = useState([]);
  const [searchProfession, setSearchProfession] = useState([]);

  const handleNameChange = event => {
    setSearchName(event.target.value)    
  };
  const handleMinAgeChange = e => {
    setSearchMinAge(e.target.value)    
  };
  const handleMaxAgeChange = e => {
    setSearchMaxAge(e.target.value)    
  };
  const handleHeightChange = e => {
    setSeacrhHeight(e.target.value)    
  };
  const handleHairChange = e => {
    setSearchHair(e.target.value)    
  };
  const handleProfessionChange = e => {
    setSearchProfession(e.target.value)    
  };

  

  //obtaining all types of hair 
  const allHairTypes = [ ...new Set(censusData.map(obj => obj.hair_color))];

  //obtaining all professions
  let allProfessions = [];
  censusData.map(obj => 
    obj.professions.map(prof =>   
      allProfessions = findUniqueArrayValues(allProfessions.concat(prof))
  ));
  function findUniqueArrayValues(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
        if(a[i] === a[j])
          a.splice(j--, 1);
      }    
    }
    return a;
  };
  console.log(`Hairs: ${allHairTypes} //// Professions: ${allProfessions} `) 


  

  //search gnomes
  const resultsSearch = censusData.map((obj => {    
    if(
      obj.name.toLowerCase().includes(searchName.toLowerCase()) &&
      obj.age >= searchMinAge && 
      obj.age <= searchMaxAge &&
      obj.height >= searchHeight 
     
      // obj.hair_color === searchHair
    ) {  
      return (
        <div> 
          <p>{`${cardTexts.cardName}: ${obj.name}`}</p>
          <p>{`${cardTexts.cardAge}: ${obj.age}`}</p>
          <p>{`${cardTexts.cardHairColor}: ${obj.hair_color}`}</p>
          <p>{`${cardTexts.cardWeight}: ${obj.weight}`}</p>
          <p>{`${cardTexts.cardHeight}: ${obj.height}`}</p>
          <p>{cardTexts.cardFriends}:</p>
          <ul>
            {obj.friends.map((friends) => {
              return (
              <li>                  
                {friends}                 
              </li>
            )})}
          </ul>
          <p>{cardTexts.cardProfessions}: </p>
          <ul>
            {obj.professions.map((prof) => {
              return (
              <li>                  
                {prof}                 
              </li>
            )})}
          </ul>
          <p>------------------</p>
        </div>
      ) 
    }  
  }));

  return (
    <div>
      <input
        placeholder={searchTexts.names}
        value={searchName}
        onChange={handleNameChange}
      />  
      <input
        placeholder={searchTexts.ageMin}
        value={searchMinAge}
        onChange={handleMinAgeChange}
      />
       <input
        placeholder={searchTexts.ageMax}
        value={searchMaxAge}
        onChange={handleMaxAgeChange}
      />      
      <input
        placeholder={searchTexts.heightMin}
        value={searchHeight}
        onChange={handleHeightChange}
      />   
      <select
        onChange={handleHairChange}
        aria-label="Filter by Hair"
      >
        <option value="All">Filter by Hair</option>
        {allHairTypes.map((hairColor) =>{
          return (     
            <option>{hairColor} </option>           
          )
        })};       
      </select>
      <select
        onChange={handleProfessionChange}
        aria-label="Filter By Profession"
      >
        <option value="All">Filter By Profession</option>
        {allProfessions.map((profe) =>{
          return (
            <option>{profe} </option>          
          )
        })};       
      </select>
      {resultsSearch}
    </div>
  )
}

Search.propTypes = {
  censusData: PropTypes.array.isRequired,
}

export default Search
