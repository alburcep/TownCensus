import axios from "axios"

const FecthTownData = () => {
  return axios
  .get('https://raw.githubusercontent.com/rrafols/mobile_test/master/data.json')
  .then(({data}) => {
    //console.log('All town data ->', data)  
    return data
  })  
  .catch((error) =>
    console.error(error, 'No town data found')
  )
}

export default FecthTownData


