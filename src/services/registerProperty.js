export default {
  async postProperty(token, values) {
    const response = await fetch(
      `${process.env.config.apiUrl}/auth/register_your_building`,
      {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    ).then(response => response.json());
    return response;
  }
};
