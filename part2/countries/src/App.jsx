import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Weather = ({weather}) => {
  if (weather) {
    const weatherId = weather.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${weatherId}@2x.png`

    return (
      <>
        <div>
          temperature {weather.main.temp} Celcius
          <br />
          <img src={iconUrl}></img>
          <br />
          wind {weather.wind.speed} m/s
        </div>
      </>
    )
  }

  return null
}

const Detail = ({country, weather}) => {
  const langs = Object.values(country.languages)
  
  return (
    <>
    <h1>{country.name.common}</h1>
    <div>
      capital {country.capital}
      <br></br>
      area {country.area}
    </div>
    <h3>languages:</h3>
    <div>
      <ul>
        {langs.map(lang => <li key={lang}>{lang}</li>)}
      </ul>
    </div>
    <img src={country.flags.png} alt={country.flags.alt}></img>

    <h2>Weather in {country.capital}</h2>
    <Weather weather={weather}></Weather>
    </>
  )
}

const Display = ({filter, countries, handleClick, weather}) => {
  if (filter === '') {
    return null
  }

  else if (countries.length === 1) {
    return <Detail country={countries[0]} weather={weather}></Detail>
  }

  else if (countries.length < 10) {
    return (
      countries.map(c => {
        return (
          <div key={c.name.common}>
            {c.name.common} 
            <button onClick={() => handleClick(c.name.common)}>show</button>
          </div>
        )
      })
    )
  }

  else  {
    return (<div>Too many matches, specify another filter</div>)
  }
}

const App = () => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [showCountry, setShowCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const [singleDisplay, setSingleDisplay] = useState(false)

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    setShowCountry(null)
    setWeather(null)
    setSingleDisplay(false)
  }

  const handleShow = (name) => {
    setShowCountry(countries.filter(c => c.name.common === name))
    setSingleDisplay(true)
  }

  useEffect(() => {
    countryService
      .getAll()
      .then(initialCountries => setCountries(initialCountries))
  }, [])

  // useEffect(() => {
  //   console.log('weather effect')
  //   if (showCountry || countriesToShow.length === 1) {
  //     console.log('fetching weather')
  //     const [lat, lng] = countriesToShow[0].latlng
  //     countryService
  //       .getWeather(lat, lng)
  //       .then(weatherResponse => setWeather(weatherResponse))
  //   }
  // }, [filter])

  useEffect(() => {
    if (singleDisplay && showCountry != null) {
      // console.log('hxxxxxx')
      // console.log(showCountry)
      setSingleDisplay(true)
      const [lat, lng] = showCountry[0].latlng
      countryService
        .getWeather(lat, lng)
        .then(weatherResponse => setWeather(weatherResponse))
    } 

    else if (countriesToShow.length === 1) {
      setSingleDisplay(true)
      console.log('single display' + singleDisplay)
      const [lat, lng] = countriesToShow[0].latlng
      countryService
        .getWeather(lat, lng)
        .then(weatherResponse => setWeather(weatherResponse))
    }
  }, [filter, showCountry])

  const countriesToShow = (filter.length === 0) ? countries
    : (showCountry) ? showCountry
    : countries.filter(c => {
    const lowerFilter = filter.toLowerCase()
    const lowerName = c.name.common.toLowerCase()
    return (lowerName.includes(lowerFilter))
  })
  
  // const countriesToShow = filter.length === 0 ? countries : (
  //   showCountry ? showCountry : countries.filter(c => 
  //     c.name.common.toLowerCase().includes(filter.toLowerCase())
  //   )
  // )

  // console.log(weather)
  // if (showCountry) {
  //   console.log(showCountry)
  // }
  // else if (countriesToShow.length === 1) {
  //   console.log('cleng=1')
  //   console.log(countriesToShow)
  // }

  return (
    <>
    <div>
      find countries
      <input value={filter} onChange={handleFilterChange}></input>
      <Display filter={filter} countries={countriesToShow} handleClick={handleShow} weather={weather}></Display>
    </div>
    </>
  )
}

export default App
