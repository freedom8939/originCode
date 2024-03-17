$(document).ready(function () {
    let userLoginState = Cookies.get('userLoginState'); //获取cookie

    $('ul.ul-table li a').on('click', function (e) {
        e.preventDefault();
        var pageUrl = $(this).attr('href');
        $('#myFrame').attr('src', pageUrl); // 更新 iframe 的 src 属性

    });

    if (userLoginState != null){
        $.ajax({
            url: 'http://localhost:8080/api/user/current',
            type: 'GET',
            xhrFields: {
                withCredentials: true // 允许发送 cookie
            },
            success: function (response) {
                let s = JSON.stringify(response.data);
                document.cookie = "userLoginState=" + s + "; path= /";
            }
        });
    }

    //退出登录
    $('#logoutButton').on('click', function () {
        Cookies.remove('userLoginState');
        $.ajax({
            url: 'http://localhost:8080/api/user/logout',
            type: 'POST',
            xhrFields: {
                withCredentials: true // 允许发送 cookie
            },
            success: function (response) {
                Cookies.remove('userLoginState');
                $('.welcome').hide();
                $('#loginButton').show();
            },
            error: function (xhr, status, error) {
                console.error('Logout failed:', xhr.responseText);
            }
        });
    });

});
