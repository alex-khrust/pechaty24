<?php

// подключаем файл настроек
require_once dirname(__FILE__) . '/process_settings.php';

// открываем сессию
session_start();

// переменная, хранящая основной статус обработки формы
$data['result'] = 'success';

// функция для проверки количество символов в тексте
function checkTextLength($text, $minLength, $maxLength)
{
    $result = false;
    $textLength = mb_strlen($text, 'UTF-8');
    if (($textLength >= $minLength) && ($textLength <= $maxLength)) {
        $result = true;
    }
    return $result;
}

// обрабатывать будем только ajax запросы
if (empty($_SERVER['HTTP_X_REQUESTED_WITH']) || $_SERVER['HTTP_X_REQUESTED_WITH'] != 'XMLHttpRequest') {
    exit();
}
// обрабатывать данные будет только если они посланы методом POST
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    exit();
}

// сбор данных с формы
$pagetitle = filter_var( @$_POST['pagetitle'], FILTER_SANITIZE_STRING );
$selmak = filter_var( @$_POST['selmak'], FILTER_SANITIZE_STRING );
$selosn = filter_var( @$_POST['selosn'], FILTER_SANITIZE_STRING );
$urgency = filter_var( @$_POST['urgency'], FILTER_SANITIZE_STRING );
$delivery = filter_var( @$_POST['delivery'], FILTER_SANITIZE_STRING );
$address = filter_var( @$_POST['pvz-address'], FILTER_SANITIZE_STRING );
$total_price = @$_POST['total-price'];

switch ($urgency) {
	case "tomorrow": $urgency_text = "На завтра"; break;
	case "today": $urgency_text = "На сегодня"; break;
	case "urgent": $urgency_text = "Срочно"; break;
	default: $urgency_text = "-";
}
switch ($delivery) {
	case "metro": $delivery_text = "До метро курьером"; break;
	case "courier": $delivery_text = "По адресу"; break;
	case "pvz": $delivery_text = "ПВЗ: " . $address; break;
	default: $delivery_text = "-";
}


// валидация поля name
if (isset($_POST['name'])) {
    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING); // защита от XSS
    if (!checkTextLength($name, 2, 30)) { // проверка на количество символов в тексте
        $data['name'] = 'Поле <b>Имя</b> содержит недопустимое количество символов';
        $data['result'] = 'error';
    }
} else {
    $data['name'] = 'Поле <b>Имя</b> не заполнено';
    $data['result'] = 'error';
}
//валидация поля phone
if (!empty($_POST['phone'])) {
    $phone = preg_replace('/\D/', '', $_POST['phone']); //получить номер телефона (цифры) из строки
    if (!preg_match('/^(8|7)(\d{10})$/', $phone)) {
      $data['phone'] = 'Поле Телефон содержит не корректный номер!';
      $data['result'] = 'error';
    }
}

//валидация поля email
if (isset($_POST['email'])) {
    if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) { // защита от XSS
        $data['email'] = 'Поле <b>Email</b> имеет не корректный адрес';
        $data['result'] = 'error';
    } else {
        $email = $_POST['email'];
    }
} else {
    $data['email'] = 'Поле <b>Email</b> не заполнено';
    $data['result'] = 'error';
}

//валидация поля message
if (isset($_POST['message'])) {
    $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING); // защита от XSS
    if (!checkTextLength($message, 0, 500)) { // проверка на количество символов в тексте
        $data['message'] = 'Поле <b>Сообщение</b> содержит недопустимое количество символов';
        $data['result'] = 'error';
    }
} else {
    $data['message'] = 'Поле <b>Сообщение</b> не заполнено';
    $data['result'] = 'error';
}


