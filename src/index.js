import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './js/fetchCountries';
import { countryInfo, countryList, searchBox } from './js/refs';

import './css/styles.css';
import { getCountryListMarkup, getCountryMarkup } from './js/markup';

const DEBOUNCE_DELAY = 300;

window.addEventListener('DOMContentLoaded', init);

function init() {
  searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
}

function onSearch(evt) {
  const searchQuery = evt.target.value.toLowerCase().trim();

  if (searchQuery === '') {
    clearMarkup();

    return;
  }

  getCountries(searchQuery);
}

function getCountries(name) {
  fetchCountries(name).then(handleCountries).catch(onError);
}

function handleCountries(countries) {
  clearMarkup();

  if (countries.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }

  if (countries.length === 1) {
    renderCountry(countries[0]);
    return;
  }

  renderCountries(countries);
}

function renderCountry(country) {
  const markup = getCountryMarkup(country);

  countryInfo.innerHTML = markup;
}

function renderCountries(countries) {
  const markup = getCountryListMarkup(countries);

  countryList.innerHTML = markup;
}

function clearMarkup() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function onError(error) {
  const message =
    error.message === 'Not Found'
      ? 'Oops, there is no country with that name'
      : error.message;

  Notify.failure(message);
}
