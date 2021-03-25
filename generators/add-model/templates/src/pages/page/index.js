import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { CreateComponent, ItemsComponent } from '../../__components/itemsComponent';
import { ListLoading, ListError } from '../../__views/LoadingView';
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
    ItemTable as ItemView,
    //ItemCard as ItemView,
    //ItemList as ItemView,
} from '../../__views/ItemView';

import CreateForm from './_createForm';
import EditForm from './_editForm';
import InlineForm from './_inlineForm';
import DeleteForm from './_deleteForm';
import TableForm from './_tableForm';


import qMain from '../../queries/<%=small_models%>.js';
import { Container } from '@material-ui/core';

export default function All() {
    const theme = useTheme();

    return <Container>
        <LayoutView
            labels={['']}
            tabs={[
                <CreateComponent
                    label={theme.props.components.Add}
                    query={qMain}
                    //parentObject={{room: null}}
                    CreateView={CreateView}
                    CreateForm={CreateForm}
                />,
                <ItemsComponent
                    query={qMain}
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