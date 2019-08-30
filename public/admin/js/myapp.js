var logout = function () {
    $.ajax({
        type: "POST",
        url: "/admin/logout",
        success: function (res) {
            console.log(res);
            if (res == true) {

                window.location.href = '/admin/signin';
            }
        },
        dataType: "json"
    });
}