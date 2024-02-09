<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

   

    // save data to email
        $data = "Name: $name\nEmail: $email\nMessage: $message\n\n";
    file_put_contents("customer_messages.txt", $data, FILE_APPEND);

    // collection email
    $to = "ramajamas18@gmail.com";
    $subject = "New Message from Rama-Jamas Contact Form";
    $headers = "From: $email";

    mail($to, $subject, $message, $headers);

    // thank you page
    header("Location: thank_you.html");
    exit();
}
?>
