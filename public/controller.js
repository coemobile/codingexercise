function add() {
	var form = document.createElement('form');
    form.setAttribute('method', 'post');
    form.setAttribute('action', '/add');
    form.style.display = 'hidden';

    var input = document.getElementById('input-field');
    if(input.value.length != 0)
    {
	    input.setAttribute('value', input.value);
	    document.body.appendChild(form);
	    form.appendChild(input);
	    form.submit();
	}
};

function deleteData(index) {
	
};

function edit() {

};