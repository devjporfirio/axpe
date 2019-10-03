import Home from 'pages/home';
import Intern from 'pages/intern';

const Routes = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/intern',
    component: Intern
  }
];

export default Routes;
