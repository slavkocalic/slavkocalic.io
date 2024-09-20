document.addEventListener("DOMContentLoaded", function() {   
    const parentOptions = document.querySelectorAll('.parent-option');

    // Visibility of child menu(navbar) options
    parentOptions.forEach(option => {
        option.addEventListener('click', function() {
            const childOptions = this.nextElementSibling;
            if (!childOptions.style.maxHeight || childOptions.style.maxHeight === "0px") {
                childOptions.style.maxHeight = childOptions.scrollHeight + "px";
            } else {
                childOptions.style.maxHeight = "0";
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

    //Content overflow solution
    const sidebar = document.querySelector('.sidebar');

    function checkOverflow() {
      if (sidebar.scrollHeight > sidebar.clientHeight) {
        sidebar.style.overflowY = 'scroll';
      } else {
        sidebar.style.overflowY = 'hidden';
      }
    }
    
    const dropdowns = document.querySelectorAll('.child-options');
    
    dropdowns.forEach(dropdown => {
      dropdown.addEventListener('transitionend', () => {
        checkOverflow();
      });
    });
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
});
