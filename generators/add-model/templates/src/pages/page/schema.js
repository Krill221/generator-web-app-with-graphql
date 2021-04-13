import * as Yup from 'yup';

export const modelName = '<%=small_model%>';

export const validationSchema = Yup.object().shape({
<% fields.forEach(function(f){ if(f[1] === 'String') { %>
    <%= f[0] %>: Yup.string()
        .min(1, 'Must be 1 characters or more!')
        .max(350, 'Too Long!')
        .required('Required'),
    <% }}) %>
});