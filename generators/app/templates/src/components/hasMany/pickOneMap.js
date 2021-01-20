/*
    Example:

    <PickOneMap
                    name={'comments'}
                    viewType='grid' // can be grid list table
                    query_where={GETS_WHERE}
                    query_variables={{ ids: props.values.comments }}
                    query_from={GETS}
                    value={props.values.comments}
                    headers={headers}
                    superTableOptions={superTableOptions}
                    onChange={e => { props.handleChange(e); props.submitForm(); }}
                    elementContent={(item, index) => {
                        // list
                        return <React.Fragment>
                            <CardHeader
                                avatar={<Avatar src={''}></Avatar>}
                                action={''}
                                title={item.text}
                                subheader=""
                            />
                        </React.Fragment>

                    }}
                    locationField={i => i.location1}
                    markerLabel={(item, index) => `${item.text}`}
                    cardMedia={(item, index) => item.text}
                    cardContent={(item, index) => <React.Fragment>
                        <Typography variant="subtitle1" >{item.text.slice(0, 20)}</Typography>
                    </React.Fragment>
                    }
                    addButtonName={`${theme.props.components.Choose} Comment`}
                    prevButtonName={theme.props.components.Prev}
                    nextButtonName={theme.props.components.Next}
                />
    
 */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Grid } from '@material-ui/core';
import DialogFullScreen from '../views/dialogFullScreen';
import QueryItems from '../views/viewItems';
import QueryItems3 from './queryItems3';

export default function PickOneMapDialog(props) {

    const [openDialog, setOpenDialog] = React.useState(false);

    const handlePickDialogOpen = () => {
        const value = [];
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
        setOpenDialog(true);
    };

    const handlePickDialogClose = () => { setOpenDialog(false); };

    const handlePick = (e) => {
        const value = props.value.concat(e.target.value);
        if (props.onChange !== undefined) props.onChange({ target: { id: props.name, value: value } });
        handlePickDialogClose();
    }

    const { error, data, loading } = useQuery(props.query_where, { variables: props.query_variables });
    if (loading) return null;
    if (error) { console.log(error); return null; }
    let items = data ? data[Object.keys(data)[0]] : [];
    if (props.hidden !== undefined) items = items.filter(props.hidden);

    return <React.Fragment>
        <Grid container spacing={2} justify="center" alignItems="center">
            <Grid item xs={12} sm={12} md={12} >
                <QueryItems
                    name={props.name}
                    viewType={props.viewType}
                    items={items}
                    headers={props.headers}
                    superTableOptions={props.superTableOptions}
                    editButton={(item, i) => 'each'}
                    deleteButton={(item, i) => 'none'}
                    elementContent={props.elementContent}
                    cardActions={props.cardActions}
                    cardCollapse={props.cardCollapse}
                    editButtonName={props.editButtonName}
                    deleteButtonName={props.deleteButtonName}
                    handleEditDialogOpen={handlePickDialogOpen}
                    handleDeleteDialogOpen={() => { }}
                />
            </Grid>
            <Grid item xs={12} sm={12} md={12} >
                <Button
                    color="default"
                    className={`add-${props.name}`}
                    fullWidth
                    variant="outlined"
                    onClick={handlePickDialogOpen}
                >
                    {props.addButtonName}
                </Button>
            </Grid>
        </Grid>
        <DialogFullScreen
            isNew={true}
            open={openDialog}
            onClose={handlePickDialogClose}
            dialogName={props.dialogName}
            content={
                <QueryItems3
                    viewType={props.viewType}
                    query_where={props.query_from}
                    query_variables={props.query_from_variables}
                    headers={props.headers}
                    superTableOptions={props.superTableOptions}
                    editButton={props.editButton}
                    deleteButton={props.deleteButton}
                    locationField={props.locationField}
                    cardActions={props.cardActions}
                    markerLabel={props.markerLabel}
                    cardMedia={props.cardMedia}
                    cardContent={props.cardContent}
                    cardCollapse={props.cardCollapse}
                    editButtonName={props.editButtonName}
                    deleteButtonName={props.deleteButtonName}
                    id='item-choose'
                    value={props.value}
                    hidden={i => !props.value.includes(i.id)}
                    onChange={handlePick}
                    elementContent={props.elementContent}
                    addButtonName={props.addButtonName}
                    prevButtonName={props.prevButtonName}
                    nextButtonName={props.nextButtonName}
                />
            }
        />
    </React.Fragment >

}