/*
    Example:

    <PickOneGrid
        id='post'
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
    CardActionArea, CardMedia, CardHeader,
    CardContent, CardActions,
    Typography, Avatar,
    Button
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import QueryGrid from './queryGrid'



export default function PickOneGrid(props) {

    const [current, setCurrent] = React.useState(props.value);
    const handleCardClick = (id) => {
        setCurrent(id);
        if (props.onChange !== undefined) props.onChange({ target: { id: props.id, value: id } });
    };

    return (
        <QueryGrid
            id={`${props.id}-list`}
            query={props.query}
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
                        props.img &&
                        < CardMedia
                            component="img"
                            alt=""
                            height="140"
                            image={item[props.img]}
                            title=""
                        />
                    }
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {item[props.subheader]}
                        </Typography>
                    </CardContent>
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