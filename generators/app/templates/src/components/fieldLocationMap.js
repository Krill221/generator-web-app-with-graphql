/*
    Example:

    <FieldLocationMap
        name="location1"
        zoom={17}
        width="400px"
        height="400px"
        value={props.values.location1}
        onChange={props.handleChange}
    />
    
 */

import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import mapStyle from './mapStyle';

const libraries = ["places"];

const options = {
    styles: mapStyle,
    disableDefaultUI: false,
    zoomControl: true,
    enableEventPropagation: false,
    clickableIcons: false
}

let center = { lat: 0, lng: 0 }

export default function FieldLocationMap(props) {

    React.useEffect(() => {
        center = { lat: parseFloat(props.value.coordinates[0]), lng: parseFloat(props.value.coordinates[1]) };
    }, [props.value.coordinates]);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries,
    });

    const [marker, setMarker] = React.useState({ lat: parseFloat(props.value.coordinates[0]), lng: parseFloat(props.value.coordinates[1]) });
    const onMapClick = React.useCallback((e) => {
        props.onChange !== undefined && props.onChange({
            target: { id: `${props.name}_lat`, value: e.latLng.lat().toString() }
        });
        props.onChange !== undefined && props.onChange({
            target: { id: `${props.name}_lng`, value: e.latLng.lng().toString() }
        });
        setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }, [props]);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (<React.Fragment>
        <GoogleMap
            mapContainerStyle={{ width: props.width, height: props.height }}
            options={options}
            center={center}
            zoom={props.zoom}
            onClick={onMapClick}
        >
            <Marker position={marker} />
        </GoogleMap>
    </React.Fragment>
    )
}