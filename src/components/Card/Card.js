import React from 'react'
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Card.css'

const Card = ({
  censusData,
  cardTexts,
  searchName,
  searchHeight,
  searchMinAge, 
  searchWeight, 
  searchHair,
  searchProfession 
}) => {
  const resultsSearch = censusData.map(obj => {   
    let cardData = (    
      <div className='card'>
        <div className='card-image'>
          <LazyLoadImage      
            effect="blur"         
            src={obj.thumbnail} 
            alt={obj.name} 
            key={obj.id}
            height='150px'      
            width='100%'
          />
        </div>
        <p>{`${cardTexts.cardName}: ${obj.name}`}</p>
        <p>{`${cardTexts.cardAge}: ${obj.age}`}</p>
        <p>{`${cardTexts.cardHairColor}: ${obj.hair_color}`}</p>
        <p>{`${cardTexts.cardWeight}: ${obj.weight.toFixed(2)}`}</p>
        <p>{`${cardTexts.cardHeight}: ${obj.height.toFixed(2)}`}</p>
        <p>{cardTexts.cardFriends}:</p>
        <ul>{obj.friends.map((friends, i) => { return (<li key={i}>{friends}</li>) })}</ul>
        <p>{cardTexts.cardProfessions}: </p>
        <ul>{obj.professions.map((prof, i) => { return ( <li key={i}>{prof}</li>) })}</ul>
      </div>
    )      
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
 
  return <div className='card-grid'> {resultsSearch} </div>  
 
}

Card.propTypes = {
  censusData: PropTypes.array.isRequired,
  cardTexts: PropTypes.object,
  searchName: PropTypes.string,
  searchHeight: PropTypes.string,
  searchMinAge: PropTypes.string, 
  searchWeight: PropTypes.string, 
  searchHair: PropTypes.string,
  searchProfession: PropTypes.string 
}

export default Card
