export default class Map {
    constructor(){
        this.mapCanvas = document.getElementById('map')
        this.render();
    }

    render(){
        if(!L){
            return
        }
        
        this.map = L.map('map',{
            center:[28.6139, 77.2090], 
            zoom:10,
            attributionControl:false,
        }).addLayer(
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        );
    }

    currentLocation(coords, message, zoom){
        const latLong = [coords.lat, coords.long];
        zoom?this.map.setView(latLong).zoomIn(12):this.map.setView(latLong);
        this.mapCanvas.scrollIntoView({
            behavior:'smooth'
        })
        L.marker(latLong).addTo(this.map)
            .bindPopup(message)
            .openPopup();
    }
}