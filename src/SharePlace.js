import Modal from "./UI/Modal";
import Map from './UI/Map';
import getCoordsFromAddress, { getAddressFromCoords } from './Utility/geoCoding'

class PlaceFinder extends Map{
    constructor(){
        super();
        const addressForm = document.querySelector('form');
        const locateBtn = document.getElementById('locate-btn');
        const shareBtn = document.querySelector('#share-controls button');

        locateBtn.addEventListener("click", this.findLocationHandler);
        addressForm.addEventListener("click", this.findAddressHandler);
        shareBtn.addEventListener("click", this.copyLinkToClipboard);
    }

    findLocationHandler = () =>{
        if(!navigator.geolocation){
            alert('Geolocation feature not available in your browser. Please try some other browser!!')
            return;
        }
        const loadingModal = new Modal('loading-modal-content', 'Loading Location - Please Wait.....')
        loadingModal.show();
        navigator.geolocation.getCurrentPosition(async position=>{
            loadingModal.hide();
            const coordinates = {
                lat:position.coords.latitude,
                long:position.coords.longitude
            }
            const addressData = await getAddressFromCoords(coordinates);
            const { Address, City, Subregion, Region, CountryCode, Postal } = addressData.address
            let address;
            if(Address){
                address = Address;
            }else{
                address = `${City} ${Subregion} ${Region} ${CountryCode} ${Postal}`;
            }
            // console.log(addressData.address);
            this.shareLocationURL(address, coordinates);
            this.currentLocation(coordinates, "You are here!", true);
        },
        error=>{
            loadingModal.hide();
            console.log(error);
        })
    }

    findAddressHandler = async(e) =>{
        e.preventDefault();
        const addressInput = e.target.parentElement.querySelector('input').value
        if(addressInput){
            const coordsData = await getCoordsFromAddress(addressInput);
            const addressCoords = {
                lat: coordsData.candidates[0].location.y,
                long: coordsData.candidates[0].location.x
            }
        
           this.currentLocation(addressCoords, coordsData.candidates[0].address, false);
           this.shareLocationURL(coordsData.candidates[0].address, addressCoords);
        }
    }

    copyLinkToClipboard = async() => {
        if(!navigator.clipboard){
            alert("Feature not available on your browser. Please copy manually!!");
            return;
        }
        const shareLinkInputEl = document.querySelector('#share-controls input');
        navigator.clipboard.writeText(shareLinkInputEl.value);
        alert("Link Copied!!");
    }

    shareLocationURL = (address, coords) =>{
        const sharableLink = encodeURI(`${location.origin}/my-place?address=${address}&lat=${coords.lat}&long=${coords.long}`);

        const shareControls = document.getElementById('share-controls');
        const shareLinkInputEl = shareControls.querySelector('input');
        const shareLinkBtn = shareControls.querySelector('button');
        shareLinkInputEl.value = sharableLink;

        if(shareLinkInputEl.value.trim()!==0 && shareLinkInputEl.value){
            shareLinkBtn.disabled = false;
        }
    }
}

new PlaceFinder();