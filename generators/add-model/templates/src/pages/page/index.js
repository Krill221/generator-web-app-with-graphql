import React from 'react';
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
    ItemTable as ItemView,
    //ItemCard as ItemView,
    //ItemList as ItemView,
} from '../../__views/ItemView';

import CreateForm from '../<%=small_models%>/__createForm';
import EditForm from '../<%=small_models%>/__editForm';
import InlineForm from '../<%=small_models%>/__inlineForm';
import InlineForm2 from '../<%=small_models%>/__inlineForm2';
import DeleteForm from '../<%=small_models%>/__deleteForm';
import TableForm from '../<%=small_models%>/__tableForm';
import qMain from '../../queries/<%=small_models%>.js';

import { Container } from '@material-ui/core';

export default function All() {
    const theme = useTheme();

    return <Container>
        <LayoutView
            labels={['']}
            tabs={[
                <CreateComponent
                    query={qMain}
                    //parentObject={{roomId: null}}
                    CreateView={CreateView}
                    CreateForm={CreateForm}
                />,
                <ItemsComponent
                    query={qMain}
                    //parentObject={{roomId: null}}
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
                />,

            ]}
        />
    </Container>;
}