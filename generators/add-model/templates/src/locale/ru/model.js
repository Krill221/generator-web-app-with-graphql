const filelds = {<% fields.forEach(function(field){ %>
    <%= field[0] %>: "<%= field[0] %>",<% }) %>
}
export default filelds