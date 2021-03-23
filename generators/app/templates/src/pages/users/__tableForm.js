const tableFields = (theme) => {
    return [
        {
            name: "id",
            label: theme.props.models.users.Id,
            options: {
                filter: false,
                sort: false,
                sortThirdClickReset: true,
                sortDescFirst: false,
            }
        },
        {
            name: 'username',
            label: theme.props.models.users.username,
            options: {
                filter: true,
                sort: false,
                sortThirdClickReset: true,
                sortDescFirst: false,
            }
        },
        {
            name: 'email',
            label: theme.props.models.users.email,
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