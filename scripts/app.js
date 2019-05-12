const chartsController = (function(){
//HIDE PART

//VISIBLE PART
return{

};
})();


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
        getData: function(cityNr){
            console.log(cities[cityNr].name);

            //latitude and longitude for selected city
            let lat = cities[cityNr].lat;
            let long = cities[cityNr].long;
            
            //api url
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/f330eefb7842750c7f2570bb7772fbcf/${lat},${long}`;
        
            // let cityData;
            // fetch(api)
            //     .then(response => {
            //         return response.json();
            //     })    
            //     .then(data => {
            //         console.log(data);
            //         cityData = data;
            //         return cityData;
            //     })
            
            // console.log(cityData);


        },

        //SHOW CITIES FOR OTHER MODULES
        getCities: function(){
            return cities;
        }
    };
})();


const UIController = (function(){
//HIDE PART
    //NECESSERY DOM ELEMENTS
    const DOMstrings = {
        selectCityInput: '.select-city'
    };


//VISIBLE PART
    return{
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

        //RETURN ALL NECESSERY DOM ELEMENTS
        getDOMstrings: function(){
            return DOMstrings;
        }

    };
})();


const controller = (function(UICtr, APICtr){
//HIDE PART


    //GET DOM FROM UI
    const DOM = UICtr.getDOMstrings();

    //EVENT LISTENERS
    const setupEventListeners = function(){
        document.querySelector(DOM.selectCityInput).addEventListener("change", changeCity);
    };


    //CREATE CITY INPUT FROM MAIN CITY LIST
    const createCityInput = function(){

        const citiesList = APICtr.getCities();
        UICtr.createCityList(citiesList);

    };

    //MAIN FUNCTION CHANGE CITY
    const changeCity = function(){
        
        // 1. get current value from input after change
        let cityNr = document.querySelector(DOM.selectCityInput).value;


        // 2. get data from API to city
        // var cityData = APICtr.getData(cityNr);

        // 3. update main page
        // 4. create icons
        // 5. create charts
        // 6. create days
        // 7. create hours

    };

//VISIBLE PART
    return{
        init: function(){
            //ON LOAD FIRST UPDATE
            setupEventListeners();
            createCityInput();
            // changeCity();
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