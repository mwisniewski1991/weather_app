//DICT FOR CITIES
let cities = [{"city":"Łódź", "lat":"51.75", "long":"19.4666", "gmt":0},
              {"city":"Banff", "lat":"51.180202", "long":"-115.565704", "gmt":-8},
              {"city":"Sromowce Niżne", "lat":"49.393482", "long":"20.395491", "gmt":0},
              {"city":"Sydney", "lat":"-33.866837", "long":"151.209129", "gmt":10},
              {"city":"Ennis", "lat":"52.847054", "long":"-8.988436", "gmt":-1},
             ]


//CLOCKS FUNCTION
let gmt = 0;
const clock = function()
{
    //variables
    const timegmt = document.querySelector(".time-gmt")
    let today = new Date();
    
    today.setHours(today.getHours() + gmt)
    
    let hour =today.getHours();
    let min = today.getMinutes();
    let sec = today.getSeconds();
    
    //if for time under 10
    if (hour<10) hour = `0${hour}`;
    if (min<10) min = `0${min}`;
    if (sec<10) sec = `0${sec}`;
    
    
    //put time to html
    timegmt.textContent = `${hour}:${min}:${sec}`
    
    
    //wait 1s and reaload function
    setTimeout("clock()", 1000);
}


window.addEventListener('load', clock())



//FUNCTION FOR ICONS
function setIcons(icon, iconID) {
    const skycons = new Skycons({
        color: 'white'
    });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
};


//NAME DAY FUNC
const dayName = function(dayNum){
    
    let date = new Date(dayNum * 1000);
    let day = date.getDay()
    
    const names = [] 
    names[0] = "Sunday"
    names[1] = "Monday"
    names[2] = "Tuesday"
    names[3] = "Wednesday"
    names[4] = "Thursday"
    names[5] = "Friday"
    names[6] = "Saturday"
    
    return names[day];
}    


//CREATE DAYS DIVS IN HTML
const addDayDiv = () => {
    const detailsList = document.querySelector(".days-details");
    //use fragment to avoid DOM use
    const divFragment = document.createDocumentFragment();

    for (let i=0; i<8; i++)
        {
            div = document.createElement("div");
        
            div.classList.add("day");
            div.id = `d${i}`;

            divFragment.appendChild(div); 
            
            //CREATE NEXT CHILDREN
            divDate = document.createElement("div");
            divDate.classList.add("list");
            divDate.classList.add("day-date");

            divName = document.createElement("div");
            divName.classList.add("list");
            divName.classList.add("day-name");

            divIcon = document.createElement("canvas");
            divIcon.classList.add("list");
            divIcon.classList.add("day-icon");
            divIcon.width = "128";
            divIcon.height = "128";
            
            divSummary = document.createElement("div");
            divSummary.classList.add("list");
            divSummary.classList.add("day-summary");

            divTempmin = document.createElement("div");
            divTempmin.classList.add("list");
            divTempmin.classList.add("day-temp-min");

            divTemphigh = document.createElement("div");
            divTemphigh.classList.add("list");
            divTemphigh.classList.add("day-temp-high");


//            div.appendChild(divDate);
//            div.appendChild(divName);
//            div.appendChild(divSummary);
//            div.appendChild(divTempmin);
//            div.appendChild(divTemphigh);

//            EDGE AND IE DOES NOT SUPPORT APEND
            div.append(divDate, divName, divIcon, divSummary, divTempmin, divTemphigh);
        }

        detailsList.appendChild(divFragment);
}

window.addEventListener("load", addDayDiv())



//CREATE HOURS DIVS IN HTML

const addHourDiv = () => {
    const detailsList = document.querySelector(".hours-details");
    //use fragment to avoid DOM use
    const divFragment = document.createDocumentFragment(); 
    
    for (let i=0; i<17; i++)
        {

            let div = document.createElement("div");

            div.classList.add("hour");
            div.id = `h${i}`;

            // detailsList.appendChild(div);
            divFragment.appendChild(div);

            //CREATE NEXT CHILDREN
            divHour = document.createElement("div");
            divHour.classList.add("hour-hour");

            divIcon = document.createElement("canvas");
            divIcon.classList.add("hour-icon");

            divSummary = document.createElement("div");
            divSummary.classList.add("hour-summary");

            divTemp = document.createElement("div");
            divTemp.classList.add("hour-temp");

            div.append(divHour, divIcon, divSummary, divTemp);  
        }

    detailsList.appendChild(divFragment);
}

window.addEventListener("load", addHourDiv())