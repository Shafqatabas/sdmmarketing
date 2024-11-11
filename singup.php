<?php
// Include the database connection file
include 'config.php';

// Check if the form is submitted
if (isset($_POST['signup'])) {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Sanitize and escape user input
    $name = $conn->real_escape_string($name);
    $email = $conn->real_escape_string($email);
    $password = password_hash($password, PASSWORD_BCRYPT); // Hash the password

    // Check if the email is already registered
    $checkEmail = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($checkEmail);

    if ($result->num_rows > 0) {
        echo "This email is already registered.";
    } else {
        // Insert the new user into the database
        $sql = "INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')";

        if ($conn->query($sql) === TRUE) {
            echo "Signup successful! You can now log in.";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

$conn->close();
?>
