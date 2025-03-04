/*****************************************************
 * script.js
 * - Handles:
 *   1) Page behavior (slideshow, nav clicks)
 *   2) Global cart logic (add/remove items, localStorage)
 *   3) Checkout form submission with fetch to /api/orders
 *****************************************************/

let cart = []; // global cart array

// ========== 1) PAGE BEHAVIOR / SCROLL / SLIDESHOW ==========

document.addEventListener('DOMContentLoaded', function() {

  // Scroll effect for top-section
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

  // Slideshow
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
      }, 1500);
    }  
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
      }, 100);
    }
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
      }, 100);
    }
    setInterval(showNextImage, 4000);
  }

  // ========== 2) CART INITIALIZATION ==========

  // Load cart from localStorage 
  if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
  }

  // Update cart count on page load
  updateCartCount();

  // Check if we are on the menu page => render menu
  if (document.getElementById('menu-container')) {
    renderMenu();
  }

  // Check if we are on the cart page => display the cart
  if (document.getElementById('cart-container')) {
    displayCart();
    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
      checkoutButton.addEventListener('click', function() {
      
        window.location.href = 'Checkout.html';
      });
    }
  }
  if (document.getElementById('checkout-container')) {
    displayOrderSummary();
  
    // Set minimum pickup date and time (20 minutes from now if today)
    setMinPickupDateAndTime();
  
    // Handle form submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', handleFormSubmission);
  }
  document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('checkout-container')) {
      // Display the order summary, etc.
      displayOrderSummary();
      
      
      setOperatingHours();
  
      // Handle form submission
      const checkoutForm = document.getElementById('checkout-form');
      checkoutForm.addEventListener('submit', handleFormSubmission);
    }
  });
  

  // Check if we are on the checkout page
  if (document.getElementById('checkout-container')) {
    displayOrderSummary();

    // Set min date for pickup date
    setMinPickupDate();

    // Handle form submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', handleFormSubmission);
  }

  // Cart nav link
  const cartLink = document.getElementById('cart-link');
  if (cartLink) {
    cartLink.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = 'cart.html';
    });
  }
});

// ========== 3) CART UTILS ==========

// Update the little cart count in nav
function updateCartCount() {
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById('cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }
}

// Render the menu items
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

// Open customization modal
function openCustomizationModal(itemId) {
  const item = getItemById(itemId);
  console.log("openCustomizationModal called with item:", item);
  if (!item) {
    console.error('Item not found for id:', itemId);
    return;
  }
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

    document.addEventListener('click', function(event) {
      if (event.target.classList.contains('customize-button')) {
        console.log('Customize button clicked, itemId:', event.target.dataset.itemId);
        const itemId = event.target.dataset.itemId;
        openCustomizationModal(itemId);
      }
    });
    

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
    console.log(selectedOptions);

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

function addToCart(orderItem) {
  // Ensure orderItem.options is defined; default to an empty object if not
  orderItem.options = orderItem.options || {};

  // Debug: Log the orderItem to verify its options property
  console.log('Adding to cart:', orderItem);

  // Check if an item with the same id and options already exists in the cart
  const existingItemIndex = cart.findIndex(cartItem => {
    // Ensure cart item has an options property
    cartItem.options = cartItem.options || {};
    return cartItem.id === orderItem.id &&
           JSON.stringify(cartItem.options) === JSON.stringify(orderItem.options);
  });

  if (existingItemIndex > -1) {
    // Update quantity if item already exists
    cart[existingItemIndex].quantity += orderItem.quantity;
  } else {
    // Add new item
    cart.push(orderItem);
  }

  // Update localStorage and UI
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${orderItem.name} has been added to your cart!`);
  updateCartCount();
}


// Display cart on cart.html
function displayCart() {
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = ''; // Clear previous content
  console.log("Current cart data:", cart);
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

  // Calculate totals
  const baseTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const taxRate = 0.04; // 4% tax rate
  const taxAmount = baseTotal * taxRate;
  const finalTotal = baseTotal + taxAmount;

  // Create a container to display the totals
  const totalsContainer = document.createElement('div');
  totalsContainer.classList.add('totals-container');

  const baseTotalEl = document.createElement('p');
  baseTotalEl.textContent = `Subtotal: $${baseTotal.toFixed(2)}`;
  totalsContainer.appendChild(baseTotalEl);

  const taxEl = document.createElement('p');
  taxEl.textContent = `Tax (4%): $${taxAmount.toFixed(2)}`;
  totalsContainer.appendChild(taxEl);

  const finalTotalEl = document.createElement('h2');
  finalTotalEl.textContent = `Total: $${finalTotal.toFixed(2)}`;
  totalsContainer.appendChild(finalTotalEl);

  cartContainer.appendChild(totalsContainer);

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


// Format options
function formatOptions(options) {

  if (!options) {
    return 'None';
  }

  return Object.entries(options).map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}: ${value.join(', ')}`;
    } else {
      return `${key}: ${value}`;
    }
  }).join('; ');
}

