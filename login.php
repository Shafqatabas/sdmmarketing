<?php
// Include the database connection file
include 'config.php';

// Check if the form is submitted
if (isset($_POST['login'])) {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Sanitize user input to prevent SQL injection
    $email = $conn->real_escape_string($email);

    // Check if the user exists in the database
    $sql = "SELECT * FROM users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        // Verify the password (assuming it's hashed in the database)
        if (password_verify($password, $user['password'])) {
            echo "Login successful. Welcome, " . $user['name'] . "!";
            // Redirect to a dashboard or another page if needed
            // header("Location: dashboard.php");
        } else {
            echo "Invalid password.";
        }
    } else {
        echo "No user found with that email.";
    }
}
?>
