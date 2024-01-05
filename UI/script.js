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
    let container = document.getElementById("userstable");
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
            <td><Button onclick="userRedirect(`+ data[i].id + `)">view</Button></td>
            </tr>`
        table.innerHTML += row
        console.log(typeof data[i].id)
    }
}
function userRedirect(id) {
    // window.location="http://localhost:63342/frontend/UI/userInfo.html"
    console.log("inside userRedirect")
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
    tbody.appendChild(row);
    table.appendChild(tbody);
    let container=document.getElementById("userdata");
  //  container.appendChild(table)
   container.replaceWith(document.getElementById("usertable"),table);
   // document.body.replaceWith(document.getElementById("usertable"),table);
}
