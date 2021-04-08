import React from 'react';
//import { useTheme } from '@material-ui/core/styles';
import {
    modelName,
    validationSchema
} from './schema';
import Form from '../../__components/FormikNew';

import FieldAddButton from '../../__components/fields/FieldAddButton';
import FieldText from '../../__components/fieldText';
//import FieldTextWithSubmit from '../../__components/fieldTextWithSubmit';

import {
    //Chat as LayoutView,
    Grid12 as LayoutView,
    //Raw as LayoutView,
    //Simple as LayoutView,
    //Tabs as LayoutView,
    //Wizard as LayoutView,
} from '../../__views/LayoutView';
import {
    //CreateComponent,
    //ItemsComponent
} from '../../__components/itemsComponent';
import {
    //LikesButton,
    //LikesCountComponent,
} from '../../__components/likesComponent';
import {
    //ListLoading,
    //ListError
} from '../../__views/LoadingView';
import {
    //CreateFab as CreateView,
    //CreateButton as CreateView,
    //CreateInline as CreateView,
} from '../../__views/CreateView';
import {
    //Table as ItemsView,
    //Grid as ItemsView,
    //List as ItemsView,
} from '../../__views/ItemsView';
import {
    //ItemTable as ItemView,
    //ItemCard as ItemView,
    //ItemList as ItemView,
} from '../../__views/ItemView';


const Item = ({ item, add, setActive }) => {

    //const theme = useTheme();

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        add(newItem);
        setActive(false);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <% fields.forEach(function(field){ %><FieldText
                    modelName={modelName}
                    name={'<%= field[0] %>'}
                    formikProps={props}
                    onBlur={props.onBlur}
                    onChange={props.handleChange}
                    onSubmit={props.handleSubmit} // for FieldTextWithSubmit
                />,
                <% }) %>
                <FieldAddButton
                    modelName={modelName}
                    onClick={props.handleSubmit}
                />
            ]
            }
        />
        }
    </Form>
};

export default Item;