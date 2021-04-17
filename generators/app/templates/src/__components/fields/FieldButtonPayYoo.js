/*
    Example:

    <FieldButtonPayYoo
        modelName={modelName}
        orderId={item.id}
        userEmail={user?.email}
        yooShopId={727796}
        sum={itemsSum}
    />,

 */
import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { CHECK_PAYMENT } from '../../queries/makePayment';
import { useQuery } from '@apollo/client';

export default function FieldButtonPayYoo({ modelName, orderId, userEmail, color, variant, fullWidth, yooShopId, sum }) {

    const theme = useTheme();

    const { data, loading, error } = useQuery(CHECK_PAYMENT, { variables: { payId: orderId } });

    if (error) return null;
    if (loading) return null;

    const location = window.location.href;
    const label = data.checkPayment === 'false' ? theme.props.components.Pay : theme.props.components.Paid;

return <>
    <form action="https://yookassa.ru/integration/simplepay/payment" method="post" acceptCharset="utf-8" >
        <Button
            name={`pay-${modelName || 'default'}`}
            color={color || 'primary'}
            variant={variant || 'contained'}
            fullWidth={fullWidth || true}
            data-text="Pay"
            type='submit'
            disabled={data.checkPayment === 'true'}
        >
            {label}&nbsp;{sum}&nbsp;₽
            </Button>
        <input name="orderDetails" type="hidden" value={orderId} />
        <input name="cps_email" type="hidden" value={userEmail} />
        <input name="shopSuccessURL" type="hidden" value={location} />
        <input name="shopFailURL" type="hidden" value={location} />
        <input name="sum" type="hidden" step="any" value={sum} />
        <input name="shopId" type="hidden" value={yooShopId} />
    </form>
    <script src="https://yookassa.ru/integration/simplepay/js/yookassa_construct_form.js"></script>
</ >
}