/*
    Example:

    <PickOneMapDialog
            name='posts'
            query={GETS}
            value={''}
            onChange={e => { console.log(e) }}
            markerLabel={(item, index) => `${item.price} ₽`}
            cardMedia={(item, index) => item.picture}
            cardContent={(item, index) => <React.Fragment>
                <Typography variant="subtitle1" >{item.desc.slice(0, 20)}</Typography>
            </React.Fragment>
            }
            cardActions={(item, index) => <React.Fragment>
                <Button color="primary" aria-label="add" className={'choose-button'} href={`/`} >choose</Button>
            </React.Fragment>
            }
            openButton={<div>Map</div>}
    />
    
 */
import React from 'react';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { useQuery } from '@apollo/react-hooks';
import { Chip, Button, Card, CardMedia, CardContent, AppBar, Dialog, Toolbar, IconButton, } from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import mapStyle from './mapStyle';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
}));

function loadScript(src, position, id) {
    if (!position) {
        return;
    }
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

const containerStyle = {
    width: '100%',
    height: 'calc(var(--vh, 1vh) * 100 - 330px)'
};

const options = {
    styles: mapStyle,
    disableDefaultUI: true,
    zoomControl: true,
    enableEventPropagation: false,
    clickableIcons: false
}

export default function PickOneMapDialog(props) {

    const classes = useStyles();
    const [openDialog, setOpenDialog] = React.useState(false);
    const [animate, setAnimate] = React.useState(true);
    const [current, setCurrent] = React.useState({ id: props.value, index: 0 });
    const [center, setCenter] = React.useState({ lat: 0, lng: 0 });

    if (typeof window !== 'undefined') {
        if (!document.querySelector('#google-maps')) {
            loadScript(
                `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places&language=ru`,
                document.querySelector('head'),
                'google-maps',
            );
        }
    }


    const handleNext = () => {
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: items[current.index + 1].id } });
        setAnimate(true);
        setCurrent((prev) => ({ id: items[prev.index + 1].id, index: prev.index + 1 }));
    };
    const handleBack = () => {
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: items[current.index - 1].id } });
        setAnimate(true);
        setCurrent((prev) => ({ id: items[prev.index - 1].id, index: prev.index - 1 }));

    };
    const handleChange = (index) => {
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: items[index].id } });
        setAnimate(Math.abs(index - current.index) < 2);
        setCurrent({ id: items[index].id, index: index });
    };

    const onLoad = React.useCallback(function callback(items) {
        if (items.length > 0) {
            setCenter({
                lat: (items.map(i => parseFloat(i.location.coordinates[0])).reduce((a, b) => a + b) / items.length) + 0.002,
                lng: (items.map(i => parseFloat(i.location.coordinates[1])).reduce((a, b) => a + b) / items.length),
            })
        }
    }, []);
    const onUnmount = React.useCallback(function callback() { }, [])

    const { data, error, loading } = useQuery(props.query, {
        variables: props.query_variables,
        onCompleted(data) {
            if (props.onCompleted !== undefined) props.onCompleted(data);
        }
    });

    if (error) return <p>Error :(</p>;
    if (loading) return null;
    let items = data ? data[Object.keys(data)[0]] : [];
    if (props.hidden !== undefined) items = items.filter(item => !props.hidden.includes(item.id));

    return <React.Fragment>
        <label onClick={() => setOpenDialog(true)} >{props.openButton}</label>
        <Dialog fullScreen open={openDialog}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" aria-label="back" color="inherit" onClick={() => setOpenDialog(false)}>
                        <ArrowBack />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={options}
                center={center}
                zoom={12}
                onLoad={(map) => onLoad(items)}
                onUnmount={onUnmount}
            >
                {
                    items.map((item, index) =>
                        <OverlayView
                            key={index}
                            position={{ lat: item.location.coordinates[0], lng: item.location.coordinates[1] }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                            <Chip
                                onClick={(e) => handleChange(index)}
                                label={props.markerLabel ? props.markerLabel(item, index) : ''}
                                color={current.index === index ? 'secondary' : 'primary'}
                            />
                        </OverlayView>
                    )
                }
            </GoogleMap>
            <React.Fragment>
                <SwipeableViews
                    index={current.index}
                    onChangeIndex={handleChange}
                    enableMouseEvents
                    animateTransitions={animate}
                >
                    {items.map((item, index) => {
                        return <div key={index}>
                            {Math.abs(current.index - index) <= 2 ? (
                                <Card className={classes.root}>
                                    <CardMedia
                                        className={classes.cover}
                                        image={props.cardMedia ? props.cardMedia(item, index) : ''}
                                        title=''
                                    />
                                    <div className={classes.details}>
                                        <CardContent>
                                            {props.cardContent ? props.cardContent(item, index) : ''}
                                        </CardContent>
                                        <div className={classes.controls}>
                                            {props.cardActions ? props.cardActions(item, index) : ''}
                                        </div>
                                    </div>
                                </Card>
                            ) : null}
                        </div>
                    })}
                </SwipeableViews>
                <MobileStepper
                    steps={items.length}
                    position="static"
                    variant="dots"
                    activeStep={current.index}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={current.index === items.length - 1}>
                            Next
                            <KeyboardArrowRight />
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={current.index === 0}>
                            <KeyboardArrowLeft />Back
                        </Button>
                    }
                />
            </React.Fragment>
        </Dialog>
    </React.Fragment>

}