  <?php
$name = $_POST['fname'];

$con = mysql_connect("a96872.mysql.mchost.ru", "a96872_pechaty", "qq11ww22ee33");
$db= mysql_select_db("a96872_comments", $con);
$sql = "SELECT * FROM status WHERE nomerzak='$name'";
$result = mysql_query($sql,$con);
$result2 = mysql_query ("UPDATE status SET count=count+1 WHERE nomerzak='$name'");
$row = mysql_fetch_array($result);
echo json_encode($row);
?>
