import React from 'react';
import { List } from '@material-ui/core';

const Its = ({ models, items, Item, query, ItemView, EditForm, InlineForm, InlineForm2, DeleteForm, options}) => {
    return <List name={`${models}-list`} dense={false}>
        {items.map((item) =>
            <Item
                key={item.id}
                ItemView={ItemView}
                item={item}
                query={query}
                EditForm={EditForm}
                InlineForm={InlineForm}
                InlineForm2={InlineForm2}
                DeleteForm={DeleteForm}
                options={options}
            />
        )}
    </List>
};

export default Its;