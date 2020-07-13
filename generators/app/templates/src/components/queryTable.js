/*
    Example:
    <QueryTable query={GET_ORDERS_WHERE}
        query_variables={{ ids: item.orders }} // not required
        header={null}
        headers={['Тип', 'Клиент', 'Дата брони', 'Заезд', 'Выезд', 'Сумма', '']}
        renderItem={(item, index) => (
            <TableRow key={index}>
                <TableCell component="th" scope="row">
                    <Avatar alt="" src={item.picture} className={classes.large} />
                </TableCell>
                <TableCell component="th" scope="row">{item.name}</TableCell>
                <TableCell align="left">{item.hotel}</TableCell>
                <TableCell align="left"></TableCell>
                <TableCell align="left">
                    <Button variant="contained" color="secondary" margin='normal' href={`${models}/${item.id}/edit`} >Редактировать</Button>
                </TableCell>
            </TableRow>
        )}
    />
    
 */
import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import {
   Typography, TableContainer, TableCell, TableRow, TableHead, Table, Paper, TableBody, Box,
} from '@material-ui/core';

export default function QueryTable(props) {

    const { error, data, loading } = useQuery(props.query, {
        variables: props.query_variables,
        onCompleted(data) {
            if (props.onCompleted !== undefined) props.onCompleted(data);
        }
    });

    if (loading) return null;
    if (error) console.log(error);
    if (error) return null;
    let items = data ? data[Object.keys(data)[0]] : [];
    //if (props.hidden !== undefined) items = items.filter(item => !props.hidden.includes(item.id));
    if (props.hidden !== undefined) items = items.filter(props.hidden);

    return (items.length > 0) ? <TableContainer component={Paper}>
        {props.header && <Box margin={2}>
            < Typography color="textSecondary" variant="h6" gutterBottom component="div">
                {props.header}
            </Typography>

        </Box>
        }
        <Table aria-label="simple table" size="small">
            <TableHead>
                <TableRow>
                    {props.headers.map((header, index) =>
                        <TableCell key={index} >{header}</TableCell>
                    )}
                </TableRow>
            </TableHead>
            <TableBody>
                {items.map((item, index) => props.renderItem(item, index))}
            </TableBody>
        </Table>
    </TableContainer >
        : '';
}