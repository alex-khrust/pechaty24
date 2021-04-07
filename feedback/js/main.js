"use strict";

var MaketData = [	// Index, image, price, alt, text
	[ 1, 'images/1.jpg', 0, '', '' ],
	[ 2, 'images/2.jpg', 0, '', '' ],
	[ 3, 'images/3.jpg', 0, '', '' ],
	[ 4, 'images/4.jpg', 0, '', '' ],
	[ 5, 'images/5.jpg', 0, '', '' ],
	[ 6, 'images/6.jpg', 0, '', '' ],
	[ 7, 'images/7.jpg', 0, '', '' ],
	[ 8, 'images/8.jpg', 0, '', '' ],
	[ 9, 'images/9.jpg', 0, '', '' ],
	[ 10, 'images/10.jpg', 50, '', '' ],
	[ 11, 'images/11.jpg', 50, '', '' ],
	[ 12, 'images/12.jpg', 70, '', '' ],
	[ 13, 'images/13.jpg', 100, '', '' ],
	[ 14, 'images/14.jpg', 100, '', '' ],
	[ 15, 'images/15.jpg', 80, '', '' ],
	[ 16, 'images/16.jpg', 80, '', '' ],
  [ 17, 'images/17.jpg', 140, '', '' ],
  [ 18, 'images/18.jpg', 140, '', '' ],
  [ 19, 'images/19.jpg', 140, '', '' ],
  [ 20, 'images/20.jpg', 140, '', '' ],
  [ 21, 'images/21.jpg', 140, '', '' ],
  [ 22, 'images/22.jpg', 140, '', '' ],
  [ 23, 'images/23.jpg', 140, '', '' ],
  [ 24, 'images/24.jpg', 140, '', '' ]
];

var OsnData = [		// Index, image, price, alt, text
	[ 1, 'osnastki/1.jpg', 0, 'На ручной оснастке', 'На ручной оснастке' ],
	[ 2, 'osnastki/2.jpg', 150, 'Ручная с подушкой', 'На ручной со встроенной подушкой (+150 р.)' ],
	[ 3, 'osnastki/3.jpg', 400, 'Автоматическая', 'На автоматической<br>оснастке (+400 р.)' ],
	[ 4, 'osnastki/4.jpg', 400, 'Карманная', 'Colop Mouse карманная<br>(+400 р.)' ],
	[ 8, 'osnastki/8.jpg', 400, 'Карманная Trodat', 'Trodat 9342 карманная<br>(+400 р.)' ],
	[ 5, 'osnastki/5.jpg', 700, 'Карманная Брелок', 'Брелок-кнопка' ],
	[ 6, 'osnastki/6.jpg', 700, 'Карманная Карина', 'Карина-кнопка' ],
	[ 7, 'osnastki/7.jpg', 2000, 'Усиленная Trodat', 'Металлическая Trodat' ]
]


