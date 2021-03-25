import React from 'react';
import { GoogleMap, OverlayView, LoadScript } from '@react-google-maps/api';
import { useQuery } from '@apollo/client';
import { Chip, Button, Card, CardMedia, CardContent } from '@material-ui/core';
import mapStyle from '../mapStyle';
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
    chipActive: {
        zIndex: 100,
    },
    chipPassive: {
        zIndex: 1,
    }
}));

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


export default function QueryItems3(props) {

    const classes = useStyles();
    const [animate, setAnimate] = React.useState(true);
    const [current, setCurrent] = React.useState({ id: '', index: 0 });
    const [center, setCenter] = React.useState({ lat: 0, lng: 0 });

    const handleNext = () => {
        setAnimate(true);
        setCurrent((prev) => ({ id: items[prev.index + 1].id, index: prev.index + 1 }));
    };
    const handleBack = () => {
        setAnimate(true);
        setCurrent((prev) => ({ id: items[prev.index - 1].id, index: prev.index - 1 }));

    };
    const handleSwipe = (index) => {
        setAnimate(Math.abs(index - current.index) < 2);
        setCurrent({ id: items[index].id, index: index });
    };

    const handleCardClick = (item) => {
        if (props.onChange !== undefined) props.onChange({ target: { id: props.id, value: item.id } });
    };

    const onLoad = React.useCallback(function callback(items) {
        if (items.length > 0) {
            setCenter({
                lat: (items.map(i => parseFloat(props.locationField(i).coordinates[0])).reduce((a, b) => a + b) / items.length) + 0.002,
                lng: (items.map(i => parseFloat(props.locationField(i).coordinates[1])).reduce((a, b) => a + b) / items.length),
            })
        }
    }, [props]);
    const onUnmount = React.useCallback(function callback() { }, [])

    const { error, data, loading } = useQuery(props.query_where, { variables: props.query_variables });
    if (loading) return null;
    if (error) { console.log(error); return null; }
    let items = data ? data[Object.keys(data)[0]] : [];
    if (props.hidden !== undefined) items = items.filter(props.hidden);

    return <React.Fragment>
        <LoadScript
            id={'google-maps'}
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                options={options}
                center={center}
                zoom={8}
                onLoad={(map) => onLoad(items)}
                onUnmount={onUnmount}
            >
                {
                    items.map((item, index) =>
                        <OverlayView
                            key={index}
                            position={{ lat: props.locationField(item).coordinates[0], lng: props.locationField(item).coordinates[1] }}
                            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                        >
                            <Chip
                                className={current.index === index ? classes.chipActive : classes.chipPassive}
                                onClick={(e) => handleSwipe(index)}
                                label={props.markerLabel ? props.markerLabel(item, index) : ''}
                                color={current.index === index ? 'secondary' : 'primary'}
                            />
                        </OverlayView>
                    )
                }
            </GoogleMap>
        </LoadScript>
        <React.Fragment>
            <SwipeableViews
                index={current.index}
                onChangeIndex={handleSwipe}
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
                                        <React.Fragment>
                                            <Button
                                                color="primary"
                                                aria-label="add"
                                                className={'choose-button'}
                                                onClick={() => { handleCardClick(item) }}
                                            >
                                                {props.addButtonName}
                                            </Button>
                                        </React.Fragment>
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
                        {props.nextButtonName}
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={current.index === 0}>
                        <KeyboardArrowLeft />{props.prevButtonName}
                    </Button>
                }
            />
        </React.Fragment>
    </React.Fragment>;
}