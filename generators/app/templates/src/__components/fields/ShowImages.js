/*
    Example:

    import ShowImages from '../../components/ShowImages';

    <ShowImages
        height={null}
        card={true}
        images={images}
    />
    
 */
import React from 'react';
import { Button, GridList, GridListTile, Dialog, AppBar, Toolbar,
     Container, IconButton, DialogContent, Paper, Avatar, } from '@material-ui/core';
import MobileStepper from '@material-ui/core/MobileStepper';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';


const useStyles = makeStyles((theme) => ({
    root: {
        position: 'relative',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
        zIndex: 10,
        height: 'calc(var(--vh, 1vh) * 100)',
    },
    rootMobile: {
        position: 'relative',
        zIndex: 10,
    },
    rootPC: {
        position: 'relative',
        zIndex: 10,
    },
    gridListPC: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    gridList: {
        margin: 0,
        padding: 0,
        height: 'calc(var(--vh, 1vh) * 100)',
    },
    buttonShowImages: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        zIndex: 10,
    },
    MobileStepper: {
        zIndex: 10,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: '-25px',
        width: '100%',
        height: '10px',
        padding: '0',
        paddingTop: '3px',
    },
    ButtonsStepper: {
        display: 'flex',
        zIndex: 10,
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        position: 'absolute',
        width: '100%',
        height: '10px',
        padding: '0',
        paddingTop: '3px',
    },
    buttons: {
        zIndex: 100,
        opacity: '0.9',
        backgroundColor: 'white',
        color: 'black',
        margin: '6px',
        width: theme.spacing(4),
        height: theme.spacing(4),
    }
}));

export default function ShowImages(props) {

    let cols = 1;
    if (props.images.length > 1) cols = 1.5;

    const theme = useTheme();
    const is_mobile = !useMediaQuery(theme.breakpoints.up('sm'));

    const classes = useStyles();
    const [current, setCurrent] = React.useState(0);
    const [fullscreen, setFullscreen] = React.useState(false);

    const handleChange = (index) => {
        setCurrent(index);
    };

    const handlePrevent = e => {
        e.stopPropagation();
        e.preventDefault();
    };

    const handleNext = e => {
        e.stopPropagation();
        e.preventDefault();
        if (current !== props.images.length - 1)
            setCurrent((prev) => prev + 1);
    };

    const handleBack = e => {
        e.stopPropagation();
        e.preventDefault();
        if (current !== 0)
            setCurrent((prev) => prev - 1);
    };

    const height = props.height ? props.height : 270;

    props.images.forEach((image, index) => {
        if(image === '') {
            props.images[index] = '/defaultImage.jpg';
        }
    });

    return <React.Fragment>
        {is_mobile || props.card === true ?
            <div className={classes.rootMobile}>
                <SwipeableViews
                    index={current}
                    onChangeIndex={handleChange}
                    enableMouseEvents={is_mobile}
                    animateTransitions={true}
                >
                    {props.images.map((item, index) => {
                        return <div key={index}>
                            {Math.abs(current - index) <= 2 ? (
                                <GridList onClick={() => { props.card !== true && setFullscreen(true) }} cellHeight={height} cols={1} style={{ padding: 0, margin: 0 }}>
                                    <GridListTile cols={1} style={{ padding: 0, margin: 0 }} >
                                        <img src={item} alt={index} />
                                    </GridListTile>
                                </GridList>
                            ) : null}
                        </div>
                    })}
                </SwipeableViews>
                {
                    props.images.length > 1 &&
                    <MobileStepper
                        className={classes.MobileStepper}
                        steps={props.images.length}
                        position="static"
                        variant="dots"
                        activeStep={current}
                    />
                }
                {(!is_mobile && props.images.length > 1) &&
                    <div
                        style={{ bottom: `${height / 2}px` }}
                        className={classes.ButtonsStepper}
                        steps={props.images.length}
                        position="static"
                    >
                        <Avatar className={classes.buttons} onClick={handleBack} onMouseDown={handlePrevent} style={{ opacity: (current === 0) ? '0.3' : '0.9' }}>
                            <KeyboardArrowLeft />
                        </Avatar>
                        <Avatar className={classes.buttons} onClick={handleNext} onMouseDown={handlePrevent} style={{ opacity: (current === props.images.length - 1) ? '0.3' : '0.9' }}>
                            <KeyboardArrowRight />
                        </Avatar>
                    </div>
                }

            </div>
            :
            <React.Fragment>
                <Container>
                    <Paper variant="outlined" className={classes.rootPC}>
                        <GridList cellHeight={400} cols={cols} className={classes.gridListPC}>
                            {props.images.map((tile, index) => (
                                <GridListTile key={index} onClick={() => setFullscreen(true)}>
                                    <img src={tile} alt={index} />
                                </GridListTile>
                            ))}
                        </GridList>
                        <Button variant="outlined" className={classes.buttonShowImages} onClick={() => setFullscreen(true)}>{props.showAllName}</Button>
                    </Paper>
                </Container>
            </React.Fragment>
        }

        <Dialog fullScreen open={fullscreen} onClose={() => setFullscreen(false)}>
            <AppBar position="sticky">
                <Toolbar>
                    <IconButton edge="start" aria-label="back" color="inherit" onClick={() => setFullscreen(false)}>
                        <ArrowBack />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent className={classes.root}>
                <GridList cellHeight={window.innerWidth} className={classes.gridList}>
                    {props.images.map((tile, index) => (
                        <GridListTile cols={2} key={index}>
                            <img src={tile} alt={'tile'} />
                        </GridListTile>
                    ))}
                </GridList>
            </DialogContent>
        </Dialog>
    </React.Fragment >
}