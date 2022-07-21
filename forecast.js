const key = "	oh3D7q4LLj4blA68mOBbM4x52f0xbKwY";
const getCity = async (city) => {
    const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
    const query = `?apikey=${key}&q=${city}`;
   0// console.log(base+query);
    const response = await fetch(base + query);
    const data = await response.json();
    
    return data[0];
    
};
const getWeather = async (id) => {
    const base = `http://dataservice.accuweather.com/currentconditions/v1/`;
    const query = `${id}?apikey=${key}`
    const response = await fetch(base + query);
    const data = await response.json();
    return data[0];
}