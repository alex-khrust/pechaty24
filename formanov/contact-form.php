<?php

/* Задаем переменные */
$name = htmlspecialchars($_POST["name"]);
$email = htmlspecialchars($_POST["email"]);
$tel = htmlspecialchars($_POST["tel"]);
$website = htmlspecialchars($_POST["website"]);
$message = htmlspecialchars($_POST["message"]);
$selosnnov = htmlspecialchars($_POST["selosnnov"]);
$selmak = htmlspecialchars($_POST["selmak"]);
$bezspama = htmlspecialchars($_POST["bezspama"]);

/* Ваш адрес и тема сообщения */
$address = "0969940@mail.ru";
$sub = "Новая печать Pechaty24";

/* Формат письма */
$mes = "Новая печать Pechaty24.\n
Имя отправителя: $name 
Электронный адрес отправителя: $email
Телефон отправителя: $tel
Оснастка: $selosnnov
Макет: $selmak
Текст сообщения:
$message";


if (empty($bezspama)) /* Оценка поля bezspama - должно быть пустым*/
{
/* Отправляем сообщение, используя mail() функцию */
$from = "Reply-To: $email \r\n";
if (mail($address, $sub, $mes, $from)) {
	header("Location: ".$_SERVER["HTTP_REFERER"]);// Делаем реридект обратно
	echo '<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  <link rel="stylesheet" href="../css/app.min.css" />
</head>
    <body>Письмо отправлено  <script src="js/app.js"></script>
</body>';}
else {
  header('Refresh: 5; URL=http://www.pechaty24.ru');
	echo '<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  <link rel="stylesheet" href="../css/app.min.css" />
</head>
    <body>Письмо не отправлено, через 5 секунд вы вернетесь на страницу YYY  <script src="js/app.js"></script>
</body>';}
}
exit; /* Выход без сообщения, если поле bezspama чем-то заполнено */
?>