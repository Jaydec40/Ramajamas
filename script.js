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
            emailjs.sendForm('service_db9lnnm', 'ramas_confirmation1', this)
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


// Global variables
let cart = [];

// Load cart from localStorage if available
if (localStorage.getItem('cart')) {
  cart = JSON.parse(localStorage.getItem('cart'));
}

// Function to update the cart count in the navigation
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

// Function to render the menu items dynamically
function renderMenu() {
  const menuContainer = document.getElementById('menu-container');

  menuItems.forEach(category => {
    // Create category section
    const section = document.createElement('section');
    section.classList.add('menu-section');

    // Category title
    const h2 = document.createElement('h2');
    h2.textContent = category.category;
    section.appendChild(h2);

    // Items
    category.items.forEach(item => {
      const menuItem = document.createElement('div');
      menuItem.classList.add('menu-item');

      const itemDetails = document.createElement('div');
      itemDetails.classList.add('item-details');

      const itemName = document.createElement('span');
      itemName.classList.add('item-name');
      itemName.textContent = item.name;
      itemDetails.appendChild(itemName);

      const itemDescription = document.createElement('p');
      itemDescription.classList.add('item-description');
      itemDescription.textContent = item.description;
      itemDetails.appendChild(itemDescription);

      menuItem.appendChild(itemDetails);

      const itemPrice = document.createElement('span');
      itemPrice.classList.add('item-price');
      itemPrice.textContent = `$${item.price.toFixed(2)}`;
      menuItem.appendChild(itemPrice);

      // Add a button to customize and add to order
      const customizeButton = document.createElement('button');
      customizeButton.textContent = 'Customize & Add';
      customizeButton.classList.add('customize-button');
      customizeButton.dataset.itemId = item.id;
      menuItem.appendChild(customizeButton);

      section.appendChild(menuItem);
    });

    menuContainer.appendChild(section);
  });
}

// Function to open the customization modal for an item
function openCustomizationModal(itemId) {
  const item = getItemById(itemId);

  // Create modal elements
  const modalOverlay = document.createElement('div');
  modalOverlay.classList.add('modal-overlay');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const modalHeader = document.createElement('h2');
  modalHeader.textContent = `Customize ${item.name}`;
  modal.appendChild(modalHeader);

  const form = document.createElement('form');

  // Generate options
  item.options.forEach(option => {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    legend.textContent = option.name;
    fieldset.appendChild(legend);

    if (option.multiple) {
      option.choices.forEach(choice => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = option.name;
        input.value = choice;
        label.appendChild(input);
        label.appendChild(document.createTextNode(choice));
        fieldset.appendChild(label);
      });
    } else {
      option.choices.forEach(choice => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = option.name;
        input.value = choice;
        label.appendChild(input);
        label.appendChild(document.createTextNode(choice));
        fieldset.appendChild(label);
      });
    }

    form.appendChild(fieldset);
  });

  // Quantity
  const quantityLabel = document.createElement('label');
  quantityLabel.textContent = 'Quantity: ';
  const quantityInput = document.createElement('input');
  quantityInput.type = 'number';
  quantityInput.value = 1;
  quantityInput.min = 1;
  quantityLabel.appendChild(quantityInput);
  form.appendChild(quantityLabel);

  // Special Instructions
  const instructionsLabel = document.createElement('label');
  instructionsLabel.textContent = 'Special Instructions: ';
  const instructionsTextarea = document.createElement('textarea');
  instructionsLabel.appendChild(instructionsTextarea);
  form.appendChild(instructionsLabel);

  // Add to Order Button
  const addButton = document.createElement('button');
  addButton.type = 'submit';
  addButton.textContent = 'Add to Cart';
  form.appendChild(addButton);

  modal.appendChild(form);
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);

  // Close modal when clicking outside
  modalOverlay.addEventListener('click', function(event) {
    if (event.target === modalOverlay) {
      document.body.removeChild(modalOverlay);
    }
  });

  // Handle form submission
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const selectedOptions = {};
    item.options.forEach(option => {
      if (option.multiple) {
        const selected = [];
        const checkboxes = form.elements[option.name];
        if (checkboxes) {
          if (checkboxes.length) {
            for (let checkbox of checkboxes) {
              if (checkbox.checked) {
                selected.push(checkbox.value);
              }
            }
          } else if (checkboxes.checked) {
            selected.push(checkboxes.value);
          }
        }
        selectedOptions[option.name] = selected;
      } else {
        const selected = form.elements[option.name].value;
        selectedOptions[option.name] = selected;
      }
    });

    const orderItem = {
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: parseInt(quantityInput.value),
      instructions: instructionsTextarea.value,
      options: selectedOptions,
    };

    addToCart(orderItem);

    // Close modal
    document.body.removeChild(modalOverlay);
  });
}

