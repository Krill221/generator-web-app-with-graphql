/*
<AuthArea
    publicArea={
        <div>1</div>
    }
    privateArea={
        <div>2</div>}
/>
*/
import React, { useRef } from 'react';
import FieldLocationText from './fieldLocationText';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
    Button, Dialog, Container, Toolbar, Typography, IconButton, Grid, Paper, Divider, DialogContent, DialogActions
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBack from '@material-ui/icons/ArrowBack';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import TopAppBar from './topAppBar';


const useStyles = makeStyles((theme) => ({
    paper: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        width: '100%',
    },
    divider: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },

    filter: {
        fontWeight: 'bolder'
    },
    filterAction: {
        marginBottom: theme.spacing(2),
    },
    filterHeader: {
        marginBottom: theme.spacing(2),
    }

}));


export const FieldSearch = (props) => {
    //const [text, setText] = React.useState('Поиск');
    const [value, setValue] = React.useState({ target: { name: props.name, value: props.value } });
    const [main, setMain] = React.useState(false);
    const [filter, setFilter] = React.useState(false);
    const classes = useStyles();
    let placeInput = useRef(null);
    const theme = useTheme();
    const is_mobile = !useMediaQuery(theme.breakpoints.up('sm'));

    const handleOpenMain = () => {
        placeInput.current.click();
    }

    const handleChangeMain = e => {
        props.onChangeMain && props.onChangeMain(e);
        (is_mobile && !filter) && props.onChange && props.onChange(e);
        setValue(e);
        setMain(false);
        !is_mobile && setFilter(true);
        //console.log(e);
    }
    const handleChangeFilter = e => {
        setFilter(false);
        props.onChangeFilter && props.onChangeFilter(e);
        props.onChange && props.onChange(value);
    }
    const handleChange = e => {
        props.onChange && props.onChange(value);
    }
    return <React.Fragment>
        <Paper variant="outlined" className={classes.paper}>
            <Grid container spacing={1}>
                <Grid item xs={8} sm={is_mobile ? 9 : 7} md={is_mobile ? 9 : 7}>
                    <Button
                        fullWidth
                        onClick={() => setMain(true)}
                        startIcon={<SearchIcon />}
                    >{props.placeName ? `${props.placeName.slice(0, 16)}...` : props.placeHolder}
                    </Button>
                </Grid>
                <Grid item xs={4} sm={3} md={3}>
                    <Button
                        className={classes.filter}
                        fullWidth
                        endIcon={<MenuOpenIcon />}
                        onClick={() => setFilter(true)} >Фильтр</Button>
                </Grid>
                {!is_mobile &&
                    <Grid item xs={1} sm={2} md={2}>
                        <Button
                            fullWidth
                            variant='contained'
                            color='secondary'
                            startIcon={<SearchIcon />}
                            onClick={handleChange} >Поиск</Button>

                    </Grid>
                }
            </Grid>
        </Paper>
        <Dialog fullScreen open={main} onEntering={handleOpenMain}>
            <TopAppBar position="sticky" className={classes.appbar} >
                <Toolbar>
                    <IconButton edge="start" aria-label="back" color="inherit" onClick={() => setMain(false)}>
                        <ArrowBack />
                    </IconButton>
                </Toolbar>
            </TopAppBar>
            <Container>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item xs={12} sm={12} md={12}></Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <FieldLocationText
                            label="Место"
                            margin='normal'
                            variant="outlined"
                            name={props.name}
                            placeName={props.placeName}
                            value={props.value}
                            zoom={17}
                            ref={placeInput}
                            onChange={handleChangeMain}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}></Grid>
                </Grid>
            </Container>
        </Dialog>
        <Dialog fullScreen open={filter} scroll={'paper'}>
            <TopAppBar position="sticky" className={classes.appbar} >
                <Toolbar>
                    <IconButton edge="start" aria-label="back" color="inherit" onClick={() => setFilter(false)}>
                        <ArrowBack />
                    </IconButton>
                </Toolbar>
            </TopAppBar>
            <DialogContent>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography variant="h5" component="h2" className={classes.filterHeader}>Фильтры</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Paper elevation={2} variant="outlined" className={classes.paper}>
                            <Grid container spacing={1} alignItems="flex-end">
                                <Grid item xs={12} sm={12} md={12}>
                                    <Button
                                        fullWidth
                                        onClick={() => setMain(true)}
                                        startIcon={<SearchIcon />}
                                    >{props.placeName ? `${props.placeName.slice(0, 16)}...` : props.placeHolder}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Divider className={classes.divider} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        {props.filterArea(props)}
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    className={classes.filterAction}
                    id='filterRun'
                    fullWidth
                    color='secondary'
                    size="large"
                    variant='contained'
                    onClick={handleChangeFilter} >Поиск</Button>
            </DialogActions>
        </Dialog>
    </React.Fragment>
}