export default {
  async loadIntern(reference) {
    // http://futurebrandftp.com.br/projetos/axpe/painel/api/building/AX1111
    // http://futurebrandftp.com.br/projetos/axpe/painel/api/building/AX2629
    const result = await fetch(`${process.env.config.apiUrl}/building/${reference}`)
      .then(response => response.json())
      .then(data => data);
    return result;
  },
};
