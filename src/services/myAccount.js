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
  }
};
