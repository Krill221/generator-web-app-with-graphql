import { model } from './schema';

const tableFields = (theme) => {
    return [
        {
            name: "id",
            label: theme.props.models[model].Id,
            options: {
                filter: false,
                sort: false,
                sortThirdClickReset: true,
                sortDescFirst: false,
            }
        },
        {
            name: 'username',
            label: theme.props.models[model].username,
            options: {
                filter: true,
                sort: false,
                sortThirdClickReset: true,
                sortDescFirst: false,
            }
        },
        {
            name: 'email',
            label: theme.props.models[model].email,
            options: {
                filter: true,
                sort: false,
                sortThirdClickReset: true,
                sortDescFirst: false,
            }
        },

    ]
}

export default tableFields;