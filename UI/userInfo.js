$(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    console.log("id = " + id)
    let url = "http://localhost:9090/users/" + id
    $.ajax({
        url: url,
        method: "GET",
        success: function (result) {
            console.log(result)
            displayUserTable(result)
        },
        error: function (err) {
            console.log(err);
        }
    });
});


function displayUserTable(data) {
    var table = document.createElement('table');
    table.setAttribute("id", "userdata")
    table.setAttribute("class", "table table-dark table-striped")

    // Create header
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');
    console.log(Object.keys(data))
    Object.keys(data).forEach(function (key) {    //  Object.keys(data[0]) = keyset of 0 th row (1st row) of data
        if (key != null) {
            var th = document.createElement('th');
            th.textContent = key;
            headerRow.appendChild(th);
        }

    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create body
    var tbody = document.createElement('tbody');
    var row = document.createElement('tr');
    Object.entries(data).forEach(
        ([key, value]) => {
            console.log(key, value);
            var cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        }
    );

    // create edit button
    var editButton = document.createElement('button')
    editButton.textContent = "edit"
    editButton.addEventListener('click', () => {
        console.log("edit button clicked")
        console.log(data)
        editUser(data)
    })
    var cell = document.createElement('td');
    cell.appendChild(editButton)
    row.appendChild(cell)

    //create delete button
    var deleteButton = document.createElement('button')
    deleteButton.textContent = "delete"
    deleteButton.addEventListener('click', () => {
        console.log("delete button clicked")
        console.log("delete user of id :" + ` ${data.id}`)
        deleteUser(`${data.id}`)


    })
    var deleteButtonCell = document.createElement('td');
    deleteButtonCell.appendChild(deleteButton)
    row.appendChild(deleteButtonCell)


    tbody.appendChild(row);
    table.appendChild(tbody);
    let container = document.getElementById("userdata");
    container.replaceWith(document.getElementById("userdata"), table);
}

function editUser(data) {
    var table = $('#updateTable');      
    table.empty()   
    var tbody = $('<tbody>');
    $.each(data, function(key,val){
        console.log("key : "+key+" ; value : "+val);
        var row = $('<tr>');
        var td1 = $('<td>').text(key);
        var textbox = document.createElement("input");
        textbox.setAttribute("id",key)
        textbox.value=val
        var td2 = $('<td>');
        td2.append(textbox);
        row.append(td1);
        row.append(td2);
        tbody.append(row);
    });
     table.append(tbody);
     var r = $('<input/>').attr({
        type: "button",
        id: "update",
        value: "save",
        onclick: "updateUser("+`${data.id}`+")"
    });
    var row = $('<tr>');
    var td = $('<td>');
    td.append(r);   
    row.append(td)
    table.append(row);
}

function updateUser(id) {
    console.log("updateUser : id = "+id);
    console.log(document.getElementById("id").value)
    console.log(document.getElementById("username").value)
    console.log(document.getElementById("email").value)
    console.log(document.getElementById("password").value)
    console.log(document.getElementById("mobile").value)
    upadateData={
        username:document.getElementById("username").value,
        email:document.getElementById("email").value,
        password:document.getElementById("password").value,
        mobile:document.getElementById("mobile").value
    }
    console.log("request data: "+ upadateData.username)
    $.ajax({
        url: "http://localhost:9090/users/"+id ,
        method: "patch",
        contentType: "application/json",
        data:JSON.stringify(upadateData),
        success: function (result) {
            console.log(result)
        },
        error: function (err) {
            console.log(err);
        }
    });
}

function deleteUser(id) {
    console.log("inside delete user: id= "+id);
    var confirmation=confirm("are you sure you want to delete?")
    if (confirmation) {
        $.ajax({
            url: "http://localhost:9090/users/"+id ,
            method: "delete",
            // contentType: "application/json",
            success: function (result) {
                console.log(result)
                console.log("successfully deleted")
            },
            error: function (err) {
                console.log(err);
            }
        });    
    }   
}