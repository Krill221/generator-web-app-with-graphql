import React from 'react';
import { Grid } from '@material-ui/core';

const Its = ({ modelName, items, Item, query, ItemView, EditForm, InlineForm, InlineForm2, DeleteForm, options }) => {
    return <Grid name={`${modelName}-list`} container spacing={3} justify="center" alignItems="center">
        <Grid item xs={12} sm={12} md={12} ></Grid>
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