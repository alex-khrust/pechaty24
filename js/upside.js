$(document).ready(function(){
    $('.my_button').tbForm(); // делаем кнопки активными
    $('.tbForm').tbForm(); // отображаем раскрытые формы
}); 
      function videlen(el) {
 		var links=document.getElementsByClassName('objsel');
		for (var i=0;i<links.length;i++) {
			var li=links[i];
          li.style='border:2px solid transparent;';
		}
		el.style = 'border:2px solid cornflowerblue;';
	}
  function videlenstamp(el) {
 		var links=document.getElementsByClassName('bodyzakaz');
		for (var i=0;i<links.length;i++) {
			var li=links[i];
          li.style='border:2px solid transparent; height:300px;';
		}
    el.style = 'border:2px solid #e67e22; height:300px;';
	}

function getdetails(){
    var name = $('#namest').val();
   
    $.ajax({
        type: "POST",
      url: "/select_zakaz.php",
      dataType: "json",
        data: {fname:name}
    }).done(function( result )
        {
           $("#sms2").text( "Номер заказа: "+result.nomerzak );
          $("#sms").text( "Статус заказа: "+result.status );
           $("#sms3").text( "Обновлено: "+result.data );
            $("#progressblock").css('display', 'initial');
          $("#progress2").css('width', result.procent +'%');
          $("#progress2text").text(result.procent);
        });
}