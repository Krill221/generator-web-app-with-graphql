/*
    Example:

    <PickOneGrid
        name='post'
        query={GET_POSTS}
        query_variables={}
        value={props.values.post}
        //hidden={props.values.post}
        onChange={props.handleChange}
        title='name'
        subheader='desc'
        img='img'
        button_name='choose'
    />
    
 */
import React from 'react';
import {
    Card,
    CardActionArea, CardActions, CardHeader, Avatar,
    Button
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import QueryItems from './queryItems'



export default function PickOneGrid(props) {

    const [current, setCurrent] = React.useState(props.value);
    const handleCardClick = (id) => {
        setCurrent(id);
        if (props.onChange !== undefined) props.onChange({ target: { id: props.id, value: id } });
    };
    return (
        <QueryItems
            name={`${props.name}-list`}
            viewType='grid'
            query_where={props.query}
            query_variables={props.query_variables}
            hidden={props.hidden}
            onCompleted={(data) => {
                let items = data[Object.keys(data)[0]];
                if (current === '') {
                    let first_item = items[0];
                    setCurrent(first_item.id);
                    props.onChange({ target: { id: props.id, value: first_item.id } });
                }
            }}
            renderItem={(item, index) => <Card>
                <CardActionArea onClick={(e) => handleCardClick(item.id)} >
                    {
                        props.title &&
                        <CardHeader
                            avatar={(current === item.id) ? <Avatar aria-label="">
                                <CheckIcon />
                            </Avatar>
                                :
                                <></>
                            }
                            title={props.title !== undefined ? item[props.title] : ''}
                        />
                    }
                    {
                        props.elementContent && props.elementContent(item, index)
                    }
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary" className='choose-button' onClick={() => handleCardClick(item.id)}>
                        {props.button_name}
                    </Button>
                </CardActions>
            </Card>
            } />
    );
}