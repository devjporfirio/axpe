export default {
  async postContact(values) {
    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('lastName', values.lastName);
    formData.append('phone', values.phone);
    formData.append('email', values.email);
    formData.append('mobile', values.mobile);
    formData.append('subject', values.subject);
    formData.append('message', values.message);

    const response = await fetch(`${process.env.config.apiUrl}/form/contact`, {
      method: 'POST',
      body: formData
    }).then(response => response.json());
    return response;
  }
};
