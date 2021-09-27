import Cookies from 'js-cookie';

export default {
  cookieParams: {
    expires: 15,
  },

  get() {
    const buildings = Cookies.get('ax_buildings_seen');
    return buildings ? JSON.parse(buildings) : [];
  },

  remove() {
    Cookies.remove('ax_buildings_seen', this.cookieParams);
  },

  set(reference) {
    const buildings = this.get();
    if (!buildings.includes(reference) && buildings.length <= 10) {
      buildings.push(reference);
      Cookies.set(
        'ax_buildings_seen',
        JSON.stringify(buildings),
        this.cookieParams
      );
    }
  },
};
