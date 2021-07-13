const request=require("request");
const geoCode=(address,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYWRpdGh5YS1ib2traXN1bTEyMyIsImEiOiJja3FzZzdwaHkxcHEwMzJtaGpjOWhvMXYxIn0.LIadWjB2UE4yLyk3wWv6Dw&limit=1";
    request({url,json:true},(error,{body})=>{
        
        if(error){
        callback("not able to connect to geo Location server",undefined);

        }
        
        else if(body.features.length===0){
            callback("Unable to find the location Try another search",undefined);
        }
        else{

        const data=body.features[0];
        const latitude=data.center[1];
        const longitude=data.center[0];
        const placeName=body.features[0].place_name;
        callback(undefined,{
            latitude,
            longitude,
            location:placeName
        })
        }
        
    })
}
module.exports=geoCode;