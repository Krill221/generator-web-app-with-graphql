import gql from 'graphql-tag';



export const MAKE_PAYMENT = gql`
    mutation($payId: String, $sum: String) {
        makePayment(payId: $payId, sum: $sum)
    }
`;

export const CHECK_PAYMENT = gql`
    query($payId: String) {
        check_payment(payId: $payId)
    }
`;