// Update quantity in cart
function updateQuantity(event) {
  const index = event.target.dataset.index;
  const newQuantity = parseInt(event.target.value);
  if (newQuantity < 1) return;

  cart[index].quantity = newQuantity;
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// Remove item
function removeFromCart(event) {
  const index = event.target.dataset.index;
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
  updateCartCount();
}



// ========== 4) CHECKOUT FUNCTIONS ==========

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

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalDisplay = document.createElement('h3');
  totalDisplay.textContent = `Total: $${totalPrice.toFixed(2)}`;
  totalDisplay.style.textAlign = 'right';

  orderSummary.appendChild(orderItemsContainer);
  orderSummary.appendChild(totalDisplay);
}

function validateForm() {
  const form = document.getElementById('checkout-form');
  let isValid = true;
  const errorMessages = [];

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

  if (pickupDate !== '' && pickupTime !== '') {
    // Combine the date and time inputs to create a Date object.
    // This assumes the inputs are in local time.
    const selectedDateTime = new Date(`${pickupDate}T${pickupTime}`);
    
    // Create a Date object representing midnight of the selected date.
    const selectedDate = new Date(`${pickupDate}T00:00`);
    const day = selectedDate.getDay(); // 0 = Sunday, 1 = Monday, …, 6 = Saturday
    
    let allowedStartHour, allowedEndHour;
    if (day === 0) { // Sunday
      allowedStartHour = 9;
      allowedEndHour = 14;
    } else { // Monday - Saturday
      allowedStartHour = 7;
      allowedEndHour = 16;
    }
    
    // Construct Date objects for the allowed start and end times on the selected day.
    const allowedStartTime = new Date(`${pickupDate}T${allowedStartHour.toString().padStart(2, '0')}:00`);
    const allowedEndTime = new Date(`${pickupDate}T${allowedEndHour.toString().padStart(2, '0')}:00`);
    
    // Debug logs so you can inspect the computed values.
    console.log("Debug: selectedDateTime:", selectedDateTime);
    console.log("Debug: allowedStartTime:", allowedStartTime);
    console.log("Debug: allowedEndTime:", allowedEndTime);
    
    if (selectedDateTime < allowedStartTime || selectedDateTime > allowedEndTime) {
      isValid = false;
      errorMessages.push(`Pickup time must be between ${allowedStartHour}:00 and ${allowedEndHour}:00 for the selected day.`);
    }
  }
  

// Check if cart is empty
if (cart.length === 0) {
  isValid = false;
  errorMessages.push('Your cart is empty.');
}

if (!isValid) {
  alert(errorMessages.join('\n'));
}

return isValid;
}

function handleFormSubmission(event) {
  event.preventDefault();

  // Calculate the base total from all cart items
  const baseTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  
  // Tax rate
  const taxRate = 0.04;
  
  // Calculate tax and final total
  const taxAmount = baseTotal * taxRate;
  const finalTotal = baseTotal + taxAmount;
  
  // Grab form data
  const form = document.getElementById('checkout-form');
  
  const bodyData = {
    customer: {
      name: form.elements['name'].value.trim(),
      email: form.elements['email'].value.trim(),
      phone: form.elements['phone'].value.trim(),
    },
    pickup: {
      date: form.elements['pickup-date'].value,
      time: form.elements['pickup-time'].value,
    },
    items: cart.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      instructions: item.instructions || '',
      options: item.options || {}  // Ensure options are included
    })),
    baseTotal: parseFloat(baseTotal.toFixed(2)),
    tax: parseFloat(taxAmount.toFixed(2)),
    total: parseFloat(finalTotal.toFixed(2)),
    orderType: document.getElementById('orderType').value
  };

  console.log("Order Payload:", JSON.stringify(bodyData, null, 2));

  // Send the order payload to your backend
