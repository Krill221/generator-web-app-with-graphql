import React from 'react';
import { Container, Button, Card, CardContent, CardActions, Typography } from '@material-ui/core';
import { GET_USERS } from '../../queries/users.js';
import QueryGrid from '../../components/queryGrid'

const models = 'users';

export default function All() {
    return <Container>
        <Button color="primary" aria-label="add" className={'add-button'} href={`${models}/new`} >add</Button>
        <QueryGrid query={GET_USERS} id={models} renderItem={(item, index) =>
            <Card>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{item.username}</Typography>
                </CardContent>
                <CardActions>
                    <Button aria-label="edit" className="edit-button" size="small" color="primary" href={`${models}/${item.id}`} >edit</Button>
                </CardActions>
            </Card>
        } />
    </Container>;
}