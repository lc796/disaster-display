import {GeoJSON, MapContainer, TileLayer} from "react-leaflet";
import countryData from '../../data/countries.json';
import SearchFilter from "./SearchFilter";
import useFetch from "../../hooks/useFetch";
import EONETLayer from "./EONETLayer";

const Map = () => {
    const countries = countryData.features.map((country) => {
        return country;
    });

    const { data: disasters, error } = useFetch("http://127.0.0.1:8000/api/data/");

    const countDisasters = (disasters) => {
        const countryDisasterCounts = {};
        let totalDisasterCount = 0


        for (const country of countries) {
            countryDisasterCounts[country] = 0
        }

        for (const disaster of disasters) {
            totalDisasterCount += 1;
            const country = disaster.country;
            const currentCount = countryDisasterCounts[country];
            if (typeof currentCount === 'undefined') {
                countryDisasterCounts[country] = 1;
                continue;
            }
            countryDisasterCounts[country] = currentCount + 1;
        }

        return {totalDisasterCount, countryDisasterCounts}
    }

    const mapPolygonColorToProportion=(proportion => {
        console.log(proportion)
        return proportion > 0.8 ? '#a50f15' :
            proportion > 0.6 ? '#de2d26' :
            proportion > 0.4 ? '#fb6a4a' :
            proportion > 0.2 ? '#fc9272' :
            '#fee5d9';
    })

    const getCountryStyle = (feature => {
        const country = feature.properties.ADMIN;
        const { totalDisasterCount, countryDisasterCounts } = countDisasters(disasters);
        const proportion = (countryDisasterCounts[country] / totalDisasterCount) * 100;

        return ({
            fillColor: mapPolygonColorToProportion(proportion),
            weight: 1,
            opacity: 1,
            color: 'white',
            dashArray: '2',
            fillOpacity: 0.5
        });
    });

    return (
        <div className="Map">
            <MapContainer center={[51.505, -0.09]} zoom={4} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {countries && disasters && (
                    <GeoJSON data={countries} style={getCountryStyle}/>
                )}
                {disasters &&
                    <EONETLayer data={disasters}/>
                }
            </MapContainer>
            <SearchFilter />
        </div>
    )
}

export default Map;