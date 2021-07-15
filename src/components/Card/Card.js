import React from 'react'
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './Card.css'

const Card = ({  
    censusData,
    className,
    cardTexts  
}) => {

const listPeople = censusData.map((obj, idx) => {
  return (
    <div className={className}>
      <LazyLoadImage      
        effect="blur"
        className={className} 
        src={obj.thumbnail} 
        alt={obj.name} 
        key={obj.id}       
      />
      <div className="cardContent">
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
      </div>       
      
      {/* 
      <button className="delete" onClick={() => handleDeleteItem(index)}>
        X
      </button>
      */}
    </div>
  );
});

  return (     
      <div>      
          {listPeople}      
      </div>
  )
}

Card.propTypes = {
  censusData: PropTypes.array.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  cardTexts: PropTypes.object
}

export default Card
