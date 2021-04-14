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

*/

import { IconButton } from '@material-ui/core';
import React, { Fragment, useContext } from 'react';
import { useItems, useAddItem, useDeleteItem } from '../__operations';
import { AuthArea } from './authArea';
import { AuthContext } from '../__providers/authProvider';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const CreateOneButton = ({ query, parentObjects = {}, fullIcon, emptyIcon }) => {

    console.log('createOne b');

    const { user } = useContext(AuthContext);

    parentObjects = {...parentObjects, userId: user?.id }

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

    parentObjects = {...parentObjects, userId: user?.id }

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
    console.log('likes count');

    const { loading, error, items } = useItems(query, parentObjects);

    if (error) return '-';
    if (loading) return '-';

    return <Fragment>{items.length}</Fragment>;
};

export { CountComponent, CreateOneButton, LikeButton };