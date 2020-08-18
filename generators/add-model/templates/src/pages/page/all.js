import React from 'react';
import { Container, CardMedia, CardContent, Typography } from '@material-ui/core';
import Edit from './edit';
import Create from './create';
////g-key import components
import ViewSet from '../../components/views/viewSet';
import CreateMany from '../../components/createMany';
////g-key import queries
import { GET_<%=large_models %> as GETS, UPDATE_<%=large_model %> as UPDATE, DELETE_<%=large_model %> as DELETE } from '../../queries/<%=small_models%>.js';
////g-key import helpers

const models = '<%=small_models%>';

export default function All() {

    return <ViewSet
        viewType='plan' // can be - tabs plan wizard or button
        labels={[models]}
        tabs={[
            <Container>
                <CreateMany
                    name={models}
                    actionType='create' // create or create-default or none
                    viewType='grid' // can be grid or list table
                    query_where={GETS}
                    query_variables={{ids: []}}
                    query_update={UPDATE}
                    query_delete={DELETE}
                    onChange={(e) => { }}
                    withUrl={true} // use url
                    EditForm={Edit}
                    CreateForm={Create}
                    headers={['']}
                    elementContent={(item, index) =>
                        <React.Fragment>
                            <CardMedia
                                component="img"
                                alt=""
                                height="140"
                                image=""
                                title=""
                            />
                            <CardContent>
                                <% fields.forEach(function(field){ %><Typography gutterBottom variant="h5" component="h2">{item.<%= field[0] %>}</Typography>
                                <% }) %>
                            </CardContent>
                        </React.Fragment>
                    }
                    cardActions={(item, index) => null}
                    dialogName=''
                    actionTypeButton='fab' // floating button create
                    addButtonName='Add'
                    editButtonName='Edit'
                    deleteButtonName="Delete"
                    deleteButton={(item, i) => 'each'} // can be 'each', 'last', 'none'
                    editButton={(item, i) => 'each'} // can be 'each', 'last', 'none'
                />
            </Container>
        ]}
    />;
}