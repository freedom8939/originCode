$(document).ready(function () {

    changeColor();
    let userLoginState = Cookies.get('userLoginState'); //获取cookie

    $('ul.ul-table li a').on('click', function (e) {
        e.preventDefault();
        var pageUrl = $(this).attr('href');
        $('#myFrame').attr('src', pageUrl); // 更新 iframe 的 src 属性

    });

    if (userLoginState != null) {
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
    //搜索
    let search = document.querySelector('.searchImg');
    let searchText = document.getElementById('search_text');
    search.addEventListener('click', function () {
        const searchContent = searchText.value
        let temp = searchContent.trim();
        if (temp.length >0){
            alert('开始搜索')
        }else{
            let failsearch = document.getElementById('failSearch');
            failsearch.textContent = '搜索失败';
            failsearch.style.display = 'block';
            setTimeout(()=>{
                failsearch.style.display = 'none';
            },400)
        }
    })
    function changeColor(){
        //初始化颜色
        let songCells = document.querySelectorAll('li');
        songCells[0].style.backgroundColor = '#000000';
        //维护css选择上方的黑色
        songCells.forEach(function (e) {
            e.addEventListener('click', function () {
                //取消其他的颜色
                songCells.forEach(function (cell) {
                    cell.style.backgroundColor = ''; // 重置所有元素的颜色
                });

                this.style.backgroundColor = '#000000'; // 设置你想要的颜色
            });
        });
    }
});
