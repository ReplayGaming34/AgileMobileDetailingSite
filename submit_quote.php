<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp-relay.brevo.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'YOUR_BREVO_LOGIN';
    $mail->Password = 'YOUR_BREVO_SMTP_KEY';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('noreply@yoursite.com', 'Quote Form');
    $mail->addAddress('replaygaming34@gmail.com');

    $mail->Subject = $subject;
    $mail->Body = $body;

    $mail->send();
    $response['email'] = "Email sent successfully.";
} catch (Exception $e) {
    $response['email'] = "Mailer Error: " . $mail->ErrorInfo;
}

?>


