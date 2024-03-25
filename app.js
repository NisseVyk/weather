const express = require("express")
const request = require("request")
const pug = require('pug');
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use(express.static("public"))

let temperature_list = [[],[],[],[],[],[]]
let t_list = [[],[],[],[],[],[]]
let d_list = [[],[],[],[],[],[]]
let wind_speed = [[],[],[],[],[],[]]
let wind_direction = [[],[],[],[],[],[]]
let weekday_list = []
let Day = 0
let DayCount = 0

API_key = '732f96d2f337a92e13febfbd8926efc7'

lat = '63.1793655'
lon = '14.6357061'

url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_key}`

request(url, function(err, response, body) {
    if(err){
        console.log("error", err);
    }
    else{
        let weather = JSON.parse(body)
        weekday_list.push(new Date().toLocaleString('sv-SE', {  weekday: 'long' }).toUpperCase())
        Day = weather["list"][0]["dt_txt"].slice(8,10)
        for (let i = 0; i < weather["list"].length; i++) {
            
            if(weather["list"][i]["dt_txt"].slice(8,10) == Day){
                temperature_list[DayCount].push((Math.round((weather["list"][i]["main"]["temp"] - 273.15) * 10) / 10).toString() + "°C")
                t_list[DayCount].push(weather["list"][i]["dt_txt"].slice(11,13))
                d_list[DayCount].push(weather["list"][i]["dt_txt"].slice(0,10))
                wind_speed[DayCount].push((Math.round(weather["list"][i]["wind"]["speed"] * 10) / 10).toString() + "m/s")
                wind_direction[DayCount].push(weather["list"][i]["wind"]["deg"])
            
            } else {
                weekday_list.push(new Date(weather["list"][i]["dt_txt"].slice(0,10)).toLocaleString('sv-SE', {  weekday: 'long' }).toUpperCase())
                
                DayCount++
                temperature_list[DayCount].push((Math.round((weather["list"][i]["main"]["temp"] - 273.15) * 10) / 10).toString() + "°C")
                t_list[DayCount].push(weather["list"][i]["dt_txt"].slice(11,13))
                d_list[DayCount].push(weather["list"][i]["dt_txt"].slice(0,10))
                wind_speed[DayCount].push((Math.round(weather["list"][i]["wind"]["speed"] * 10) / 10).toString() + "m/s")
                wind_direction[DayCount].push(weather["list"][i]["wind"]["deg"])
                Day = weather["list"][i]["dt_txt"].slice(8,10)
            }
            

        }
    }
    
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })

app.get("/", (req,res) => {
    res.render('index', { title: 'Schizoposting', "temperature": temperature_list, "t": t_list, "d": weekday_list, "speed": wind_speed, "direction": wind_direction})
})