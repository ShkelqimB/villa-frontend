// ADMIN component
import Home from '../views/Home';
import Expenses from '../views/Expenses';
import Users from '../views/Users';
import Villas from '../views/Villas';
import Settings from '../views/Settings';

// Icons
// import DevicesIcon from 'assets/deviceIcon.svg';
// import HomeIcon from 'assets/homeIcon.svg';
// import UsersIcon from 'assets/usersIcon.svg';
// import ManageIcon from 'assets/Settings.svg';

// Here should be routes can access admins
const AdminLinks = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    value: 1,
    // color: silicaColors.icons.home,
    // icon: HomeIcon,
    default: '/home',
    roles: ['0', '1', '2'],
  },
  {
    path: '/villa',
    name: 'Villas',
    component: Villas,
    value: 2,
    // color: silicaColors.icons.devices,
    // icon: DevicesIcon,
    default: '/villa',
    roles: ['0', '1', '2'],
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: Expenses,
    value: 3,
    // color: silicaColors.icons.devices,
    // icon: DevicesIcon,
    default: '/expenses',
    roles: ['0', '1', '2'],
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    value: 4,
    // color: silicaColors.icons.users,
    // icon: UsersIcon,
    default: '/users',
    roles: ['0', '1'],
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    value: 4,
    // color: silicaColors.icons.users,
    // icon: UsersIcon,
    default: '/settings',
    roles: ['0', '1'],
  },
];

const AdminRoutes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/villa',
    name: 'Villas',
    component: Villas,
  },
  // {
  //   path: '/viewdevice/:id',
  //   name: 'View Device',
  //   component: ViewDevice,
  // },
  {
    path: '/expenses',
    name: 'Expenses',
    component: Expenses,
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: Settings,
  },
  // {
  //   path: '/deviceoverview/:id',
  //   name: 'Device Managment',
  //   component: DeviceOverview,
  // },
  // {
  //   path: '/manage',
  //   name: 'Manage',
  //   component: Manage,
  // },
];

// Here should be routes can access users
// const UserRoutes: any = [
//   {
//     path: "/Home",
//     name: "Home",
//     component: Home,
//   },
//   {
//     path: "/UserManagment",
//     name: "UserManagment",
//     component: UserManagment,
//   },
//   {
//     path: "/Settings",
//     name: "Settings",
//     component: Settings,
//   },
// ];

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  AdminRoutes: AdminRoutes,
  AdminLinks: AdminLinks,
};