// валидация файлов
if (isset($_FILES['files'])) {
    // перебор массива $_FILES['attachment']
    foreach ($_FILES['files']['error'] as $key => $error) {
        // если файл был успешно загружен на сервер (ошибок не возникло), то...
        if ($error == UPLOAD_ERR_OK) {
            // получаем имя файла
            $fileName = $_FILES['files']['name'][$key];
            // получаем расширение файла в нижнем регистре
            $fileExtension = mb_strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
            // получаем размер файла
            $fileSize = $_FILES['files']['size'][$key];
            // результат проверки расширения файла
            $resultCheckExtension = true;
            // проверяем расширение загруженного файла
            if (!in_array($fileExtension, $allowedExtensions)) {
                $resultCheckExtension = false;
                $data['info'][] = 'Тип файла ' . $fileName . ' не соответствует разрешенному';
                $data['result'] = 'error';
            }
            // проверяем размер файла
            if ($resultCheckExtension && ($fileSize > MAX_FILE_SIZE)) {
                $data['info'][] = 'Размер файла ' . $fileName . ' превышает 512 Кбайт';
                $data['result'] = 'error';
            }
        }
    }
    // если ошибок валидации не возникло, то...
    if ($data['result'] == 'success') {
        // переменная для хранения имён файлов
        $attachments = array();
        // перемещение файлов в директорию UPLOAD_PATH
        foreach ($_FILES['files']['name'] as $key => $attachment) {
	
	    if ($_FILES['files']['error'][$key] == UPLOAD_ERR_NO_FILE) continue;
	    
            // получаем имя файла
            $fileName = basename($_FILES['files']['name'][$key]);
            // получаем расширение файла в нижнем регистре
            $fileExtension = mb_strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
            // временное имя файла на сервере
            $fileTmp = $_FILES['files']['tmp_name'][$key];
            // создаём уникальное имя
            $fileNewName = uniqid('upload_', true) . '.' . $fileExtension;
            // перемещаем файл в директорию
            if (!move_uploaded_file($fileTmp, $uploadPath . $fileNewName)) {
                // ошибка при перемещении файла
                $data['info'][] = 'Ошибка при загрузке файлов';
                $data['result'] = 'error';
            } else {
                $attachments[] = $uploadPath . $fileNewName;
            }
        }
    }
}


