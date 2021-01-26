/*
    Example:
    
                <EstimateCondition
                name={'like'}
                itemId={props.values.id}
                value={props.values.like}
                onChange={e => { props.handleChange(e); props.submitForm(); }}
                states={[
                    { name: 'confirm', value: 1 },
                    { name: 'retry', value: 2 },
                ]}
            />
 */
import React, { useContext } from 'react';
import { AuthContext } from '../auth';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { AuthArea } from './authArea';

export default function EstimateCondition(props) {

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
        privateArea={
            <React.Fragment>
                <input name={`${props.name}`} type='hidden' value={props.value} />
                <ToggleButtonGroup
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
                </ToggleButtonGroup>
            </React.Fragment>
        }
    />;
}