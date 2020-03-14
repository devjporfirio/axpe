(function() {
  const $form = document.querySelector('.form');
  const pristine = new Pristine($form);
  const search = location.search.replace('?', '').split('&');
  const $buttons = document.querySelectorAll('.js-button-toggle');
  const $inputsControl = $form.querySelectorAll('.form-group__control');
  const $inputsMaskPhone = $form.querySelectorAll('.js-mask-phone');
  const $message = $form.querySelector(`[data-element="message"]`);
  let message = `Olá, gostaria de saber mais sobre o imóvel {reference} - {local}, com {areaUseful} m², {bedrooms} e {parking}.`;

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
    const arr = item.split('=');
    const name = decodeURI(arr[0]);
    const value = decodeURI(arr[1]);
    const $el = $form.querySelector(`[data-element="${name}"]`);

    if($el) {
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
        const textBedrooms = parseInt(value) == 1 ? `1 quarto` : `${value} quartos`;
        message = message.replace('{bedrooms}', textBedrooms);
        break;
      case 'parking':
        const textParking = parseInt(value) == 1 ? `1 vaga` : `${value} vagas`;
        message = message.replace('{parking}', textParking);
        break;
      default:
        break;
    }
  });

  if($message) {
    $message.value = message;
  }

  function clickButton(event) {
    const $btn = event.currentTarget;
    const hide = $btn.getAttribute('data-toggle-hide');
    const show = $btn.getAttribute('data-toggle-show');
    const $hide = hide ? document.querySelector(hide) : null;
    const $show = show ? document.querySelector(show) : null;

    if($hide) {
      $hide.classList.add('none');
    }

    if($show) {
      $show.classList.remove('none');
    }
  }

  function inputsControl(event) {
    const $input = event.currentTarget;
    const value = $input.value;

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
})()