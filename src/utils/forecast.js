const request=require("request");

const forecast=(longitude,latitude,callback)=>{
    const url="http://api.weatherstack.com/current?access_key=3364519052b64b57a4353a26bc320a37&query="+latitude+","+longitude+
    "&units=m";
    request({url:url,json:true},(error,{body})=>{
        if(error){
            callback("not able to connect to weather server",undefined)
        }
        else if(body.error){
            callback("Not able to get Location",undefined);
        }
        else{
        const data=body.current;
        callback(undefined,data.weather_descriptions[0]+`.it is currently ${data.temperature} out but it feels like ${data.feelslike} degrees out`);
        }
    })
    }
    module.exports=forecast;
    