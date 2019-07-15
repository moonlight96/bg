<?php
include 'conn.php';//连接数据库
$sql = "SELECT * FROM banggouindex";
$sql2 ="SELECT * FROM bgnz";
$sql3 ="SELECT * FROM bgnvz";
$sql4 ="SELECT * FROM bgtz";
$sql5 ="SELECT * FROM bgxb";
$sql6 ="SELECT * FROM list";

$res = $conn->query($sql);
  $res2 = $conn->query($sql2);
  $res3 = $conn->query($sql3);
  $res4 = $conn->query($sql4);
  $res5 = $conn->query($sql5);
  $res6 = $conn->query($sql6);
  
  $content = $res->fetch_all(MYSQLI_ASSOC);
  $content2 = $res2->fetch_all(MYSQLI_ASSOC);
  $content3 = $res3->fetch_all(MYSQLI_ASSOC);
  $content4 = $res4->fetch_all(MYSQLI_ASSOC);
  $content5 = $res5->fetch_all(MYSQLI_ASSOC);
  $content6 = $res6->fetch_all(MYSQLI_ASSOC);
  $data =array(
    'data'=>$content,
    'data2'=>$content2,
    'data3'=>$content3,
    'data4'=>$content4,
    'data5'=>$content5,
    'data6'=>$content6
  );
  echo json_encode($data,JSON_UNESCAPED_UNICODE);
  ?>