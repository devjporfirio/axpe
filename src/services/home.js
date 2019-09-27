export default {
  async loadHome() {
    const result = await fetch('http://localhost:3000')
      .then(response => response.json())
      .then(data => data);
    return result;
  }
};
