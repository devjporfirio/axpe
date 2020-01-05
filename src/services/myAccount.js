import User from './user';

export default {
  async getMe(token) {
    const result = await fetch(`${process.env.config.apiUrl}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => data);
    return result;
  },
  async getViewed(token) {
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
    const response = await fetch(
      `${process.env.config.apiUrl}/user/buildings/favorite`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json())
    return response;
  },
  async getAlerts(token) {
    const response = await fetch(
      `${process.env.config.apiUrl}/user/alerts`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json())
    return response;
  },
  async postFavorite(token, reference, status) {
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
    )
      .then(response => response.json())
      .then(data => data);
    return result;
  },
  async putMe(values) {
    const resToken = await User.postLogin();
    const result = await fetch(`${process.env.config.apiUrl}/auth/me`, {
      method: 'PUT',
      body: JSON.stringify({
        name: values.name,
        last_name: values.lastName,
        email: values.email,
        phone: values.phone,
        notification_alert: values.notification_alert ? '1' : '0',
        notification_favorite: values.notification_favorite ? '1' : '0',
        password_cur: values.password,
        password_new: values.passwordNew
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resToken.access_token}`
      }
    })
      .then(response => response.json())
      .then(data => data);
    return result;
  }
};
