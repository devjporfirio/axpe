(function() {
  var $form = document.querySelector('.form');
  var pristine = new Pristine($form);
  var search = location.search.replace('?', '').split('&');
  var $buttons = document.querySelectorAll('.js-button-toggle');
  var $inputsControl = $form.querySelectorAll('.form-group__control');
  var $btnWhatsApp = document.querySelector('.moreinfo-btn--whatsapp');
  var $inputsMaskPhone = $form.querySelectorAll('.js-mask-phone');
  var $message = $form.querySelector(`[data-element="message"]`);
  var pageUrl = null;
  var isFavorites = false;
  var message = `Olá, gostaria de saber mais sobre o imóvel {reference} - {local}, com {areaUseful} m², {bedrooms} e {parking}.`;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function asc(str) {
    return str.charCodeAt(0);
  }

  function chr(asciiNum) {
    return String.fromCharCode(asciiNum);
  }

  function encrypt(data) {
    var result = '';
    var l;
    var j = 0;
    var hash = 'assbdFbdpdPdpfPdAAdpeoseslsQQEcDDldiVVkadiedkdkLLnm';

    for (var i = 0; i < data.length; i++) {
      j++;
      l = asc(data.substr(i, 1)) + asc(hash.substr(j, 1));

      if (j == 50) {
        j = 1;
      }

      if (l > 255) {
        l -= 256;
      }

      result += chr(l);
    }

    return result;
  }

  $buttons.forEach(($btn) => {
    $btn.addEventListener('click', clickButton);
  });

  if ($inputsControl.length) {
    $inputsControl.forEach(($input) => {
      $input.addEventListener('keyup', inputsControl);
    });
  }

  if ($inputsMaskPhone.length) {
    $inputsMaskPhone.forEach(($input) => {
      if (typeof IMask === 'function') {
        IMask($input, {
          mask: '(00) 00000-0000',
        });
      }
    });
  }

  if ($form.querySelector('input[name="Email"]')) {
    var $inputRedirectUrl = $form.querySelector(
      'input[data-element="redirectUrl"]'
    );
    var $inputCryptoId = $form.querySelector('input[data-element="cryptoId"]');
    var $inputAnonymousId = $form.querySelector('input[data-element="anonymousId"]');



    $form
      .querySelector('input[name="Email"]')
      .addEventListener('keyup', function(event) {
        var $input = event.target;
        var value = $input.value;
        var redirectUrl = $inputRedirectUrl.getAttribute('data-value-original');

        $inputRedirectUrl.value = redirectUrl + '?email=' + value;

        if ($inputCryptoId) {
          $inputCryptoId.value = encrypt(value);
        }

        if ($inputAnonymousId) {
          $inputAnonymousId.value = localStorage.anonymousId;
        }
      });
  }

  $form.addEventListener('submit', formSubmit);

  search.forEach((item) => {
    var arr = item.split('=');
    var name = decodeURI(arr[0]);
    var value = decodeURI(arr[1]);
    var $el = $form.querySelector(`[data-element="${name}"]`);

    if ($el && name !== 'source') {
      $el.value = value;
      $el.setAttribute('data-value-original', value);
    }

    switch (name) {
      case 'reference':
        message = message.replace('{reference}', value);
        break;
      case 'local':
        message = message.replace('{local}', value);
        break;
      case 'areaUseful':
        message = message.replace('{areaUseful}', value);
        break;
      case 'bedrooms':
        var textBedrooms =
          parseInt(value) == 1 ? `1 quarto` : `${value} quartos`;
        message = message.replace('{bedrooms}', textBedrooms);
        break;
      case 'parking':
        var textParking = parseInt(value) == 1 ? `1 vaga` : `${value} vagas`;
        message = message.replace('{parking}', textParking);
        break;
      case 'source':
        var newValue = capitalizeFirstLetter(value);
        var $newInput = $form.querySelector(
          `[data-element="${name}"][value="${newValue}"]`
        );
        if ($newInput) {
          $newInput.checked = true;
        }
        break;
      case 'url':
        pageUrl = value;
        isFavorites = pageUrl.includes('favoritos');

        if (isFavorites) {
          // Change title
          let titleElement = document.querySelector('header h3');
          titleElement.innerHTML = 'Agende uma visita';

          // Custom message behaviour for favorites screen
          message = message.replace(
            'Olá, gostaria de saber mais sobre o imóvel',
            'Olá, gostaria de visitar o imóvel'
          );
          let originalMessage = message;
          let messageSuffix = ' (adicionar dias e horários disponíveis)';

          message += messageSuffix;

          // Remove message suffix when focusing in
          $form
            .querySelector('[data-element="message"]')
            .addEventListener('click', function(event) {
              var targetElement = event.target || event.srcElement;
              var targetValue = targetElement.value;
              if (targetValue.includes(messageSuffix)) {
                event.preventDefault();
                targetElement.value = targetValue.replace(messageSuffix, ' ');
                moveCaretToEnd(targetElement);
              }
            });

          // Add message back in if no chages were made to the text
          $form
            .querySelector('[data-element="message"]')
            .addEventListener('blur', function(event) {
              var targetElement = event.target || event.srcElement;
              var targetValue = targetElement.value;
              if (targetValue == `${originalMessage} `) {
                let defaultMessage = (targetValue + messageSuffix).replace(
                  '  ',
                  ' '
                );
                targetElement.value = defaultMessage;
              }
            });
        }

        break;
      default:
        break;
    }
  });

  if ($message) {
    message = message.replace(', com {areaUseful} m²', '');
    message = message.replace(', {bedrooms}', '');
    message = message.replace(' e {parking}', '');

    $message.value = message;

    if ($btnWhatsApp) {
      $btnWhatsApp.setAttribute(
        'href',
        pageUrl
          ? `${$btnWhatsApp.getAttribute('href')}?text=${message} - ${pageUrl}`
          : `${$btnWhatsApp.getAttribute('href')}?text=${message}`
      );
    }
  }

  function clickButton(event) {
    var $btn = event.currentTarget;
    var hide = $btn.getAttribute('data-toggle-hide');
    var show = $btn.getAttribute('data-toggle-show');
    var $hide = hide ? document.querySelector(hide) : null;
    var $show = show ? document.querySelector(show) : null;

    if ($hide) {
      $hide.classList.add('none');
    }

    if ($show) {
      $show.classList.remove('none');
    }
  }

  function inputsControl(event) {
    var $input = event.currentTarget;
    var value = $input.value;

    if (value.length) {
      $input.classList.add('filled');
    } else {
      $input.classList.remove('filled');
    }
  }

  function formSubmit(event) {
    event.preventDefault();

    var valid = pristine.validate();

    if (valid) {
      this.submit();
    }
  }

  function moveCaretToEnd(element) {
    let elValue = element.value;

    element.focus();
    element.value = '';
    element.value = elValue;
  }

  function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  var cookieParams = getCookie('ax_utm_params');
  if (cookieParams) {
    var utmParams = JSON.parse(cookieParams);

    Object.entries(utmParams).forEach(([key, value]) => {
      var $field = $form.querySelector(`input[name="${key}"]`);

      if ($field) $field.value = value;
    });
  }
})();
