/*
WEB and NATIVE
*/

import { useQuery, useMutation } from '@apollo/client';
import { v4 as uuidv4 } from 'uuid';

var mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};

export const useItems = (query, parentId = {}) => {
    const { error, data, loading } = useQuery(query.GETS_WHERE, { variables: parentId });
    const items = data ? data[Object.keys(data)[0]] : [];
    return { items, loading, error };
}

export const useItem = (query, itemId) => {
    const { error, data, loading } = useQuery(query.GET, { variables: { id: itemId.id } });
    const item = data ? data[Object.keys(data)[0]] : {};
    return { item, loading, error };
}

export const useUpdateItem = (query) => {
    const [mutate] = useMutation(query.UPDATE);

    const update = item => {
        const updateName = query.UPDATE.definitions[0].name.value;
        const itemName = query.UPDATE.definitions[1].typeCondition.name.value
        const optimisticResponse = Object.fromEntries(new Map([
            [updateName, { __typename: itemName, ...item }],
            ['__typename', 'Mutation'],
        ]));

        // change for send
        const itemFields = Object.entries(item);
        const newFieldsForSend = itemFields.map(f => {
            return Object.keys(f[1]).includes('__typename') ? [f[0], f[1].id] : [f[0], f[1]]
        });
        const fields_for_send = Object.fromEntries([...new Set([...newFieldsForSend])]);

        return mutate({
            variables: fields_for_send,
            update(cache, ans) {

            },
            optimisticResponse: optimisticResponse
        });
    }
    return { update };
}


export const useAddItem = (query, parentObject = {}) => {

    const newId = mongoObjectId();
    const updateName = query.UPDATE.definitions[0].name.value;
    const itemName = query.UPDATE.definitions[1].typeCondition.name.value;
    const fields = query.UPDATE.definitions[1].selectionSet.selections.map(f => [f.name.value, f.selectionSet ? [] : '']);
    const newItem = Object.fromEntries([...new Set([...fields, ...Object.entries(parentObject)])]);
    const today = new Date().toISOString().slice(0, 10);
    newItem.id = `abc${newId.slice(3)}`;
    newItem.updatedAt = today;
    newItem.createdAt = today;

    const [mutate, { data, error }] = useMutation(query.UPDATE, {
        update(cache, ans) {
            const ansData = ans.data[Object.keys(ans.data)[0]];

            cache.modify({
                fields(existingItems = [], QueryWhere) {
                    if (QueryWhere.fieldName === `${ansData.__typename}Where`) {
                        const newItemRef = cache.writeFragment({
                            data: ansData, fragment: query.FRAGMENT_FIELDS
                        });

                        // dublicate fields
                        if (existingItems.some(
                            ref => {
                                return QueryWhere.readField('id', ref) === QueryWhere.id
                            }
                        )) {
                            return existingItems;
                        }

                        const parentName = Object.keys(parentObject)[0];
                        const parentId = parentObject[parentName];

                        // only right parent fields
                        const parent = `"${parentName}":"${parentId}"`;
                        const inParentRelation = QueryWhere.storeFieldName.includes(parent);

                        const isGlobalQuery = `${QueryWhere.fieldName}({})` === QueryWhere.storeFieldName;
                        if (!inParentRelation && !isGlobalQuery) {
                            return existingItems;
                        }
                        return [...existingItems, newItemRef];
                    } else {
                        return QueryWhere.INVALIDATE;
                    }
                },
            });
        }
    });

    const add = (item) => {
        // merge item with query fields
        const itemFields = Object.entries(item);

        // change for optimistic
        const newOptFields = itemFields.map(f => (
            f[0].includes('Id') ? [f[0], null] : [f[0], f[1]]
        ));

        const optimictic_fields = Object.fromEntries([...new Set([...fields, ...newOptFields])]);
        const today = new Date().toISOString().slice(0, 10);
        optimictic_fields.id = `new${uuidv4()}`;
        optimictic_fields.__typename = itemName;
        optimictic_fields.updatedAt = today;
        optimictic_fields.createdAt = today;
        const optimisticResponse = Object.fromEntries(new Map([
            [updateName, optimictic_fields],
            ['__typename', 'Mutation'],
        ]));

        return mutate({
            variables: { id: 'new', ...item },
            //variables: { id: 'new', ...item, ...parentObject },
            optimisticResponse: optimisticResponse
        });
    }
    return { add, item: newItem, data, error };
}

export const useDeleteItem = (query) => {

    const [mutate, { data, error }] = useMutation(query.DELETE, {
        update(cache, ans) {
            const ansData = ans.data[Object.keys(ans.data)[0]];
            cache.modify({
                fields(existingItems = [], details) {
                    if (details.fieldName.includes(`${ansData.__typename}Where`)) {
                        return existingItems.filter(
                            ItemRef => ansData.id !== details.readField('id', ItemRef)
                        );
                    } else {
                        return details.INVALIDATE;
                    }
                },
                optimistic: true,
            });
        }
    });
    const del = (item) => {
        const deleteName = query.DELETE.definitions[0].name.value;
        const itemName = query.DELETE.definitions[1].typeCondition.name.value
        const optimisticResponse = Object.fromEntries(new Map([
            [deleteName, { __typename: itemName, id: item.id }],
            ['__typename', 'Mutation'],
        ]));
        return mutate({
            variables: item,
            optimisticResponse: optimisticResponse
        });
    }
    return { del, data, error };
}