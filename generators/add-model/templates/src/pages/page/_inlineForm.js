import React from 'react';
//import { useTheme } from '@material-ui/core/styles';
import Form from '../../__components/formikEdit';
import FieldText from '../../__components/fieldText';
import { model, validationSchema} from './schema';
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

const Item = ({ item, isNew, update, setActive }) => {

    //const theme = useTheme();
    
    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        update(newItem);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <% fields.forEach(function(field){ %><FieldText
                    model={model}
                    name={'<%= field[0] %>'}
                    formikProps={props}
                    onBlur={props.handleSubmit}
                    onChange={props.handleChange}
                />,
                <% }) %>
            ]
            }
        />
        }
    </Form>
};

export default Item;