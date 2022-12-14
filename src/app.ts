import axios from '../node_modules/axios/index';

const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;

const GOOGLE_API_KEY = 'AIzaSyBnOpgDC9hxo7e4htIrBly5bRF3uDZ3gbs'; // has been instantly invalidated. 


type GoogleMapsResponseObject = {
    results: {
        geometry: {
            location: {
                lat: number; lng: number
            }
        }
    }[]
    status: 'OK' | 'ZERO_RESULTS';
}

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    // fix the entered address to URL compatible string to trim stuff and make it palatable

    // send address to Google Maps API
    axios.get<GoogleMapsResponseObject>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
            enteredAddress)}&key=${GOOGLE_API_KEY}`)
        .then(response => {
            if (response.data.status !== 'OK') {
                throw new Error('Could not fetch location');
            }
            const coordinates = response.data.results[0].geometry.location;
            const map = new google.maps.Map(document.getElementById("map")!, {
                center: coordinates,
                zoom: 12
            });

            new google.maps.Marker({ position: coordinates, map: map });

            console.log(response)
        })
        .catch(err => {
            alert(err.message);
            console.log(err);
        })
}

form.addEventListener('submit', searchAddressHandler);