<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="ru" xmlns="http://www.w3.org/1999/xhtml">


<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=3">
  <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
<title>Акция на печати и штампы</title>


<!--Start of Zopim Live Chat Script-->
<script type="text/javascript">
window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
_.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute('charset','utf-8');
$.src='//v2.zopim.com/?1P8AIONEukShDz2ULLWqbp8DuvfYJBo4';z.t=+new Date;$.
type='text/javascript';e.parentNode.insertBefore($,e)})(document,'script');
</script>
<!--End of Zopim Live Chat Script-->

<meta name="keywords" content="заказ печати, печати дёшево">
<meta name="description" content="Акция на изготовление второй печати">
<link href="../data/core0000.css" type="text/css" rel="stylesheet">
<link href="../data/style000.css" type="text/css" rel="stylesheet">
<link href="../data/style001.css" type="text/css" rel="stylesheet">
<link href="../data/style002.css" type="text/css" rel="stylesheet">
<link href="../data/styles00.css" type="text/css" rel="stylesheet">
<link href="../data/template.css" type="text/css" rel="stylesheet">
<link rel="icon" href="http://www.pechaty24.ru/favicon.ico" type="image/x-icon">
<script type="text/javascript" src="../data/core0000.js"></script>
<script type="text/javascript" src="../data/core_aja.js"></script>
<script type="text/javascript" src="../data/session0.js"></script>
<script type="text/javascript" src="../data/script00.js"></script>
<link href="../data/main0000.htm" rel="stylesheet" type="text/css">
<link href="../data/slide000.htm" rel="stylesheet" type="text/css">
<style>
   .leftimg {
    float:left; /* Выравнивание по левому краю */
    margin: 7px 7px 7px 0; /* Отступы вокруг картинки */
   }
  </style>
  
  
  
  
  <link rel="stylesheet" href="css/app.min.css" />
</head>
  <body>

<div class="Main">
	<div id="box">
    	<div class="BoxHolder">
        	<div class="Header">
            <div class="InpBlHeader">
            	<div class="HeaderHolder">
                	<div class="Contacts">
                        <div class="Skype">
                        	<font size="4">Время работы: 9-22 часов&nbsp;</font>                        </div>
                        <div class="Message">
                                <font size="4">0969940@pechaty24.ru</font>
  <br>
                     </div>
                    </div>
                    <div class="SiteName">
	                     <a href="../"><img src="../data/sitename.png" alt="Pechaty24.ru - Изготовление печатей" title="Печати и штампы - Главная" border="0" width="329" height="48"></a>	                	<br>
                    <span>
                    	Частное изготовление печатей и штампов                    </span>
                    </div>
                    <div class="PhoneNumber">
                    	<div class="PhoneStr">
                    		
<div><strong id="ya-phone-1"> +7 (967) 096-9940</strong></div>
                    	</div>
                    </div>
                </div>
                </div>
            </div>
        <div class="MainMenu">
        	<div class="MainMenuHolder">
        	
<ul class="List">

			<li class="Item"><table><tr><td><a href="http://www.pechaty24.ru/" class="ItEl selected">Главная</a></td></tr></table></li>
				<li class="Item">
			<table>
				<tr>
					<td><a href="../price.html" class="ItEl">Цены и сроки</a></td>
				</tr>
			</table>
		</li>
				<li class="Item"><table><tr><td><a href="../osnastki.html" class="ItEl">Оснастки</a></td></tr></table></li>
                 <li class="Item"><table><tr><td><a href="../pechati_srochno.html" class="ItEl"><center>Печати срочно</center></a></td></tr></table></li>
				<li class="Item"><table><tr><td><a href="../deliv.html" class="ItEl">Доставка</a></td></tr></table></li>
				<li class="Item Active"><table><tr><td><a href="../news.html" class="ItEl">Новости</a></td></tr></table></li>
				
	</ul>
               <div class="Label"></div>
            </div>
       	</div>
        <div class="Content">
        	<table>
            	<tr>
                	<td>
                    	<div class="LeftPanel">
                        	<div class="MainPlBl">                 
                             
<?php
function send_mail()
{
$name = htmlspecialchars($_REQUEST['name']);
}
{
$email = htmlspecialchars($_REQUEST['email']);
}
$message = '<b>Имя: </b>'.$_REQUEST['name'].'<br> <b>Электронный адрес: </b>'.$_REQUEST['email'].'<br><b>Телефон: </b>'.$_REQUEST['pole_1a'].'<br><b>Оснастка: </b>'.$_REQUEST['pole_2a'].'<br><b>Макет: </b>'.$_REQUEST['pole_3a'].'<br><b>Сообщение: </b>'.$_REQUEST['mess'];
$message = iconv("utf-8", "windows-1251", $message);
include "class.phpmailer.php";// подключаем класс

$mail = new PHPMailer();
$mail->From = $_REQUEST['email'];
$mail->FromName = $_REQUEST['name'];
$mail->AddAddress('0969940@mail.ru');
$mail->IsHTML(true);
$mail->Subject = $_POST['title'];

if(isset($_FILES['files']))
{
if($_FILES['files']['error'] == 0)
{
$mail->AddAttachment($_FILES['files']['tmp_name'],$_FILES['files']['name']);
}
}
$mail->Body = $message;
if (!$mail->Send()) die ('Mailer Error: '.$mail->ErrorInfo);
{
  echo '<center><p><b>Ваш заказ получен, в ближайшее время подтверждение заказа придёт на указанный Вами электронный адрес.<br> А пока можете ознакомиться с действующими у нас акциями: </b></p></center>';
}
if (!empty($_POST['submit'])) send_mail();
?>
                          
                           
     
                             </div>
                        </div>
                    </td>
                </tr>
            </table>




        </div>
        <div class="BottomBlock">
        	<div class="BottomBlockHolder">
        		
