/*
    Example:

    import FieldPayYandexKassa from '../../components/fieldPayYandexKassa';

    <FieldPayYandexKassa
    query_update={UPDATE_ORDER}
    orderId={item.id}
    payId={item.payId}
    sum={item.sum}
    successUrl={window.location.href}
    orderDesc={`${props.values.hotel} - ${props.values.desc}`}
    payButton={
        <Button
            color='primary'
            startIcon={<PaymentIcon />}
        >Оплатить</Button>
    }
/>
    
 */
import React from 'react';
import { Dialog, Typography, Grid, DialogContent, AppBar, Toolbar, IconButton } from '@material-ui/core';
import { MAKE_PAYMENT, CHECK_PAYMENT } from '../queries/makePayment';
import { useQuery, useMutation } from '@apollo/react-hooks';
import ArrowBack from '@material-ui/icons/ArrowBack';

function loadScript(src, position, id) {
    if (!position) {
        return;
    }
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

if (typeof window !== 'undefined') {
    if (!document.querySelector('#yandex-kassa')) {
        loadScript(
            `https://kassa.yandex.ru/checkout-ui/v2.js`,
            document.querySelector('head'),
            'yandex-kassa',
        );
    }
}


export default function FieldPayYandexKassa(props) {

    const [open, setOpen] = React.useState(false);
    
    const handleClickOpen = () => {
        makePayment();
        setOpen(true);
    };
    const handleClose = () => { setOpen(false); };
    const [updateMutation] = useMutation(props.query_update);

    const [makePayment] = useMutation(MAKE_PAYMENT,
        {
            variables: { payId: props.orderId, sum: props.sum },
            onCompleted: ({ makePayment }) => {
                const payment = JSON.parse(makePayment);
                // save payment id
                updateMutation({ variables: { id: props.orderId, payId: payment.id } });

                // show Window
                const checkout = new window.YandexCheckout({
                    confirmation_token: payment.confirmation.confirmation_token, //Токен, который перед проведением оплаты нужно получить от Яндекс.Кассы
                    return_url: window.location.href, //Ссылка на страницу завершения оплаты
                    error_callback(error) {
                        console.log(error);
                    }
                });
                checkout.render('payment-form');
            }
        }
    );

    const { error, data, loading } = useQuery(CHECK_PAYMENT, {
        variables: { payId: props.payId },
    });
    if (error) console.log(error);
    if (error) return null;
    if (loading) return null;

    const payment = JSON.parse(data.check_payment);

    let status = '';
    if (payment.error !== null) {
        status = 'не оплачено';
    }
    if (payment.status === 'waiting_for_capture') {
        status = 'Ожидайте подтверждения оплаты';
    }
    if (payment.status === 'succeeded') {
        status = 'Оплачено';
    }


    return <React.Fragment>
        <Dialog
            open={open}
            fullScreen
        >
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" aria-label="back" color="inherit" onClick={handleClose}>
                        <ArrowBack />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <DialogContent>
                <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid item xs={12} sm={12} md={12}>
                        <Typography color="textSecondary" component={'h4'} variant={'h5'}>Оплата бронирования</Typography>
                        <Typography color="textSecondary" component={'h4'} variant={'h5'}>{props.orderDesc}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <div id="payment-form"></div>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
        <br />
        <Typography color="primary" component={'span'} variant={'body2'}>{status}</Typography>
        {(status === '' || status === 'не оплачено') &&
            <label onClick={handleClickOpen} style={{ display: 'block' }} htmlFor={`delete-button-${props.name}`}>{props.payButton}</label>
        }
    </React.Fragment>
}