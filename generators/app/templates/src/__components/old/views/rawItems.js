/*
    Example:
    
 */
import React from 'react';

export default function RawItems(props) {
    return <React.Fragment>
        {
            props.items && props.items.map((item, index) => <React.Fragment key={index}>
                {
                    props.elementContent(item, index)
                }
            </React.Fragment>
            )
        }
    </React.Fragment>
}