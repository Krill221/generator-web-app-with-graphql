/*
    Example:
    
 */
import React from 'react';
import { List } from '@material-ui/core';

export default function ListItems(props) {
    return <List name={`${props.name}-list`} dense={false} >
        {
            props.items && props.items.map((item, index) => <React.Fragment key={index}>
                {
                    props.renderItem(item, index)
                }
            </React.Fragment>
            )
        }
    </List>
}