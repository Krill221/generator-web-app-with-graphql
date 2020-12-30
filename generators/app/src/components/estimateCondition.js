/*
    Example:
    <EstimateCondition
        name="est"
        itemId={item.id}
        value={item.est}
        onChange={e => { }}
        queryUpdate={UPDATE_POST}
        refetchQueries={[{ query: GET_POSTS }]}
        states={[
            { name: 'confirm', value: 1 },
            { name: 'retry', value: 2 },
        ]}
    />
 */
import React, { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../auth';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { AuthArea } from './authArea';

export default function EstimateStar(props) {

    const [updateEstime] = useMutation(props.queryUpdate);
    const { user } = useContext(AuthContext);
    const userId = user ? user.id : null;

    const f = props.value.find(i => i.owner === userId);
    const myEstime = f !== undefined ? f.value : 0;
    const handleChange = (event, newValue) => {
        let variables = { id: props.itemId };
        variables[props.name] = newValue;
        updateEstime({
            variables: variables,
            refetchQueries: props.refetchQueries,
        })
        props.onChange !== undefined && props.onChange({ target: { id: props.name, value: newValue } });
    }

    return <AuthArea
        publicArea={
            <ToggleButtonGroup
                value={null}
                exclusive
                size="small"
            >
                {
                    props.states && props.states.map((state, index) =>
                        <ToggleButton key={index} value={state.value}>
                            {state.name}
                        </ToggleButton>
                    )
                }
            </ToggleButtonGroup>
        }
        privateArea={<ToggleButtonGroup
            value={myEstime}
            exclusive
            onChange={handleChange}
            size="small"
        >
            {
                props.states && props.states.map((state, index) =>
                    <ToggleButton key={index} value={state.value}>
                        {state.name}
                    </ToggleButton>
                )
            }
        </ToggleButtonGroup>}
    />;
}