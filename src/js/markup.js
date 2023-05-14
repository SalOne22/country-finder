export function getCountryListMarkup(countries) {
  return countries.reduce(
    (markup, country) =>
      markup +
      `
    <li class="country-item">
      <img src="${country.flags.svg}" alt="${country.flags.alt}" width="25">
      <p>${country.name.official}</p>
    </li>`,
    ''
  );
}

export function getCountryMarkup(country) {
  // для южной африки
  const capitals = country.capital.join(', ');

  const languages = Object.values(country.languages).join(', ');

  return `
  <div class="name-wrapper">
    <img src="${country.flags.svg}" alt="${country.flags.alt}" width="50">
    <h2>${country.name.official}</h2>
  </div>
  <div class="info-field">
    <h3>Capital:</h3><p>${capitals}</p>
  </div>
  <div class="info-field">
    <h3>Population:</h3><p>${country.population}</p>
  </div>
  <div class="info-field">
    <h3>Languages:</h3><p>${languages}</p>
  </div>
  `;
}
