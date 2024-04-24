
import {
    Stack
} from "@mui/material";
import ListContacts from "../Components/ListContacts.tsx";
import GoogleMaps from "../Components/GoogleMaps.tsx";
import {useState} from "react";
import {Contact, GoogleMapsProps} from "../Types";

let intervalMap = null
let zoomMap = 3

const Contacts = () => {

    const [map, setMap]: GoogleMapsProps = useState({zoom: 3});
    const [zoom, setZoomMap]: number = useState(3);

    const setZoom = () => {

        if(intervalMap === null){

            intervalMap = setInterval(() => {

                if(zoomMap >= 19){

                    clearInterval(intervalMap);
                    return false;

                }

                zoomMap++;

                setZoomMap(zoomMap)

            }, 200);

        }

    }

    const handleUpdateGoogleMaps = (contact: Contact) => {

        zoomMap = 3

        setMap({
            fullname: contact.fullname,
            lat: contact.location?.lat,
            long: contact.location?.long,
            zoom: 3,
        });

        setZoom();

    }

    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2} style={{margin:0}}>

            <GoogleMaps
                lat={map.lat}
                long={map.long}
                zoom={zoom}
            />

            <ListContacts
                style={{margin:0}}
                onSelectedContact={handleUpdateGoogleMaps}

            />

        </Stack>
);
}

export default Contacts;