//после загрузки веб-страницы
$(function () {

    var ProcessForm = function (parameters) {

        // id формы обратной связи
        this.idForm = parameters['idForm'] || 'feedbackForm';
        // скрыть форму после отправки
        this.hideForm = parameters['hideForm'] || true;
        // наличие у формы блока загрузки файлов
        this.existenceUploadsFile = parameters['existenceUploadsFile'] || true;
        // наличие у формы капчи
        this.existenceCaptcha = parameters['existenceCaptcha'] || false;
        // количество элементов input для загрузки файлов
        this.countFiles = parameters['countFiles'] || 5;
        // максимальный размер файла для загрузки (по умолчанию 512 Кбайт)
        this.maxSizeFile = parameters['maxSizeFile'] || 9524288;
        // допустимые разрешения файлов
        this.validFileExtensions = parameters['validFileExtensions'] || ['jpg', 'jpeg', 'bmp', 'gif', 'png', 'JPG', 'cdr', 'pdf' , 'ai', 'doc', 'xls', 'docx'];
        // флажок о принятии пользовательского соглашения перед отправкой формы
        this.agreeCheckbox = parameters['agreeCheckbox'] || true;

        // инициализация
        this.init = function () {
            // получаем форму
            var submitForm = document.getElementById(this.idForm);
            // отправка формы
            $(submitForm).submit($.proxy(this.submitForm, this));
            if (this.existenceCaptcha) {
                // обновление капчи
                $(submitForm).find('.refresh-captcha').click($.proxy(this.refreshCaptcha, this));
            }

            if (this.existenceUploadsFile) { // добавление новых элементов input с type="file" и изменение существующих
                $('#' + this.idForm + ' .countFiles').text(this.countFiles);
                // добавление нового элемента input с type="file"
                $(document).on('change', '#' + this.idForm + ' input[name="attachment[]"]', $.proxy(this.changeInputFile, this));
            }

            if (this.agreeCheckbox) { // добавление новых элементов input с type="file"
                // добавление нового элемента input с type="file"
                $(document).on('change', '#' + this.idForm + ' input[name="agree"]', $.proxy(this.changeAgreement, this));
            }

            if (this.hideForm) {
                $(submitForm).parent().find('.show-form').click(function (e) {
                    e.preventDefault();
                    $(this).closest('.success-message').addClass('hidden');
                    $(submitForm).show();
                });
            }
        };
    };

    // переключить во включенное или выключенное состояние кнопку submit
    ProcessForm.prototype.changeStateSubmit = function (state) {
        var submitForm = document.getElementById(this.idForm);
        $(submitForm).find('[type="submit"]').prop('disabled', state);
    };

    // изменение состояния кнопки submit в зависимости от состояния checkbox agree
    ProcessForm.prototype.changeAgreement = function (e) {
        if (e.currentTarget.checked) {
            this.changeStateSubmit(false);
        } else {
            this.changeStateSubmit(true);
        }
    };

    // метод, возвращающий результат проверки расширения файла допустимому
    ProcessForm.prototype.validateFileExtension = function (filename) {
        // получаем расширение файла
        var fileExtension = filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
        // если есть расширение, то проверяем соотвествует ли оно допустимому
        if (fileExtension) {
            for (var i = 0; i <= this.validFileExtensions.length; i++) {
                if (this.validFileExtensions[i] === fileExtension) {
                    return true;
                }
            }
        }
        return false;
    };

    // валилация формы
    ProcessForm.prototype.validateForm = function () {
        var _this = this;
        var validForm = true;
        var submitForm = document.getElementById(this.idForm);
        $(submitForm).find('input,textarea').each(function () {
            if (this.checkValidity()) {
                _this.changeStateInput(this, 'success');
            } else {
                _this.changeStateInput(this, 'error');
                $.jGrowl('Поле: "<strong>' + $(this).parent().find('label').text() + '</strong>"<br>' + this.validationMessage, {
                    theme: 'jgrowl-error',
                    life: 10000
                });
                validForm = false;
            }
        });
        return validForm;
    };

    // изменение состояния элемента формы (success, error, clear)
    ProcessForm.prototype.changeStateInput = function (input, state) {
        input = $(input);
        var inputGroup = input.parents('.form-group');
        var glyphiconInput = inputGroup.find('.form-control-feedback');
        if (state === 'error') {
            inputGroup.removeClass('has-success').addClass('has-error');
//            console.log(input.prop('tagName'));
//            console.log(input.prop('tagName').toLowerCase());
            if (input.prop("tagName").toLowerCase() !== 'textarea') {
                glyphiconInput.removeClass('glyphicon-ok').addClass('glyphicon-remove');
            }
        } else if (state === 'success') {
            inputGroup.removeClass('has-error').addClass('has-success');
            if (input.prop("tagName").toLowerCase() !== 'textarea') {
                glyphiconInput.removeClass('glyphicon-remove').addClass('glyphicon-ok');
            }
        } else {
            inputGroup.removeClass('has-success has-error');
            glyphiconInput.removeClass('glyphicon-ok glyphicon-remove');
        }
    };

    // disabled и enabled изображений для FormData
    ProcessForm.prototype.changeStateImages = function (state) {
        if (!this.existenceUploadsFile) {
            return;
        }
        var submitForm = document.getElementById(this.idForm);
        var files = $(submitForm).find('[name="attachment[]"]');
        for (var i = 0; i < files.length; i++) {
            // получить список файлов элемента input с type="file"
            var fileList = files[i].files;
            // если элемент не содержит файлов, то перейти к следующему
            if (fileList.length > 0) {
                // получить первый файл из списка
                var file = fileList[0];
                // проверить тип файла и размер
                if (!((this.validateFileExtension(file.name)) && (file.size < this.maxSizeFile))) {
                    $(files[i]).prop('disabled', state);
                }
            } else {
                $(files[i]).prop('disabled', state);
            }
        }
    };

    // сбор данных для отправки на сервер с помощью FormData
    ProcessForm.prototype.collectData = function () {
        this.changeStateImages(true); // отключаем отправку файлов (disabled) не удовлетворяющие требованиям
        this.dataForm = new FormData(document.getElementById(this.idForm)); // собираем данные
        this.changeStateImages(false); // после сбора данных переводим состояние элементов в enabled
    };

    // отправка формы
    ProcessForm.prototype.submitForm = function (e) {
        var _this = this;
        e.preventDefault();
        if (this.validateForm() === false) {
          return;
        }
        this.collectData();
        $.ajax({
            type: "POST",
            url: $('#' + _this.idForm).attr('action'),
            data: _this.dataForm, // данные для отправки на сервер
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function () {
                $('#' + _this.idForm + ' .progress').show();
                _this.changeStateSubmit(true);
            },

            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', function (event) {
                        // если известно количество байт для пересылки
                        if (event.lengthComputable) {
                            // получаем общее количество байт для пересылки
                            var total = event.total;
                            // получаем какое количество байт уже отправлено
                            var loaded = event.loaded;
                            // определяем процент отправленных данных на сервер
                            var progress = ((loaded * 100) / total).toFixed(1);
                            // обновляем состояние прогресс бара Bootstrap
                            var progressBar = $('#' + _this.idForm + ' .progress-bar');
                            progressBar.attr('aria-valuenow', progress);
                            progressBar.width(progress + '%');
                            progressBar.find('span').text(progress + '%');
                        }
                    }, false);
                }
                return myXhr;
            },


            success: function (data) {
                $('#' + _this.idForm + ' .progress').hide();

                data = JSON.parse(data);
                //устанавливаем элементу, содержащему текст ошибки, пустую строку
                $('#' + _this.idForm + '.error').text('');
                var submitForm = $('#' + _this.idForm);
                // если сервер вернул ответ success, то значит двнные отправлены
                if (data.result === "success") {
                    $.jGrowl('Форма успешно отправлена!', {theme: 'jgrowl-success', life: 10000});
                    document.getElementById(_this.idForm).reset();

                    submitForm.find('input,textarea').each(function () {
                        _this.changeStateInput(this, 'clear');
                    });
                    if (_this.existenceUploadsFile) {
                        $('#' + _this.idForm + ' .countFiles').parents('.form-group').html(
                            '<p style="font-weight: 700;">Прикрепить к сообщению файлы (максимум <span class="countFiles">' +
                            _this.countFiles + '</span>):</p><input type="file" name="attachment[]">' +
                            '<p style="margin-top: 3px; margin-bottom: 3px; color: #ff0000;"></p>');
                    }
                    if (_this.existenceCaptcha) {
                        _this.refreshCaptcha();
                    }
                    if (_this.hideForm) {
                  //      submitForm.hide();
                        submitForm.parent().find('.success-message').removeClass('hidden');

			show_files();

                    }
                } else {
                    _this.changeStateSubmit(false);
                    $('#' + _this.idForm + ' .progress-bar').css('width', '0%');
                    if (data.hasOwnProperty('captcha')) {
                        var captcha = submitForm.find('[name="captcha"]').eq(0);
                        $(captcha).val('');
                        var imgCaptcha = submitForm.find('.img-captcha');
                        imgCaptcha.attr('src', imgCaptcha.attr('data-src') + '?id=' + Math.random() + '');
                    }

                    // если сервер вернул ответ error...
                    $.jGrowl('<strong>Ошибка!</strong><br>Форму не удалось отправить.', {
                        theme: 'jgrowl-warning',
                        life: 10000
                    });

                    // сбрасываем состояние всех input и textarea элементов
                    submitForm.find('input,textarea').each(function () {
                        _this.changeStateInput(this, 'clear');
                    });

                    // отображаем все ошибки
                    for (var error in data) {
                        if (data.hasOwnProperty(error)) {
                            if (error === 'result') { // кроме той, которая имеет ключ result
                                continue;
                            }
                            if (error !== 'info' && error !== 'log') { // кроме тех, которые имеют ключ info или log
                                $.jGrowl(data[error], {theme: 'jgrowl-error', life: 5000});
                                _this.changeStateInput($(submitForm).find('[name="' + error + '"]').eq(0), 'error');
                            }
                            if (error === 'info') { // выводим все сообщения с ключом info с помощью jGrowl
                                data[error].forEach(function (info, i, error) {
                                    $.jGrowl(info, {theme: 'jgrowl-error', life: 5000});
                                });
                            }
                            if (error === 'log') { // выводим все сообщения с ключом log в консоль браузера
                                data[error].forEach(function (log, i, error) {
                                    console.log(log);
                                });
                            }
                        }
                    }
                }
            },
            error: function (request) {
                $.jGrowl('Произошла ошибка ' + request.responseText + ' при отправке данных.', {
                    theme: 'jgrowl-error',
                    life: 5000
                });
            }
        });
    };

    // обновление капчи
    ProcessForm.prototype.refreshCaptcha = function () {
        var imgCaptcha = $('#' + this.idForm).find('.img-captcha');
        imgCaptcha.attr('src', imgCaptcha.attr('data-src') + '?id=' + Math.random() + '');
    };

    // изменение элемента input с type="file"
    ProcessForm.prototype.changeInputFile = function (e) {
        // условия для добавления нового элемента input с type="file"
        var isSelectFile = e.currentTarget.files.length > 0;
        var isNextInput = $(e.currentTarget).next('p').next('input[name="attachment[]"]').length === 0;
        var isMaxInput = $('#' + this.idForm + ' input[name="attachment[]"]').length < this.countFiles;
        var inputFile =
            '<input type="file" name="attachment[]">' +
            '<p style="margin-top: 3px; margin-bottom: 3px; color: #ff0000;"></p>';
        if (isSelectFile && isNextInput && isMaxInput) {
            $(e.currentTarget).next('p').after(inputFile);
        }
        // если файл выбран, то выполняем следующие действия...
        if (e.currentTarget.files.length > 0) {
            // получим файл
            var file = e.currentTarget.files[0];
            // проверим размер и расширение файла
            if (file.size > this.maxSizeFile) {
                $(e.currentTarget).next('p').text('*Файл не будет отправлен, т.к. его размер больше ' + this.maxSizeFile / 1024 + 'Кбайт');
            } else if (!this.validateFileExtension(file.name)) {
                $(e.currentTarget).next('p').text('*Файл не будет отправлен, т.к. его тип не соответствует разрешённому');
            } else {
                if ($(e.currentTarget).next('p')) {
                    $(e.currentTarget).next('p').text('');
                }
            }
        } else {
            // если после изменения файл не выбран, то сообщаем об этом пользователю
            $(e.currentTarget).next('p').text('* Файл не будет отправлен, т.к. он не выбран');
        }
    };

    /*
     Параметры указываются в виде:
     {
     ключ: значение;
     ключ: значение;
     ...
     }
     idForm - id формы обратной связи (по умолчанию feedbackForm)
     existenceUploadsFile - наличие у формы блока загрузки файлов (по умолчанию true)
     countFiles - количество файлов для загрузки (по умолчанию 5)
     maxSizeFile - максиальный размер файла в байтах (по умолчанию 524288 байт)
     validFileExtensions - допустимые расширения файлов (по умолчанию 'jpg','jpeg','bmp','gif','png')
     existenceCaptcha - наличие у формы капчи (по умолчанию true)
     hideForm - скрыть форму после отправки данных
     agreeCheckbox - флажок о принятии пользовательского соглашения перед отправкой формы (по умолчанию true)

     */
    var formFeedback = new ProcessForm({idForm: 'feedbackForm', maxSizeFile: 9524288, disableAgreement: true, existenceUploadsFile: false});
    formFeedback.init();
  
    //var contactForm = new ProcessForm({ idForm: 'contactForm', existenceUploadsFile: false, existenceCaptcha: false });
    //contactForm.init();
    

    form_init();

});


