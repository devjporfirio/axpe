import Cookies from 'js-cookie';
import Api from 'services';

export default {
  cookieParams: {
    expires: 15
  },

  get() {
    const buildings = Cookies.get('ax_buildings_seen');
    return buildings ? JSON.parse(buildings) : [];
  },

  remove() {
    Cookies.remove('ax_buildings_seen', this.cookieParams);
  },

  set(reference, user) {
    if(user && user.logged) {
      this.saveByReference(user.access_token, reference);
    } else {
      const buildings = this.get();
      if (!buildings.includes(reference) && buildings.length <= 10) {
        buildings.push(reference);
        Cookies.set('ax_buildings_seen', JSON.stringify(buildings), this.cookieParams);
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