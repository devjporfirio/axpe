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
    )
    .then(response => response.json())
    .then(data => {
      const newData = data.map(building => building.slug);
      return newData;
    });
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
  async postAlert(token, params) {
    shouldRenewToken();
    const result = await fetch(`${process.env.config.apiUrl}/user/alerts`, {
      method: 'POST',
      body: JSON.stringify({
        source: params.source.value,
        use: params.use,
        finality: params.finality,
        type: params.ready_release,
        category: params.types,
        local: params.local,
        value: [ params.price_start, params.price_end ],
        area: [ params.area_start, params.area_end ],
        bedroom: [ params.bedroom_start, params.bedroom_end ],
        parking: [ params.parking_start, params.parking_end ]
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }).then(response => response.json());
    return result;
  },
  async deleteAlert(token, id) {
    shouldRenewToken();
    const result = await fetch(
      `${process.env.config.apiUrl}/user/alerts/${id}`,
      {
        method: 'DELETE',
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
