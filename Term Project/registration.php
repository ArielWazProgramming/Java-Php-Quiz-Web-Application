<?php

$fp = fopen('registration.txt', 'a');//opens file in append mode  
fwrite($fp, $_POST['college'].", ");  
fwrite($fp, $_POST['first'].", ");  
fwrite($fp, $_POST['last'].", ");  
fwrite($fp, $_POST['user'].", ");  
fwrite($fp, $_POST['email'].", ");  
fwrite($fp, $_POST['pass']."\n");  
fclose($fp);  
  

$fp2 = fopen('users.txt', 'a');//opens file in append mode  
fwrite($fp2, $_POST['user'].", ");  
fwrite($fp2, $_POST['pass']."\n");  
fclose($fp2);  
  
echo '{"code":"1", "message":"Registration successful"}';
