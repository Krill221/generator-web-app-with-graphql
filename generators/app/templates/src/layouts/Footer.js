import React from 'react';
import { Route } from 'react-router-dom';
import { Typography, Grid, Link, Container } from '@material-ui/core';


const Footer = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={(props) =>
                <Container>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={2}
                    >
                        <Grid item >
                            <Typography variant="subtitle2" align="center" color="textSecondary" component="p">© {new Date().getFullYear()} One Hotel. Все права защищены.</Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant="subtitle2" align="center" color="textSecondary" component="p">· Тел.: +7 (925) 286-49-43</Typography>
                        </Grid>
                        <Grid item >
                            <Link href='/person.pdf' target="_blank" rel="noopener" variant="subtitle2" align="center" color="textSecondary">· Конфиденциальность</Link>
                        </Grid>
                        <Grid item >
                            <Link href='/terms.pdf' target="_blank" rel="noopener" variant="subtitle2" align="center" color="textSecondary">· Условия</Link>
                        </Grid>
                        <Grid item ><br /><br /></Grid>
                    </Grid>
                </Container>
            }
        />
    );
};
export default Footer;