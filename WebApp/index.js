
import category from "./category.js";

let catCont = document.getElementById('cat')

category.forEach( cat =>{

    let option = document.createElement('option')
    option.value = cat  
    option.textContent = cat  

    catCont.append(option)

} )


let submitBtn = document.getElementById("submitBtn");

submitBtn.onclick = ()=> {
    
    getLocation()
}

var x = document.getElementById("loc");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showPosition(position) {

    var lat = position.coords.latitude
    var lon = position.coords.longitude
    var rad = document.getElementById("rad").value
    var cat = document.getElementById("cat").value
    let result;


    const formData = new FormData();
    formData.append('lat', lat);
    formData.append('lon', lon);
    formData.append('rad', rad);
    formData.append('cat', cat);


    const options = {
        method: 'POST',
        body: formData
    };
    fetch("http://127.0.0.1:5000/predict", options)
        .then(response => response.json())
        .then(response => {
            result = JSON.parse(response);
            console.log(result);
            renderTable(result)
        });


}

function renderTable(data) {

    const tableHeader = document.getElementById('table-header');
    const tableBody = document.getElementById('table-body');

    tableHeader.innerHTML = "" 
    tableBody.innerHTML = "" 

    Object.keys(data).map((key, idx) => {

        if (key == "Latitude" || key == "Longitude") return

        let th = document.createElement('th')
        th.className = "col"
        th.textContent = key

        tableHeader.append(th)


    })




    Object.values(data['url']).map((val, idx) => {

        let tr = document.createElement('tr')
        tr.id = idx

        tableBody.append(tr)

    })



    Object.keys(data).map((key) => {

        if (key == "Latitude" || key == "Longitude") return

        let ele = data[key]

        Object.values(ele).map((val, idx) => {


            let container = document.getElementById(idx)

            let td = document.createElement('td')

            console.log();

            if (typeof (val) === 'string' && val.includes('http')) {


                let button = document.createElement('button')
                button.className = 'locBtn btn btn-primary'
                button.textContent = 'Location '
                button.onclick = () => { window.location.href = val }

                td.append(button)

            } else {
                td.textContent = val
            }


            container.append(td)


        })


    })





}


