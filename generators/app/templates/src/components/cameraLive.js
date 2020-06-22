/*
    Example:
    <CameraLive iwidth={640} iheight={360} camera_url={url} />
 */
import React from 'react';

export default function CameraLive(props) {
    return <img id={props.id} alt={props.alt} width={props.iwidth} height={props.iheight} src={props.camera_url + "/?action=stream"} scrolling="no" frameBorder="0" marginWidth="0" marginHeight="0" style={{"visibility": "visible"}} />
}