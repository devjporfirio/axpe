import shouldRenewToken from './shouldRenewToken';

export default {
  async getMe(token) {
    shouldRenewToken();
    const result = await fetch(`${process.env.config.apiUrl}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.json());
    return result;
  },
  async getViewed(token) {
    shouldRenewToken();
    const response = await fetch(
      `${process.env.config.apiUrl}/user/buildings/viewed?limit=10`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json());
    return response;
  },
  async getForYou(token) {
    shouldRenewToken();
    const response = await fetch(
      `${process.env.config.apiUrl}/user/buildings/foryou`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json());
    return response;
  },
  async getFavorites(token) {
    shouldRenewToken();
    const response = await fetch(
      `${process.env.config.apiUrl}/user/buildings/favorite`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json());
    return response;
  },
  async getAlerts(token) {
    shouldRenewToken();
    const response = await fetch(`${process.env.config.apiUrl}/user/alerts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.json());
    return response;
  },
  async postFavorite(token, reference, status) {
    shouldRenewToken();
    const result = await fetch(
      `${process.env.config.apiUrl}/user/favorite/building/${
        status ? 'yes' : 'no'
      }`,
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
    ).then(response => response.json());
    return result;
  },
  async putMe(token, values) {
    shouldRenewToken();
    const result = await fetch(`${process.env.config.apiUrl}/auth/me`, {
      method: 'PUT',
      body: JSON.stringify({
        name: values.name,
        last_name: values.last_name,
        email: values.email,
        phone: values.phone,
        notification_alert: values.notification_alert ? '1' : '0',
        notification_favorite: values.notification_favorite ? '1' : '0',
        password_cur: values.password,
        password: values.passwordNew
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.json());
    return result;
  }
};