// Function to get item by ID
function getItemById(id) {
  for (const category of menuItems) {
    for (const item of category.items) {
      if (item.id == id) {
        return item;
      }
    }
  }
  return null;
}

// Function to add item to cart
function addToCart(orderItem) {
  // Check if item with same options already exists
  const existingItemIndex = cart.findIndex(cartItem => {
    return cartItem.id === orderItem.id && JSON.stringify(cartItem.options) === JSON.stringify(orderItem.options);
  });

  if (existingItemIndex > -1) {
    // Update quantity
    cart[existingItemIndex].quantity += orderItem.quantity;
  } else {
    // Add new item
    cart.push(orderItem);
  }

  // Update localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  alert(`${orderItem.name} has been added to your cart!`);

  updateCartCount();
}

// Function to display cart contents on cart.html
function displayCart() {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = ''; // Clear previous content

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    const itemDetails = document.createElement('div');
    itemDetails.classList.add('cart-item-details');

    const itemName = document.createElement('h3');
    itemName.textContent = item.name;
    itemDetails.appendChild(itemName);

    const itemOptions = document.createElement('p');
    itemOptions.textContent = `Options: ${formatOptions(item.options)}`;
    itemDetails.appendChild(itemOptions);

    const itemInstructions = document.createElement('p');
    itemInstructions.textContent = `Special Instructions: ${item.instructions || 'None'}`;
    itemDetails.appendChild(itemInstructions);

    cartItem.appendChild(itemDetails);

    const itemControls = document.createElement('div');
    itemControls.classList.add('cart-item-controls');

    const quantityLabel = document.createElement('label');
    quantityLabel.textContent = 'Quantity: ';
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.value = item.quantity;
    quantityInput.min = 1;
    quantityInput.dataset.index = index;

    quantityInput.addEventListener('change', updateQuantity);
    quantityLabel.appendChild(quantityInput);
    itemControls.appendChild(quantityLabel);

    const itemPrice = document.createElement('p');
    itemPrice.textContent = `Price: $${(item.price * item.quantity).toFixed(2)}`;
    itemControls.appendChild(itemPrice);

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.dataset.index = index;
    removeButton.addEventListener('click', removeFromCart);
    itemControls.appendChild(removeButton);

    cartItem.appendChild(itemControls);

    cartContainer.appendChild(cartItem);
  });

  // Display total
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalDisplay = document.createElement('h2');
  totalDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`;
  cartContainer.appendChild(totalDisplay);

  // Add Empty Cart Button
  const clearCartButton = document.createElement('button');
  clearCartButton.textContent = 'Empty Cart';
  clearCartButton.addEventListener('click', function() {
    cart = [];
    localStorage.removeItem('cart');
    displayCart();
    updateCartCount();
  });
  cartContainer.appendChild(clearCartButton);

  // Disable checkout button if cart is empty
  const checkoutButton = document.getElementById('checkout-button');
  if (checkoutButton) {
    checkoutButton.disabled = cart.length === 0;
  }
}

// Helper function to format options for display
function formatOptions(options) {
  return Object.entries(options).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}: ${value.join(', ')}`;
    } else {
      return `${key}: ${value}`;
    }
  }).join('; ');
}

// Function to update quantity in cart
function updateQuantity(event) {
  const index = event.target.dataset.index;
  const newQuantity = parseInt(event.target.value);
  if (newQuantity < 1) return;

  cart[index].quantity = newQuantity;
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Remove item from cart
function removeFromCart(event) {
  const index = event.target.dataset.index;
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Event listener for document ready
document.addEventListener('DOMContentLoaded', function() { 

if (document.getElementById('checkout-container')) {
        setMinPickupDate();
}

    // Check if we are on the checkout page
  if (document.getElementById('checkout-container')) {
    // Display the order summary
    displayOrderSummary();

    // Handle form submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', handleFormSubmission);
  }
  // Update cart count on page load
  updateCartCount();

  // Check if we are on the menu page
  if (document.getElementById('menu-container')) {
    // Render menu
    renderMenu();
  }

  // Event for customize buttons
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('customize-button')) {
      const itemId = event.target.dataset.itemId;
      openCustomizationModal(itemId);
    }
  });

  // Check if on the cart page
  if (document.getElementById('cart-container')) {
    displayCart();

    // Handle checkout button
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
      checkoutButton.addEventListener('click', function() {
        // Implement checkout functionality or redirect to a checkout page
        alert('Proceeding to checkout...');
      });
    }
  }

  
  const cartLink = document.getElementById('cart-link');
  if (cartLink) {
    cartLink.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = 'cart.html';
    });
  }
});

