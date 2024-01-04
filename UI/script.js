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

    Object.keys(data[0]).forEach(function (key) {   //  Object.keys(data[0]) = keyset of 0 th row (1st row) of data
        var th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
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
    let container=document.getElementById("userstable");
    container.appendChild(table)
    // document.body.appendChild(table);
}


function buildTable(data) {
    var table = document.getElementById("users")
    var headRow = `<tr>
        <th>User ID</th>
        <th>User Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Mobile No.</th>
    </tr>`
    table.innerHTML+=headRow
    for (var i = 0; i < Object.keys(data).length; i++) {
        var row = `<tr>
            <td>${data[i].id}</td>
            <td>${data[i].username}</td>
            <td>${data[i].email}</td>
            <td>${data[i].role}</td>
            <td>${data[i].mobile}</td>
            </tr>`
        table.innerHTML += row
    }
}
