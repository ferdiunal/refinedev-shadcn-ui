type UserNavMenuItem = {
    href: string;
    label: string;
};
export type UserNavProps = {
    name: string;
    title: string;
    avatar?: string;
    menus: UserNavMenuItem[];
};
