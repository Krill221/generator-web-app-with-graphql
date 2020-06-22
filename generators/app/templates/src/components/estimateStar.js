/*
    Example:
        <EstimateStar name="likes"
            itemId={item.id}
            value={item.likes}
            onChange={e => {}}
            queryUpdate={UPDATE_POST}
            refetchQueries={[{ query: GET_POSTS }]}
        />
 */
import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../auth';
import Rating from '@material-ui/lab/Rating';


export default function EstimateStar(props) {

    const [updateStar] = useMutation(props.queryUpdate);
    const { user } = useContext(AuthContext);

    const f = props.value !== undefined ? props.value.find(i => i.owner === user.id) : undefined;
    const myEstime = f !== undefined ? f.value : 0;
    const handleChange = (event, newValue) => {
        
        if (newValue !== null) {
            const variables = {id: props.itemId};
            variables[props.name] = newValue;
            updateStar({ variables: variables, refetchQueries: props.refetchQueries })
            props.onChange !== undefined && props.onChange({ target: { id: props.name, value: newValue} });
        }
    }

    return <React.Fragment>
        <Rating
            name={`${props.name}_${props.itemId}_my`}
            value={myEstime}
            precision={1}
            onChange={handleChange}
        />
    </React.Fragment>;
}