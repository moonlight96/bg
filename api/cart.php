<?php
include 'conn.php';
$num =isset($_GET['num']) ? $_GET['num'] : '';
$color =isset($_GET['color']) ? $_GET['color'] : '';
$color1 =isset($_GET['color']) ? $_GET['color'] : '';
$gid =isset($_GET['gid']) ? $_GET['gid'] : '';
$gid1 =isset($_GET['gid']) ? $_GET['gid'] : '';
$size =isset($_GET['size']) ? $_GET['size'] : '';
$size1 =isset($_GET['size']) ? $_GET['size'] : '';

if(!$num){
    $sql1 ="DELETE FROM `order` WHERE id in ( SELECT a.id FROM ( SELECT id FROM `order` WHERE gid =$gid1 AND color ='$color1' AND size='$size1' ) AS a )";
}else{
    
$sql3 ="UPDATE `order` SET num =$num WHERE gid =$gid AND color ='$color' AND size ='$size'";
}
$res3 =$conn->query($sql3);
$res1 =$conn->query($sql1);

?>