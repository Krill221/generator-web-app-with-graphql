import React from 'react';
import { Container, Typography, Avatar, CardHeader } from '@material-ui/core';
////g-key import components
import ViewSet from '../../components/views/viewSet';
import CreateMany from '../../components/createMany';
////g-key import queries
import { GET_USERS as GETS, UPDATE_USER as UPDATE, DELETE_USER as DELETE} from '../../queries/users.js';
////g-key import helpers
import Edit from './edit';
import Create from './create';

const models = 'users';

const headers = [
    {
        name: "id",
        label: "ID",
        options: {
            filter: false,
            sort: true,
            sortThirdClickReset: true,
            sortDescFirst: false,
        }
    },
    {
        name: "username",
        label: "username",
        options: {
            filter:  true,
            sort: true,
            sortThirdClickReset: true,
            sortDescFirst: false,
        }
    },
    {
        name: "email",
        label: "email",
        options: {
            filter:  true,
            sort: true,
            sortThirdClickReset: true,
            sortDescFirst: false,
        }
    },
]

const superTableOptions = {
    filter: true,
    filterType: "checkbox",
    selectableRows: 'none',
    fixedHeader: true,
    responsive: 'simple',
    rowsPerPageOptions: [10,50,100,1000],
    rowsPerPage: 50,
    
};

export default function All() {
    return <ViewSet
        viewType='plan' // can be - tabs plan wizard or button
        labels={[models]}
        tabs={[
            <Container>
                <CreateMany
                    name={models}
                    label='Users'
                    actionType='create' // create or create-default or none
                    viewType='supertable' // can be grid list table supertable
                    superTableOptions={superTableOptions}
                    query_where={GETS}
                    query_variables={{ ids: [] }}
                    query_update={UPDATE}
                    query_delete={DELETE}
                    onChange={(e) => { }}
                    withUrl={true} // use url
                    EditForm={Edit}
                    CreateForm={Create}
                    headers={headers}
                    elementContent={(item, index) => item}
                    cardActions={(item, index) => null}
                    dialogName=''
                    addButtonType='none' // can be fab button inline(view create inline) none
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