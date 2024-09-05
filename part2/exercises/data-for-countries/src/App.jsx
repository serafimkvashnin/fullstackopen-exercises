import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filteredCountries, setFilteredCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [showBack, setShowBack] = useState(false)
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

  useEffect(() => {
    axios
      .get(`${baseUrl}/all`)
      .then(response => {
        setCountries(response.data)
        setFilteredCountries(response.data)
      })
  }, [])

  const handleFilterInput = (event) => {
    setShowBack(false)
    setFilter(event.target.value)
    setFilteredCountries(
      getFilteredCountries(event.target.value)
    )
  }

  const handleCountrySelect = (country) => {
    axios
      .get(`${baseUrl}/name/${country.name.common.toLowerCase()}`)
      .then(response => {
        setFilteredCountries([response.data])
        setShowBack(true)
      })
  }

  const handleBackClick = () => {
    setFilteredCountries(getFilteredCountries(filter))
    setShowBack(false)
  }

  const getFilteredCountries = (filter) => 
    countries.filter(c => 
      c.name.common.toLowerCase().includes(filter.toLowerCase()))
  
  if (!countries) {
    return null
  }

  return (
    <>
      <CountriesSearch onInput={handleFilterInput} />
      { showBack && <button onClick={handleBackClick}>back</button>}
      <CountriesView 
        countries={filteredCountries}
        onCountrySelected={handleCountrySelect}
      />
    </>
  )
}

const CountriesSearch = ({ onInput }) => (
  <p>
    find countries
    <input onChange={onInput} />
  </p>
)

const CountriesView = ({ countries, onCountrySelected }) => { 
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (countries.length > 1) {
    return <CountriesList 
      countries={countries}
      onCountrySelected={onCountrySelected}
    />
  } else if (countries.length == 1) {    
    return <CountryDetailed country={countries[0]} />
  }

  return <p>No countries found, try different filter</p>
}

const CountriesList = ({ countries, onCountrySelected }) => <ul>
  {countries.map(country => 
    <li key={country.name.common}>
      {country.name.common}
      <button onClick={() => onCountrySelected(country)}>show</button>
    </li>
  )}
</ul>

const CountryDetailed = ({ country }) => <div>
  <h1>{country.name.common}</h1>
  {country.capital.map(capital => (
    <p key={capital}>
      capital {capital}
    </p>
  ))}
  <p>area {country.area}</p>
  <h3>languages:</h3>
  <ul>
  {Object.values(country.languages).map(language => 
    <li key={language}>{language}</li>
  )}
  </ul>
  <img style={{border: "solid"}}src={country.flags.png}></img>
  {country.capital.map(capital => (
    <CityWeather city={capital} />
  ))}
  
</div>

const CityWeather = ({ city }) => {
  const [forecast, setForecast] = useState(null)
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`

  useEffect(() => {
    axios
      .get(forecastUrl)
      .then(response => {
        setForecast(response.data)
      })
  }, [forecastUrl])

  if (!forecast) {
    return null
  }

  const currentForecast = forecast.list[0]
  return (
    <div>
      <h2>Weather in {city}</h2>
      <p>{currentForecast.weather[0].description}</p>
      <p>temperature {currentForecast.main.temp} Fahrenheit</p>
      <img src={`http://openweathermap.org/img/wn/${currentForecast.weather[0].icon}.png`}/>
      <p>wind {currentForecast.wind.speed} m/s</p>
    </div>
  )
}

export default App
