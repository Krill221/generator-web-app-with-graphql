import React from 'react';
import MUIDataTable from "mui-datatables";

const optionsTable = {
    filter: true,
    filterType: "dropdown",
    selectableRows: 'none',
    fixedHeader: true,
    responsive: 'simple',
    rowsPerPageOptions: [10, 50, 100, 1000],
    rowsPerPage: 50,
    sortOrder: {
        name: 'floors',
        direction: 'asc'
    }

};


const Its = ({ TableForm, items, Item, query, ItemView, EditForm, InlineForm, DeleteForm, options }) => {


    const d = items.map(item => {
        let its = TableForm.map(column => item[column.name]);
        if (options.editable || options.deletable || options.inline) {
            its = its.concat(<Item
                ItemView={ItemView}
                item={item}
                query={query}
                EditForm={EditForm}
                InlineForm={InlineForm}
                DeleteForm={DeleteForm}
                options={options}
            />)
        }
        return its
    }
    );

    if (options.editable || options.deletable || options.inline) {
        TableForm = TableForm.concat([
            {
                name: 'id',
                label: ' ',
                options: {
                    filter: false,
                    sort: false,
                    sortThirdClickReset: true,
                    sortDescFirst: false,
                }
            }
        ]);
    }

    return <MUIDataTable
        title={''}
        columns={TableForm}
        data={d}
        options={optionsTable}
    />
};

export default Its;