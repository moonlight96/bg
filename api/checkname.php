<?php
include 'conn.php';//连接数据库
$username =isset($_GET['name']) ? $_GET['name'] : '';
$pwd =isset($_GET['password']) ? $_GET['password'] : '';
$tel =isset($_GET['tel']) ? $_GET['tel'] : '';
$sql ="SELECT * FROM username where name ='$username' ";
$sqlpwd ="SELECT * FROM username where password ='$pwd' ";
$sqltel ="SELECT * FROM username WHERE `tel` ='$tel'";
// $sqluid ="SELECT * FROM username WHERE `name` ='$username'";
$res1 =$conn->query($sqltel);
$res =$conn->query($sql);
$res2 =$conn->query($sqlpwd);

if($res->num_rows){
    $con=1;
}else{
   $con=2;
}
if($res1->num_rows){
    $con1 =3;
}else{
    $con1 =4;
}
if($res2->num_rows){
    $con2 =5;
}else{
    $con2 =6;
}
$content = $res->fetch_all(MYSQLI_ASSOC);
$data =array(
    'data'=>$con,
    'data1'=>$con1,
    'data2'=>$con2,
    'data3'=>$content
);
echo json_encode($data,JSON_UNESCAPED_UNICODE);
$res->close();
$conn->close();
?>