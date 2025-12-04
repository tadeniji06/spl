export type DropdownItem = {
	title: string;
	link: any;
};

export type HeaderLink = {
	title: string;
	link?: any;
	dropdownItems?: DropdownItem[];
};

export const headerLinks: HeaderLink[] = [
	{ title: "Home", link: "/" },
	{ title: "About", link: "/about" },
	{ title: "Interior Designs", link: "/designs" },
	{ title: "Properties", link: "/properties" },
];

export const categories = [
	{
		title: "Interior	Design",
		link: "/",
	},
	{
		title: "Consultation",
		link: "/",
	},
	{
		title: "Property Advisory",
		link: "/",
	},
	{
		title: "Property Sales",
		link: "/",
	},
	{
		title: "Property Management",
		link: "/",
	},
];

export const regions = [
	{
		title: "Portfolio",
	},
	{
		title: "About Us",
	},
	{
		title: "Properties",
	},
	{
		title: "Get in Touch",
	},
];
