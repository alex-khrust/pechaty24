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
    <body>Письмо отправлено  <script>
    document.addEventListener("DOMContentLoaded", function () {
    // Скрипт для присвоения пункту меню класса актив при скролле
      $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        var target = this.hash;
        $target = $(target);
        $('html, body').stop().animate({
          'scrollTop': $target.offset().top
        }, 500, 'swing', function () {
          window.location.hash = target;
          $(document).on("scroll", onScroll);
        });
      });
      //menu hamburger
      $(".hamburger-btn").click(function () {
        $(this).toggleClass("active");
        $(".MainMenu").toggleClass("open");
        $("body").toggleClass("locked");
      });
      // $(".MainMenu").click(function () {
      //   $(this).removeClass("active");
      //   $(".hamburger-btn").removeClass("active");
      //   $(".MainMenu").removeClass("open");
      //   $("body").removeClass("locked");
      // });
      // ------------------------------
    })
  </script>
</body>';}
else {
  header('Refresh: 5; URL=http://www.pechaty24.ru');
	echo '<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />  <link rel="stylesheet" href="../css/app.min.css" />
</head>
    <body>Письмо не отправлено, через 5 секунд вы вернетесь на страницу YYY  <script>
    document.addEventListener("DOMContentLoaded", function () {
    // Скрипт для присвоения пункту меню класса актив при скролле
      $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");

        var target = this.hash;
        $target = $(target);
        $('html, body').stop().animate({
          'scrollTop': $target.offset().top
        }, 500, 'swing', function () {
          window.location.hash = target;
          $(document).on("scroll", onScroll);
        });
      });
      //menu hamburger
      $(".hamburger-btn").click(function () {
        $(this).toggleClass("active");
        $(".MainMenu").toggleClass("open");
        $("body").toggleClass("locked");
      });
      // $(".MainMenu").click(function () {
      //   $(this).removeClass("active");
      //   $(".hamburger-btn").removeClass("active");
      //   $(".MainMenu").removeClass("open");
      //   $("body").removeClass("locked");
      // });
      // ------------------------------
    })
  </script>
</body>';}
}
exit; /* Выход без сообщения, если поле bezspama чем-то заполнено */
?>