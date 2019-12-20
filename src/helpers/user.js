import Cookies from 'js-cookie';

class User {
  constructor(buildingsSeen) {
    this.buildingsSeen = buildingsSeen;
    this.infos = {
      name: 'User',
      last_name: 'User',
      email: 'user@test.com',
      phone: '',
      notification_alert: 1,
      notification_favorite: 1
    };
    this.login = true;
  }

  getBuildingsSeen() {
    const buildings = Cookies.get('buildingsSeen');
    return buildings;
  }

  setBuildingSeen(building) {
    const buildings = Cookies.get('buildingsSeen') || '';
    if (!buildings.includes(building.reference)) {
      const newBuildings = [ building.reference ];
      if (buildings) {
        newBuildings.push(...JSON.parse(buildings));
      }
      Cookies.set('buildingsSeen', JSON.stringify(newBuildings), {
        expires: 15
      });
    }
  }

  getInfos() {
    return this.infos;
  }

  setInfos(infos) {
    this.infos = infos;
  }
}

export default new User([]);