<ul> 
 
  <li> 
    <div class="ImgNav"> 	 
      <table> 	 
        <tbody> 
          <tr><td><a href="../index.html"><img src="../data/televiso.png" alt="Изображение дома" width="96" height="104"></a></td></tr>
         </tbody>
       </table>
     </div>
   
    <div class="NavTxt"><a href="../index.html">Главная</a></div>
   </li>
 
  <li> 
    <div class="ImgNav"> 	 
      <table> 
        <tbody> 
          <tr><td><a href="../price.html"><img src="../data/books000.png" alt="Символ доллара" width="106"></a></td></tr>
         </tbody>
       </table>
     </div>
   
    <div class="NavTxt"><a href="../price.html">Цены и сроки</a></div>
   </li>
 
  <li> 
    <div class="ImgNav"> 		 
      <table> 
        <tbody> 
          <tr> 	<td><a href="../osnastki.html"><img src="../data/faq00000.jpg" alt="Изображение штампов"  height="105"></a></td> </tr>
         </tbody>
       </table>
     </div>
   
    <div class="NavTxt"><a href="../osnastki.html">Оснастки</a></div>
   </li>
 
  <li> 
    <div class="ImgNav"> 		 
      <table> 	 
        <tbody> 
          <tr><td><a href="../deliv.html"><img src="../data/stl00000.png" alt="Изображение машины доставки"  width="104" height="102"></a></td></tr>
         </tbody>
       </table>
     </div>
   
    <div class="NavTxt"><a href="../deliv.html">Доставка</a></div>
   </li>
 </ul>
<br><br><br>
            </div>
        </div>
    </div>
    <!--/div-->
    <div class="Footer">
    	<div class="FooterHolder">
        	<div class="OrderBy">
    		
 
<br><br>
<!--LiveInternet counter--><script type="text/javascript"><!--
document.write("<a href='http://www.liveinternet.ru/click' "+
"target=_blank><img src='//counter.yadro.ru/hit?t14.5;r"+
escape(document.referrer)+((typeof(screen)=="undefined")?"":
";s"+screen.width+"*"+screen.height+"*"+(screen.colorDepth?
screen.colorDepth:screen.pixelDepth))+";u"+escape(document.URL)+
";h"+escape(document.title.substring(0,80))+";"+Math.random()+
"' alt='' title='LiveInternet: показано число просмотров за 24"+
" часа, посетителей за 24 часа и за сегодня' "+
"border='0' width='88' height='31'><\/a>")
//--></script><!--/LiveInternet--><!-- Yandex.Metrika informer -->
<a href="http://metrika.yandex.ru/stat/?id=1686161&amp;from=informer"
target="_blank" rel="nofollow"><img src="//bs.yandex.ru/informer/1686161/3_0_FFFFFFFF_FFFFFFFF_0_pageviews"
style="width:88px; height:31px; border:0;" alt="Яндекс.Метрика" title="Яндекс.Метрика: данные за сегодня (просмотры, визиты и уникальные посетители)" onclick="try{Ya.Metrika.informer({i:this,id:1686161,type:0,lang:'ru'});return false}catch(e){}"/></a>
<!-- /Yandex.Metrika informer -->

<!-- Yandex.Metrika counter -->
<script src="//mc.yandex.ru/metrika/watch.js" type="text/javascript"></script>
<script type="text/javascript">
try { var yaCounter1686161 = new Ya.Metrika({id:1686161, enableAll: true, webvisor:true});}
catch(e) { }
</script>
<noscript><div><img src="//mc.yandex.ru/watch/1686161" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
<!-- /Yandex.Metrika counter -->
  
  

<script type="text/javascript">(function(w,doc) {
if (!w.__utlWdgt ) {
    w.__utlWdgt = true;
    var d = doc, s = d.createElement('script'), g = 'getElementsByTagName';
    s.type = 'text/javascript'; s.charset='UTF-8'; s.async = true;
    s.src = ('https:' == w.location.protocol ? 'https' : 'http')  + '://w.uptolike.com/widgets/v1/uptolike.js';
    var h=d[g]('body')[0];
    h.appendChild(s);
}})(window,document);
</script>
<div data-share-size="30" data-like-text-enable="false" data-background-alpha="0.0" data-pid="1281006" data-mode="share" data-background-color="#ffffff" data-share-shape="round-rectangle" data-share-counter-size="12" data-icon-color="#ffffff" data-text-color="#000000" data-buttons-color="#FFFFFF" data-counter-background-color="#ffffff" data-share-counter-type="disable" data-orientation="horizontal" data-following-enable="false" data-sn-ids="fb.vk.tw.ok.gp." data-selection-enable="false" data-exclude-show-more="false" data-share-style="1" data-counter-background-alpha="1.0" data-top-button="false" class="uptolike-buttons" ></div>
  

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-3817961-2']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>
<br>
 
 

      	</div>
        	<div class="CopyRight">
        		<font size="2">Pechaty24.Ru © 2010-2016. Cпециализированное <a href="http://www.pechaty24.ru/">производство печатей и штампов в Москве</a>. 
  <br>
 Копирование материалов сайта в сети разрешено с указанием прямой ссылки на источник. 
  <br>
 Публикация материалов сайта на бумажных носителях запрещена.</font>  
<br>
        	</div>
           
        </div>
    </div>
  </div></div>
  <script src="js/app.js"></script>
</body>
</html>
