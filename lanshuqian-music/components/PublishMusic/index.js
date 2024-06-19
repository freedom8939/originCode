document.addEventListener('DOMContentLoaded', () => {
    const articlesList = document.getElementById('articles-list');
    const articleDetail = document.getElementById('article-detail');
    const articleContent = document.getElementById('article-content');
    const backButton = document.getElementById('back-button');

    let currentPage = 1;
    const pageSize = 10;
    let isLoading = false;
    let hasMoreArticles = true;

    function fetchArticles(page, size) {
        if (isLoading || !hasMoreArticles) return;

        isLoading = true;
        $.ajax({
            type: "get",
            url: `http://localhost:8080/api/content/list/search/${page}/${size}`,
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
            articleItem.innerHTML = `
                <img src="${article.coverImage}" alt="${article.title}" />
                <h2>${article.title}</h2>
                <p>${article.brief}</p>
                <div class="article-meta">
                    <img src="${article.avatar}" alt="${article.userName}" />
                    <span>${article.userName}</span>
                </div>
            `;
            articleItem.addEventListener('click', () => {
                showArticleDetail(article);
            });
            articlesList.appendChild(articleItem);
        });
    }

    function showArticleDetail(article) {
        articleContent.innerHTML = marked(article.content); // 使用 marked.js 渲染 Markdown 内容
        articlesList.classList.add('hidden');
        articleDetail.classList.remove('hidden');
    }

    backButton.addEventListener('click', () => {
        articleDetail.classList.add('hidden');
        articlesList.classList.remove('hidden');
    });

    function handleScroll() {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500) {
            fetchArticles(currentPage, pageSize);
            currentPage++;
        }
    }

    window.addEventListener('scroll', handleScroll);

    // 初始加载文章
    fetchArticles(currentPage, pageSize);
});
