/*
    Example:
            <EstimateLike
                name={'like'}
                itemId={props.values.id}
                value={props.values.like}
                onChange={e => { props.handleChange(e); props.submitForm(); }}
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
        props.onChange !== undefined && props.onChange({
            target: {
                id: `${props.name}`, value: {
                    owner: '',
                    value: 1
                }
            }
        });
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