fetch('https://rama-jamas.uc.r.appspot.com', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(bodyData)
})
  .then(response => response.json())
  .then(data => {
    console.log('Order submitted successfully:', data);
    window.location.href = 'confirmation.html';
  })
  .catch(error => {
    console.error('Error submitting order:', error);
    alert('There was an error submitting your order. Please try again.');
  });
}  



function setMinPickupDateAndTime() {
  const pickupDateInput = document.getElementById('pickup-date');
  const pickupTimeInput = document.getElementById('pickup-time');

  // Set today's date as the minimum date (format: YYYY-MM-DD)
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  pickupDateInput.setAttribute('min', today);

  // Function to update the min time if the selected date is today
  function updateTimeMin() {
    const selectedDate = pickupDateInput.value; // in YYYY-MM-DD
    // Check if the selected date is today
    if (selectedDate === today) {
      const nowPlus20 = new Date();
      nowPlus20.setMinutes(nowPlus20.getMinutes() + 20);
      // Format hours and minutes as two-digit numbers
      const hours = nowPlus20.getHours().toString().padStart(2, '0');
      const minutes = nowPlus20.getMinutes().toString().padStart(2, '0');
      const minTime = `${hours}:${minutes}`;
      pickupTimeInput.setAttribute('min', minTime);
    } else {
      // If a future date is selected, remove the min time restriction
      pickupTimeInput.removeAttribute('min');
    }
  }

  // Run updateTimeMin on page load
  updateTimeMin();

  // Update min time when the date is changed
  pickupDateInput.addEventListener('change', updateTimeMin);
}




// Event for the “Customize & Add” button
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('customize-button')) {
    const itemId = event.target.dataset.itemId;
    openCustomizationModal(itemId);
  }
});

function setOperatingHours() {
  const pickupDateInput = document.getElementById('pickup-date');
  const pickupTimeInput = document.getElementById('pickup-time');

  // Set today's date as the minimum date
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  pickupDateInput.setAttribute('min', today);

  function updateTimeLimits() {
    const selectedDate = pickupDateInput.value;
    if (!selectedDate) return;

    // Force local interpretation
    const localDate = new Date(selectedDate + 'T00:00');
    const day = localDate.getDay(); // Sunday=0, Monday=1, ... Saturday=6
    let allowedMin, allowedMax;

    if (day === 0) { 
      // Sunday: 9:00 AM - 2:00 PM
      allowedMin = '09:00';
      allowedMax = '14:00';
    } else { 
      // Monday - Saturday: 7:00 AM - 4:00 PM
      allowedMin = '07:00';
      allowedMax = '16:00';
    }

    // If the selected date is today, calculate now + 20 minutes
    if (selectedDate === today) {
      const nowPlus20 = new Date();
      nowPlus20.setMinutes(nowPlus20.getMinutes() + 20);
      // Get time in "HH:MM" format
      const currentMin = nowPlus20.toTimeString().slice(0,5);
      // Use the later of allowedMin and currentMin
      if (currentMin > allowedMin) {
        allowedMin = currentMin;
      }
    }

    // Set the min and max attributes on the time input
    pickupTimeInput.setAttribute('min', allowedMin);
    pickupTimeInput.setAttribute('max', allowedMax);

    // Optionally, update the placeholder so users see the allowed range
    pickupTimeInput.setAttribute('placeholder', `Between ${allowedMin} and ${allowedMax}`);
  }

  // Run on page load and when the date changes
  updateTimeLimits();
  pickupDateInput.addEventListener('change', updateTimeLimits);
}

// On DOMContentLoaded in your checkout page block:
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('checkout-container')) {
    displayOrderSummary();

    // Replace your current setMinPickupDate() call with:
    setOperatingHours();

    // Handle form submission
    const checkoutForm = document.getElementById('checkout-form');
    checkoutForm.addEventListener('submit', handleFormSubmission);
  }
});

