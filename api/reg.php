<?php
include 'conn.php';//连接数据库
$username =isset($_GET['name']) ? $_GET['name'] : '';
$tel =isset($_GET['tel']) ? $_GET['tel'] : '';
$pwd =isset($_GET['pwd']) ? $_GET['pwd'] : '';
$sql ="INSERT INTO `username`(name,password,tel) VALUES ('$username','$pwd','$tel')";
$res =$conn->query($sql);
$content = $res->fetch_all(MYSQLI_ASSOC);
echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>