import shouldRenewToken from './shouldRenewToken';

export default {
  async postLogin({ email, password }) {
    const result = await fetch(`${process.env.config.apiUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    return result;
  },
  async postLoginFacebook(data) {
    const result = await fetch(`${process.env.config.apiUrl}/auth/login/facebook`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    return result;
  },
  async postLoginGoogle(data) {
    const result = await fetch(`${process.env.config.apiUrl}/auth/login/google`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    return result;
  },
  async postBuildingSeen(token, reference) {
    shouldRenewToken();
    const result = await fetch(
      `${process.env.config.apiUrl}/user/view/building`,
      {
        method: 'POST',
        body: JSON.stringify({
          building: reference
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    .then(response => response.json())
    return result;
  },
  async postRegister(data) {
    const result = await fetch(`${process.env.config.apiUrl}/auth/sign-in`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    return result;
  },
  async postForgotPassword(data) {
    const result = await fetch(`${process.env.config.apiUrl}/user/forgot/password`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    return result;
  },
};
