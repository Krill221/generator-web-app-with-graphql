import React, {
    useContext
} from 'react';
import { AuthContext } from '../../__providers/authProvider';
import {
    validationSchema
} from '../orders/schema';
import Form from '../../__components/helpers/FormikEdit';
import {
    Grid12 as LayoutView,
} from '../../__views/LayoutView';
import {
    //CreateComponent,
    ItemsComponent
} from '../../__components/itemsComponent';
import {
    //Table as ItemsView,
    //Grid as ItemsView,
    List as ItemsView,
} from '../../__views/ItemsView';
import {
    //ItemTable as ItemView,
    //ItemCard as ItemView,
    ItemList as ItemView,
} from '../../__views/ItemView';

import InlineForm from '../deliveryItems/__inlineForm';
import InlineForm2 from '../deliveryItems/__inlineForm2';
import DeleteForm from '../deliveryItems/__deleteForm';
import qMain from '../../queries/orderitems.js';

const Item = ({ item, isNew, update, setActive }) => {
    const { user } = useContext(AuthContext);

    return <Form validationSchema={validationSchema} item={item} onSubmit={(newItem) => {
        update(newItem);
    }}>
        {props => <LayoutView
            labels={['']}
            tabs={[
                <ItemsComponent
                    query={qMain}
                    parentObjects={{orderId: item.id, user: user?.id}}
                    ItemsView={ItemsView}
                    ItemView={ItemView}
                    EditForm={null}
                    InlineForm={InlineForm}
                    InlineForm2={InlineForm2}
                    DeleteForm={DeleteForm}
                    options={{
                        inline: false,
                        editable: false,
                        deletable: false
                    }}
                />,
                
            ]
            }
        />
        }
    </Form>
};

export default Item;