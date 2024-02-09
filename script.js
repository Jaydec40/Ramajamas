document.addEventListener('scroll', function() {
    let topSection = document.getElementById('top-section');
    let scrolled = window.pageYOffset;
    let rate = scrolled * 0.5;

    topSection.style.opacity = 1 - scrolled / 400;  
    topSection.style.transform = 'translateY(' + rate + 'px)';
});

// Redirect to home
document.getElementById("menu-button").addEventListener("click", function() {
    window.location.href = "menu.html";
});


// Redirect to contact
document.getElementById("contact-button").addEventListener("click", function() {
    window.location.href = "contact.html";
});


document.addEventListener("DOMContentLoaded", function () {
    // image index
    let currentImageIndex = 0;

    // slideshow images
    const slideshowImages = document.querySelectorAll('.slideshow-image');

    
    function showNextImage() {
        
        fadeOut(slideshowImages[currentImageIndex]);

        
        setTimeout(function () {
            currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;

            
            fadeIn(slideshowImages[currentImageIndex]);
        }, 1500); // DELAY
    }


    function fadeOut(element) {
        let opacity = 1;
        const fadeOutInterval = setInterval(function () {
            if (opacity > 0) {
                opacity -= 0.1;
                element.style.opacity = opacity;
            } else {
                clearInterval(fadeOutInterval);
                element.style.display = 'none'; 
            }
        }, 100); 
    }

    
    function fadeIn(element) {
        element.style.display = 'block'; 
        let opacity = 0;
        const fadeInInterval = setInterval(function () {
            if (opacity < 1) {
                opacity += 0.1;
                element.style.opacity = opacity;
            } else {
                clearInterval(fadeInInterval);
            }
        }, 100); 
    }


    setInterval(showNextImage, 4000);
});
