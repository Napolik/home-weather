class Pogoda extends HTMLElement {
  constructor() {
    super();

    this.apiKey = '684b99a189cf9da6a0e031c98a2afadb';
    this.lat = 49.444431;
    this.lon = 32.059769;
    this.target = `https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric&lang=ua`;

    this.setHourlyBackground();
    this.getData();
  }

  setHourlyBackground() {
    const d = new Date();
    const hour = d.getHours();

    this.querySelector('.wrapper').classList.add('g' + hour);
  }

  getData() {
    fetch(this.target)
      .then(response => response.json())
      .then(data => this.showData(data))
  }

  showData(data) {
    const { name, main, wind, weather, sys, dt } = data;
    const sunset = new Date(dt);
    const sunrise = new Date(sys.sunrise);

    this.querySelector('.name').innerHTML = name;
    this.querySelector('.temp').innerHTML = main.temp + '°C';
    this.querySelector('.weather').innerHTML = weather[0].description + '<br/>' + weather[0].icon;
    this.querySelector('.sunset').innerHTML = 'Схід:<br/>' + sunset;
    this.querySelector('.sunrise').innerHTML = 'Захід:<br/>' + sunrise;
    this.setWindArrow(wind.deg, wind.speed);
  }

  setWindArrow(deg, speed) {
    this.querySelector('.wind-speed').innerHTML = speed + ' м/с';
    this.querySelector('.arrow').style.transform = 'rotate(' + (deg-270) + 'deg)';
  }

}

customElements.define('pogoda-ck', Pogoda);
