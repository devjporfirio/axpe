function dataLayerPush(data) {
  if(dataLayer) {
    // console.log(`dataLayerPush`, data)
    dataLayer.push(data);
  }
}

export default {
  dataLayerPush
};