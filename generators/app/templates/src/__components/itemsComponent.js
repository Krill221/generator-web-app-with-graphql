/*
WEB
*/

import React, { useEffect, useState } from 'react';
import { useItems } from '../__operations';
import { useUpdateItem, useAddItem, useDeleteItem } from '../__operations';
import { useHistory, useLocation } from 'react-router-dom';
import { ListLoading, ListError } from '../__views/LoadingView';


const CreateComponent = ({ query, CreateForm, parentObjects = {}, CreateView, label }) => {
    console.log('create');

    const addHook = useAddItem(query, parentObjects);
    const [activeNew, setActiveNew] = useState(false);
    const item = addHook.item;

    //// Router
    let history = useHistory();
    let location = useLocation();
    let loc = location.pathname.split('/');
    useEffect(() => {
        // on load
        if (loc.includes(item.id)) {
            setActiveNew(true);
        } else {
            setActiveNew(false);
        }

    }, [setActiveNew, item.id, loc])
    const setActiveNewWithRouter = (edit) => {
        if (edit) {
            history.push(`/${location.pathname.split('/').concat(item.id).filter(i => i !== '').join('/')}`);
        } else {
            if (activeNew !== false) {
                history.push(`/${location.pathname.split('/').concat(item.id).filter(i => i !== '').slice(0, -2).join('/')}`);
            }
        }
        setActiveNew(edit);
    }
    ////


    return <CreateView label={label} active={activeNew} setActive={setActiveNewWithRouter} >
        <CreateForm
            item={item}
            add={addHook.add}
            active={activeNew}
            setActive={setActiveNewWithRouter}
        />
    </CreateView>
};

const Item = React.memo(({
    item,
    query,
    ItemView,
    EditForm,
    InlineForm,
    InlineForm2,
    DeleteForm,
    options
}) => {

    const updateHook = useUpdateItem(query);
    const deleteHook = useDeleteItem(query);
    const [activeEdit, setActiveEdit] = useState(false);
    const [activeDel, setActiveDel] = useState(false);
    const isNew = item.id.slice(0, 3).includes('abc');

    //// Router
    let history = useHistory();
    let location = useLocation();
    let loc = location.pathname.split('/');

    useEffect(() => {
        // on load
        if (loc.includes(item.id)) {
            setActiveEdit(true);
        } else {
            setActiveEdit(false);
        }
    }, [setActiveEdit, item.id, loc])
    const setActiveEditWithRouter = (edit) => {
        if (loc.find(i => i.includes('abc'))) {
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
        inlineContent2={
            <InlineForm2
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
    modelName,
    items,
    query,
    ItemsView,
    ItemView,
    EditForm,
    InlineForm,
    InlineForm2,
    DeleteForm,
    TableForm,
    options
}) => {

    console.log('list');

    return <ItemsView
        modelName={modelName}
        items={items}
        query={query}
        Item={Item}
        ItemView={ItemView}
        EditForm={EditForm}
        InlineForm={InlineForm}
        InlineForm2={InlineForm2}
        DeleteForm={DeleteForm}
        TableForm={TableForm}
        options={options}
    />
});

const ItemsComponent = ({
    modelName,
    query,
    parentObjects,
    Loading,
    Error,
    ItemsView,
    ItemView,
    EditForm,
    InlineForm,
    InlineForm2,
    DeleteForm,
    TableForm,
    options
}) => {

    const { loading, error, items } = useItems(query, parentObjects);

    if (loading) return Loading ? <Loading /> : <ListLoading />;
    if (error) return Error ? <Error /> : <ListError />;

    console.log('up');

    return <Items
        modelName={modelName}
        items={items}
        query={query}
        ItemsView={ItemsView}
        ItemView={ItemView}
        EditForm={EditForm}
        InlineForm={InlineForm}
        InlineForm2={InlineForm2}
        DeleteForm={DeleteForm}
        TableForm={TableForm}
        options={options}
    />;
};

export { ItemsComponent, CreateComponent };