import Cookies from 'js-cookie';

class User {
  constructor (infos, buildingsSeen) {
    this.buildingsSeen = buildingsSeen;
    this.infos = infos;
    this.login = false;
  }

  getBuildingsSeen () {
    const buildings = Cookies.get('buildingsSeen');
    return buildings;
  }

  setBuildingSeen (building) {
    const buildings = Cookies.get('buildingsSeen') || '';
    const newBuildings = [ building.reference ];
    if (buildings) {
      newBuildings.push(...JSON.parse(buildings));
    }
    Cookies.set('buildingsSeen', JSON.stringify(newBuildings), { expires: 7 });
  }

  getInfos () {
    return this.infos;
  }

  setInfos (infos) {
    this.infos = infos;
  }
}

export default new User({ name: 'João', email: 'joao@oaoj.com.br' }, []);
