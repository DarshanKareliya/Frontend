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
            window.location="http://localhost:63342/frontend/UI/users.html"
        },
        error: function (err) {
            console.log(err);
        }
    });
    
}