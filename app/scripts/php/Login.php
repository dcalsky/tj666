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
		$sql="select * from User_Base where accout='$accout'";
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
		$sql="select * from User_Base where accout='$accout' and password='$password' ";
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
		$sql="update User_Base set name='$message[name]',department='$message[department]',QQ='$message[QQ]',tel='$message[tel]' where accout='$message[accout]' ";
		if(  mysql_query($sql)){
				$status = true;
			}else{
				$status = false;
			}
			print(json_encode(array('status' => $status)));
		}
  	if($_REQUEST['action'] == 'findClassmate'){
  		$department = $_REQUEST['department'];
		$sql="select accout,QQ,tel,name from User_Base where department='$department' ";
		if( $return = mysql_query($sql) ) {
			$result = array();
			while($row = mysql_fetch_array($return)){
				$result[] = $row ;
			}
			if(!$result){
				$status = false;
			}else{
				$status = true;
			}
			print(json_encode(array('status' => $status,'classmateInfo' => $result)));
		}
  	}
  	if($_REQUEST['action'] == 'getClassinfo'){
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
  	if($_REQUEST['action'] == 'refreshWish'){
		$sql = "SELECT * FROM Wall ORDER BY id ASC LIMIT 6 ";
		if( $return = mysql_query($sql) ) {
			$result = array();
			while($row = mysql_fetch_array($return)){
				$result[] = $row ;
			}
			if(!$result){
				$status = false;
			}else{
				$status = true;
			}
			print(json_encode(array('status' => $status,'wishs' => $result)));
		}
  	}
  	if($_REQUEST['action'] == 'loadWish'){
  		$page = $_REQUEST['page'];
  		$num = $page * 6 ;
		$sql="SELECT * FROM Wall WHERE id>$num ORDER BY id ASC LIMIT 6";
		if( $return = mysql_query($sql) ) {
			$result = array();
			while($row = mysql_fetch_array($return)){
				$result[] = $row ;
			}
			if(!$result){
				$status = false;
			}else{
				$status = true;
			}
			print(json_encode(array('status' => $status,'wishs' => $result)));
		}
  	}
  	if($_REQUEST['action'] == 'viewMyWish'){
  		$accout = $_REQUEST['accout'];
		$sql="select * from Wall where accout='$accout' ";
		if( $return = mysql_query($sql) ) {
			$result = array();
			while($row = mysql_fetch_array($return)){
				$result[] = $row ;
			}
			if(!$result){
				$status = false;
			}else{
				$status = true;
			}
			print(json_encode(array('status' => $status,'wishs' => $result)));
		}
  	}
  	if($_REQUEST['action'] == 'addWish'){
  		$contact = $_REQUEST['contact'];
  		$title = $_REQUEST['title'];
  		$content = $_REQUEST['content'];
  		$accout = $_REQUEST['accout'];
  		$time = $_REQUEST['time'];
  		$gender = $_REQUEST['gender'];
		$sql="INSERT INTO Wall (accout,title,content,contact,time,gender) VALUES ('$accout', '$title', '$content', '$contact','$time','$gender') ";
		if( mysql_query($sql)){
				$status = true;
		}else{
				$status = false;
		}	
			print(json_encode(array('status' => $status)));
  	}
  }
?>