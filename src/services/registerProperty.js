export default {
  async postProperty(values) {
    const response = await fetch(
      `${process.env.config.apiUrl}/auth/register_your_building`,
      {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9mdXR1cmVicmFuZGZ0cC5jb20uYnJcL3Byb2pldG9zXC9heHBlXC9wYWluZWxcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1NzQ0MjYyOTcsImV4cCI6MTU3NDQyOTg5NywibmJmIjoxNTc0NDI2Mjk3LCJqdGkiOiJ1dmhvQWQzOUJtZ3Byd0x2Iiwic3ViIjo3LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.sS9V78j48_7ibqJ4lh_nTN8MOCEYi2fkiRsneNunBM0'
        }
      }
    ).then(response => response.json());
    return response;
  }
};
