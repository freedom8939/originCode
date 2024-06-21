document.addEventListener('DOMContentLoaded', () => {
    const playPauseButton = document.getElementById('play-pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const currentTimeElem = document.getElementById('current-time');
    const totalTimeElem = document.getElementById('total-time');
    const progressBar = document.querySelector('.progress');
    const audio = document.getElementById('audio');
    const musicPlayer = document.getElementById('music-player');
    const footer = document.querySelector('footer');

    let isPlaying = false;

    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseButton.textContent = '▶️';
        } else {
            audio.play();
            playPauseButton.textContent = '⏸';
        }
        isPlaying = !isPlaying;
    });

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60).toString().padStart(2, '0');
        currentTimeElem.textContent = `${currentMinutes}:${currentSeconds}`;

        const totalMinutes = Math.floor(duration / 60);
        const totalSeconds = Math.floor(duration % 60).toString().padStart(2, '0');
        totalTimeElem.textContent = `${totalMinutes}:${totalSeconds}`;
    });

    audio.addEventListener('ended', () => {
        playPauseButton.textContent = '▶️';
        isPlaying = false;
        progressBar.style.width = '0%';
        currentTimeElem.textContent = '0:00';
    });

    prevButton.addEventListener('click', () => {

    });

    nextButton.addEventListener('click', () => {

    });

    window.addEventListener('scroll', () => {
        const footerTop = footer.getBoundingClientRect().top;
        const musicPlayerHeight = musicPlayer.offsetHeight;
        const windowHeight = window.innerHeight;

        if (footerTop <= windowHeight) {
            musicPlayer.style.transform = 'translateX(-50%) translateY(100%)';
        } else {
            musicPlayer.style.transform = 'translateX(-50%) translateY(0)';
        }
    });
    // 在主页面中接收来自 iframe 页面的消息
    window.addEventListener('message', function (event) {
        console.log(event.data.songPath);
            // "../../music/蓝莲花.mp3"
        //  audio.src = "../lanshuqian-music/music/10000Hours.mp3";
         audio.src = "../lanshuqian-music/" + event.data.songPath;
        // 播放音乐
        audio.play();
        playPauseButton.textContent = '⏸';
        isPlaying = !isPlaying;
    });

});
