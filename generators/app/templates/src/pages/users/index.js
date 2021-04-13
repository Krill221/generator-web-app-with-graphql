import React from 'react';
import { Container } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { CreateComponent, ItemsComponent } from '../../__components/itemsComponent';
import {
    Grid12 as LayoutView,
    //Chat as LayoutView,
    //Raw as LayoutView,
    //Simple as LayoutView,
    //Tabs as LayoutView,
    //Wizard as LayoutView,
} from '../../__views/LayoutView';
import {
    CreateFab as CreateView,
    //CreateButton as CreateView,
    //CreateInline as CreateView,
} from '../../__views/CreateView';
import {
    Table as ItemsView,
    //Grid as ItemsView,
    //List as ItemsView,
} from '../../__views/ItemsView';
import {
    //ItemChat as ItemView,
    ItemTable as ItemView,
    //ItemCard as ItemView,
    //ItemList as ItemView,
} from '../../__views/ItemView';

import CreateForm from '../users/__createForm';
import EditForm from '../users/__editForm';
import InlineForm from '../users/__inlineForm';
import InlineForm2 from '../users/__inlineForm';
import DeleteForm from '../users/__deleteForm';
import TableForm from '../users/__tableForm';
import qUsers from '../../queries/users.js';

export default function All() {
    const theme = useTheme();

    return <Container>
        <LayoutView
            labels={['']}
            tabs={[
                <CreateComponent
                    query={qUsers}
                    //parentObjects={{room: null, comment: null}}
                    CreateView={CreateView}
                    CreateForm={CreateForm}
                />,
                <ItemsComponent
                    query={qUsers}
                    //parentObjects={{room: null}}
                    ItemsView={ItemsView}
                    ItemView={ItemView}
                    EditForm={EditForm}
                    InlineForm={InlineForm}
                    InlineForm2={InlineForm2}
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