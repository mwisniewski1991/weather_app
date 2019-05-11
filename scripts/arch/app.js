//Const DOM
 
const selectCity = document.querySelector('.select-city');

let city;
let cityNr;
let lat = 51.75;
let long = 19.4666;


const select = function()
{
    cityNr = selectCity.options[selectCity.selectedIndex].value;  
    lat = cities[cityNr]["lat"];
    long = cities[cityNr]["long"];
    gmt = cities[cityNr]["gmt"];
    refresh(lat, long, gmt)  
    clock();
}

selectCity.addEventListener("change", select);


const temperatureDescription = document.querySelector('.temperature-description');
const temperatureDegree = document.querySelector('.temperature-degree');
const locationTimezone = document.querySelector('.location-timezone');
const temperatureSection = document.querySelector(".temperature");
const temperatureSpan = document.querySelector('.temperature span');

//Default lat and long
//let lat = 51.75;
//let long = 19.4666;

//Function refrashing main page
const refresh = (lat, long, gmt=0) => {

    const proxy = `https://cors-anywhere.herokuapp.com/`;
    const api = `${proxy}https://api.darksky.net/forecast/f330eefb7842750c7f2570bb7772fbcf/${lat},${long}`;

    fetch(api)
        .then(response => {
            return response.json();
        })    
        .then(data => {
        
            //MAIN DATA
        //    console.log(data);
            const {temperature, summary, icon} = data.currently;
            
            //Formula for Celsius
            let celsius = Math.floor((temperature - 32) * (5 / 9));
        
            //Set DOM Elements from API
            temperatureDegree.textContent = celsius;
            temperatureDescription.textContent = summary;
            locationTimezone.textContent = data.timezone;

            //Set Icon
            setIcons(icon, document.querySelector(".icon"));
        
            //Change temperature to Celsius/Fahrenhait
            temperatureSection.addEventListener('click', () => {
                if (temperatureSpan.textContent === "F") {
                    temperatureSpan.textContent = "C";
                    temperatureDegree.textContent = celsius;
                } else {
                    temperatureSpan.textContent = "F";
                    temperatureDegree.textContent = temperature;
                }
            })

            //DETAILS DAY PER DAY
//            values for day chart
            let valuesDayMin = [];
            let valuesDayHigh = [];
            let valuesDayName = [];
            let i = 0;
            data.daily.data.forEach(item => {
                //Destructuring data
                const {time, icon, summary, temperatureLow , temperatureHigh} = item;
                //DIV to variables
                let div = document.querySelector(`#d${i}`);
                
                
                //Select all div inside main DIV and put data
                div.querySelector(".day-date").textContent =  new Date(time * 1000).toLocaleDateString(); 
                div.querySelector(".day-name").textContent =  dayName(time);
                setIcons(icon, div.querySelector(".day-icon"));
                div.querySelector(".day-summary").textContent =  summary;
                div.querySelector(".day-temp-min").textContent = Math.floor((temperatureLow - 32) *(5 / 9));
                div.querySelector(".day-temp-high").textContent = Math.floor((temperatureHigh - 32) *(5 / 9)); 
                
                //Variables beacause I do not know yet how to get index
                i = i + 1;
                
                //chart values
                valuesDayMin.push(Math.floor((temperatureLow - 32) *(5 / 9)));
                valuesDayHigh.push(Math.floor((temperatureHigh - 32) *(5 / 9)));
                valuesDayName.push(dayName(time));
                
            })       
        
            //chart for days
            chart1(valuesDayHigh, valuesDayMin, valuesDayName);
            
        
            //DETAILS HOUR BY HOUR
//                console.log(data.hourly.data);  
                let valuesHourTemp = [];
                let valuesHourName = [];
                for (let i=0; i<17; i++)
                    {
                        const {time, icon, summary, temperature} = data.hourly.data[i];
                        
                        let div = document.querySelector(`#h${i}`)
                            
                        //temporart variables to set gour for each gmt
                        let tempTime = new Date(time * 1000);
                        tempTime.setHours(tempTime.getHours() + gmt);
                        div.querySelector(".hour-hour").textContent = tempTime.getHours();
                        setIcons(icon, div.querySelector(".hour-icon"));
                        div.querySelector(".hour-summary").textContent = summary;
                        div.querySelector(".hour-temp").textContent = Math.floor((temperature - 32) *(5 / 9));
                    
                        //ONLY 8 VALUES
                        if (valuesHourTemp.length < 8){
                            valuesHourTemp.push(Math.floor((temperature - 32) *(5 / 9)));
                            valuesHourName.push(new Date(time * 1000).getHours() + ":00");
                            
                        }
                        
                    };

                let tempMin = Math.min(...valuesHourTemp);
                let tempMax = Math.max(...valuesHourTemp);
                chart2(valuesHourTemp, valuesHourName, tempMin, tempMax);
        })  
};


//let valuesDayHigh = [12, 50, 3, 5, 2, 3, 50];

window.addEventListener('load', refresh(51.75, 19.4666));