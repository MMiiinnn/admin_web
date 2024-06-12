import Dashboard from "../scenes/dashboard";
import Staff from "../scenes/staff";
import Provider from "../scenes/provider";
import Invoices from "../scenes/invoices";
import Bar from "../scenes/bar";
import Line from "../scenes/line";
import Pie from "../scenes/pie";
import Login from "../scenes/login";
import Calendar from "../scenes/calendar/calendar";
import config from "../config";
import DefaultLayout from "../scenes/global/DefaultLayout";
import FormAddStaff from "../scenes/formAddStaff";
import FormAddProvider from "../scenes/formAddProvider";
import FormAddImport from "../scenes/formAddImport";
import Import from "../scenes/import";
import Profile from "../scenes/profile";
import Item from "../scenes/item";


export const publicRoutes = [{ path: config.routes.login, component: Login }];
export const privateRoutes = [  
    { path: config.routes.dashboard, component: Dashboard, layout: DefaultLayout },
    { path: config.routes.staff, component: Staff, layout: DefaultLayout  },
    { path: config.routes.provider, component: Provider, layout: DefaultLayout  },
    { path: config.routes.invoices, component: Invoices, layout: DefaultLayout  },
    { path: config.routes.import, component: Import, layout: DefaultLayout  },
    { path: config.routes.bar, component: Bar, layout: DefaultLayout  },
    { path: config.routes.formAddStaff, component: FormAddStaff, layout: DefaultLayout  },
    { path: config.routes.formAddProvider, component: FormAddProvider, layout: DefaultLayout  },
    { path: config.routes.formAddImport, component: FormAddImport, layout: DefaultLayout  },
    { path: config.routes.line, component: Line, layout: DefaultLayout  },
    { path: config.routes.pie, component: Pie, layout: DefaultLayout  },
    { path: config.routes.calendar, component: Calendar, layout: DefaultLayout  },
    { path: config.routes.profile, component: Profile, layout: DefaultLayout  },
    { path: config.routes.item, component: Item, layout: DefaultLayout  },
];