function form_init() {
	var container;
	var rowcount = 0;
	MaketData.forEach( function(item) {
		if (!rowcount) {
			container = $('<div>').addClass('md-row');
			$('#modal-dialog-maket .md-content').append(container);
			rowcount = 4;
		}
		var img = $('<img>').attr('src',item[1]).attr('alt',item[3]);
		var text = $('<span>').html(item[4]);
		var div = $('<div>').addClass('md-item').append(img).append(text).data('idx',item[0]).data('price',item[2]).data('txt',item[3]);
		container.append(div);
		rowcount--;
	});

	$('#modal-dialog-maket .md-content .md-item').click( function() {
		$(this).parent().parent().find('.md-active').removeClass('md-active');
		$(this).addClass('md-active');
		$('.maket-image').attr('src', $(this).find('img').attr('src'));
		$('#novaya .price-value').text($(this).data('price')+' руб.');
		calculate();
	});
        $( $('#modal-dialog-maket .md-content .md-item')[0] ).click();

	$('.select-maket').click( function() { $('#modal-dialog-maket').addClass('md-show');  return false; });



	container = 0;
	rowcount = 0;
	OsnData.forEach( function(item) {
		if (!rowcount) {
			container = $('<div>').addClass('md-row');
			$('#modal-dialog-osn .md-content').append(container);
			rowcount = 4;
		}
		var img = $('<img>').attr('src',item[1]).attr('alt',item[3]);
		var text = $('<span>').html(item[4]);
		var div = $('<div>').addClass('md-item').append(img).append(text).data('idx',item[0]).data('price',item[2]).data('txt',item[3]);
		container.append(div);
		rowcount--;
	});

	$('#modal-dialog-osn .md-content .md-item').click( function() {
		$(this).parent().parent().find('.md-active').removeClass('md-active');
		$(this).addClass('md-active');
		$('.osn-image').attr('src', $(this).find('img').attr('src'));
		$('#osnastka .price-value').text($(this).data('price')+' руб.');
		$('#osnastka .osn-label').html($(this).data('txt'));
		calculate();
	});
        $( $('#modal-dialog-osn .md-content .md-item')[0] ).click();

	$('.select-osn').click( function() { $('#modal-dialog-osn').addClass('md-show'); return false; });



	$('.md-close').click( function() { $('.md-show').removeClass('md-show'); });
	$('.md-container').click( function() { $('.md-show').removeClass('md-show'); });
	$('.md-content').click( function() { return false; });
	

	$('input[name="urgency"]').change( function() { calculate(); });
	$('input[name="delivery"]').change( function() {
		$('input[name="pvz-address"]').val('');
		$('input[name="pvz-cost"]').val(0);
		$('.pvz-address').fadeOut( function(){ $(this).find('span').text('') });

		if ($(this).val() == 'pvz') {
			calculate();
			boxberry.open(boxberry_callback,'1$rcLooSHIPJ8IlrvZzSE7wvidNLr8oe5T','','01130', $('input[name="total-price"]').val(), 200, 0, 10, 10, 10 ); 
		} else {
			$('input[name="urgency"][value="today"]').attr('disabled',false);
			$('input[name="urgency"][value="urgent"]').attr('disabled',false);
		}
		calculate();
	});


	$('.files-container').on("dragenter dragleave dragover drop", drop_handler );
	$('.fakefile').click( start_file_select );
	$('.files-container').click( start_file_select );
	$('input[name="files[]"]').on("change",end_file_select);


	$('.order-overlay').click( function(e) {
		$('.order-panel').toggleClass('order-selected');
		calculate();
	});
}

