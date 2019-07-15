<?php
header('Content-type:text/html;charset=utf-8');
$severname = 'localhost';
$username ='root';
$psd ='';
$dbname ='banggou';

//构造函数建立连接
$conn =new mysqli($severname,$username,$psd,$dbname) or die('error');
?>