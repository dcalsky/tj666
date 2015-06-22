<?php
	header("Content-Type: text/html; charset=utf-8");
	$con = mysql_connect("my1787637.xincache1.cn","my1787637","m3R1w9P2"); 
if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }else{
  	mysql_select_db("my1787637");
  	mysql_query('SET NAMES UTF8');
  	if($_REQUEST['action'] == 'checkAccout'){
  		$accout = $_REQUEST['accout'];
		$sql="select * from User_Base where us_accout='$accout'";
		if( $return = mysql_query($sql)){
			$row = mysql_fetch_array($return);
			mysql_free_result($return);
			if($row){
				$status = true;
			}else{
				$status = false;
			}
			print(json_encode(array('status' => $status)));
		}
  	}
  	if($_REQUEST['action'] == 'login'){
  		$accout = $_REQUEST['accout'];
  		$password = $_REQUEST['password'];
		$sql="select * from User_Base where us_accout='$accout' and us_password='$password' ";
		if( $return = mysql_query($sql) ) {
			$row = mysql_fetch_array($return);
			mysql_free_result($return);
			if(!$row){
				$status = false;
			}else{
				$status = true;
			}
			print(json_encode(array('status' => $status,'userMessage' => $row)));
		}
  	}
  	if($_REQUEST['action'] == 'register'){
  		$accout = $_REQUEST['accout'];
  		$password = $_REQUEST['password'];
		$sql="INSERT INTO User_Base VALUES ('$accout', '$password', '', '','','') ";
		if( mysql_query($sql)){
				$status = true;
		}else{
				$status = false;
		}	
			print(json_encode(array('status' => $status)));
  	}
  	if($_REQUEST['action'] == 'setUserMessage'){
  		$message = $_REQUEST['message'];
		$sql="update User_Base set us_name='$message[name]',us_department='$message[department]',us_QQ='$message[QQ]',us_tel='$message[tel]' where us_accout='$message[accout]' ";
		if(  mysql_query($sql)){
				$status = true;
			}else{
				$status = false;
			}
			print(json_encode(array('status' => $status)));
		}
  	}
?>