export default {
  async postProperty(values) {
    const formData = new FormData();

    formData.append('type', values.type);
    formData.append('finality', values.finality);
    formData.append('category', values.category);
    formData.append('zipcode', values.zipcode);
    formData.append('address', values.address);
    formData.append('number', values.number);
    formData.append('complement', values.complement);
    formData.append('neighborhood', values.neighborhood);
    formData.append('areaUseful', values.areaUseful);
    formData.append('numDorms', values.numDorms);
    formData.append('numSuites', values.numSuites);
    formData.append('numParking', values.numParking);
    formData.append('isVacant', values.isVacant);
    formData.append('managerKey', values.managerKey);
    formData.append('valueRequested', values.valueRequested);
    formData.append('valueTax', values.valueTax);
    formData.append('valueCondo', values.valueCondo);
    formData.append('positiveCharacteristics', values.positiveCharacteristics);
    formData.append('negativeCharacteristics', values.negativeCharacteristics);
    formData.append('images', values.images);

    const response = await fetch(
      `${process.env.config.apiUrl}/form/register_your_building`,
      {
        method: 'POST',
        body: formData
      }
    ).then(response => response.json());
    return response;
  }
};
