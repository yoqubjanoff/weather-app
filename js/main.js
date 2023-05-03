const changeLOcation = document.getElementById("change-location")
const card = document.getElementById("card")
const detailes = document.getElementById("detailes")
const weatherIcon = document.getElementById("weather-icon")
const overlay = document.getElementById("overlay")


changeLOcation.city.focus()

function loading(state) {
    if(state){
        overlay.classList.remove('d-none')
    }else{
        overlay.classList.add('d-none')
    }
}

const getWeather = async (city)=>{
    const data = await getData(city)
    return data
}

const updateUi = (city) => {
    console.log(city.weather[0].main);
    detailes.innerHTML =`
    <h5 class="mb-3"> ${city.name}, ${city.sys.country}</h5>
            <p class="mb-2">${city.weather[0].main}</p>
            <div class="display-4 mb-3 ">
                <span class="temp">${Math.round(city.main.temp)}</span><span>&deg;C</span>
            </div>
    `

    if(card.classList.contains("d-none")){
        card.classList.remove("d-none")
    }

    weatherIcon.src = `http://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`
}

changeLOcation.addEventListener("submit", (evt)=>{
    evt.preventDefault()
    const res = changeLOcation.city.value.trim()
    changeLOcation.reset()
    getWeather(res).then((data)=> updateUi(data))
})