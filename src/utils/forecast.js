const request = require("request");

const forecast =(latitude, longitude, callback) =>{
    const key="f7adf81bf4fc0abbc51cb49e36316e5f";
    const url =`http://api.weatherstack.com/current?access_key=${key}&query=${longitude},${latitude}&units=m`;


request({url, json: true}, (er, {body}={}) =>{
    if(er){
        callback("Unable to connect to location services!", undefined)
    }else if(body.error){
        callback(body.error.info, undefined)
    }else{
        callback(undefined,{
            temp: body.current.temperature,
            feelslike: body.current.feelslike,
            description: body.current.weather_descriptions[0]
        })
    }
  
}) 
} 

module.exports = forecast;