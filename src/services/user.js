export default {
  async doLogin({ email, password }) {
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
      .then(data => data);
    return result;
  },
  async postBuildingSeen(token, building) {
    const result = await fetch(
      `${process.env.config.apiUrl}/user/view/building`,
      {
        method: 'POST',
        body: JSON.stringify({
          building
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
  }
};
