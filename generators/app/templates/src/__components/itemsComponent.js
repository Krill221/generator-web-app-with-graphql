/*
WEB
*/

import React, { useEffect, useState } from 'react';
import { useItems } from '../__operations';
import { useUpdateItem, useAddItem, useDeleteItem } from '../__operations';
import { useHistory, useLocation } from 'react-router-dom';
import { ListLoading, ListError } from '../__views/LoadingView';


const CreateComponent = ({ query, CreateForm, parentObject = {}, CreateView, label }) => {
    console.log('create');

    const addHook = useAddItem(query, parentObject);
    const [activeEdit, setActiveEdit] = useState(false);
    const item = addHook.item;

    //// Router
    let history = useHistory();
    let location = useLocation();

    const setActiveEditWithRouter = (edit) => {
        if (edit) {
            history.push(`/${location.pathname.split('/').concat('new').filter(i => i !== '').join('/')}`);
        } else {
            if (activeEdit !== false) {
                history.push(`/${location.pathname.split('/').concat('new').filter(i => i !== '').slice(0, -2).join('/')}`);
            }
        }
        setActiveEdit(edit);
    }
    ////


    return <CreateView label={label} active={activeEdit} setActive={setActiveEditWithRouter} >
        <CreateForm
            item={item}
            add={addHook.add}
            active={activeEdit}
            setActive={setActiveEditWithRouter}
        />
    </CreateView>
};

const Item = React.memo(({
    item,
    query,
    ItemView,
    EditForm,
    InlineForm,
    DeleteForm,
    options
}) => {

    const updateHook = useUpdateItem(query);
    const deleteHook = useDeleteItem(query);
    const [activeEdit, setActiveEdit] = useState(false);
    const [activeDel, setActiveDel] = useState(false);
    const isNew = item.id.includes('new');

    //// Router
    let history = useHistory();
    let location = useLocation();
    let loc = location.pathname.split('/');

    useEffect(() => {
        // on load
        if (loc.find(i => i.includes('new'))) {
        } else {
            if (loc.includes(item.id)) {
                setActiveEdit(true);
            } else {
                setActiveEdit(false);
            }
        }
    }, [setActiveEdit, item.id, loc])
    const setActiveEditWithRouter = (edit) => {
        if (loc.find(i => i.includes('new'))) {
            setActiveEdit(edit);
        } else {
            if (edit) {
                history.push(`/${location.pathname.split('/').concat(item.id).filter(i => i !== '').join('/')}`);
            } else {
                history.push(`/${location.pathname.split('/').concat(item.id).filter(i => i !== '').slice(0, -2).join('/')}`);
            }
        }
    }
    ////

    return <ItemView
        isNew={isNew}
        item={item}
        activeEdit={activeEdit}
        setActiveEdit={setActiveEditWithRouter}
        activeDel={activeDel}
        setActiveDel={setActiveDel}
        options={options}
        inlineContent={
            <InlineForm
                active={activeEdit} setActive={setActiveEdit}
                item={item}
                update={updateHook.update}
                isNew={isNew}
                options={options}
            />
        }
        editContent={options.editable ?
            <EditForm
                active={activeEdit} setActive={setActiveEditWithRouter}
                item={item}
                update={updateHook.update}
                isNew={isNew}
                options={options}
            />
            : ''
        }
        deleteContent={options.deletable ?
            <DeleteForm
                active={activeDel} setActive={setActiveDel}
                item={item}
                del={deleteHook.del}
                isNew={isNew}
                options={options}
            /> : ''
        }
    />;
});

const Items = React.memo(({
    TableForm,
    items,
    query,
    ItemsView,
    ItemView,
    EditForm,
    InlineForm,
    DeleteForm,
    options
}) => {

    console.log('list');

    return <ItemsView
        items={items}
        query={query}
        Item={Item}
        ItemView={ItemView}
        EditForm={EditForm}
        InlineForm={InlineForm}
        DeleteForm={DeleteForm}
        TableForm={TableForm}
        options={options}
    />
});

const ItemsComponent = ({
    TableForm,
    query,
    parentObject,
    Loading,
    Error,
    ItemsView,
    ItemView,
    EditForm,
    InlineForm,
    DeleteForm,
    options
}) => {

    const { loading, error, items } = useItems(query, parentObject);

    if (error) return Loading ? <Loading /> : <ListLoading />;
    if (loading) return Error ? <Error /> : <ListError />;

    console.log('up');

    return <Items
        items={items}
        query={query}
        ItemsView={ItemsView}
        ItemView={ItemView}
        EditForm={EditForm}
        InlineForm={InlineForm}
        DeleteForm={DeleteForm}
        TableForm={TableForm}
        options={options}
    />;
};

export { ItemsComponent, CreateComponent };