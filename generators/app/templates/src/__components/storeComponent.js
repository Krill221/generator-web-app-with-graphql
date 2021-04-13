/*
WEB

<PayButton />,
<CartButton
    query={qMain}
    parentObjects={{roomId: item.id}}
/>,
<CartCountComponent
    query={qMain}
    parentObjects={{roomId: item.id}}
/>,

*/

import { Button, IconButton } from '@material-ui/core';
import React, { Fragment, useContext, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import {
    useItems,
    useAddItem,
} from '../__operations';
import { AuthArea } from './authArea';
import { AuthContext } from '../__providers/authProvider';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const PayButton = ({ query, CreateForm, parentObjects = {}, CreateView, label }) => {

    const theme = useTheme();
    const [activeEdit, setActiveEdit] = useState(false);


    return <AuthArea
        publicArea={
            <CreateView label={'Pay'} active={activeEdit} setActive={setActiveEdit} >
            </CreateView>
        }
        privateArea={
            <CreateView label={'Pay'} active={activeEdit} setActive={setActiveEdit} >
            </CreateView>
        }
    />
};


const AddToCartButton = ({ query, parentObjects = {}, LikeView, UnLikeView }) => {

    console.log('Cart b');

    const { loading, error, items } = useItems(query, parentObjects);
    const addHook = useAddItem(query, parentObjects);
    const theme = useTheme();

    const { user } = useContext(AuthContext);

    const handleChange = (item) => {
        if (item !== undefined) {
            if (!item.id.includes('new')) {
                if (!items.find(i => i.id.includes('new'))) {
                    //deleteHook.del(item);
                }
            }
        } else {
            if (!items.find(i => i.id.includes('new'))) {
                let newItem = addHook.item;
                newItem.value = '1';
                newItem.userId = user?.id;
                addHook.add(newItem);
            }
            //}
        }
    }

    if (error || loading) return <IconButton
        color="secondary"
        aria-label="like"
        className="like-button"
    >
        {LikeView ? LikeView : <FavoriteBorderIcon />}
    </IconButton>;

    let myItem = items.find(i => i.userId === user?.id);

    return <AuthArea
        publicArea={
            <Button
                size="small"
                onClick={e => {
                    e.preventDefault();
                }}
                onDoubleClick={e => {
                    e.preventDefault();
                }}
                color="primary"
                aria-label="like"
                className="like-button"
            >
                {theme.props.components.AddToCart}
            </Button>
        }
        privateArea={<React.Fragment>
            <Button
                size="small"
                onClick={e => {
                    e.preventDefault();
                    handleChange(myItem);
                }}
                onDoubleClick={e => {
                    e.preventDefault();
                    console.log('onDoubleClick');
                }}
                color="primary"
                aria-label="like"
                className="like-button"
            >
                {theme.props.components.AddToCart}
            </Button>
        </React.Fragment>}
    />
};

const CartCountComponent = ({
    query,
    parentObjects,
}) => {
    console.log('cart count');

    const { loading, error, items } = useItems(query, parentObjects);

    if (error) return '-';
    if (loading) return '-';

    return <Fragment>{items.length}</Fragment>;
};

export { CartCountComponent, AddToCartButton, PayButton };