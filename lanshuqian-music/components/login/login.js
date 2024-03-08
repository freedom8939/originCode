$(document).ready(function () {



    $('#loginButton').click(function () {
        window.location.href = "./components/login/login.html";
    });

    $('#loginForm').submit(function (event) {
        event.preventDefault();


        const clickedButtonClass = $(document.activeElement).attr('class');


        let a = $("#loginUsername").val();
        let b = $("#loginPassword").val()


        if (clickedButtonClass === 'tabs1') {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/api/user/login",
                data: {
                    userAccount: a,
                    userPassword: b,
                },
                success: function (response) {
                    console.log(response);
                    if (response.code === 0) {
                        console.log('登录成功');
                        //保存cookie到本地
                        let user = JSON.stringify(response.data);
                        document.cookie = "userLoginState=" + user + "; path= /";
                        // document.cookie = "userLoginState=" + user;
                        //登陆成功跳转到主界面
                        window.location.href = "../../index.html"
                    } else {
                        console.log('登录失败:' + response.message)
                    }
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });

        } else if (clickedButtonClass === 'tabs2') {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/api/user/register",
                data: {
                    userAccount: a,
                    userPassword: b,
                    checkPassword: b,
                    planetCode: Math.floor(Math.random() * (9999 - 1) + 1)
                },
                success: function (response) {
                    console.log(response);
                    if (response.code === 0) {
                        console.log('注册成功' + response.description);
                        //注册成功跳转到主界面
                        window.location.href = "../../index.html"
                    } else {
                        console.log('注册失败:' + response.description)
                    }
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });
        }
        // 清空输入框
        $('#loginUsername').val('');
        $('#loginPassword').val('');
    });
});

// 生成介于 min（包括）和 max（不包括）之间的随机整数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

var randomInt = getRandomInt(1, 99999); // 生成一个介于 1（包括）到 100（不包括）之间的随机整数
