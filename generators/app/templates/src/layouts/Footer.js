import React from 'react';
import { Route } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { Typography, Grid, Link, Container } from '@material-ui/core';


const Footer = ({ component: Component, ...rest }) => {

    const theme = useTheme();

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
                            <Typography variant="subtitle2" align="center" color="textSecondary" component="p">© {new Date().getFullYear()} {theme.props.main.AppName}. {theme.props.footer.Copyrights}.</Typography>
                        </Grid>
                        <Grid item >
                            <Typography variant="subtitle2" align="center" color="textSecondary" component="p">· {theme.props.footer.Phone}.: {theme.props.main.AppTel}</Typography>
                        </Grid>
                        <Grid item >
                            <Link href='/person.pdf' target="_blank" rel="noopener" variant="subtitle2" align="center" color="textSecondary">· {theme.props.footer.Person}</Link>
                        </Grid>
                        <Grid item >
                            <Link href='/terms.pdf' target="_blank" rel="noopener" variant="subtitle2" align="center" color="textSecondary">· {theme.props.footer.Terms}</Link>
                        </Grid>
                        <Grid item ><br /><br /></Grid>
                    </Grid>
                </Container>
            }
        />
    );
};
export default Footer;