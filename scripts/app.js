const chartController = (function(){
//HIDE PART

//VISIBLE PART
return{

};
})();


const APIController =(function(){
//HIDE PART

    //CITIES FOR THIS APP
    const cities = [{"city":"Łódź", "lat":"51.75", "long":"19.4666", "gmt":0},
                    {"city":"Banff", "lat":"51.180202", "long":"-115.565704", "gmt":-8},
                    {"city":"Sromowce Niżne", "lat":"49.393482", "long":"20.395491", "gmt":0},
                    {"city":"Sydney", "lat":"-33.866837", "long":"151.209129", "gmt":10},
                    {"city":"Ennis", "lat":"52.847054", "long":"-8.988436", "gmt":-1},
    ];


//VISIBLE PART
    return{
        test: function(){
            var z = 2;
            return z;
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


    //MAIN FUNCTION
    const changeCity = function(){


        // 1. get data from API to city
        // 2. update main page
        // 3. create icons
        // 4. create charts
        // 5. create days
        // 6. create hours

    };

//VISIBLE PART
    return{
        init: function(){
            //ON LOAD FIRST UPDATE
            setupEventListeners();
            changeCity();
        }
    }
})(UIController, APIController);

controller.init();