import axios from 'axios';

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api';
const allCountriesUrl = `${baseUrl}/all`;
const countryByNameUrl = `${baseUrl}/name`;

const getCountry = (name) =>
  axios.get(`${countryByNameUrl}/${name}`).then((res) => res.data);

const getAllCountries = () =>
  axios.get(allCountriesUrl).then((res) => res.data);

export default { getCountry, getAllCountries };
