import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.getElementById('search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

let inputValue = '';

input.addEventListener('input', debounce(onLookingForCountry, DEBOUNCE_DELAY));

function onLookingForCountry(event) {
    inputValue = event.target.value.trim();
  
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
  
    if (inputValue.length === 0) return;
  
    fetchCountries(inputValue)
      .then(country => markupSelectionCountries(country))
      .catch(onFetchError);
  }

  function markupSelectionCountries(country) {
    if (country.length === 1) {
      createMarkupCountryInfo(country);
    } else if (country.length > 1 && country.length <= 10) {
      createMarkupCountries(country);
    } else {
      onFetchInfo();
    }
  }
  function onFetchInfo() {
    Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
  }
function onFetchError() {
    Notiflix.Notify.failure('Oops, there is no country with that name');
  }

function createMarkupCountryInfo(arr) {
    const markup = arr
      .map(({ name, flags, capital, population, languages }) => {
        return `<div class ="countries">
      <img src="${flags.svg}" alt="${flags.alt}" width="40" heigth="30">
      <h2>${name.official}</h2>
      </div>
      <p><span>Capital:</span> ${capital}</p>
      <p><span>Population:</span> ${population}</p>
      <p><span>Languages:</span> ${Object.values(languages).join(
        '',
        ''
      )}</p>`;
      })
      .join('');
  
    countryInfo.innerHTML = markup;
  }
  function createMarkupCountries(arr) {
    const markup = arr
      .map(({ name, flags }) => {
        return `<li class ="countries">
      <img  src="${flags.svg}" alt="${flags.alt}" width="40" heigth="30">
      <h2>${name.official}</h2>
      </li>`;
      })
      .join('');
  
    countryList.innerHTML = markup;
  }