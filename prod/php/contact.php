<?php
  // GET POSTED DATA AND DECODE JSON
  $_POST = json_decode(file_get_contents('php://input'), true);

  // VARIABLES
  $errors = array();
  $data = array();

  // EDIT THE 2 LINES BELOW AS REQUIRED
  $email_to = "lavenway@hotmail.com";

  $email_subject = "Message from Wayne's Portfolio Website Contact Form";

  $name = $_POST['name']; // required

  $email = $_POST['email']; // required

  $message = $_POST['message']; // required

  $number = $_POST['human']; // required

  //$email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';

  //$string_exp = "/^[A-Za-z .'-]+$/";

  //$randomnumber = $_POST['randomnumber'];


  // FORM VALIDATION
  if (empty($_POST['name']))
    $errors['name'] = 'Name is required.';

  if (empty($_POST['email']))
    $errors['email'] = 'Email is required.';

  if (empty($_POST['message']))
    $errors['message'] = 'Message is required.';

  if (empty($_POST['human'])) {
    $errors['human'] = 'Number is required.';
  } else {
    if($_POST['human'] !== $_POST['randomnumber']) {
      $errors['human'] = 'Number is invalid';
    }
  }

  if (!empty($errors)) {
    $data['errors']  = $errors;
    $data['errorHeaderMessage'] = 'Form data is going bad';

  } else {
    $data['successHeaderMessage'] = 'Form data is going well';
  }


  function clean_string($string) {

    $bad = array("content-type","bcc:","to:","cc:","href");

    return str_replace($bad,"",$string);

  }


  // SET EMAIL HEADERS
  $email_message = "Form details below.\n\n";

  $email_message .= "Name: ".clean_string($name)."\n";

  $email_message .= "Email: ".clean_string($email)."\n";

  $email_message .= "Comments: ".clean_string($message)."\n";

   
  // CREATE EMAIL HEADERS
  $headers = 'From: '.$email."\r\n".
   
  'Reply-To: '.$email."\r\n" .
   
  'X-Mailer: PHP/' . phpversion();
  

  // COMMENT TO STOP EMAIL SENDING
  //mail ($email_to, $email_subject, $email_message, $headers);


  // RESPONSE BACK.
  echo json_encode($data);

?>