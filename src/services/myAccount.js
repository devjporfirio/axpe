import User from './user';

export default {
  async getViewed() {
    const resToken = await User.postLogin();

    const response = await fetch(
      `${process.env.config.apiUrl}/user/buildings/viewed?limit=15`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resToken.access_token}`
        }
      }
    ).then(response => response.json());
    return response;
  },
  async getFavorites() {
    const resToken = await User.postLogin();

    const response = await fetch(
      `${process.env.config.apiUrl}/user/buildings/favorite`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resToken.access_token}`
        }
      }
    ).then(response => response.json());
    return response;
  },
  async getMe() {
    const resToken = await User.postLogin();

    const response = await fetch(`${process.env.config.apiUrl}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resToken.access_token}`
      }
    }).then(response => response.json());
    return response;
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
        notification_favorite: values.notification_favorite ? '1' : '0'
        // password: values.password
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
