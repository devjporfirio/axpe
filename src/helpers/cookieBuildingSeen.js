import Cookies from 'js-cookie';

export default {
  cookieParams: {
    expires: 15
  },

  get() {
    const buildings = Cookies.get('buildingsSeen');
    return buildings ? JSON.parse(buildings) : [];
  },

  remove() {
    Cookies.remove('buildingsSeen', this.cookieParams);
  },

  set(reference, user) {
    if(user && user.logged) {
      this.saveByReference(user.access_token, reference);
    } else {
      const buildings = this.get();
      if (!buildings.includes(reference)) {
        buildings.push(reference);
        Cookies.set('buildingsSeen', JSON.stringify(buildings), this.cookieParams);
      }
    }
  },

  async saveByReference(accessToken, reference) {
    return await Api.User.postBuildingSeen(accessToken, reference);
  },

  saveAll(user) {
    const buildings = this.get();
    const promises = [];

    if(!user || !user.logged) return false;

    promises = buildings.map(reference => {
      return new Promise(async resolve => {
        await this.saveByReference(user.access_token, reference);
        resolve();
      })
    })

    if(promises.length) {
      Promise.all(promises).then(() => {
        this.remove();
      })
    }
  }
}