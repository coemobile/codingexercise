function add() {

    var input = document.getElementById('input-field');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/add', true);
    console.log(input.value);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send('task=' + input.value);
	window.location.reload();
};

function deleteData(tr) {

	var xhr = new XMLHttpRequest();
	xhr.open('POST', '/delete', true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.send('id='+tr);
	window.location.reload();

};

function edit(tr) {
	var edit = tr.childNodes[3];
	console.log(edit);
	var task = tr.childNodes[1];
	if(edit.innerHTML == 'edit')
	{
		edit.innerHTML = "done";
		task.setAttribute('contenteditable', 'true');
	}
	else
	{
		edit.innerHTML = "edit";
		task.setAttribute('contenteditable', 'false');
		var xhr = new XMLHttpRequest();
		xhr.open('POST', '/edit', true);
		xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		xhr.send(JSON.stringify({id: tr.id, task: task.innerHTML}));

	}

};

