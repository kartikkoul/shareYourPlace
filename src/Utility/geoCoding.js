import { esri } from "leaflet"

const getCoordsFromAddress = async(address) => {
    const urlAddress = encodeURI(address)
    try {
        const response = await fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?SingleLine=${urlAddress}&outFields=Addr_type&f=pjson`);
        if(response.ok){
            const data = await response.json();
            return data;
        }
    } catch (error) {
        return error
    }
}

export const getAddressFromCoords = async(coords) =>{
    const coordinates = `${coords.long}%2C${coords.lat}`
    try {
        const response = await fetch(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&location=${coordinates}`)
        if(response.ok){
            const data = await response.json();
            return data;
        }else{
            throw Error(data.error.message);
        }
    } catch (error) {
        return error;
    }
}

export default getCoordsFromAddress