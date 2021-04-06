                                $(function(){
  var pagetitle = $('h1').text();
  // feedbackForm - id формы
  $('#feedbackForm').prepend('<input type="hidden" name="pagetitle" value="' + pagetitle + '">');
});
  
                                var prices=[450,0];
                               
                              	function osnastka(osnas, price, type) {
                                   var priceott=600;
                                var summott=0;
                                  var n =  Number(price);
		prices[1]=+price;
                 summott=priceott+n;              
		document.getElementById('price').innerHTML = 'Стоимость ' + prices[1] + ' руб.';
                                  document.getElementById("osn").src = '/osnastki/' + osnas + '.jpg';
                                   document.getElementById("osnott").src = '/osnastki/' + osnas + '.jpg';
                                  document.getElementById('selosn').value = "Оснастка: " +type;
                                    document.getElementById('selosnnov').value = type;
                                   document.getElementById('selosnprice').innerHTML = type;
                                  document.getElementById('price4').innerHTML = summott+ " руб.";
                                  document.getElementById('noprice4').innerHTML = summott+ 100 +" руб.";
                                   document.getElementById('selosnpriceott').innerHTML = type;
 	}
	function osnastkamak(osnas, price, type) {
                                 
                              
                                  var n =  Number(price);
		prices[1]=+price;
                           
		document.getElementById('price').innerHTML = 'Стоимость ' + prices[1] + ' руб.';
                                  document.getElementById("osn").src = '/osnastki/' + osnas + '.jpg';
                                
                                    document.getElementById('selosnnov').value = type;
                                   document.getElementById('selosnprice').innerHTML = type;
                                
 	}
                                	function maket(maket, price) {
		prices[2]=+price;
		document.getElementById('pricemak').innerHTML = 'Стоимость ' + price + ' руб.';
                                  document.getElementById("mak").src = '/images/' + maket + '.jpg';
                                   document.getElementById('selmak').value = "Макет № " +maket;
 	}
                                function rez() {
      document.getElementById('price3').innerHTML = prices.reduce(function(t,c){
			return t+c;
      },0)+" руб.";
                                 document.getElementById('noprice3').innerHTML = prices.reduce(function(t,c){
			return t+c;
      },100)+" руб.";                          
	}
                            function rez2() {
      document.getElementById('price3').innerHTML = prices.reduce(function(t,c){
			return t+c;
      },0)+" руб.";
                       }
                                window.onload = osnastka('1','0','На ручной оснастке'), maket('1','0'), rez();
                                  function show(n) { 
                                    if (n == '1') {
      document.getElementById('selosnastka').style.display = "block";
                                      document.getElementById('backgr').style.display = "block";
                                  }
                                    else if (n == '2') {
                                      document.getElementById('selmaket').style.display = "block";
                                        document.getElementById('backgr').style.display = "block";
                                    }
                                  }
                                 function hide() { 
                                     document.getElementById('backgr').style.display = "none";
             document.getElementById('selosnastka').style.display = "none";
         document.getElementById('selmaket').style.display = "none";
                                      }

