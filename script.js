// Initialize the scripts 
document.addEventListener('DOMContentLoaded', function() {
    // Scroll effect for Top Section
    document.addEventListener('scroll', function() {
        let topSection = document.getElementById('top-section');
        if (topSection) {
            let scrolled = window.pageYOffset;
            let rate = scrolled * 0.5;

            topSection.style.opacity = 1 - scrolled / 400;
            topSection.style.transform = 'translateY(' + rate + 'px)';
        }
    });

    
    // Menu Button
    const menuButton = document.getElementById("menu-button");
    if (menuButton) {
        menuButton.addEventListener("click", function() {
            window.location.href = "menu.html";
        });
    }

    // Contact Button
    const contactButton = document.getElementById("contact-button");
    if (contactButton) {
        contactButton.addEventListener("click", function() {
            window.location.href = "contact.html";
        });
    }

    // Order Button
    const orderButton = document.getElementById("order-button");
    if (orderButton) {
        orderButton.addEventListener("click", function() {
            window.location.href = "https://food.google.com/u/1/chooseprovider?restaurantId=/g/1trtw26m&...";
        });
    }

    // Slideshow Functionality
    const slideshowImages = document.querySelectorAll('.slideshow-image');
    let currentImageIndex = 0;

    if (slideshowImages.length > 0) {
        
        slideshowImages.forEach((img, index) => {
            img.style.opacity = 0;
            img.style.display = 'none';
        });

        // Show the first image
        slideshowImages[currentImageIndex].style.display = 'block';
        slideshowImages[currentImageIndex].style.opacity = 1;

        // Function to show the next image
        function showNextImage() {
            fadeOut(slideshowImages[currentImageIndex]);

            setTimeout(function () {
                currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
                fadeIn(slideshowImages[currentImageIndex]);
            }, 1500); // Delay between fade out and fade in
        }  

        // Fade out function
        function fadeOut(element) {
            let opacity = 1;
            element.style.opacity = opacity;
            const fadeOutInterval = setInterval(function () {
                if (opacity > 0) {
                    opacity -= 0.1;
                    element.style.opacity = opacity;
                } else {
                    clearInterval(fadeOutInterval);
                    element.style.display = 'none';
                }
            }, 100); // Adjust duration as needed
        }

        // Fade in function
       function fadeIn(element) {
            element.style.display = 'block';
            let opacity = 0;
            element.style.opacity = opacity;
            const fadeInInterval = setInterval(function () {
                if (opacity < 1) {
                    opacity += 0.1;
                    element.style.opacity = opacity;
                } else {
                    clearInterval(fadeInInterval);
                }
            }, 100); // Adjust duration as needed
        }

        // Start the slideshow
        setInterval(showNextImage, 4000); // Change image every 4 seconds
    }

    // Form Submission 
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Send form data using EmailJS
            emailjs.sendForm('service_db9lnnm', 'template_9hzw0g9', this)
                .then(function() {
                    alert('Your message has been sent successfully!');
                    contactForm.reset(); // Reset the form after successful submission
                }, function(error) {
                    console.error('Failed to send message:', error);
                    alert('There was an error sending your message. Please try again later.');
                });
        });
    }
});
