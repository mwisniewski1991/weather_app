//***************************************************************************************************************************************
const APIController =(function(){
//HIDE PART

    //CITIES FOR THIS APP
    const cities = [{"name":"Łódź", "lat":"51.75", "long":"19.4666", "gmt":0},     
                    {"name":"Sromowce Niżne", "lat":"49.393482", "long":"20.395491", "gmt":0},
                    {"name":"Ennis", "lat":"52.847054", "long":"-8.988436", "gmt":-1},
                    {"name":"Mikulov", "lat":"48.80556", "long":"16.6378", "gmt":0},
                    {"name":"Banff", "lat":"51.180202", "long":"-115.565704", "gmt":-8}
                    
    ];


//VISIBLE PART
    return{
        getData: async function(cityNr){
            //CREATE PROMISE AND GET DATA IN OTHER MODULES

            //latitude and longitude for selected city
            let lat = cities[cityNr].lat;
            let long = cities[cityNr].long;
            
            //api url
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/f330eefb7842750c7f2570bb7772fbcf/${lat},${long}`;
        
            //fetch promise
            let cityData = await fetch(api)
                            .then(response => {
                                return response.json();
                            })    
                            .then(data => {
                                // console.log(data);

                                //return as object
                                return {
                                    currently: data.currently,
                                    daily: data.daily,
                                    hourly: data.hourly,
                                    timezone: data.timezone
                                };

                                //return as array
                                // return [data.currently, data.daily, data.hourly];
                            })
            return cityData;
        },

        //SHOW CITIES FOR OTHER MODULES
        getCities: function(){
            return cities;
        }
    };
})();

//***************************************************************************************************************************************
const UIController = (function(){
//HIDE PART
    //NECESSERY DOM ELEMENTS
    const DOMstrings = {
        selectCityInput: '.select-city',
        mainTemp: '.location__degree',
        mainSummary: '.location__temperature-description',
        mainTimezone: '.location__timezone',
        mainIcon: '.location__icon',
        chartDaily: '#chart-days',
        chartHourly: '#chart-hours'
    };

    const chartHoursTempMinMax = function(chartHoursValues){
        //calculate ticks for better UI if diffrence between temp if too low chart do not show diffrence in good way
        let tempMin = Math.min(...chartHoursValues);
        let tempMax = Math.max(...chartHoursValues);

        if(tempMax >= tempMin + 5){
            tempMax += 2;
        }
        else{
            tempMax = tempMin + 5;
        }

        return [tempMin, tempMax]
    };


//VISIBLE PART
    return{
        //CREATE INPUT BASED ON CITY LIS
        createCityList: function(obj){
            // 1. INSERT HTML FOR EACH CITY
            //html to insert
            const html = '<option class="select-city__item" value="%value%">%city%</option>'

            //for each obj to create option for evry city
            obj.forEach(function(cur, index){

                //set parent element
                const parent = document.querySelector(DOMstrings.selectCityInput);

                //replace placeholder to real value
                let newHTML = html.replace('%value%', index);
                newHTML = newHTML.replace('%city%', cur.name);

                //insert at the end
                parent.insertAdjacentHTML('beforeend', newHTML);
            });
        },

        //CREATE MAIN PAGE
        updateMain: function(temp, sum, time, icon){
            //input: temperature, summary, timezon, icon 

            // a. update temperature
            document.querySelector(DOMstrings.mainTemp).textContent = Math.floor((temp - 32) * (5 / 9));
            // b. update summary
            document.querySelector(DOMstrings.mainSummary).textContent = sum;
            // c. update timezone
            document.querySelector(DOMstrings.mainTimezone).textContent = time;
            // d. update icon
            // setIcons(icon, document.querySelector(DOMstrings.mainIcon));


        },

        //CREATE DAYS CHART
        createChartDays: function(chartDaysValuesMin, chartDaysValuesMax, chartDaysNames){
            //DAILY CHART 

            //data days
            const chartsDaysData = {
                labels: chartDaysNames,
                datasets: [{
                        label: 'Temp Min',
                        data: chartDaysValuesMin,
                        borderColor: "#ffffff",
                        fill: false,
                        borderWidth: 1.2,
                        pointStyle: "crossRot",
                        hoverBorderWidth: 5
                    },
                    {
                        label: 'Temp High',
                        data: chartDaysValuesMax,
                        borderColor: "#ffffff",
                        fill: false,
                        borderWidth: 1.2,
                        pointStyle: "crossRot",
                        hoverBorderWidth: 5
                    }]
            }

            
            //option
            const chartOptions = {
                layout: {
                    padding: {
                        left: 5,
                        right: 5,
                        top: 5,
                        bottom: 5
                    }
                },
                title: {
                    display: true,
                    text: 'Day by Day - min/max',
                    fontColor: "#fff",
                    fontSize: 15
                },
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        color: "#fff",
                        ticks: {
                            fontColor: '#fff',
                            fontSize: 10,
                            stepValue: 1
                        },
                        gridLines: {
                            display: true,
                            color: "rgba(255, 255, 255, 0.1)"
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: '#fff',
                            fontSize: 10,
                            //                    minRotation: 45
                        },
                        gridLines: {
                            display: false
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false,
            }


            // init
            const chartDaysCanvas = document.querySelector(DOMstrings.chartDaily);
            chartDays = new Chart(chartDaysCanvas, {
                type: 'line',
                data: chartsDaysData,
                options: chartOptions
            })

           
        },

        //CREATE HOURS DAY
        createChartHours: function(chartHoursValues, chartHoursTime){

            //data hours
            const chartHoursData = {
                labels: chartHoursTime,
                datasets: [{
                        label: 'Temp',
                        data: chartHoursValues,
                        borderColor: "#ffffff",
                        fill: false,
                        borderWidth: 1.2,
                        pointStyle: "crossRot",
                        hoverBorderWidth: 5}]
            }

            //option
            const chartOptions = {
                layout: {
                    padding: {
                        left: 5,
                        right: 5,
                        top: 5,
                        bottom: 5
                    }
                },
                title: {
                    display: true,
                    text: 'Day by Day - min/max',
                    fontColor: "#fff",
                    fontSize: 15
                },
                legend: {
                    display: false,
                },
                scales: {
                    yAxes: [{
                        color: "#fff",
                        ticks: {
                            fontColor: '#fff',
                            fontSize: 10,
                            stepValue: 1,
                            min: chartHoursTempMinMax(chartHoursValues)[0], //calculate max temp to show for better viwe
                            max: chartHoursTempMinMax(chartHoursValues)[1]
                        },
                        gridLines: {
                            display: true,
                            color: "rgba(255, 255, 255, 0.1)"
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: '#fff',
                            fontSize: 10,
                            //                    minRotation: 45
                        },
                        gridLines: {
                            display: false
                        }
                    }]
                },
                responsive: true,
                maintainAspectRatio: false,
            }

             //init
             const chartHourCanvas = document.querySelector(DOMstrings.chartHourly);
             chartHours = new Chart(chartHourCanvas, {
                 type: 'line',
                 data: chartHoursData,
                 options: chartOptions
             })
        },

        //UPDATE DAYS CHART
        updateChartsDays: function(chartDaysValuesMin, chartDaysValuesMax, chartDaysNames){
            
            chartDays.data.datasets[0].data = chartDaysValuesMin
            chartDays.data.datasets[1].data = chartDaysValuesMax
            chartDays.data.labels = chartDaysNames;
            chartDays.update();
        },

        //UPDATE HOURS CHART
        updateHoursDays: function(chartHoursValues, chartHoursTime){
            
            const c = chartHoursTempMinMax(chartHoursValues);

            chartHours.data.datasets[0].data = chartHoursValues; //update data
            chartHours.data.labels = chartHoursTime; //update labels
            chartHours.config.options.scales.yAxes[0].ticks.min = chartHoursTempMinMax(chartHoursValues)[0]; //update min temp
            chartHours.config.options.scales.yAxes[0].ticks.max = chartHoursTempMinMax(chartHoursValues)[1]; //update max temp

            chartHours.update();
        },

        //RETURN ALL NECESSERY DOM ELEMENTS
        getDOMstrings: function(){
            return DOMstrings;
        }

    };
})();

//***************************************************************************************************************************************
const controller = (function(UICtr, APICtr){
//HIDE PART

    //GET DOM FROM UI
    const DOM = UICtr.getDOMstrings();

    //EVENT LISTENERS
    const setupEventListeners = function(){
        document.querySelector(DOM.selectCityInput).addEventListener("change", changeCity);
    };

    //CHANGE TO CELSIUS
    const changetoCels = function(temp){
        return Math.floor((temp - 32) * (5 / 9));
    };

    //GET NAME FROM DAY
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
    };


    //CREATE CITY INPUT FROM MAIN CITY LIST
    const createCityInput = function(){

        const citiesList = APICtr.getCities();
        UICtr.createCityList(citiesList);

    };

    //MAIN FUNCTION CHANGE CITY
    const changeCity = function(check="next"){

        // 1. GET CURRENT VALUE FROM INPUT
        //onload always 0, next checking input value
        check === "start" ? cityNr = 0 : cityNr = document.querySelector(DOM.selectCityInput).value;

        // 3. GET DATA FROM API FOR CITY - PROMISE
        var cityData = APICtr.getData(cityNr);
        cityData
            .then((data) => {
                console.log(data);
                
                // 3. UPDATE MAIN PAGE
                // pass 4 data: - temperature, summary, timezone, icon 
                UICtr.updateMain(data.currently.temperature, data.currently.summary, data.timezone, data.currently.icon);


                // 4. CREATE CHARTS
                
                //pass day data: arr:dayMinTemp, arr:dayMaxTemp, arr:dayName, arr:hourTemp
                const chartDaysValuesMin = data.daily.data.map((cur) => changetoCels(cur.temperatureLow)); //get arr:dayMinTemp
                const chartDaysValuesMax = data.daily.data.map((cur) => changetoCels(cur.temperatureHigh)); //get arr:dayMaxTemp
                const chartDaysNames = data.daily.data.map((cur)=> dayName(cur.time)); //get arr:dayName

                //pass hour data: arr:hourTemp, arr:hourTime
                const chartHoursValues = data.hourly.data.splice(0,8).map((cur) => changetoCels(cur.temperature)) //get arr:hourTemp = 8 values
                const chartHoursTime = data.hourly.data.splice(0,8).map((cur) => new Date(cur.time * 1000).getHours()+":00"); //get arr:hourTime = 8 value
                
                //if first load chart is created, next updated
                if (check === "start"){
                    UICtr.createChartDays(chartDaysValuesMin, chartDaysValuesMax, chartDaysNames);
                    UICtr.createChartHours(chartHoursValues, chartHoursTime);} //put into function
                else{
                    UICtr.updateChartsDays(chartDaysValuesMin, chartDaysValuesMax, chartDaysNames, chartHoursValues, chartHoursTime);
                    UICtr.updateHoursDays(chartHoursValues, chartHoursTime);};//put into function

                


                // 6. create days
                // 7. create hours
            });
    };

//VISIBLE PART
    return{
        init: function(){
            //ON LOAD FIRST UPDATE
            setupEventListeners();
            createCityInput();
            changeCity("start");
        }
    }
})(UIController, APIController);

controller.init();




//COMMENTS 
//HOW TO USE MAP TO GET ARRAY
// const citiesNames = obj.map(function(cur){
            //     return cur.name;
            // });

            //short version of above
            // const citiesNames = obj.map(cur => cur.name);