function displayOrderSummary() {
    const orderSummary = document.getElementById('order-summary');
    const orderItemsContainer = document.createElement('div');
  
    if (cart.length === 0) {
      orderSummary.innerHTML = '<p>Your cart is empty.</p>';
      return;
    }
  
    cart.forEach(item => {
      const orderItem = document.createElement('div');
      orderItem.classList.add('order-item');
  
      const itemDetails = document.createElement('div');
      itemDetails.classList.add('order-item-details');
  
      const itemName = document.createElement('h3');
      itemName.textContent = `${item.name} x${item.quantity}`;
      itemDetails.appendChild(itemName);
  
      const itemOptions = document.createElement('p');
      itemOptions.textContent = `Options: ${formatOptions(item.options)}`;
      itemDetails.appendChild(itemOptions);
  
      const itemInstructions = document.createElement('p');
      itemInstructions.textContent = `Special Instructions: ${item.instructions || 'None'}`;
      itemDetails.appendChild(itemInstructions);
  
      orderItem.appendChild(itemDetails);
  
      const itemPrice = document.createElement('p');
      itemPrice.classList.add('order-item-price');
      itemPrice.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
      orderItem.appendChild(itemPrice);
  
      orderItemsContainer.appendChild(orderItem);
    });
  
    // Display total price
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalDisplay = document.createElement('h3');
    totalDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`;
    totalDisplay.style.textAlign = 'right';
  
    orderSummary.appendChild(orderItemsContainer);
    orderSummary.appendChild(totalDisplay);
  }
// Function to validate the form
function validateForm() {
    const form = document.getElementById('checkout-form');
    let isValid = true;
    const errorMessages = [];
  
    // Get form values
    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const phone = form.elements['phone'].value.trim();
    const pickupDate = form.elements['pickup-date'].value;
    const pickupTime = form.elements['pickup-time'].value;
  
    // Validate Name
    if (name === '') {
      isValid = false;
      errorMessages.push('Name is required.');
    }
  
    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      isValid = false;
      errorMessages.push('Please enter a valid email address.');
    }
  
    // Validate Phone
    const phonePattern = /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/;
    if (!phonePattern.test(phone)) {
  isValid = false;
  document.getElementById('phone-error').textContent = 'Please enter a valid phone number.';
}
  
    // Validate Pickup Date and Time
    if (pickupDate === '') {
      isValid = false;
      errorMessages.push('Pickup date is required.');
    }
  
    if (pickupTime === '') {
      isValid = false;
      errorMessages.push('Pickup time is required.');
    }
  
    // Check if cart is empty
    if (cart.length === 0) {
      isValid = false;
      errorMessages.push('Your cart is empty.');
    }
  
    // Display error messages if any
    if (!isValid) {
      alert(errorMessages.join('\n'));
    }
  
    return isValid;
  }
  
  // Handle form submission
  function handleFormSubmission(event) {
    event.preventDefault();

  // Initialize EmailJS
  (function(){
    emailjs.init('TxWfHxkiwwDm-p3Sx'); 
  })();

  
    if (validateForm()) {
      // Collect form data
      const form = document.getElementById('checkout-form');
      const name = form.elements['name'].value.trim();
      const email = form.elements['email'].value.trim();
      const phone = form.elements['phone'].value.trim();
      const pickupDate = form.elements['pickup-date'].value;
      const pickupTime = form.elements['pickup-time'].value;
  
      // Prepare order details
      const orderDetails = cart.map(item => {
        return `${item.quantity} x ${item.name} (${formatOptions(item.options)}) - $${(item.price * item.quantity).toFixed(2)}`;
      }).join('\n');
  
      const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  
      // Email parameters
      const emailParams = {
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
        pickup_date: pickupDate,
        pickup_time: pickupTime,
        order_details: orderDetails,
        total_amount: `$${totalAmount}`,
      };
  
      // Send email using EmailJS
      emailjs.send('service_db9lnnm', 'ramas_confirmation1', emailParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
  
          // Clear cart and redirect
          cart = [];
          localStorage.removeItem('cart');
          updateCartCount();
  
          alert('Thank you for your order! A confirmation email has been sent.');
          window.location.href = 'confirmation.html';
        })
        .catch(function(error) {
          console.log('FAILED...', error);
          alert('There was an error submitting your order. Please try again.');
        });
    }
  }
  
    
  // Set minimum date for pickup date input
function setMinPickupDate() {
    const pickupDateInput = document.getElementById('pickup-date');
    const today = new Date().toISOString().split('T')[0];
    pickupDateInput.setAttribute('min', today);
  }