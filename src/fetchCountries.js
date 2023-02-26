
const URL = `https://restcountries.com/v3.1/name/`;
const OPTIONS = 'name,capital,population,flags,languages';


export function fetchCountries(name) {
  return fetch(`${URL}/${name}?fields=${OPTIONS}`).then(resolve => {
    if (!resolve.ok) {
      throw new Error('Oops, there is no country with that name');
    }
    return resolve.json();
  });
}