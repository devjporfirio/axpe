import Cookies from 'js-cookie';

export default {
  cookieParams: {
    expires: 15,
  },

  get() {
    const utmParams = Cookies.get('ax_utm_params');
    return utmParams ? JSON.parse(utmParams) : {};
  },

  remove() {
    Cookies.remove('ax_utm_params', this.cookieParams);
  },

  set(queryStrings) {
    const utmVariables = queryStrings.split('&');
    const utmParams = this.get();

    let ParameterName, i;

    const getUTMValue = (inputParameter) => {
      // return utmVariables[inputParameter] === null ? null : utmVariables[inputParameter];
      for (i = 0; i < utmVariables.length; i++) {
        ParameterName = utmVariables[i].split('=');
        if (ParameterName[0].replace(/\?/g, '') === inputParameter) {
          return ParameterName[1] === null ? null : ParameterName[1];
        }
      }
    };

    const valueExists = (value) => {
      return value != null && value != '' && value != undefined;
    };

    // Set params and store it in the variable
    const utmParamNames = [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
    ];

    let updatedParams = false;

    utmParamNames.forEach((param) => {
      const paramValue = getUTMValue(param);

      if (valueExists(paramValue)) {
        utmParams[param] = paramValue;
        updatedParams = true;
      }
    });

    if (updatedParams) {
      Cookies.set(
        'ax_utm_params',
        JSON.stringify(utmParams),
        this.cookieParams
      );
    }
  },
};
