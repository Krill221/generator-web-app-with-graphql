/*
    Example:
            <EstimateStar
                name={'like'}
                itemId={props.values.id}
                value={props.values.like}
                onChange={e => { props.handleChange(e); props.submitForm(); }}
            />
 */
import React, { useContext } from 'react';
import { AuthContext } from '../auth';
import { AuthArea } from './authArea';
import Rating from '@material-ui/lab/Rating';


export default function EstimateStar(props) {

    const { user } = useContext(AuthContext);
    const userId = user ? user.id : null;

    const f = Array.isArray(props.value) ? props.value.find(i => i.owner === userId) : undefined;
    const myEstime = f !== undefined ? f.value : 0;
    const handleChange = (event, newValue) => {
        if (newValue !== null) {
            props.onChange !== undefined && props.onChange({
                target: {
                    id: `${props.name}`, value: {
                        owner: '',
                        value: newValue
                    }
                }
            });
        }
    }

    return <AuthArea
        publicArea={
            <Rating
                name={`${props.name}_${props.itemId}_my`}
                value={null}
                precision={1}
            />
        }
        privateArea={
            <React.Fragment>
                <input name={`${props.name}`} type='hidden' value={props.value} />
                <Rating
                    name={`${props.name}_${props.itemId}_my`}
                    value={myEstime}
                    precision={1}
                    onChange={handleChange}
                />
            </React.Fragment>
        }
    />;
}