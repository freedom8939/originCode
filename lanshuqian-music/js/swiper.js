document.addEventListener('DOMContentLoaded', function () {
    const swiperContainer = document.querySelector('.swiper-container');
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const slides = document.querySelectorAll('.swiper-slide');

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlidePosition() {
        const offset = currentIndex * swiperContainer.clientWidth;
        swiperWrapper.style.transform = `translateX(-${offset}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlidePosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    }

    updateSlidePosition();

    // 设置定时器每3秒切换一次图片
    setInterval(nextSlide, 3000);

    // 如果需要点击切换功能，可以保留这行代码
    swiperContainer.addEventListener('click', nextSlide); 
});
