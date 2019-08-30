var signin = function () {
    var data = {
        username: $("#signinusername").val(),
        password: $("#signinpassword").val()
    }
    console.log(data.username + data.password);

    $.ajax({
        type: "POST",
        url: "/admin/signin",
        data: data,
        success: function (res, textStatus, jqXHR) {
            const status = jqXHR.status;
            if (res == true) {
                window.location.href = '/admin/dashboard';
            } else {
                var oldErrorInput = document.getElementsByClassName("border-bottom-warning");
                for (i = 0; i < oldErrorInput.length; i++) {
                    oldErrorInput[i].classList.remove("border-bottom-warning");
                }
                var errorInput = document.getElementById("signin" + res.error.errorPath);
                errorInput.classList.add("border-bottom-warning");
                errorInput.focus();
                var errorMessage = document.getElementById("errorMessage")
                errorMessage.style.display = "block";
                errorMessage.innerHTML = res.error.errorText;
            }
        },

        dataType: "json"
    });

}