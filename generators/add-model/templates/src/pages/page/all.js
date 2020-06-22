import React from 'react';
import { Container, Button, Card, CardMedia, CardContent, CardActions, Typography } from '@material-ui/core';
import QueryGrid from '../../components/queryGrid';
import { GET_<%=large_models %> as GETS } from '../../queries/<%=small_models%>.js';
////g-key import components
////g-key import queries
////g-key import helpers
const models = '<%=small_models%>';

export default function All() {
    return <Container>
        <Button color="primary" aria-label="add" className={'add-button'} href={`${models}/new`} >add</Button>
        <QueryGrid query={GETS} id={models} renderItem={(item, index) =>
            <Card>
                <CardMedia
                    component="img"
                    alt=""
                    height="140"
                    image=""
                    title=""
                />
                <CardContent>
                    <% fields.forEach(function(field){ %><Typography gutterBottom variant="h5" component="h2">{item.<%= field[0] %>}</Typography>
                    <% }) %>
                </CardContent>
                <CardActions>
                    <Button aria-label="edit" className="edit-button" size="small" color="primary" href={`${models}/${item.id}`} >edit</Button>
                </CardActions>
            </Card>
        } />
    </Container>;
}