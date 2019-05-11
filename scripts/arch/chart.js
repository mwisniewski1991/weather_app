const chart1 = function (valuesDayHigh, valuesDayMin, valuesDayName) {
     
    
    const dataDay = {
        labels: valuesDayName,
        datasets: [{
                label: 'Temp High',
                data: valuesDayHigh,
                borderColor: "#ffffff",
                fill: false,
                borderWidth: 1.2,
                pointStyle: "crossRot",
                hoverBorderWidth: 5
            },
            {
                label: 'Temp Min',
                data: valuesDayMin,
                borderColor: "#ffffff",
                fill: false,
                borderWidth: 1.2,
                pointStyle: "crossRot",
                hoverBorderWidth: 5
            }

    ]
    }

    const optionsDay = {
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


    const chartDayCanvas = document.querySelector("#chart-day");
    
    const chartDay = new Chart(chartDayCanvas, {
        type: 'line',
        data: dataDay,
        options: optionsDay,
    })
    
    
}


//--------------------------------------------------------------------------------

const chart2 = function (valuesHourTemp, valuesHourName, tempMin, tempMax){

//    let valuesHourName = ["19:00", "20:00", "21:00", "22:00", "23:00", "24:00", "01:00", "02:00"];
//    let valuesHourTemp = [-1, -2, -3, -4, -6, 0, 2, 2];

//Calculated Max Ticks
if (tempMax >= tempMin+5){
    tempMax = tempMax + 2;
}
else{
    tempMax = tempMin + 5;
}

    const dataHour = {
        labels: valuesHourName,
        datasets: [{
                label: 'Temp',
                data: valuesHourTemp,
                borderColor: "#ffffff",
                fill: false,
                borderWidth: 1.2,
                pointStyle: "crossRot",
                hoverBorderWidth: 5
        }
    ]
    }

    const optionsHour = {
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
            text: 'Hour by hour',
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
                    min: tempMin,
                    max: tempMax
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


    const chartHourCanvas = document.querySelector("#chart-hour");

    const chartHour = new Chart(chartHourCanvas, {
        type: 'line',
        data: dataHour,
        options: optionsHour,
    })
};


const rem = function(){
    
    const c = document.querySelector("#chart-day");
    
}