/*
    Example:
        <EstimateLike name="like"
            itemId={item.id}
            value={item.like}
            onChange={e => {}}
            queryUpdate={UPDATE_POST}
            refetchQueries={[{ query: GET_POSTS }]}
            clickedIcon={<FavoriteIcon />}
            unclickedIcon={<FavoriteBorderIcon />}
        />
 */
import React, { useContext } from 'react';
import { IconButton } from '@material-ui/core';
import { AuthContext } from '../auth';
import { AuthArea } from './authArea';


export default function EstimateLike(props) {

    const { user } = useContext(AuthContext);
    const userId = user ? user.id : null;

    const handleChange = () => {
        //let variables = { id: props.itemId };
        //variables[props.name] = [{ owner: '', value: 1 }];
        //if (props.itemId !== 'new') {
            //updateMutation({
            //    refetchQueries: props.refetchQueries,
            //    variables: variables,
            //});

            props.onChange !== undefined && props.onChange({
                target: {
                    id: `${props.name}`, value: {
                        owner: '',
                        value: 1
                    }
                }
            });
            //props.onChange !== undefined && props.onChange({ target: { id: props.name, value: props.value } });
        //}
    }
    return <AuthArea
        publicArea={
            <IconButton
                color="secondary"
                aria-label="like"
                className="like-button"
            >
                {props.unclickedIcon}
            </IconButton>
        }
        privateArea={<React.Fragment>
            <input name={`${props.name}`} type='hidden' value={props.value} />
            <IconButton
                onClick={handleChange}
                color="secondary"
                aria-label="like"
                className="like-button"
            >
                {
                    Array.isArray(props.value) && props.value.map(i => i.owner).includes(userId) ?
                        props.clickedIcon
                        :
                        props.unclickedIcon
                }
            </IconButton>
        </React.Fragment>}
    />;
}