// types definition
export type LinkType = {
    name: string;
    href: string;
    icon: any;
    role: string[];
};

export type LinkTypeSub = {
    name: string;
    href: string;
    icon: any;
    role: string[];
    sublinks?: { name: string; href: string; icon?: any }[];
};
