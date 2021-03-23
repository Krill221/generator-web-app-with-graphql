import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { CreateComponent, ItemsComponent } from '../../__components/itemsComponent';
import { ListLoading, ListError } from '../../__views/web/material/helpers';
import {
    Grid12 as SetView,
    //Chat as SetView,
    //Raw as SetView,
    //Simple as SetView,
    //Tabs as SetView,
    //Wizard as SetView,
} from '../../__views/web/material/SetView';
import {
    CreateFab as CreateView,
    //CreateButton as CreateView,
    //CreateInline as CreateView,
} from '../../__views/web/material/CreateView';
import {
    Table as ItemsView,
    //Grid as ItemsView,
    //List as ItemsView,
} from '../../__views/web/material/ItemsView';
import {
    ItemTable as ItemView,
    //ItemCard as ItemView,
    //ItemList as ItemView,
} from '../../__views/web/material/ItemView';

import CreateForm from './__createForm';
import EditForm from './__editForm';
import InlineForm from './__inlineForm';
import DeleteForm from './__deleteForm';
import TableForm from './__tableForm';


import qUsers from '../../queries/users.js';
import { Container } from '@material-ui/core';


export default function All() {
    const theme = useTheme();

    return <Container>
        <SetView
            labels={['']}
            tabs={[
                <CreateComponent
                    label={theme.props.components.Add}
                    query={qUsers}
                    //parentObject={{room: null}}
                    CreateView={CreateView}
                    CreateForm={CreateForm}
                />,
                <ItemsComponent
                    query={qUsers}
                    //parentObject={{room: null}}
                    Loading={ListLoading}
                    Error={ListError}
                    ItemsView={ItemsView}
                    ItemView={ItemView}
                    EditForm={EditForm}
                    InlineForm={InlineForm}
                    TableForm={TableForm(theme)}
                    DeleteForm={DeleteForm}
                    options={{
                        inline: false,
                        editable: true,
                        deletable: true
                    }}
                />

            ]}
        />
    </Container>;
}