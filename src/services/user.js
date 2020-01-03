export default {
  async postLogin({ email = '', password = '' }) {
    const result = await fetch(`${process.env.config.apiUrl}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({
        // email: 'user@test.com',
        // password: '123123'
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
  }
};
