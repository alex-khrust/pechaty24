tbForm_data = new Object();
tbForm_data[1045]='{"0":{"t":"head","v":"{\\"cpt_val\\":\\"Купить в один клик\\",\\"class_val\\":\\"\\",\\"classcn_val\\":\\"\\",\\"msg_OK\\":\\"Ваше сообщение получено.\\\\nМы свяжемся с Вами в течении 15-ти минут\\\\n(в рабочее время)\\",\\"msg_ERR\\":\\"Сервис временно недоступен.\\\\nВоспользуйтесь другими способами связи.\\",\\"cpt_cbx\\":false,\\"class_cbx\\":false,\\"classcn_cbx\\":false}"},"1":{"t":"txt","v":"{\\"name\\":\\"Product\\",\\"type\\":\\"txt\\",\\"label_val\\":\\"Вид печати:\\",\\"placeholder_val\\":\\"печать на оснаске\\",\\"value_val\\":\\"\\",\\"class_val\\":\\"product\\",\\"classcn_val\\":\\"\\",\\"mail_txt\\":\\"Товар\\",\\"label_cbx\\":true,\\"placeholder_cbx\\":false,\\"value_cbx\\":false,\\"needs_cbx\\":false,\\"readonly_cbx\\":true,\\"class_cbx\\":true,\\"classcn_cbx\\":false}"},"2":{"t":"txt","v":"{\\"name\\":\\"Name_K\\",\\"type\\":\\"txt\\",\\"label_val\\":\\"Ваше имя:\\",\\"placeholder_val\\":\\"\\",\\"value_val\\":\\"\\",\\"class_val\\":\\"\\",\\"classcn_val\\":\\"\\",\\"mail_txt\\":\\"Имя\\",\\"label_cbx\\":true,\\"placeholder_cbx\\":true,\\"value_cbx\\":false,\\"needs_cbx\\":false,\\"readonly_cbx\\":false,\\"class_cbx\\":false,\\"classcn_cbx\\":false}"},"3":{"t":"txt","v":"{\\"name\\":\\"text_3\\",\\"type\\":\\"email\\",\\"label_val\\":\\"Почта для ответа\\",\\"placeholder_val\\":\\"primer@pochta.ru\\",\\"value_val\\":\\"\\",\\"class_val\\":\\"\\",\\"classcn_val\\":\\"\\",\\"mail_txt\\":\\"Заголовок для text_3\\",\\"label_cbx\\":true,\\"placeholder_cbx\\":true,\\"value_cbx\\":false,\\"needs_cbx\\":true,\\"readonly_cbx\\":false,\\"class_cbx\\":false,\\"classcn_cbx\\":false}"},"4":{"t":"txt","v":"{\\"name\\":\\"Fone\\",\\"type\\":\\"tel\\",\\"label_val\\":\\"Номер Вашего телефона:\\",\\"placeholder_val\\":\\"Подсказка\\",\\"value_val\\":\\"\\",\\"class_val\\":\\"\\",\\"classcn_val\\":\\"\\",\\"mail_txt\\":\\"Телефон\\",\\"label_cbx\\":true,\\"placeholder_cbx\\":false,\\"value_cbx\\":false,\\"needs_cbx\\":true,\\"readonly_cbx\\":false,\\"class_cbx\\":false,\\"classcn_cbx\\":false}"},"5":{"t":"sel","v":"{\\"name\\":\\"Dostavka\\",\\"label_val\\":\\"Доставка:\\",\\"activ_el\\":\\"Доставка до метро\\",\\"class_val\\":\\"\\",\\"classcn_val\\":\\"\\",\\"mail_txt\\":\\"Доставка\\",\\"spisok\\":\\"Доставка до метро\\\\nДоставка по адресу в пределах Москвы\\",\\"label_cbx\\":true,\\"class_cbx\\":false,\\"classcn_cbx\\":false}"},"6":{"t":"rad","v":"{\\"name\\":\\"radio_5\\",\\"label_val\\":\\"Какая печать нужна?\\",\\"activ_el\\":\\"Печать новая (для новых ООО, ИП и т.д), по данным из свидетельства о регистрации.\\",\\"class_val\\":\\"\\",\\"classcn_val\\":\\"\\",\\"mail_txt\\":\\"Тип печати:\\",\\"spisok\\":\\"<b>Печать новая</b> (для новых ООО, ИП и т.д), по данным из свидетельства о регистрации.\\\\n<b>Печать по оттиску</b> - точная копия печати с оттиска на бумаге. Оттиск прикрепите ниже.\\\\n<b>Факсимиле</b> - копия Вашей подписи.\\",\\"label_cbx\\":true,\\"class_cbx\\":false,\\"classcn_cbx\\":false}"},"7":{"t":"txta","v":"{\\"name\\":\\"Adres\\",\\"label_val\\":\\"Дополнительная информация\\",\\"placeholder_val\\":\\"Здесь можно указать данные для новой печати (название ОГРН, ИНН), номер макета так же для новой печати. Либо плохо читаемые слова для печати по оттиску.\\",\\"value_val\\":\\"\\",\\"class_val\\":\\"\\",\\"classcn_val\\":\\"\\",\\"mail_txt\\":\\"Доп. информация\\",\\"label_cbx\\":true,\\"placeholder_cbx\\":true,\\"value_cbx\\":false,\\"needs_cbx\\":false,\\"readonly_cbx\\":false,\\"class_cbx\\":false,\\"classcn_cbx\\":false}"},"8":{"t":"file","v":"{\\"name\\":\\"file_6\\",\\"label_val\\":\\"\\",\\"bt_text\\":\\"Выбрать файл (для печати по оттиску)\\",\\"class_val\\":\\"\\",\\"classcn_val\\":\\"\\",\\"label_cbx\\":false,\\"multiple\\":true,\\"class_cbx\\":false,\\"classcn_cbx\\":false}"},"9":{"t":"btn","v":"{\\"name\\":\\"submit\\",\\"bt_text\\":\\"Заказать\\",\\"class_val\\":\\"\\",\\"classcn_val\\":\\"\\",\\"captcha\\":false,\\"class_cbx\\":false,\\"classcn_cbx\\":false}"}}';



tbForm_data2 = new Object();
	for (var f in tbForm_data) { 
		lines=jQuery.parseJSON(tbForm_data[f]);
		
		var tmp= new Object();
		for (var l in lines){
			var tl = new Object();
			tl["t"]=lines[l].t;
			tl["v"]=jQuery.parseJSON(lines[l].v);
			tmp[l]=tl;
		}
		tbForm_data2[f]=tmp;
	}