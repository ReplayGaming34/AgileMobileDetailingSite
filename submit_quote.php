<?php
// Turn off PHP warnings/notices so they don't break JSON output
error_reporting(0);

header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Get form data safely
    $firstName = $_POST['firstName'] ?? '';
    $lastName = $_POST['lastName'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $vehicle = $_POST['vehicle'] ?? '';
    $detailType = $_POST['detailType'] ?? '';
    $services = isset($_POST['services']) ? implode(", ", $_POST['services']) : 'None';
    $message = $_POST['message'] ?? '';

    $body = "Name: $firstName $lastName\n";
    $body .= "Email: $email\n";
    $body .= "Phone: $phone\n";
    $body .= "Vehicle: $vehicle\n";
    $body .= "Detail Type: $detailType\n";
    $body .= "Additional Services: $services\n";
    $body .= "Message: $message\n";

    $response = [];

    // Email
    $to = "replaygaming34@gmail.com"; // replace with your email
    $subject = "New Quote Request from $firstName $lastName";
    $headers = "From: $email";

    $response['email'] = mail($to, $subject, $body, $headers) ? "Email sent successfully." : "Failed to send email.";

    // SMS (replace with your number and carrier)
    $smsTo = "7177566183@vtxt.net";
    $response['sms'] = mail($smsTo, "Quote Request", $body) ? "SMS sent successfully." : "Failed to send SMS.";

    // Return JSON
    echo json_encode($response);

} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}
?>


