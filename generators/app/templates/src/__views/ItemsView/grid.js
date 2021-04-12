import React from 'react';
import { Grid } from '@material-ui/core';

const Its = ({ models, items, Item, query, ItemView, EditForm, InlineForm, InlineForm2, DeleteForm, options }) => {
    return <Grid name={`${models}-list`} container spacing={3} justify="center" alignItems="center">
        {items.map((item) =>
            <Grid key={item.id} item xs={12} sm={6} md={4} >
                <Item
                    ItemView={ItemView}
                    item={item}
                    query={query}
                    EditForm={EditForm}
                    InlineForm={InlineForm}
                    InlineForm2={InlineForm2}
                    DeleteForm={DeleteForm}
                    options={options}
                />
            </Grid>
        )}
    </Grid>
};

export default Its;