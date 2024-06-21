document.addEventListener('DOMContentLoaded', () => {
    const articlesList = document.getElementById('articles-list');
    const articleDetail = document.getElementById('article-detail');
    const articleContent = document.getElementById('article-content');

    let currentPage = 1;
    const pageSize = 10;
    let isLoading = false;
    let hasMoreArticles = true;

    function fetchArticles(page, size) {
        if (isLoading || !hasMoreArticles) return;

        isLoading = true;
        $.ajax({
            type: "get",
            url: `http://114.116.226.107:8080/api/content/list/search/${page}/${size}`,
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (response) {
                if (response.code === 0 && response.data && response.data.records) {
                    renderArticles(response.data.records);
                    if (response.data.records.length < size) {
                        hasMoreArticles = false;
                    }
                } else {
                    console.error('Failed to fetch articles:', response);
                    hasMoreArticles = false;
                }
                isLoading = false;
                console.log(response)
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
                isLoading = false;
                hasMoreArticles = false;
            }
        });
    }

    function renderArticles(articles) {
        articles.forEach(article => {
            const articleItem = document.createElement('div');
            articleItem.classList.add('article-item');

            let time = convertTimestampToReadableDate(article.ctime);

            articleItem.innerHTML = `
              <div class="dy_con">
                <div style="display: flex; align-items: center;">
                  <img width="40px" height="40px" src="${article.avatar}" alt="">
                  <span class="name_">${article.userName}</span>
                  <span class="time" style="color:grey; margin-left: auto;">${time}</span>
                </div>
                <p class="title_n">${article.title}</p>
                <div>
                    <p>${article.brief}</p>
                </div>
                <hr>
              </div>
            `;

            articleItem.addEventListener('click', () => {
                showArticleDetail(article);
            });

            articlesList.appendChild(articleItem);
        });
    }

    function showArticleDetail(article) {
        const articleId = article.id;
        const queryString = `?id=${encodeURIComponent(article.articleId)}`;
        window.location.href = `../../components/contentDetail/index.html${queryString}`;
    }

    function handleScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            fetchArticles(currentPage, pageSize);
            currentPage++;
        }
    }

    window.addEventListener('scroll', handleScroll);

    fetchArticles(currentPage, pageSize);

    function convertTimestampToReadableDate(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
        return dayjs.unix(timestamp).add(20, 'months').format(format);
    }
});
