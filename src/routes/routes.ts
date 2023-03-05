// ADMIN component
import Home from '../views/Home';
import Expenses from '../views/Expenses';
import Users from '../views/Users';
import Villas from '../views/Villas';
import Settings from '../views/Settings';
import Booking from '../views/Booking';
import Calendars from '../views/Calendar';
import Income from '../views/Income';

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
    path: '/booking',
    name: 'Booking',
    component: Booking,
    value: 2,
    // color: silicaColors.icons.home,
    // icon: HomeIcon,
    default: '/booking',
    roles: ['0', '1', '2'],
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendars,
    value: 3,
    // color: silicaColors.icons.home,
    // icon: HomeIcon,
    default: '/calendar',
    roles: ['0', '1', '2'],
  },
  {
    path: '/villa',
    name: 'Villas',
    component: Villas,
    value: 4,
    // color: silicaColors.icons.devices,
    // icon: DevicesIcon,
    default: '/villa',
    roles: ['0', '1', '2'],
  },
  {
    path: '/expenses',
    name: 'Expenses',
    component: Expenses,
    value: 5,
    // color: silicaColors.icons.devices,
    // icon: DevicesIcon,
    default: '/expenses',
    roles: ['0', '1', '2'],
  },
  {
    path: '/incomes',
    name: 'Incomes',
    component: Income,
    value: 6,
    // color: silicaColors.icons.devices,
    // icon: DevicesIcon,
    default: '/incomes',
    roles: ['0', '1', '2'],
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    value: 7,
    // color: silicaColors.icons.users,
    // icon: UsersIcon,
    default: '/users',
    roles: ['0', '1'],
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    value: 8,
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
    path: '/booking',
    name: 'Booking',
    component: Booking,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: Calendars,
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
    path: '/incomes',
    name: 'Income',
    component: Income,
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