function start_file_select () {
	document.files_backup = $('input[name="files[]"]').get(0).files;

	$('input[name="files[]"]').click();
	return false;
}

function end_file_select () {
	const newdt = new DataTransfer();

	var files = document.files_backup;
	for (var i=0; i<files.length; i++) newdt.items.add(files[i]);

	files = $('input[name="files[]"]').get(0).files;
	for (var i=0; i<files.length; i++) newdt.items.add(files[i]);

	$('input[name="files[]"]').get(0).files = newdt.files;

	show_files();
}

function drop_handler (event) {
	var e = event.originalEvent;
	e.preventDefault()
	e.stopPropagation()
		
	switch (e.type) {
		case 'dragover': break;
		case 'dragenter': $(e.currentTarget).addClass('ondragged'); break;
		case 'dragleave': $(e.currentTarget).removeClass('ondragged'); break;
		case 'drop':
			const newdt = new DataTransfer();
			
			var files = $('input[name="files[]"]').get(0).files;
			for (var i=0; i<files.length; i++) newdt.items.add(files[i]);
				
			files = e.dataTransfer.files;
			for (var i=0; i<files.length; i++) newdt.items.add(files[i]);

			$('input[name="files[]"]').get(0).files = newdt.files;
				
			show_files();
			
			$(e.currentTarget).removeClass('ondragged');
			break;
	}
	return false;
}

