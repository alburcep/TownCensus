import React from 'react'
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const People = ({
  censusData,
  cardTexts,
  searchName,
  searchHeight,
  searchMinAge, 
  searchWeight, 
  searchHair,
  searchProfession 
}) => {
  const resultsSearch = () => censusData.map(obj => {   
    let cardData = 
      <>
        <LazyLoadImage      
          effect="blur"         
          src={obj.thumbnail} 
          alt={obj.name} 
          key={obj.id}       
        />
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
      obj.weight >= searchWeight &&
      obj.hair_color.includes(searchHair)       
    ){ return <> {cardData} </> } 
    else if(
      obj.professions.indexOf(searchProfession) > -1 &&
      obj.name.toLowerCase().includes(searchName.toLowerCase()) &&        
      obj.age >= searchMinAge &&   
      obj.height >= searchHeight && 
      obj.weight >= searchWeight &&
      obj.hair_color.includes(searchHair)   
    ) { return <> {cardData} </> }     
  });

  return (
    <div> {resultsSearch()} </div>      
  )
}

People.propTypes = {
  censusData: PropTypes.array.isRequired,
  cardTexts: PropTypes.object
}


export default People
