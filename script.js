document.addEventListener("DOMContentLoaded", function() {   
    const parentOptions = document.querySelectorAll('.parent-option');

    // Visibility of child menu(navbar) options
    parentOptions.forEach(option => {
        option.addEventListener('click', function() {
            const childOptions = this.nextElementSibling;
            if (childOptions.style.display === "none" || !childOptions.style.display) {
                childOptions.style.display = "flex";
            } else {
                childOptions.style.display = "none";
            }
        });
    });

    const video = document.getElementById('animation');
    const videoSource = document.getElementById('video-source');    
    const playPauseButton = document.getElementById('play-pause');
    const timeline = document.getElementById('timeline');
    const elapsedTime = document.getElementById('elapsed-time');
    const nowTime = document.getElementById('timenow');
    const animationTitle = document.getElementById('animation-title');
    const textchange = document.getElementById('textchange');
    const exampleLink = document.getElementById('example-link');

    const animationData = {
        'attack1': {
            videoSrc: 'animations/attack1.mp4',
            title: 'Attack 1',
            description: 'Description for Attack 1...',
            exampleUrl: 'https://example.com/attack1'
        },
        'attack2': {
            videoSrc: 'animations/attack2.mp4',
            title: 'Attack 2',
            description: 'Description for Attack 2...',
            exampleUrl: 'https://example.com/attack2'
        },
        'defense1': {
            videoSrc: 'Zona_3_Vanjska.mp4',
            title: 'Zone 3',
            description: 'Description for Defense 1...',
            exampleUrl: 'https://youtu.be/36a-fxnLTKI?t=1549',
            textChanges: [
                { startTime: 0, endTime: 3, text: "About this situation. What each player has to think about. Some general guidance." },
                { startTime: 3, endTime: 5, text: "Text for 0:03 to 0:5" },
                { startTime: 5, endTime: 9999, text: "Text for 0:05 and beyond" }
            ]
        },
        'defense2': {
            videoSrc: 'animations/defense2.mp4',
            title: 'Defense 2',
            description: 'Description for Defense 2...',
            exampleUrl: 'https://example.com/defense2'
        },
        // Add more animations as needed
    };

    let animation = null; // Declare animation in the global scope

    function loadAnimation(animationKey) {
        animation = animationData[animationKey];
        if (animation) {
            videoSource.src = animation.videoSrc;
            video.load(); // Reload the video with the new source
            animationTitle.textContent = animation.title;
            textchange.textContent = animation.description;
            exampleLink.href = animation.exampleUrl;

            if (animation.textChanges && animation.textChanges.length > 0) {
                textchange.textContent = animation.textChanges[0].text;
            }
        }
    }

    // Read query parameters to determine which animation to load
    const urlParams = new URLSearchParams(window.location.search);
    const animationKey = urlParams.get('animation');

    if (animationKey) {
        loadAnimation(animationKey);
    }

    // Handle click events for child options
    document.querySelectorAll('.child-option').forEach(option => {
        option.addEventListener('click', function() {
            const animationKey = this.getAttribute('data-animation');
            loadAnimation(animationKey); // Load the relevant animation data
        });
    });

    if (video) {
        video.addEventListener('loadedmetadata', function() {
            timeline.max = video.duration;
        });

        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseButton.textContent = "Pause";
            } else {
                video.pause();
                playPauseButton.textContent = "Play";
            }
        });

        playPauseButton.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playPauseButton.textContent = "Pause";
            } else {
                video.pause();
                playPauseButton.textContent = "Play";
            }
        });

        video.addEventListener('timeupdate', () => {
            const currentTime = video.currentTime;
            timeline.value = currentTime;
            const formattedTime = formatTime(currentTime);
            elapsedTime.textContent = formattedTime;
            nowTime.textContent = formattedTime;

            // Dynamically update text based on time intervals
            if (animation && animation.textChanges) {
                const textChange = animation.textChanges.find(change => currentTime >= change.startTime && currentTime < change.endTime);
                if (textChange) {
                    textchange.textContent = textChange.text;
                }
            }
        });

        timeline.addEventListener('input', () => {
            video.currentTime = timeline.value;
        });

        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }
    }
});
