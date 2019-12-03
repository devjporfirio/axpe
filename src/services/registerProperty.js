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
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9mdXR1cmVicmFuZGZ0cC5jb20uYnJcL3Byb2pldG9zXC9heHBlXC9wYWluZWxcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1NzUzMTQwMzYsImV4cCI6MTU3NTMxNzYzNiwibmJmIjoxNTc1MzE0MDM2LCJqdGkiOiI0bnR4ODNTajJQMW84YlEyIiwic3ViIjo3LCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.yrzxRTyfeuXsXRq4UjDQvArWrmM2ovaSEm_uGp25IaY'
        }
      }
    ).then(response => response.json());
    return response;
  }
};
