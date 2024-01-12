let map, mapEvent;
let id = 1;
let entryForm = document.getElementById("form-div");
let doneButton = document.getElementById("done-button");
let selectInput = document.getElementById("select-input");
let distanceInput = document.getElementById("distance-input");
let durationInput = document.getElementById("duration-input");
let calorieInput = document.getElementById("calorie-input");
let exerciseForm = document.getElementById("exercise-form");
let deleteButton = document.getElementById("delete-button");
let exercise = document.getElementById(`exercise${id}`)
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (location) {
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        map = L.map('map').setView([latitude, longitude], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);



        map.on('click', function (mapE) {
            mapEvent = mapE;
            entryForm.hidden = false;
        })

    }, function () {
        alert("Location was not found...Please enable location")
    })
}

function workoutEx () {
    const today = new Date();
    let day = today.getDate();
    const month = today.toLocaleString('default', { month: 'long' });
        exerciseForm.innerHTML += `

        <form class="exercise ${selectInput.value}-border" id="exercise${id}"> 
        <p class="workout-title">ID: ${id} -  ${selectInput.value} on ${month} ${day}</p>
        <div class="text-exercise">
        <p class="workout-details">🏃<b class="bold-text">${distanceInput.value}</b>MI</p>
        <p class="workout-details">⏱<b class="bold-text">${durationInput.value}</b>MIN</p>
        <p class="workout-details">🔥<b class="bold-text">${calorieInput.value}</b>Calories</p>
        </div>
        </form>
        `
        distanceInput.value = durationInput.value = calorieInput.value = "";
}

doneButton.addEventListener('click', function (e) {
    e.preventDefault();
    workoutEx();
    entryForm.hidden = true;
    deleteButton.hidden = false;

    const { lat, lng } = mapEvent.latlng;
    L.marker([lat, lng, id])
        .addTo(map)
        .bindPopup(L.popup({
            autoClose: false,
            closeOnClick: false,
            className: `${selectInput.value}-custom ${id}`,

        }))
        .setPopupContent(`ID: ${id} - ${selectInput.value} on January 4`)
        .openPopup().on('dblclick', e=>e.target.remove());
        id++;
})
deleteButton.addEventListener('click', function() {
    let idGiven = prompt("Please give the id of workout you want to delete. \nWARNING: You have to mannualy double click on marker to remove!");
    document.getElementById(`exercise${idGiven}`).remove();
})

