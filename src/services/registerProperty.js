import User from './user';

export default {
  async postProperty(values) {
    const resToken = await User.postLogin();

    const response = await fetch(
      `${process.env.config.apiUrl}/auth/register_your_building`,
      {
        method: 'POST',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resToken.access_token}`
        }
      }
    ).then(response => response.json());
    return response;
  }
};
