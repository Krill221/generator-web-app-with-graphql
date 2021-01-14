import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
////g-key import components
import ViewSet from '../../components/views/viewSet';
import CreateMany from '../../components/createMany';
////g-key import queries
import { GETS, UPDATE, DELETE } from '../../queries/<%=small_models%>.js';
////g-key import helpers
import Edit from './edit';
import Create from './create';

const models = '<%=small_models%>';

const superTableOptions = {
    filter: true,
    filterType: "checkbox",
    selectableRows: 'none',
    fixedHeader: true,
    responsive: 'simple',
    rowsPerPageOptions: [10, 50, 100, 1000],
    rowsPerPage: 50,

};

export default function All() {
    const theme = useTheme();

    const headers = [
        {
            name: "id",
            label: theme.props.models.user.Id,
            options: {
                filter: false,
                sort: true,
                sortThirdClickReset: true,
                sortDescFirst: false,
            }
        },
        <% fields.forEach(function(field){ %>{
            name: '<%= field[0] %>',
            label: theme.props.models.<%=small_model%>.<%= field[0] %>,
            options: {
                filter: true,
                sort: true,
                sortThirdClickReset: true,
                sortDescFirst: false,
            }
        },
        <% }) %>
    ]

    return <ViewSet
        viewType='raw' // can be - tabs plan wizard or button
        labels={[models]}
        tabs={[
            <Container>
                <CreateMany
                    name={models}
                    label='Users'
                    viewType='supertable' // can be grid list table supertable raw
                    superTableOptions={superTableOptions}
                    query_where={GETS}
                    query_variables={{ ids: [] }}
                    query_update={UPDATE}
                    query_delete={DELETE}
                    onChange={(e) => { }}
                    withUrl={true} // use url
                    EditForm={(Edit)}
                    CreateForm={Create}
                    headers={headers}
                    elementContent={(item, index) => {

                        // grid
                        /*return <React.Fragment>
                            <CardHeader
                                avatar={<Avatar src={item.usename}></Avatar>}
                                action={''}
                                title={item.username}
                                subheader=""
                            />
                            <CardMedia
                                component="img"
                                alt=""
                                height="200"
                                image={item.username}
                                title=""
                            />
                        </React.Fragment>
                        */

                        // list
                        /*return <React.Fragment>
                            <ListItemAvatar>
                                <Avatar alt='' src={item.picture} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={item.username}
                                secondary={item.email} />
                        </React.Fragment>
                        */

                        // table
                        /*return <React.Fragment>
                            <TableCell>
                                {item.username}
                            </TableCell>
                            <TableCell>
                                {item.email}
                            </TableCell>
                        </React.Fragment>
                        */

                        // supertable
                        return item;

                        // raw
                        //return <React.Fragment>item</React.Fragment>;
                    }}
                    cardActions={(item, index) => null}
                    dialogName=''
                    actionType='create' // create or create-default
                    addButtonType='fab' // can be fab button inline none
                    addButtonName={theme.props.components.Add}
                    editButtonName={theme.props.components.Edit}
                    deleteButtonName={theme.props.components.Delete}
                    deleteButton={(item, i) => 'each'} // can be 'each', 'last', 'none'
                    editButton={(item, i) => 'each'} // can be 'each', 'last', 'none'
                />
            </Container>
        ]}
    />;

}