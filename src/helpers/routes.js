import Home from 'pages/home';
import Intern from 'pages/intern';
import talk from 'pages/talk';

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
  },
  {
    path: '/talk',
    component: talk,
    exact: true
  }
];

export default Routes;
