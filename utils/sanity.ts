import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = createClient({
	projectId: "jf22otsp",
	dataset: "production",
	useCdn: true,
	apiVersion: "2023-05-03",
});

const builder = createImageUrlBuilder({
	projectId: "jf22otsp",
	dataset: "production",
});

export function urlFor(source: SanityImageSource) {
	return builder.image(source);
}

// Types
export interface SanityDesign {
	_id: string;
	title: string;
	mainImage: SanityImageSource;
	extraImages?: SanityImageSource[];
	description?: string;
}

export interface SanityProperty {
	_id: string;
	title: string;
	mainImage: SanityImageSource;
	extraImages?: SanityImageSource[];
	description?: string;
	features?: string[];
	price?: number;
}

export interface SanityElectronic {
	_id: string;
	title: string;
	mainImage: SanityImageSource;
	extraImages?: SanityImageSource[];
	description?: string;
	price?: number;
}

// Queries
export const designsQuery = `*[_type == "design"]{
	_id,
	title,
	mainImage,
	extraImages,
	description
}`;

export const propertiesQuery = `*[_type == "property"]{
	_id,
	title,
	mainImage,
	extraImages,
	description,
	features,
	price
}`;

export const electronicsQuery = `*[_type == "electronic"]{
	_id,
	title,
	mainImage,
	extraImages,
	description,
	price
}`;

// Fetch functions
export async function getDesigns(): Promise<SanityDesign[]> {
	return client.fetch(designsQuery);
}

export async function getProperties(): Promise<SanityProperty[]> {
	return client.fetch(propertiesQuery);
}

export async function getElectronics(): Promise<SanityElectronic[]> {
	return client.fetch(electronicsQuery);
}
