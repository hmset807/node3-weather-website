const request = require("request");

const geocode = (address, callback) =>{
    const access_token = "pk.eyJ1IjoiZXJpY3NldG8iLCJhIjoiY2tjc243YjZxMDh5YTJ4cWx1NGtxMXN2byJ9.tS9a7_pTIPXmAExZ2o5m7g";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?types=country&access_token=${access_token}&limit=1`;

    request({url, json:true}, (er, {body}={}) =>{

        if(er){
            callback("Unable to connect to location services!", undefined)
        }else if(body.features.length === 0){
            callback("location not found",undefined)
        }else{
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode