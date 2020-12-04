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
  var message = `Olá, gostaria de saber mais sobre o imóvel {reference} - {local}, com {areaUseful} m², {bedrooms} e {parking}.`;

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  $buttons.forEach($btn => {
    $btn.addEventListener('click', clickButton)
  })

  if($inputsControl.length) {
    $inputsControl.forEach($input => {
      $input.addEventListener('keyup', inputsControl)
    });
  }

  if($inputsMaskPhone.length) {
    $inputsMaskPhone.forEach($input => {
      if(typeof IMask === 'function') {
        IMask($input, {
          mask: '(00) 00000-0000'
        });
      }
    });
  }

  $form.addEventListener('submit', formSubmit)

  search.forEach(item => {
    var arr = item.split('=');
    var name = decodeURI(arr[0]);
    var value = decodeURI(arr[1]);
    var $el = $form.querySelector(`[data-element="${name}"]`);

    if($el && name !== 'source') {
      $el.value = value;
    }

    switch(name) {
      case 'userFirstName':
        document.querySelector('.username').innerHTML = value;
        break;
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
        var textBedrooms = parseInt(value) == 1 ? `1 quarto` : `${value} quartos`;
        message = message.replace('{bedrooms}', textBedrooms);
        break;
      case 'parking':
        var textParking = parseInt(value) == 1 ? `1 vaga` : `${value} vagas`;
        message = message.replace('{parking}', textParking);
        break;
      case 'source':
        var newValue = capitalizeFirstLetter(value);
        var $newInput = $form.querySelector(`[data-element="${name}"][value="${newValue}"]`)
        if($newInput) {
          $newInput.checked = true;
        }
        break;
      case 'url':
        pageUrl = value;
        break;
      default:
        break;
    }
  });

  if($message) {
    message = message.replace(', com {areaUseful} m²', '');
    message = message.replace(', {bedrooms}', '');
    message = message.replace(' e {parking}', '');

    $message.value = message;

    if($btnWhatsApp) {
      $btnWhatsApp.setAttribute('href', pageUrl ? `${$btnWhatsApp.getAttribute('href')}?text=${message} - ${pageUrl}` : `${$btnWhatsApp.getAttribute('href')}?text=${message}`)
    }
  }

  function clickButton(event) {
    var $btn = event.currentTarget;
    var hide = $btn.getAttribute('data-toggle-hide');
    var show = $btn.getAttribute('data-toggle-show');
    var $hide = hide ? document.querySelector(hide) : null;
    var $show = show ? document.querySelector(show) : null;

    if($hide) {
      $hide.classList.add('none');
    }

    if($show) {
      $show.classList.remove('none');
    }
  }

  function inputsControl(event) {
    var $input = event.currentTarget;
    var value = $input.value;

    if(value.length) {
      $input.classList.add('filled');
    } else {
      $input.classList.remove('filled');
    }
  }

  function formSubmit(event) {
    event.preventDefault();

    var valid = pristine.validate();

    if(valid) {
      this.submit();
    }
  }

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  var cookieParams = getCookie('ax_utm_params');
  if(cookieParams) {
    var utmParams = JSON.parse(cookieParams);

    Object.entries(utmParams).forEach(([key, value]) => {
      console.log(`${key} ${value}`);
      var $field = $form.querySelector(`input[name="${key}"]`);

      if($field)
        $field.value = value;
    });

  }
  
})()