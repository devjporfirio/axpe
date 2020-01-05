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
  async postBuildingSeen(token, reference) {
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
};
