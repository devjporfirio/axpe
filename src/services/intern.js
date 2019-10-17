export default {
  async loadIntern(reference) {
              //      category  - type
      // AX1111    - Apartamento - lancamento
      // AX2629    - Casa        - pronto
      // AX10010   - Apartamento - pronto
      // AX130883  - Cobertura   - pronto
      // AX129334  - Terreno     - pronto
      // AX141776  - Apartamento - pronto

    const result = await fetch(`${process.env.config.apiUrl}/building/${reference}`)
      .then(response => response.json())
      .then(data => data);
    return result;
  },
};
