$(function () {
    $.ajax({
        url: 'http://localhost:9090/users',
        method: "GET",
        success: function (result) {
            // displayFullTable(result)
            buildTable(result)
        },
        error: function (err) {
            console.log(err);
        }
    });
});


function displayFullTable(data) {
    var table = document.createElement('table');

    // Create header
    var thead = document.createElement('thead');
    var headerRow = document.createElement('tr');

    Object.keys(data[0]).forEach(function (key) {    //  Object.keys(data[0]) = keyset of 0 th row (1st row) of data
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
    data.forEach(function (rowData) {
        var row = document.createElement('tr');
        Object.values(rowData).forEach(function (value) {
            var cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    // let container = document.getElementById("userstable");
    // container.appendChild(table)
    document.body.appendChild(table);
}


function buildTable(data) {
    var table = document.getElementById("users")
    var headRow = `<tr>
        <th>User ID</th>
        <th>User Name</th> 
    </tr>`
    table.innerHTML += headRow
    for (var i = 0; i < Object.keys(data).length; i++) {
        var row = `<tr>
            <td>${data[i].id}</td>
            <td>${data[i].username}</td>
            <td><Button onclick="viewUser(`+ data[i].id + `)">view</Button></td>
            </tr>`
        table.innerHTML += row
        console.log(typeof data[i].id)
    }
}
function viewUser(id) {
    // window.location="http://localhost:63342/frontend/UI/userInfo.html"
    console.log("inside view user")
    console.log("id=" + id)
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

}

function displayUserTable(data) {
    var table = document.createElement('table');
    table.setAttribute("id","userdata")

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
    var editButton=document.createElement('button')
    editButton.textContent="edit"
    editButton.addEventListener('click',()=>{
        console.log("edit button clicked")
        editUser(data)
    })
    var cell = document.createElement('td');
    cell.appendChild(editButton)
    row.appendChild(cell)

    //create delete button
    var deleteButton=document.createElement('button')
    deleteButton.textContent="delete"
    deleteButton.addEventListener('click',()=>{
        console.log("delete button clicked")
        console.log("delete user of id :"+` ${data.id}`)
        deleteUser(`${data.id}`)
        

    })
    var deleteButtonCell = document.createElement('td');
    deleteButtonCell.appendChild(deleteButton)
    row.appendChild(deleteButtonCell)


    tbody.appendChild(row);
    table.appendChild(tbody);
    let container=document.getElementById("userdata");
   container.replaceWith(document.getElementById("usertable"),table);
}

function addUser() {
    console.log("called from form")
    var name=document.getElementById("addusername").value;
    var email=document.getElementById("addemail").value;
    var password=document.getElementById("addpassword").value;
    var mobile=document.getElementById("addmobile").value;
    console.log(name +" "+password)
    $.ajax({
        url: "http://localhost:9090/users" ,
        method: "post",
        contentType: "application/json",
        data: JSON.stringify({username:name,
            email:email,
            password:password,
            mobile:mobile
        }),
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
function editUser(data) {
    var table = $('#updateTable');
    table.empty();
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

