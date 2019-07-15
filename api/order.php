<?php
include 'conn.php';//连接数据库
$uid =isset($_GET['uid']) ? $_GET['uid'] : '';
$color =isset($_GET['color']) ? $_GET['color'] : '';
$size =isset($_GET['size']) ? $_GET['size'] : '';
$num =isset($_GET['num']) ? $_GET['num'] : '';
$gid =isset($_GET['gid']) ? $_GET['gid'] : '';

$sql ="INSERT INTO `order`(uid,color,size,num,gid) VALUES ($uid,'$color','$size',$num,$gid)";
$sql1 ="SELECT * FROM `order` WHERE uid='$uid'";
$sql2 ="SELECT * FROM `list` WHERE gid='$gid'";
// $sql3 ="UPDATE `order` SET num =$num WHERE gid =$gid AND color ='$color'";
$res =$conn->query($sql);
$res1 =$conn->query($sql1);
$res2 =$conn->query($sql2);
// $res3 =$conn->query($sql3);
$content = $res1->fetch_all(MYSQLI_ASSOC);
$content2 = $res2->fetch_all(MYSQLI_ASSOC);
// if($res3){
//     $con3 ='yes'
// }else{
//     $con3 ='no'
// }
// var_dump($res);
// $content = $res->fetch_all(MYSQLI_ASSOC);
$data =array(
    'data1'=>$content,
    'data2'=>$content2
    // 'data3'=>$con3
);
echo json_encode($data,JSON_UNESCAPED_UNICODE);

?>