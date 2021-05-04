export const getBulletPoint = topic => {};

/**
 * Gets a short info string of given topic about countries.
 * @param {obj} topic
 * @param {*} countriesData
 */
export const getCountriesBulletPoint = (topic, countriesData) => {
  const country = getRandomCountry(countriesData);
  let bulletPoint;
  /*
    Random a info string from the data according to the topic, then return it
  */
  switch (topic.code) {
    case 'countries-capitals':
      bulletPoint = `${country.name} - ${country.capital}`;
      break;
    case 'countries-continents':
      bulletPoint = `${country.name} - ${country.region}`;
      break;
    case 'countries-populations':
      const population = country.population + '';
      bulletPoint = `${country.name} - ${population.charAt(
        0
      )} ${population.substring(1).replace(/(.{3})/g, '$1 ')}`;
      break;
    default:
      console.log(
        'ERROR at getCountriesBulletPoint, did not find topic: ',
        topic.code
      );
      break;
  }
  return bulletPoint;
};

/**
 * Gets a random country
 * @param {*} countries data of all countries from api
 */
const getRandomCountry = countries => {
  const index = Math.floor(Math.random() * (countries.length - 1));
  return countries[index];
};
