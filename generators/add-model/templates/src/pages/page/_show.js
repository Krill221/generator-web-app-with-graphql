/*
    example:
        <<%=model%>Show itemId={props.values.<%=small_model%>} />
*/
import React from 'react';
import { Card, CardMedia, CardHeader, CardContent, Typography } from '@material-ui/core';
import { useQuery } from '@apollo/react-hooks';
import { GET_<%=large_model%> as GET } from '../../queries/<%=small_models%>';
////g-key import components
////g-key import queries
////g-key import helpers

const model = '<%=small_model%>';

export default function Show(props) {

    const { data, loading } = useQuery(GET, { variables: { id: props.itemId } });
    if (loading) return null;
    let item = data ? data[model] : { id: '', <% fields.forEach(function(field){ %><%= field[0] %>: <%if(field[1] === 'String'){%>''<%}%><%if(field[1] === 'Boolean'){%>false<%}%>, <% }) %> }

    return <Card>
            <CardHeader
                title=''
                subheader=''
            />
            <CardMedia
                component="img"
                alt=""
                height="140"
                image=''
                title=""
            />
            <CardContent>
                <% fields.forEach(function(field){ %>
                <Typography gutterBottom variant="h5" component="h2" id='printName'>
                    {item.<%= field[0] %>}
                </Typography>
                <% }) %>
            </CardContent>
        </Card>;
}