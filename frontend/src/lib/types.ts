export type Page = {
    path: string;
    view: JSX.Element;
};

export interface User {
    id: string;
    email: string;
}

export interface Navigation {
    name: string;
    href: string;
    icon: any;
}

export interface subSettings {
    name: string;
    href: string;
}

export interface RouteConfig {
    path: string;
    element: JSX.Element;
}

export interface NavbarProps {
    authRoutes: RouteConfig[];
}