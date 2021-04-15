/*
WEB

<LikesButton
    query={qMain}
    parentObjects={{roomId: item.id}}
    fullIcon={}
    emptyIcon={}
/>,

<CreateOneButton
    query={qMain}
    parentObjects={{roomId: item.id}}
    fullIcon={}
    emptyIcon={}
/>,

<CountComponent
    query={qMain}
    parentObjects={{roomId: item.id}}
/>,

<SumComponent
    query={qOrderItems}
    parentObjects={{roomId: item.id}}
    fieldsName={['value', 'productId.price']}
    fieldsOperation={'multiply'} // multiply add
/>.

*/

import { IconButton } from '@material-ui/core';
import React, { useContext } from 'react';
import { useItems, useAddItem, useDeleteItem } from '../__operations';
import { AuthArea } from './authArea';
import { AuthContext } from '../__providers/authProvider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const CreateOneButton = ({ query, parentObjects = {}, fullIcon, emptyIcon }) => {

    console.log('createOne ');

    const { user } = useContext(AuthContext);

    parentObjects = { ...parentObjects, userId: user?.id }

    const { loading, error, items } = useItems(query, parentObjects);
    const addHook = useAddItem(query, parentObjects);

    const handleChange = (item) => {
        if (item === undefined) {
            if (!items.find(i => i.id.includes('abc'))) {
                let newItem = addHook.item;
                newItem.value = '1';
                newItem.userId = user?.id;
                addHook.add(newItem);
            }
        }
    }

    if (error || loading) return <IconButton
        color="secondary"
        aria-label="like"
        className="like-button"
    >
        {fullIcon ? fullIcon : <FavoriteBorderIcon />}
    </IconButton>;

    let myItem = items.find(i => i.userId?.id === user?.id);
    //console.log('items', items)
    //console.log('myItem', myItem)


    return <AuthArea
        publicArea={
            <IconButton
                size="small"
                color="secondary"
                aria-label="like"
                className="like-button"
            >
                {fullIcon ? fullIcon : <FavoriteBorderIcon />}
            </IconButton>
        }
        privateArea={<React.Fragment>
            <IconButton
                size="small"
                onClick={e => {
                    e.preventDefault();
                    handleChange(myItem);
                }}
                onDoubleClick={e => {
                    e.preventDefault();
                    console.log('onDoubleClick');
                }}
                color="secondary"
                aria-label="like"
                className="like-button"
            >
                {
                    (myItem !== undefined && items.length !== 0) ?
                        (fullIcon ? fullIcon : <FavoriteIcon />)
                        :
                        (emptyIcon ? emptyIcon : <FavoriteBorderIcon />)

                }
            </IconButton>
        </React.Fragment>}
    />
};

const LikeButton = ({ query, parentObjects = {}, fullIcon, emptyIcon }) => {

    console.log('Like b');

    const { user } = useContext(AuthContext);

    parentObjects = { ...parentObjects, userId: user?.id }

    const { loading, error, items } = useItems(query, parentObjects);
    const addHook = useAddItem(query, parentObjects);
    const deleteHook = useDeleteItem(query);

    const handleChange = (item) => {
        if (item !== undefined) {
            if (!item.id.includes('abc')) {
                if (!items.find(i => i.id.includes('abc'))) {
                    deleteHook.del(item);
                }
            }
        } else {
            if (!items.find(i => i.id.includes('abc'))) {
                let newItem = addHook.item;
                newItem.value = '1';
                newItem.userId = user?.id;
                addHook.add(newItem);
            }
        }
    }

    if (error || loading) return <IconButton
        color="secondary"
        aria-label="like"
        className="like-button"
    >
        {fullIcon ? fullIcon : <FavoriteBorderIcon />}
    </IconButton>;

    let myItem = items.find(i => i.userId?.id === user?.id);
    //console.log('items', items)
    //console.log('myItem', myItem)


    return <AuthArea
        publicArea={
            <IconButton
                size="small"
                color="secondary"
                aria-label="like"
                className="like-button"
            >
                {fullIcon ? fullIcon : <FavoriteBorderIcon />}
            </IconButton>
        }
        privateArea={<React.Fragment>
            <IconButton
                size="small"
                onClick={e => {
                    e.preventDefault();
                    handleChange(myItem);
                }}
                onDoubleClick={e => {
                    e.preventDefault();
                    console.log('onDoubleClick');
                }}
                color="secondary"
                aria-label="like"
                className="like-button"
            >
                {
                    (myItem !== undefined && items.length !== 0) ?
                        (fullIcon ? fullIcon : <FavoriteIcon />)
                        :
                        (emptyIcon ? emptyIcon : <FavoriteBorderIcon />)

                }
            </IconButton>
        </React.Fragment>}
    />
};


const CountComponent = ({
    query,
    parentObjects,
}) => {
    console.log('estim count');

    const { loading, error, items } = useItems(query, parentObjects);

    if (error) return '-';
    if (loading) return '-';

    return items.length;
};


const useSumHook = (
    query,
    parentObjects,
    fieldsName,
    fieldsOperation,
) => {
    console.log('estim sum');

    const { loading, error, items } = useItems(query, parentObjects);

    if (error) return 0;
    if (loading) return 0;

    let itemsArray = [];
    itemsArray = items.map(item => {
        const fieldsArray = fieldsName.map(f => {
            const fieldsNames = f.split('.')
            const navigator = (obj, path) => path.reduce((a, b) => a && a[b], obj);
            let res = navigator(item, fieldsNames);
            return res
        });
        if (fieldsOperation === 'multiply') {
            return Number(fieldsArray.reduce((a, i) => Number(a) * Number(i)))
        }
        if (fieldsOperation === 'add') {
            return Number(fieldsArray.reduce((a, i) => Number(a) + Number(i)))
        }
        return 0;
    });
    return itemsArray.length !== 0 ? itemsArray.reduce((a, i) => a + i) : 0;
};

const SumComponent = ({
    query,
    parentObjects,
    fieldsName,
    fieldsOperation,
}) => {
    console.log('estim sum');

    const sum = useSumHook(query, parentObjects, fieldsName, fieldsOperation);
    return sum;
};

export {
    CountComponent,
    SumComponent, useSumHook,
    CreateOneButton,
    LikeButton
};