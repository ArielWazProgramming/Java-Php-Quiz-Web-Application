<?php

function readUsers(){
	// Open the file
	$filename = "users.txt";
	$fp = @fopen($filename, 'r'); 

	$members = array();

	while (!feof($fp)) {
	   $user = fgets($fp);
	   if($user!=""){
		   $members[explode(",", $user)[0]] = trim(explode(",", $user)[1]);
		}
	}

	return $members;
}

function validate($users){
	$uname = isset($_POST['user']) ? $_POST['user'] : "";
	$pass = isset($_POST['pass']) ? $_POST['pass'] : "";

	

	if($uname==""){
		echo '{"code": 0, "message": "Invalid user"}';
		return;
	}


	if($users[$uname] == $pass){
		echo '{"code": 1, "message": "Valid user"}';
	}
	else{
		echo '{"code": 0, "message": "Invalid user"}';
	}
}

$users = readUsers();
@validate($users);

