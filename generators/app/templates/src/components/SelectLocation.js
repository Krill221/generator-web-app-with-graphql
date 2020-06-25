/*
    Example:

    <SelectLocation
        latName="lat"
        lngName="lng"
        zoom={17}
        latInit={props.item.lat}
        lngInit={props.item.lng}
        latValue={props.values.lat}
        lngValue={props.values.lng}
        onChange={props.handleChange}
    />
    
 */
import React from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import mapStyle from './mapStyle';

const libraries = ["places"];
const containerStyle = {
    width: '100%',
    height: 'calc(var(--vh, 1vh) * 40)'
};

const options = {
    styles: mapStyle,
    disableDefaultUI: false,
    zoomControl: true,
    enableEventPropagation: false,
    clickableIcons: false
}

let center = { lat: 0, lng: 0 }

export default function SelectLocation(props) {

    React.useEffect(() => {
        center = { lat: parseFloat(props.latInit), lng: parseFloat(props.lngInit) };
    }, [props.latInit, props.lngInit]);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
        libraries,
    });

    const [marker, setMarker] = React.useState({ lat: parseFloat(props.latInit), lng: parseFloat(props.lngInit) });
    const onMapClick = React.useCallback((e) => {
        props.onChange !== undefined && props.onChange({
            target:
                { id: props.latName, value: e.latLng.lat().toString() }
        });
        props.onChange !== undefined && props.onChange({
            target:
                { id: props.lngName, value: e.latLng.lng().toString() }
        });
        setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }, [props]);

    if (loadError) return "Error";
    if (!isLoaded) return "Loading...";

    return (<React.Fragment>
        <input id={props.latName} name={props.latName} type='hidden' value={props.latValue} />
        <input id={props.lngName} name={props.lngName} type='hidden' value={props.lngValue} />
        <GoogleMap
            mapContainerStyle={containerStyle}
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