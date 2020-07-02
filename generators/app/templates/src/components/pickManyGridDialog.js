/*
    Example:

    <PickManyGridDialog
        name='posts'
        query_where={GET_POSTS_WHERE}
        query_from={GET_POSTS}
        query_from_variables={}
        value={props.values.posts}
        onChange={e => { props.handleChange(e); if (props.values.id !== 'new') { setSave(false); props.submitForm(); } }}
        cardMedia={(item, index) => ''}
        cardContent={(item, index) =>
            <Typography variant="body2" color="textSecondary" component="p">{item.name}</Typography>
        }
        cardActions={(item, index) =>
            <Typography variant="body2" color="textSecondary" component="p">{item.name}</Typography>
        }
        pick_card_title='name'
        pick_card_subheader='name'
        pick_card_img='img'
        dialogName="Comment"
        addButtonName="Add Comment"
        deleteButton='each' // can be 'each', 'last', 'none'
    />

 */
import React from 'react';
import {
    Grid, Container, Card, CardMedia, CardContent,
    IconButton, CardActions,
    Dialog, Button, AppBar, Toolbar, Typography
} from '@material-ui/core';
import ArrowBack from '@material-ui/icons/ArrowBack';
import PickOneGrid from './pickOneGrid';
import QueryGrid from './queryGrid';


export default function PickManyGridDialog(props) {

    const [openPick, setOpenPick] = React.useState(false);
    const handlePickDialogOpen = () => { setOpenPick(true); };
    const handlePickDialogClose = () => { setOpenPick(false); };

    const handleDelete = (id) => {
        const value = props.value.filter(i => i !== id);
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });

    }

    const handlePick = (e) => {
        const value = props.value.concat(e.target.value);
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
        handlePickDialogClose();
    }

    return (
        <React.Fragment>
            <Grid container spacing={2} justify="center" alignItems="center">
                <Grid item xs={12} sm={12} md={12} >
                    <QueryGrid name={props.name}
                        query={props.query_where}
                        query_variables={{ ids: props.value }}
                        renderItem={(item, index) => <Card>
                            {
                                props.cardMedia &&
                                <CardMedia
                                    component="img"
                                    alt=""
                                    height="140"
                                    image={props.cardMedia ? props.cardMedia(item, index) : ''}
                                    title=""
                                />
                            }
                            <CardContent>
                                {props.cardContent ? props.cardContent(item, index) : ''}
                            </CardContent>
                            <CardActions>
                                {props.cardActions ? props.cardActions(item, index) : ''}
                                {(props.deleteButton === 'each') &&
                                    <Button aria-label="delete" size="small" color="secondary" className={`delete-${props.name}`} onClick={() => handleDelete(item.id)} >delete</Button>
                                }
                                {(props.deleteButton === 'last' && (index === 0)) &&
                                    <Button aria-label="delete" size="small" color="secondary" className={`delete-${props.name}`} onClick={() => handleDelete(item.id)} >delete</Button>

                                }
                            </CardActions>
                        </Card>
                        }
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={12} >
                    <Button className={`add-${props.name}`} onClick={handlePickDialogOpen} fullWidth variant="contained" >{props.addButtonName ? props.addButtonName : 'pick'}</Button>
                </Grid>
            </Grid>
            <Dialog fullScreen open={openPick} onClose={handlePickDialogClose}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" aria-label="back" color="inherit" onClick={handlePickDialogClose}>
                            <ArrowBack />
                            {
                                props.dialogName &&
                                <Typography noWrap variant="h6">{props.dialogName}</Typography>
                            }
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container>
                    <PickOneGrid
                        query={props.query_from}
                        query_variables={props.query_from_variables}
                        id='item-choose'
                        value={props.value}
                        hidden={props.value}
                        onChange={handlePick}
                        title={props.pick_card_title}
                        subheader={props.pick_card_subheader}
                        img={props.pick_card_img}
                        button_name={props.pick_card_button_name}
                    />
                </Container>
            </Dialog>
        </React.Fragment>
    );
}