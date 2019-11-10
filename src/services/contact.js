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
  },

  async postWorkWithUs(values) {
    const formData = new FormData();

    formData.append('brokerExperience', values.brokerExperience);
    formData.append('haveBelieved', values.haveBelieved);
    formData.append('name', values.name);
    formData.append('lastName', values.lastName);
    formData.append('cpf', values.cpf);
    formData.append('email', values.email);
    formData.append('phone', values.phone);
    formData.append('mobile', values.mobile);
    formData.append('linkedin', values.linkedin);
    formData.append('facebook', values.facebook);
    formData.append('instagram', values.instagram);
    formData.append('twitter', values.twitter);
    formData.append('anotherSocialNetwork', values.anotherSocialNetwork);
    formData.append('lang', [
      values.lang1,
      values.lang2,
      values.lang3,
      values.lang4
    ]);
    formData.append('previousExperiences', values.previousExperiences);
    formData.append('reasonWorkAxpe', values.reasonWorkAxpe);
    formData.append('wasIndicated', values.wasIndicated);
    formData.append('whoIndicated', values.whoIndicated);
    formData.append('terms', values.terms);

    const response = await fetch(
      `${process.env.config.apiUrl}/form/work_with_us`,
      {
        method: 'POST',
        body: formData
      }
    ).then(response => response.json());
    return response;
  }
};