function show_files () {
	$('.attach-file').remove();
	var files = $('input[name="files[]"]').get(0).files;
	for (var i=0; i<files.length; i++) {
		var span = $('<span>').html('&#10006;').click( remove_file );
		var file_block = $('<div>').addClass('attach-file').text('Файл №'+(i+1)+' ').data('idx',i).attr('title',files[i].name);
		file_block.append(span);
		$('.attach-list').append(file_block);
	}
}

function remove_file () {
	const newdt = new DataTransfer();
	var idx = $(this).parent().data('idx');
	
	var files = $('input[name="files[]"]').get(0).files;
	for (var i=0; i<files.length; i++)
		if (i != idx) newdt.items.add(files[i]);
				
	$('input[name="files[]"]').get(0).files = newdt.files;
				
	show_files();
}


function boxberry_callback(pvz) {
	$('.pvz-address span').text(pvz.address);
	$('.pvz-address').fadeIn();

	$('input[name="pvz-address"]').val(pvz.address);
	$('input[name="pvz-cost"]').val(pvz.price);

	$('input[name="urgency"][value="today"]').attr('disabled',true);
	$('input[name="urgency"][value="urgent"]').attr('disabled',true);
	$('input[name="urgency"][value="tomorrow"]').click();

	calculate();
}


function calculate () {
	var price = 0;
	if ( $('#novaya.order-selected').length ) {
		price = 450 + $( $('#modal-dialog-maket .md-active')[0] ).data('price');
		$('input[name="selmak"]').val('Макет ' +$( $('#modal-dialog-maket .md-active')[0] ).data('idx'));
	}
	if ( $('#ottisk.order-selected').length ) {
		price = 600;
		$('input[name="selmak"]').val('По оттиску');
	}
	price += $( $('#modal-dialog-osn .md-active')[0] ).data('price');
	price += $( $('input[name="urgency"]:checked')[0] ).data('price');
	price += $( $('input[name="delivery"]:checked')[0] ).data('price');
	price += parseInt( $('input[name="pvz-cost"]').val() );

	$('input[name="selosn"]').val( $( $('#modal-dialog-osn .md-active')[0] ).data('txt') );

	$( $('.total-price')[0] ).html(price + ' руб.');
	$('input[name="total-price"]').val(price);
}
