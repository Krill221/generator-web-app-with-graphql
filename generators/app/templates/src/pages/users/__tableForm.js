import { modelName } from './schema';

const tableFields = (theme) => {
    return [
        {
            name: "id",
            label: theme.props.models[modelName].Id,
            options: {
                filter: false,
                sort: false,
                sortThirdClickReset: true,
                sortDescFirst: false,
            }
        },
        {
            name: 'username',
            label: theme.props.models[modelName].username,
            options: {
                filter: true,
                sort: false,
                sortThirdClickReset: true,
                sortDescFirst: false,
            }
        },
        {
            name: 'email',
            label: theme.props.models[modelName].email,
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