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

//Redirect to online ordering
document.getElementById("order-button").addEventListener("click", function() {

    window.location.href = "https://food.google.com/u/1/chooseprovider?restaurantId=/g/1trtw26m&g2lbs=AIQllVzH9LTgabHOKJD6shQNScl25CZ-ic9p9Td7kaDU-e6WUX1N2f0coL9n-Ig7Ngcw2TIZO8vqKUZOVb6ctsdP7lXJLcfKQWpR0ghqUcFViizOV78153Hl36CSB_6knFxVqpSglC0myjmKDiiERhVbkLqzk2LCzQ%3D%3D&hl=en&gl&cs=1&ssta=1&fo_m=MfohQo559jFvMUOzJVpjPL1YMfZ3bInYwBDuMfaXTPp5KXh-&gei=RsjFZfKKJIqZwbkPpZ-x0As&ei=RsjFZfKKJIqZwbkPpZ-x0As&fo_s=OA&opi=89978449&orderType=2&sei=CR2lTYunBMumEcTsZ6rAyQ6F&utm_campaign&utm_source=search";
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
