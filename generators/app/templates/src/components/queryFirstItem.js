/*
    Example:

    <QueryFirstItem
        id={'post'}
        name={'post'}
        query={POSTS_WHERE}
        query_variables={} // not required
        hidden={values.post} // not required
        onCompleted={onComplete} // not required
        renderItem={(item, index) => <div>{item.name}</div> }
    />

 */
import { useQuery } from '@apollo/react-hooks';

export default function QueryFirstItem(props) {

    const { error, data } = useQuery(props.query, {
        variables: props.query_variables,
        onCompleted(data) {
            if (props.onCompleted !== undefined) props.onCompleted(data);
        }
    });

    //if (loading) return null;
    if (error) console.log(error);
    if (error) return null;
    let items = data ? data[Object.keys(data)[0]] : [];
    //if (props.hidden !== undefined) items = items.filter(item => !props.hidden.includes(item.id));
    if (props.hidden !== undefined) items = items.filter(props.hidden);

    return items.length > 0 ? props.renderItem(items[0], 0) : null
}