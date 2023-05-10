import React, {useEffect, useState} from 'react'
import Input from "../tools/Input";

const COUNTRY_API_URL = 'https://countriesnow.space/api/v0.1/countries';

function ChooseLocation({width = '300px'}) {
    const [location, setLocation] = useLocation();

    const updateCountry = event => setLocation({...location, country: event.target.value})

    return (
        <>
            <Input attributes={{
                type: "text", minLength: 1, maxLength: 60,
                placeholder: "Country", name: "country", list: "idCountryDatalist",
                onChange: updateCountry, style: {width}
            }}
            />

            <datalist id={"idCountryDatalist"}>
                {location.countriesOption}
            </datalist>

            <Input attributes={{
                type: "text", minLength: 1, maxLength: 60, style: {width},
                placeholder: "City", name: "city", list: "idCityDatalist"
            }}/>

            <datalist id={"idCityDatalist"}>
                {location.cities}
            </datalist>
        </>
    )
}

export default ChooseLocation;

async function getLocations() {
    const respond = await fetch(COUNTRY_API_URL);
    const respondData = await respond.json();
    return respondData.data;
}

function getCountryOptions(locations) {
    const options = [];

    let id = 0;
    for (const location of locations) {
        options.push(<option value={location} key={id--}>{location}</option>)
    }

    return options;
}

const locationMap = new Map();

function useLocation() {
    const [location, setLocation] = useState({
        countriesOption: [],
        country: '',
        cities: []
    })

    useEffect(() => {
        getLocations()
            .then(data => {
                let id = 0;
                data.forEach(datum => locationMap.set(datum.country, datum.cities.map(city => <option value={city + ""}
                                                                                                      key={++id}>{city}</option>)))
                setLocation({...location, countriesOption: getCountryOptions(locationMap.keys())})
            })
    }, [])

    useEffect(() => {
        setLocation({...location, cities: locationMap.get(`${location.country}`) ?? []})
    }, [location.country])

    return [location, setLocation]
}