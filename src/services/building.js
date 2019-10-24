export default {
  async getBuildings() {
    const url = `${process.env.config.apiUrl}/buildings/find?source=sao-paulo&use=residencial&finality=venda&category=apartamento,casa&local=consolação,bela+vista&furniture=false&type=pronto&price_start=500000&price_end=2000000&area_start=100&area_end=300&bedroom_start=1&bedroom_end=4&parking_start=1&parking_end=5&limit=2`;
    const result = await fetch(url)
      .then(response => response.json())
      .then(data => data);
    return result;
  }
};
