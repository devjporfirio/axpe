import Cookies from 'js-cookie';

class CookieBuildingSeen {
  constructor(buildingsSeen) {
    this.buildingsSeen = buildingsSeen;
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
}

export default new CookieBuildingSeen([]);
