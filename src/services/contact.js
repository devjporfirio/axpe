export default {
  async postContact(values) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/form/contact`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      },
    ).then((response) => response.json());
    return response;
  },

  async postWorkWithUs(values) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/form/work_with_us`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return await response.json();
    } catch (error) {
      return {
        status: false,
        msg: [ 'Não foi possível enviar. Tente novamente em instantes.' ],
      };
    }
  },
};
