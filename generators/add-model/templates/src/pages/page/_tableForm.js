const model = '<%=small_model%>';

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
        <% fields.forEach(function(field){ %>{
            name: '<%= field[0] %>',
            label: theme.props.models[model].<%= field[0] %>,
            options: {
                filter: true,
                sort: false,
                sortThirdClickReset: true,
                sortDescFirst: false,
            }
        },
        <% }) %>
    ]
}

export default tableFields;