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
    document.querySelectorAll('.child-option').forEach(option => {
        option.addEventListener('click', function () {
            const animationKey = this.getAttribute('data-animation');
            // Navigate to animations.html with the animation key as a query parameter
            window.location.href = `animation.html?animation=${animationKey}`;
        });
    });
})
