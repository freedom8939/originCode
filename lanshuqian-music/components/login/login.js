$(document).ready(function () {

    $('#loginButton').click(function () {
        window.location.href = "./components/login/login.html";
    });

    $('#loginForm').submit(function (event) {
        event.preventDefault();
        const clickedButtonClass = $(document.activeElement).attr('class');
        let a = $("#loginUsername").val();
        let b = $("#loginPassword").val();
        let datas = {
            userAccount: a,
            userPassword: b,
        };
        if (clickedButtonClass === 'tabs1') {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/api/user/login",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(datas),
                success: function (response) {
                    if (response.data == null) {
                        // console.log('登录失败:' + response.message)
                        //显示登录失败提示框
                        $('#errorMessage').text('登录失败/账号或密码错误 ').show();
                        // 延迟1秒后隐藏错误提示框
                        setTimeout(function () {
                            $('#errorMessage').hide();
                        }, 1000); // 1000毫秒 = 1秒


                    } else {
                        //登陆成功
                        console.log(response.data)
                        let user = JSON.stringify(response.data);
                        document.cookie = "userLoginState=" + user + "; path= /";
                        $('#successMessage').show()
                        setTimeout(function () {
                            window.location.href = "../../index.html"
                        }, 500);
                    }
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                }
            });

        } else if (clickedButtonClass === 'tabs2') {
            // console.log('注册')
            const data = {
                userAccount: a,
                userPassword: b,
                checkPassword: b,
                planetCode: Math.floor(Math.random() * (9999 - 1) + 1)
            };
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/api/user/register",
                data: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                },
                success: function (response) {
                    // console.log(response);
                    if (response.message == 'ok') {
                        // console.log('注册成功' + response.description);
                        $('#registerSuccessMessage').show();
                        setTimeout(function () {
                            $('#successMessage').hide();
                        }, 1000);
                        //注册成功直接缓存cookie
                        let data = {
                            userAccount: a,
                            userPassword: b,
                        };
                        $.ajax({
                            type: "POST",
                            url: "http://localhost:8080/api/user/login",
                            data: JSON.stringify(datas),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            success: function (response) {

                                // console.log(response);
                                if (response.code === 0) {
                                    //保存cookie到本地
                                    let user = JSON.stringify(response.data);
                                    document.cookie = "userLoginState=" + user + "; path= /";
                                }
                            },
                            error: function (xhr, status, error) {
                                console.error(xhr.responseText);
                            }
                        });
                        //
                        setTimeout(function () {
                            window.location.href = "../../index.html"
                        }, 500);
                    } else {
                        // console.log('注册失败: ' + response.description);
                        //显示注册失败提示框
                        $('#registerFailMessage').text('注册失败: ' + response.description).show();
                        // 延迟1秒后隐藏错误提示框
                        setTimeout(function () {
                            $('#registerFailMessage').hide();
                        }, 1000); // 1000毫秒 = 1秒
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

const randomInt = getRandomInt(1, 99999); // 生成一个介于 1（包括）到 100（不包括）之间的随机整数
