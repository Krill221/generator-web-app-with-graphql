/*
    Example:
        <EstimateLike name="likes"
            itemId={item.id}
            value={item.likes}
            onChange={e => {}}
            queryUpdate={UPDATE_POST}
            refetchQueries={[{ query: GET_POSTS }]}
            clickedIcon={<FavoriteIcon />}
            unclickedIcon={<FavoriteBorderIcon />}
        />
 */
import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { IconButton } from '@material-ui/core';
import { AuthContext } from '../auth';


export default function EstimateLike(props) {

    const [updateMutation] = useMutation(props.queryUpdate);
    const { user } = useContext(AuthContext);

    const handleChange = () => {
        let variables = {id: props.itemId};
        variables[props.name] = 1;
        if(props.itemId !== 'new') {
            updateMutation({
                refetchQueries: props.refetchQueries,
                variables: variables,
            });
            props.onChange !== undefined && props.onChange({ target: { id: props.name, value: props.value } });
        }
    }
    return <IconButton
        onClick={handleChange}
        color="secondary"
        aria-label="like"
        className="like-button"
    >
        {
            Array.isArray(props.value) && props.value.map(i => i.owner).includes(user.id) ?
                props.clickedIcon
                :
                props.unclickedIcon
        }
    </IconButton>;
}