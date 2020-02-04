  /**
 * Fetches list of countries with info as of follows:
    name: "Afghanistan"
    topLevelDomain: [".af"]
    alpha2Code: "AF"
    alpha3Code: "AFG"
    callingCodes: ["93"]
    capital: "Kabul"
    altSpellings: (2) ["AF", "Afġānistān"]
    region: "Asia"
    subregion: "Southern Asia"
    population: 27657145
    latlng: (2) [33, 65]
    demonym: "Afghan"
    area: 652230
    gini: 27.8
    timezones: ["UTC+04:30"]
    borders: (6) ["IRN", "PAK", "TKM", "UZB", "TJK", "CHN"]
    nativeName: "افغانستان"
    numericCode: "004"
    currencies: [{…}]
    languages: (3) [{…}, {…}, {…}]
    translations: {de: "Afghanistan", es: "Afganistán", fr: "Afghanistan", ja: "アフガニスタン", it: "Afghanistan", …}
    flag: "https://restcountries.eu/data/afg.svg"
    regionalBlocs: [{…}]
    cioc: "AFG"
 */
export const fetchCountries = () =>
  fetch('https://restcountries.eu/rest/v2/all')
    .then(res => res.json())
    .catch(err => console.log(err));
