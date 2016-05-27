// get the data and display it on page load
$(function() {
    $.post('/fetch', {}, function(response) {
        if (response.status == 'success') {
            $('#table_data_container').html(table(response.data));
            bind_listeners();
        } else {
            console.log(response.status);
        }
    }, 'json');
});
// outputs an html table from an array of data
function table(data) {
    var table = '<table id="table" cellspacing="0">';
    var data_rows = data && data.length || 0;
    // adding columns widths for formatting
    table += '<colgroup><col width="calc(100%-70px)" /><col width="70px" /></colgroup>'
        // adding rows of data
    for (var i = 0; i < data_rows; i++) {
        table += '<tr data-id="' + (data[i]['_id'] || 0) + '"><td>';
        table += '<div class="editable">' + (data[i]['desc'] || 'error') + '</div>';
        table += '</td><td><span class="remove">remove</span></td></tr>';
    }
    table += '</table>';
    return table;
}
// binding listeners to elements
function bind_listeners() {
    // for the class remove
    $('.remove').off().on('click', function() {
        // storing the row element
        var row = $(this).closest('tr');
        // sending the id to remove in a post request
        $.post('/remove', {id: row.attr('data-id')}, function(response) {
            if (response.status == 'success') {
                row.remove();
            } else {
                console.log(response.status)
            }
        }, 'json');
    });
    // for the class editable
    $('.editable').off().on('dblclick', function() {
        // storing some values
        var element = $(this);
        var oldvalue = element.html();
        var data_id = element.closest('tr').attr('data-id');
        // replacing the text in the cell with a text box
        element.closest('td').html('<input type="text" id="live_edit"></input>');
        var live_edit = $('#live_edit');
        live_edit.focus();
        live_edit.val(oldvalue);
        // adding a blur listener to save the result
        live_edit.on('blur', function() {
            var newvalue = live_edit.val().trim();
            // sends request if the new value is not empty and has been changed
            if (newvalue && newvalue != oldvalue) {
                $.post('/edit', {id: data_id, value: newvalue}, function(response) {
                    if (response.status == 'success') {
                        // display the new value
                        live_edit.closest('td').html('<div class="editable">' + newvalue + '</div>');
                        bind_listeners();
                    } else {
                        console.log(response.status)
                    }
                }, 'json');
            } else {
                // display the old value
                live_edit.closest('td').html('<div class="editable">' + oldvalue + '</div>');
                bind_listeners();
            }
        });
    });
    // for add button
    $('#add_button').off().on('click', function() {
        field = $(this).siblings('#add_field');
        // read and reset field value
        field_value = field.val().trim();
        field.val('');
        field.blur();
        if (field_value) {
            $.post('/add', {value: field_value}, function(response) {
                if (response.status == 'success') {
                    // display the new value
                    var new_row = '<tr data-id="' + (response.id || 0) + '"><td><div class="editable">' + field_value + '</div></td><td><span class="remove">remove</span></td></tr>';
                    $('#table').append(new_row);
                    bind_listeners();
                } else {
                    console.log(response.status)
                }
            }, 'json');
        }
    });
}
