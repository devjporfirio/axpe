import Home from 'pages/home';
import Intern from 'pages/intern';

const Routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/intern/:reference',
    component: Intern,
    exact: true
  }
];

export default Routes;
