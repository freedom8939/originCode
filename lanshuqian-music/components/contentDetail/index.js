
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    const title = document.querySelector('.title_n');
    const au = document.querySelector('#au');
    const dat = document.querySelector('#dat');
    const name = document.querySelector('#_name');
    const id1 = document.querySelector('#_p1');
    const id2 = document.querySelector('#_p2');
    const contnet_n = document.querySelector('#contnet_n');


    function convertTimestampToReadableDate(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
        return dayjs.unix(timestamp).add(20, 'months').format(format);
    }


    if (articleId) {
        $.ajax({
            type: "GET",
            url: `http://114.116.226.107:8080/api/content/${articleId}`,
            contentType: 'application/json',
            success: (res) => {
                if (res.code === 0) {
                    let markdownContent = res.data.content;
                    title.innerHTML = res.data.title
                    au.innerHTML = res.data.userName
                    dat.innerHTML = convertTimestampToReadableDate(res.data.ctime)

                    name.innerHTML = `${res.data.userName}`
                    id2.innerHTML = ""
                    id1.innerHTML = ""

                    contnet_n.innerHTML = res.data.brief;
                    // 解决 Unicode 和 UTF-8 编码共存的问题
                    let regex = "/\\u([\d\w]{4})/gi";
                    //
                    markdownContent = markdownContent.replace(regex, function (match, grp) {
                        return String.fromCharCode(parseInt(grp, 16));
                    });
                    // 去掉大量的 \\n
                    markdownContent = markdownContent.replace(/\\n/g, '\n');
                    // 使用 marked 转换 Markdown 到 HTML
                    console.log(markdownContent);
                    const htmlContent = marked(markdownContent);
                    // 获取内容容器
                    const contentDiv = document.getElementById('content');
                    // 渲染 HTML 内容
                    contentDiv.innerHTML = htmlContent;
                } else {
                    console.error('Failed to fetch article content:', res.message);
                }
            },
            error: (err) => {
                console.error('Error fetching article content:', err);
            }
        });
    } else {
        console.error('Article ID not provided.');
    }



});
