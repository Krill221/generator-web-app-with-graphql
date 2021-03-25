import * as Yup from 'yup';

export const model = 'user';

export const validationSchema = Yup.object().shape({
    username: Yup.string()
        .min(2, 'Must be 2 characters or more!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Must be 6 characters or more!')
        .max(50, 'Too Long!')
        .required('Required'),
});