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
		$sql="INSERT INTO User_Base (accout,password) VALUES ('$accout', '$password') ";
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
		$sql="INSERT INTO User_Base (accout,password) VALUES ('$accout', '$password') ";
		if( mysql_query($sql)){
				$status = true;
		}else{
				$status = false;
		}	
			print(json_encode(array('status' => $status)));
  	}
  	if($_REQUEST['action'] == 'loadWish'){
  		$accout = $_REQUEST['accout'];
  		$page = $_REQUEST['page'];
  		$num = $page * 6 ;
  		if($num == 0){
			$sql="SELECT CASE WHEN accout = '$accout' THEN 1 ELSE 0 END AS mine,(CASE WHEN drawed = '$accout' THEN accout ElSE 'filter' END) as accout,(CASE WHEN drawed = '$accout' THEN contact ElSE 'filter' END) as contact,love,name,time,id,content,title,gender FROM Wall ORDER BY id DESC LIMIT 6";
  		}else{
			$sql="SELECT CASE WHEN accout = '$accout' THEN 1 ELSE 0 END AS mine,(CASE WHEN drawed = '$accout' THEN accout ElSE 'filter' END) as accout,(CASE WHEN drawed = '$accout' THEN contact ElSE 'filter' END) as contact,love,name,time,id,content,title,gender FROM Wall WHERE id<=(SELECT max(id) FROM Wall)-$num ORDER BY id DESC LIMIT 6";
  		}
		if( $return = mysql_query($sql) ) {
			$result = array();
			while($row = mysql_fetch_array($return)){
				$row['liked'] = mysql_result(mysql_query("SELECT CASE WHEN accout = '$accout' THEN 'true' ELSE 'false' END AS liked FROM Wish_Like where wish_id = $row[id] "),0);
				$drawed = mysql_result(mysql_query("select drawed from Wall where id = $row[id] "),0);
				if($drawed == $accout){
					$row['drawed'] = 'mine';
				}else if($drawed == '0'){
					$row['drawed'] = 'none';
				}else{
					$row['drawed'] = 'drawed';
				}
				if($row['mine'] == 1){
					$row['drawed'] = $drawed;
				}
				$result[] = $row ;
			}
			if(!$result){
				$status = false;
			}else{
				$status = true;
			}
		}
			print(json_encode(array('status' => $status,'wishs' => $result)));
  	}
  	if($_REQUEST['action'] == 'viewMyWish'){
  		$accout = $_REQUEST['accout'];
		$sql="select * from Wall where accout='$accout' ORDER BY id DESC ";
		if( $return = mysql_query($sql) ) {
			$result = array();
			while($row = mysql_fetch_array($return)){
				$row['mine'] = 1;
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
  	if($_REQUEST['action'] == 'viewDrawWish'){
  		$accout = $_REQUEST['accout'];
		$sql="select * from Wall where drawed='$accout' ORDER BY id DESC ";
		if( $return = mysql_query($sql) ) {
			$result = array();
			while($row = mysql_fetch_array($return)){
				$row['drawed'] = 'mine';
				$row['liked'] = mysql_result(mysql_query("SELECT CASE WHEN accout = '$accout' THEN 'true' ELSE 'false' END AS liked FROM Wish_Like where wish_id = $row[id] "),0);
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
  	if($_REQUEST['action'] == 'drawWish'){
  		$id = $_REQUEST['id'];
  		$accout = $_REQUEST['accout'];
  		$thisTime = $_REQUEST['thisTime'];
		if(mysql_result(mysql_query("select drawed from Wall where id = $id"),0) == '0'){
			$sql="update Wall set drawed = '$accout' where id = $id ";
			if(  mysql_query($sql)){
					$status = true ;
				}else{
					$status = false;
				}
			$sql="update User_Base set lastTime = '$thisTime' where accout = '$accout'";
			if( mysql_query($sql)){
			}else{
					$status = false;
			}	
			print(json_encode(array('status' => $status)));
		}else{
			print(json_encode(array('status' => false)));
		}

	}
  	if($_REQUEST['action'] == 'getSingleWish'){
  		$id = $_REQUEST['id'];
		$sql="select * from Wall where id='$id'";
		if( $return = mysql_query($sql) ) {
			$result = mysql_result($return,0);
			if(!$result){
				$status = false;
			}else{
				$status = true;
			}
			print(json_encode(array('status' => $status,'wish' => $result)));
		}
  	}
  	if($_REQUEST['action'] == 'like'){
  		$id = $_REQUEST['id'];
  		$accout = $_REQUEST['accout'];
		$sql="update Wall set love = love + 1 where id = $id ";
		if(  mysql_query($sql)){
				$status = true;
			}else{
				$status = false;
			}
		$sql="INSERT INTO Wish_Like (wish_id,accout) VALUES ($id,'$accout')";
		if(  mysql_query($sql)){
			}else{
				$status = false;
			}
			print(json_encode(array('status' => $status)));
	}
  	if($_REQUEST['action'] == 'unlike'){
  		$id = $_REQUEST['id'];
  		$accout = $_REQUEST['accout'];
		$sql="update Wall set love = love - 1 where id = $id ";
		if(  mysql_query($sql)){
				$status = true;
			}else{
				$status = false;
			}
		$sql="delete from Wish_Like where wish_id = $id and accout='$accout'";
		if(  mysql_query($sql)){
			}else{
				$status = false;
			}
			print(json_encode(array('status' => $status)));
	}
  	if($_REQUEST['action'] == 'addWish'){
  		$contact = $_REQUEST['contact'];
  		$title = $_REQUEST['title'];
  		$content = $_REQUEST['content'];
  		$accout = $_REQUEST['accout'];
  		$time = $_REQUEST['time'];
  		$gender = $_REQUEST['gender'];
  		$name = $_REQUEST['name'];
  		$thisTime = $_REQUEST['thisTime'];
		$sql="INSERT INTO Wall (accout,title,content,contact,time,gender,name) VALUES ('$accout', '$title', '$content', '$contact','$time','$gender','$name') ";
		if( mysql_query($sql)){
				$status = true;
		}else{
				$status = false;
		}	
		$sql=" update User_Base set lastTime = '$thisTime' where accout = '$accout' ";
		if( mysql_query($sql)){
		}else{
				$status = false;
		}	
			print(json_encode(array('status' => $status)));
  	}
  	if($_REQUEST['action'] == 'checkLastTime'){
  		$accout = $_REQUEST['accout'];
		$sql="select lastTime from User_Base where accout = '$accout'";
		if( $return = mysql_query($sql)){
				$status = true;
				$result = mysql_result($return, 0);
		}else{
				$status = false;
		}	
			print(json_encode(array('status' => $status,'lastTime' => $result)));
  	}
  }
?>