<?php
  include 'conn.php';//连接数据库

  // $gid =isset($_GET['gid']) ? isset($_GET['gid']):'666';
  // $tittle =isset($_GET['tittle'])? isset($_GET['tittle']):'';
  // $price =isset($_GET['price'])? isset($_GET['price']):'';
  // $discount =isset($_GET['discount'])? isset($_GET['discount']):'';
  // $bigImg =isset($_GET['bigImg'])? isset($_GET['bigImg']):'';
  // $smallImg =isset($_GET['smallImg'])? isset($_GET['smallImg']):'';
  // $storename =isset($_GET['storename'])? isset($_GET['storename']):'';
  $page = isset($_GET['page']) ? $_GET['page'] : '2';//页数，哪一页
  $num = isset($_GET['num']) ? $_GET['num'] : '1';//一页数据有40条
  $paixu = isset($_GET['paixu']) ? $_GET['paixu'] : '';//价格排序
  $zhekou = isset($_GET['zhekou']) ? $_GET['zhekou'] : '';//排序折扣
  $xiaoli = isset($_GET['xiaoli']) ? $_GET['xiaoli'] : '';//排序销量
  $preVal = isset($_GET['preVal']) ? $_GET['preVal'] : '';//价格区间的前一个
  $nextVal = isset($_GET['nextVal']) ? $_GET['nextVal'] : '';//价格区间的后一个
  $searchVal = isset($_GET['searchVal']) ? $_GET['searchVal'] : '';//模糊查询
  $gid =isset($_GET['gid']) ? $_GET['gid'] : '';
  $index =($page-1)*$num;
  

  
  if($paixu){
    $sql6 ="SELECT * FROM list WHERE price*discount BETWEEN $preVal AND $nextVal AND tittle LIKE '%$searchVal%'  ORDER BY price*discount $paixu LIMIT  $index,$num";
  }else if($xiaoli){
    $sql6 ="SELECT * FROM list WHERE price*discount BETWEEN $preVal AND $nextVal AND tittle LIKE '%$searchVal%'  ORDER BY volume $xiaoli LIMIT  $index,$num";
  }else if($zhekou){
    $sql6 ="SELECT * FROM list WHERE price*discount BETWEEN $preVal AND $nextVal AND tittle LIKE '%$searchVal%'  ORDER BY discount $zhekou LIMIT  $index,$num";
  }else{
    $sql6 ="SELECT * FROM list WHERE price*discount BETWEEN $preVal AND $nextVal AND tittle LIKE '%$searchVal%' LIMIT  $index,$num";
  }
  
  
  $sql7 ="SELECT * FROM list  WHERE price*discount BETWEEN $preVal AND $nextVal AND tittle LIKE '%$searchVal%' ";
  $sql8 ="SELECT * FROM list  WHERE gid ='$gid'";
  
  $res7 = $conn->query($sql7);
  $res6 = $conn->query($sql6);
  $res8 = $conn->query($sql8);
  $content6 = $res6->fetch_all(MYSQLI_ASSOC);
  $content8 = $res8->fetch_all(MYSQLI_ASSOC);
  // $sql = "selet * from goods where gid=$id";
  $data =array(
      
      'dataList'=>$content6,
      'pages'=>$res7->num_rows,
      'num'=>40,
      'data1'=>$content8
  );

  echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>