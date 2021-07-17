const express=require("express");
const path=require("path");
const hbs=require("hbs");
const geoCode=require("./utils/geocode");
const foreCast=require("./utils/forecast");

const app=express();
const port=process.env.PORT || 3000

//Define Paths for Express config
const publicDirectory=path.join(__dirname,"../public");
const viewsPath=path.join(__dirname,"./templates/views");
const partialsPath=path.join(__dirname,"./templates/partials");

//this is for handle bars
app.set('view engine','hbs')
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);

//this is for our static directory
app.use(express.static(publicDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Adithya Bokkisum"
    });
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:"About me",
        name:"Adithya Bokkisum"
    })
})

app.get("/help",(req,res)=>{
    res.render("help",{
        help:"Its an Help Page",
        title:"Help",
        name:"Adithya Bokkisum"
    })
})

app.get("/weather",(req,res)=>{
   const address=req.query.address;
   if(!address){
       return res.send({
         Error:"Plase Write The Location Name"
       })
   }
   geoCode(address,(error,{longitude,latitude,location}={})=>{     //we added ={} as a default value otherwise js cant destructure undefined objects
    if(error){
     return  res.send({
         error
     })
    }
      foreCast(longitude, latitude, (error, forecastData) => {
        if(error){
          return res.send({
            error
        });
        }
        res.send({
            forecast:forecastData,  
            location,
            address
        })
      })
  })

})

app.get("/products",(req,res)=>{
    if(req.query.search){
        return res.send({
            Title:"God Of War"
        })
    }
    
    res.send({
        products:[]
    })
})

app.get("/help/*",(req,res)=>{
    res.render("404",{
        title:"404",
        text:"This is Some Helpful Text",
        name:"Adithya Bokkisum"
    })
})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        text:"Page Not Found",
        name:"Adithya Bokkisum"
    })
})

app.listen(port,()=>{
    console.log("Server is running on port "+port);
})
