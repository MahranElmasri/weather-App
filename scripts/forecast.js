const key = "4VYzPzCC8oISg2bfJVnR3K1oRYMe2bAz";
//get weather info
const getWeather = async id => {
  const url = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(url + query);
  const data = await response.json();
  return data[0];
};

//get city info
const getCity = async city => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};
