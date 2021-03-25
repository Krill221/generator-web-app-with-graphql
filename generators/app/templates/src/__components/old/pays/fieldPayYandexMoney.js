/*
    Example:
        <FieldButtonUpload name="file" value={props.values.file} onChange={(e) => {props.handleChange(e); props.handleSubmit(e);}}
            uploadButton={ (loading) => <Button disabled={loading} fullWidth variant="contained" color="primary" component="span">Upload File</Button>}
            deleteButton={ (loading) => <Button disabled={loading} fullWidth variant="contained" color="primary" component="span">Delete File</Button>}
        / >
 */
import React from 'react';
import { useMutation } from '@apollo/client';
import { Dialog, DialogTitle, Button, Typography, Grid, DialogContent } from '@material-ui/core';
import PaymentIcon from '@material-ui/icons/Payment';

export default function FieldPayYandexMoney(props) {

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    const [updateMutation] = useMutation(props.query_update, { variables: { id: props.orderId, payStatus: 'processing'}} );

    return <React.Fragment>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="delele"
            aria-describedby="delete"
        >
            <DialogTitle id="alert-delele"></DialogTitle>
            <DialogContent>
            
                <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography color="textSecondary" component={'h4'} variant={'h5'}>Сумма к оплате {props.sum} руб.</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <form method="POST" action="https://money.yandex.ru/quickpay/confirm.xml">
                            <input type="hidden" name="receiver" value="4100115575635549" />
                            <input type="hidden" name="formcomment" value={props.orderId} />
                            <input type="hidden" name="short-dest" value={props.orderId} />
                            <input type="hidden" name="label" value={props.orderId} />
                            <input type="hidden" name="quickpay-form" value="donate" />
                            <input type="hidden" name="targets" value="Оплата бронирования" />
                            <input type="hidden" name="sum" value={props.sum} data-type="number" />
                            <input type="hidden" name="comment" value={`Номер бронирования: ${props.orderId}`} />
                            <input type="hidden" name="paymentType" value="AC" />
                            <Button type="submit" value="Перевести"
                                color='primary'
                                startIcon={<PaymentIcon />}
                                onClick={updateMutation}
                            >Оплатить Банковской картой</Button>
                        </form>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
        <label onClick={handleClickOpen} style={{ display: 'block' }} htmlFor={`delete-button-${props.name}`}>{props.payButtonName}</label>
    </React.Fragment>
}