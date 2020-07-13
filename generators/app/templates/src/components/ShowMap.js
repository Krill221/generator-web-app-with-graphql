/*
    Example:

    <ShowMap
        zoom={17}
        lat={props.item.lat}
        lng={props.item.lng}
        marker={<div>11</div>}
    />

    
 */
import React from 'react';
import { GoogleMap, LoadScript, OverlayView } from '@react-google-maps/api';
import mapStyle from './mapStyle';


const containerStyle = {
    width: '100%',
    height: 'calc(var(--vh, 1vh) * 30)'
};

const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,
    enableEventPropagation: false,
    clickableIcons: false
}

export default function ShowMap(props) {

    const onLoad = React.useCallback(function callback() { }, []);
    const onUnmount = React.useCallback(function callback() { }, []);
    const center = { lat: parseFloat(props.lat), lng: parseFloat(props.lng) };
    return <LoadScript
                id={'google-maps'}
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    options={options}
                    center={center}
                    zoom={props.zoom}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    <OverlayView
                        position={center}
                        mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                    >
                        {props.marker}
                    </OverlayView>
                </GoogleMap>
            </LoadScript>;
}