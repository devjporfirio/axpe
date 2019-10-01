export default {
  async loadHome() {
    const result = await fetch(`${process.env.config.apiUrl}/home`)
      .then(response => response.json())
      .then(data => data);
    return result;
  },
};
