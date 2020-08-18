import React from 'react';
import { Container, Typography, Avatar, CardHeader } from '@material-ui/core';
////g-key import components
import ViewSet from '../../components/views/viewSet';
import CreateMany from '../../components/createMany';
////g-key import queries
import { GET_USERS, UPDATE_USER, DELETE_USER } from '../../queries/users.js';
////g-key import helpers
import Edit from './edit';
import Create from './create';


const models = 'users';

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
                    query_where={GET_USERS}
                    query_variables={{ids: []}}
                    query_update={UPDATE_USER}
                    query_delete={DELETE_USER}
                    onChange={(e) => {}}
                    withUrl={true} // use url
                    EditForm={Edit}
                    CreateForm={Create}
                    headers={['']}
                    elementContent={(item, index) =>
                        <React.Fragment>
                            <CardHeader
                                avatar={<Avatar src={''}></Avatar>}
                                action={''}
                                title={item.username}
                                subheader={item.email}
                            />
                        </React.Fragment>
                    }
                    cardActions={(item, index) => null}
                    dialogName=''
                    addButtonType='fab' // floating button create
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