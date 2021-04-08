import React, { useEffect, useRef } from 'react';
import { Grid } from '@material-ui/core';

const Its = ({ models, items, Item, query, ItemView, EditForm, InlineForm, DeleteForm, options }) => {

    const lastEl = useRef(null);

    useEffect(() => {
        lastEl.current.scrollIntoView();
    }, [items]);

    return <Grid name={`${models}-list`} container spacing={3} justify="center" alignItems="center">
        {
            items.map((item) =>
                <Grid key={item.id} item xs={12} sm={12} md={12} >
                    <Item
                        ItemView={ItemView}
                        item={item}
                        query={query}
                        EditForm={EditForm}
                        InlineForm={InlineForm}
                        DeleteForm={DeleteForm}
                        options={options}
                    />
                </Grid>
            )
        }
        <Grid item xs={12} sm={12} md={12} ref={lastEl} />
    </Grid>
};

export default Its;