// отправка формы (данных на почту)
if ($data['result'] == 'success') {
    // включить файл PHPMailerAutoload.php
    require_once('../phpmailer/PHPMailerAutoload.php');
    
    //формируем тело письма
    $bodyMail = file_get_contents('email.tpl'); // получаем содержимое email шаблона

    // добавление файлов в виде ссылок
    if (isset($attachments)) {
        $listFiles = '<ul>';
        foreach ($attachments as $attachment) {
            $fileHref = substr($attachment, strpos($attachment, 'feedback/uploads/'));
            $fileName = basename($fileHref);
            $listFiles .= '<li><a href="' . $startPath . $fileHref . '">' . $fileName . '</a></li>';
        }
        $listFiles .= '</ul>';
        $bodyMail = str_replace('%email.attachments%', $listFiles, $bodyMail);
    } else {
        $bodyMail = str_replace('%email.attachments%', '-', $bodyMail);
    }


    // выполняем замену плейсхолдеров реальными значениями
    $bodyMail = str_replace('%email.title%', MAIL_SUBJECT, $bodyMail);
    $bodyMail = str_replace('%email.nameuser%', isset($name) ? $name : '-', $bodyMail);
    $bodyMail = str_replace('%email.message%', isset($message) ? $message : '-', $bodyMail);
    $bodyMail = str_replace('%email.emailuser%', isset($email) ? $email : '-', $bodyMail);
    $bodyMail = str_replace('%email.phone%', isset($phone) ? $phone : 'не указан', $bodyMail);
    $bodyMail = str_replace('%email.date%', date('d.m.Y H:i'), $bodyMail);
    $bodyMail = str_replace('%email.pagetitle%', isset($pagetitle) ? $pagetitle : '-', $bodyMail);
    $bodyMail = str_replace('%email.selosn%', isset($selosn) ? $selosn : '-', $bodyMail);
    $bodyMail = str_replace('%email.selmak%', isset($selmak) ? $selmak : '-', $bodyMail);
    $bodyMail = str_replace('%email.urgency%', isset($urgency_text) ? $urgency_text : '-', $bodyMail);
    $bodyMail = str_replace('%email.delivery%', isset($delivery_text) ? $delivery_text : '-', $bodyMail);
    $bodyMail = str_replace('%email.totalprice%', isset($total_price) ? $total_price : '-', $bodyMail);

    // отправляем письмо с помощью PHPMailer
    $mail = new PHPMailer;
    $mail->CharSet = 'UTF-8';
    $mail->IsHTML(true);  // формат HTML
    $mail->setFrom(MAIL_FROM, MAIL_FROM_NAME);
    $mail->Subject = MAIL_SUBJECT;
    $mail->Body = $bodyMail;
    $mail->addAddress(MAIL_ADDRESS);

    // прикрепление файлов к письму
    if (isset($attachments)) {
        foreach ($attachments as $attachment) {
            $mail->addAttachment($attachment);
        }
    }

    // отправляем письмо
    if (!$mail->send()) {
        $data['result'] = 'error';
    }

    // информируем пользователя по email о доставке
    if (isset($email)) {
        // очистка всех адресов и прикреплёных файлов
        $mail->clearAllRecipients();
        $mail->clearAttachments();
        //формируем тело письма
        $bodyMail = file_get_contents('email_client.tpl'); // получаем содержимое email шаблона
        // выполняем замену плейсхолдеров реальными значениями
        $bodyMail = str_replace('%email.title%', MAIL_SUBJECT, $bodyMail);
        $bodyMail = str_replace('%email.nameuser%', isset($name) ? $name : '-', $bodyMail);
        $bodyMail = str_replace('%email.message%', isset($message) ? $message : '-', $bodyMail);
        $bodyMail = str_replace('%email.emailuser%', isset($email) ? $email : '-', $bodyMail);
        $bodyMail = str_replace('%email.phone%', isset($phone) ? $phone : 'не указан', $bodyMail);
        $bodyMail = str_replace('%email.date%', date('d.m.Y H:i'), $bodyMail);
        $bodyMail = str_replace('%email.pagetitle%', isset($pagetitle) ? $pagetitle : '-', $bodyMail);
        $bodyMail = str_replace('%email.selosn%', isset($selosn) ? $selosn : '-', $bodyMail);
        $bodyMail = str_replace('%email.selmak%', isset($selmak) ? $selmak : '-', $bodyMail);
        $bodyMail = str_replace('%email.urgency%', isset($urgency_text) ? $urgency_text : '-', $bodyMail);
        $bodyMail = str_replace('%email.delivery%', isset($delivery_text) ? $delivery_text : '-', $bodyMail);
        $mail->Subject = MAIL_SUBJECT_CLIENT;
        $mail->Body = $bodyMail;
        $mail->addAddress($email);
        $mail->send();
    }
}

// отправка данных формы в файл
if ($data['result'] == 'success') {
    $name = isset($name) ? $name : '-';
    $email = isset($email) ? $email : '-';
    $phone = isset($phone) ? $phone : '-';
    $message = isset($message) ? $message : '-';
    $output = "---------------------------------" . "\n";
    $output .= date("d-m-Y H:i:s") . "\n";
    $output .= "Имя пользователя: " . $name . "\n";
    $output .= "Адрес email: " . $email . "\n";
    $output .= "Телефон: " . $phone . "\n";
    $output .= "Сообщение: " . $message . "\n";
    $output .= "Макет: " . $selmak . "\n";
    $output .= "Оснастка: " . $selosn . "\n";
    $output .= "Срок изготовления: " . $urgency_text . "\n";
    $output .= "Доставка: " . $delivery_text . "\n";
    if (isset($attachments)) {
        $output .= "Файлы: " . "\n";
        foreach ($attachments as $attachment) {
            $output .= $attachment . "\n";
        }
    }
    if (!file_put_contents(dirname(dirname(__FILE__)) . '/info/message.txt', $output, FILE_APPEND | LOCK_EX)) {
        $data['result'] = 'error';
    }
}

// сообщаем результат клиенту
echo json_encode($data);
