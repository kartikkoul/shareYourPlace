import Map from "./UI/Map";

class LoadedPlace{
    constructor(coordinates, address){
        this.render(coordinates, address);
    }

    render(coordinates, address){
        const map = new Map();
        const heading = document.querySelector("header h1");
        map.currentLocation(coordinates, address.trim().length>0?address:"Shared location is here!!", true)
        heading.textContent = address;
    }
}

const url = new URL(location.href);
const params = url.searchParams;
const coordinates = {
    lat:parseFloat(params.get('lat')),
    long:+params.get('long')
}
const address = params.get('address')

new LoadedPlace(coordinates, address);