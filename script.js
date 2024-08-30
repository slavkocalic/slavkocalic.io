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
            videoSrc: 'Zone-2-3.mp4',
            title: 'Zone 2-3',
            description: 'Description',
            exampleUrl: 'https://youtu.be/MmOnEiqntVA?t=2561',
            textChanges: [
                { startTime: 0, endTime: 2, text: "We retreat into the zone after the center has taken position. The cooperation and synchronization between W2 and W3 is of utmost importance here. At the moment B2 receives the ball, W2 moves towards him with a block that covers the goalkeeper's left side. W3 is slightly pulled back and stands on the line between B2 and B4(trying to intercept the pass). The rest of the defense, although in pressing, is constantly involved in defense by keeping track of what's happening (hand on the shoulder, head towards the game) and ready to help at any moment." },
                { startTime: 2, endTime: 4, text: "As soon as the ball leaves B2's hand and heads towards B3, W2 moves back to the space closer to the center (ideally from where he can reach the ball with a single move), while W3 goes out with a block or jump towards B3. W3 can confidently leave the zone because he knows that the newly created 'gap' will be covered by W2." },
                { startTime: 4, endTime: 9999, text: "As soon as the ball leaves B3's hand and heads towards B4, W3 moves back to the space closer to the center (keeping in mind the amount of space in front of the center and the position of the defender). W4 keeps B4 under pressure (a body position from the side of B4 is preferred to prevent an easy pass to a dangerous shooter), and if B4 does manage to get the ball, an attempt is made to take it away without committing a foul. W4 is always on alert for B4's movement inside or a body block by B5 (at that point, communication between W5 and W4 is crucial)." }
            ]
        },
        'defense2': {
            videoSrc: 'animations/defense2.mp4',
            title: 'Zone 2-3',
            description: 'Description',
            exampleUrl: 'https://youtu.be/36a-fxnLTKI?t=1549'
            
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
