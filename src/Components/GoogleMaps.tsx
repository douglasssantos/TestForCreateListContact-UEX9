import React from 'react';
import {apiKeyGoogleMaps} from "../Config.ts"

import {
    AdvancedMarker,
    APIProvider,
    Map,
    Pin
} from '@vis.gl/react-google-maps';
import {GoogleMapsProps} from "../Types";

const API_KEY = apiKeyGoogleMaps;

const GoogleMaps = ({fullname, lat, long, zoom} : GoogleMapsProps) => {
    return (
        <APIProvider apiKey={API_KEY}>
            <Map
                mapId={'bf51a910020fa25a'}
                style={{width: '100vw', height: '100vh', marginLeft: 300}}
                gestureHandling={'greedy'}
                disableDefaultUI
                zoom={zoom || 3}
                center={{lat: lat || 22.54992, lng: long || 0}}
            >
                { (lat && long) &&
                    <AdvancedMarker
                        position={{lat: lat || 22.54992, lng: long || 0}}
                        title={fullname}>
                        <Pin
                            background={'#22ccff'}
                            borderColor={'#1e89a1'}
                            glyphColor={'#0f677a'}></Pin>
                    </AdvancedMarker>
                }
            </Map>
        </APIProvider>
    );
};

export default GoogleMaps;

