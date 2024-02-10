<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validate and sanitize input
    $name = htmlspecialchars($_POST["name"]);
    $email = filter_var($_POST["email"], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST["message"]);

    // Additional validation for email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Handle invalid email address
        echo "Invalid email address. Please enter a valid email.";
        exit();
    }

    // Save the data to a file
    $data = "Name: $name\nEmail: $email\nMessage: $message\n\n";
    if (file_put_contents("customer_messages.txt", $data, FILE_APPEND)) {
        
        echo "File created successfully!";
    } else {
        // Display an error message
        echo "Error creating file!";
        exit();
    }

    // Send email
    $to = "ramajamas18@gmail.com";
    $subject = "New Message from Rama-Jamas Contact Form";
    $headers = "From: $email";

    if (mail($to, $subject, $data, $headers)) {
        // Redirect the user to a thank you page
        header("Location: thank_you.html");
        exit();
    } else {
        // Display an error message or redirect to an error page
        echo "Error sending email. Please try again.";
        exit();
    }
}
?>
