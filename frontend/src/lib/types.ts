export type Page = {
    path: string;
    view: JSX.Element;
}

export interface User {
    id: string;
    email: string;
}

export interface NavbarProps {
    routes: JSX.Element;
}
export interface Navigation {
    name: string;
    href: string;
    icon: any;
}