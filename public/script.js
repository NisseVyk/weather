let day = 0

const temperatureHolder = document.getElementById("temperatureHolder")

function change_day(amount) {

    if(amount > 0 && day != (temperatureHolder.children.length)-1){
        temperatureHolder.children[day].classList.remove("shown")
        day += amount
        temperatureHolder.children[day].classList.add("shown")
    }
    else if(amount < 0 && day != 0){
        temperatureHolder.children[day].classList.remove("shown")
        day += amount
        temperatureHolder.children[day].classList.add("shown")
    }
    
    
    

}
