$(document).ready(function () {
    $('#loginButton').click(function () {
        window.location.href = "./components/login/login.html";
    });

    $('#loginForm').submit(function (event) {
        event.preventDefault();

        var username = $('#loginUsername').val();
        var password = $('#loginPassword').val();


        var clickedButtonClass = $(document.activeElement).attr('class');

        if (clickedButtonClass === 'tabs1') {
            console.log('用户名:', username);
            console.log('密码:', password);
            console.log('执行登录操作');

        } else if (clickedButtonClass === 'tabs2') {
            console.log('用户名:', username);
            console.log('密码:', password);
            console.log('执行注册操作');

        }

        // 清空输入框
        $('#loginUsername').val('');
        $('#loginPassword').val('');
    });
});
