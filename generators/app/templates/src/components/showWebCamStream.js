/*
    Example:

    <ShowWebCamStream
        name="uid"
        username={item.name}
        value={item.uid}
    onChange={e => { }}
    />  

*/

import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import { AuthContext } from '../auth';
import { AuthArea } from '../components/authArea';
import Webcam from "react-webcam";
import { Button, Paper } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import Peer from 'peerjs';


const useStyles = makeStyles((theme) => ({
    camera: {
        objectFit: 'cover',
        width: '100%',
        height: '100%'
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
}));

const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user"
};

export default function ShowWebCamStream(props) {

    const classes = useStyles();
    const { user } = useContext(AuthContext);
    const webcamRef = React.useRef(null);
    const partnerCamRef = React.useRef(null);
    const [online, setOnline] = React.useState(0);

    const is_mine = user && (user.id === props.value);

    useEffect(() => {
        var interval = null;
        const peer = is_mine ? new Peer(user.id) : new Peer();
        if (user) {
            var call = null;
            var call_conn = null;
            var connect_to_host = null;
            console.log('useEffect');

            peer.on('error', function (err) {
                console.log(err.type);
                if (err.type === 'unavailable-id') {

                } else {
                    if (err.type === 'peer-unavailable') {
                        setTimeout(() => {
                            sendId();
                        }, 2000);
                    } else {
                        console.log('peer error');
                    }
                }
            });

            peer.on('disconnected', function () {
                console.log('disconnected');
            });

            peer.on('close', function () {
                console.log('close');
            });

            peer.on('open', function () {
                console.log('open id:' + peer.id + ' ' + (is_mine ? 'mine' : 'guest'));
                if (user.id !== props.value && props.value !== '') {
                    //setInterval( () => {
                    sendId();
                    //}, 20000);
                }
            });

            peer.on('call', function (media) {
                console.log('answering call... from: ' + media.peer);

                media.answer(media.remoteStream);
                media.on('stream', function () {
                    console.log('render remote stream');
                    try {
                        partnerCamRef.current.srcObject = media.remoteStream;
                    } catch (e) {
                        console.log(e);
                    }
                });
                media.on('close', function () {
                    console.log('close media stream');
                });
                media.on('error', function () {
                    console.log('error media stream');
                });

            });

            peer.on('connection', function (conn) {
                call_conn = conn;
                call_conn.on('data', function (data) {
                    var remotePeerId = data;
                    call_conn.send('echo1');
                    if (data === 'echo2') {
                        //console.log('echo2');
                        return;
                    }
                    console.log(peer.id + ' got remote id from: ', remotePeerId);
                    setTimeout(() => {
                        if (webcamRef) {
                            if (webcamRef.current) {
                                console.log('calling to ... ' + remotePeerId);
                                call = peer.call(remotePeerId, webcamRef.current.stream);
                                if (call) {
                                    call.on('stream', function () {
                                        console.log('answered');
                                    });
                                    call.on('error', function (err) {
                                        console.log(err);
                                    });
                                    call.on('close', function () {
                                        console.log('close guestcall');
                                    });
                                }
                            }
                        }
                    }, 5000);

                });
            });


            function sendId() {
                var remotePeerId = props.value;
                connect_to_host = peer.connect(remotePeerId);
                if (connect_to_host) {
                    connect_to_host.on('open', function () {
                        console.log('sending my id to: ' + remotePeerId);
                        connect_to_host.send(peer.id);
                    });
                    connect_to_host.on('data', function (data) {
                        console.log(data);
                        if (data === 'echo1') {
                            setOnline(1);
                        } else {
                            setOnline(0);
                        }
                    });
                    connect_to_host.on('error', function (err) {
                        try {
                            console.log('send error');
                            setOnline(0);
                            connect_to_host.close();
                            sendId();
                        } catch (e) {
                            console.log(e);
                        }
                    });
                    connect_to_host.on('close', function () {
                        if (connect_to_host) connect_to_host.close();
                        console.log('resend guest id');
                        sendId();
                    });
                } else {
                    console.log('connect_to_host is null');
                }
            }

            if (interval) clearInterval(interval);
            interval = setInterval(() => {
                if (connect_to_host) {
                    connect_to_host.send('echo2');
                    console.log(connect_to_host.open);
                }
            }, 2000);

            return () => {
                if (interval) clearInterval(interval);
                if (call_conn) call_conn.send('exit');
                if (call_conn) call_conn.close();
                if (call) call.close();
                if (connect_to_host) connect_to_host.close();
                console.log("destroy my peer");
                peer.disconnect();
                peer.destroy();
            };
        }

    }, [props.value, user, is_mine]);

    useEffect(() => {
        if (props.value === '') {
            props.onChange !== undefined && props.onChange({
                target: {
                    id: `${props.name}`, value: user.id
                }
            });
        }
    });

    return <AuthArea
        publicArea={
            <React.Fragment>
                <Paper style={{ height: '240px' }} variant="outlined" square ></Paper>
                <Button >Sign In</Button>
            </React.Fragment>
        }
        privateArea={<React.Fragment>
            {
                is_mine ? <Webcam
                    className={classes.camera}
                    audio={true}
                    height={720}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={1280}
                    videoConstraints={videoConstraints}
                />
                    :
                    (online === 1) ?
                        <video className={classes.camera} autoPlay ref={partnerCamRef}></video>
                        :
                        <PersonIcon
                            className={classes.media}
                        />
            }
            <Button
                fullWidth
                disabled
                size="small"
                startIcon={<FiberManualRecordIcon style={(is_mine || (online === 1)) ? { color: '#4caf50' } : { color: '#f44336' }} />}
            >
                {(!user ? '' : props.username) + ' - ' + (is_mine ? 'my camera' : (online === 1) ? 'online' : 'offline')}
            </Button>

        </ React.Fragment >}
    />;
}