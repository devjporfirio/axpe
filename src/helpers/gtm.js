function dataLayerPush(data) {
  if (typeof window !== 'undefined' && window.dataLayer) {
    // console.log(`dataLayerPush`, data);
    window.dataLayer.push(data);
  }
}

export default {
  dataLayerPush,
};