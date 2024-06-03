import Dashboard from "../scenes/dashboard";
import Staff from "../scenes/staff";
import Invoices from "../scenes/invoices";
import Contacts from "../scenes/contacts";
import Bar from "../scenes/bar";
import Form from "../scenes/form";
import Line from "../scenes/line";
import Pie from "../scenes/pie";
// import FAQ from "./scenes/faq";
// import Geography from "./scenes/geography";
import Login from "../scenes/login";
import Calendar from "../scenes/calendar/calendar";
import config from "../config";
import DefaultLayout from "../scenes/global/DefaultLayout";


export const publicRoutes = [{ path: config.routes.login, component: Login }];
export const privateRoutes = [  
    { path: config.routes.dashboard, component: Dashboard, layout: DefaultLayout },
    { path: config.routes.staff, component: Staff, layout: DefaultLayout  },
    { path: config.routes.invoices, component: Invoices, layout: DefaultLayout  },
    { path: config.routes.contacts, component: Contacts, layout: DefaultLayout  },
    { path: config.routes.bar, component: Bar, layout: DefaultLayout  },
    { path: config.routes.form, component: Form, layout: DefaultLayout  },
    { path: config.routes.line, component: Line, layout: DefaultLayout  },
    { path: config.routes.pie, component: Pie, layout: DefaultLayout  },
    { path: config.routes.calendar, component: Calendar, layout: DefaultLayout  },
];
