"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getProperties, urlFor, SanityProperty } from "@/utils/sanity";

const FeaturedProperties = () => {
	const [properties, setProperties] = useState<SanityProperty[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchProperties() {
			try {
				const data = await getProperties();
				setProperties(data.slice(0, 2));
			} catch (error) {
				console.error("Error fetching properties:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchProperties();
	}, []);

	const formatPrice = (price?: number) => {
		if (!price) return "Contact for Price";
		if (price >= 1000000000) {
			return `₦${(price / 1000000000).toFixed(1)}B`;
		}
		if (price >= 1000000) {
			return `₦${(price / 1000000).toFixed(0)}M`;
		}
		return `₦${price.toLocaleString()}`;
	};

	if (loading) {
		return (
			<section className='bg-off-white py-16 px-6 md:px-12 lg:px-24'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl md:text-4xl font-semibold text-dark-brown'>
						Featured Properties
					</h2>
					<p className='text-dark-brown/80 mt-2 max-w-[540px] mx-auto'>
						Discover exceptional properties in the world&apos;s most prestigious
						locations
					</p>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1300px] mx-auto'>
					{[...Array(2)].map((_, idx) => (
						<div
							key={idx}
							className='h-[350px] bg-gray-200 rounded-2xl animate-pulse'
						/>
					))}
				</div>
			</section>
		);
	}

	if (properties.length === 0) {
		return null;
	}

	return (
		<section className='bg-off-white py-16 px-6 md:px-12 lg:px-24'>
			<div className='text-center mb-12'>
				<h2 className='text-3xl md:text-4xl font-semibold text-dark-brown'>
					Featured Properties
				</h2>
				<p className='text-dark-brown/80 mt-2 max-w-[540px] mx-auto'>
					Discover exceptional properties in the world&apos;s most prestigious
					locations
				</p>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1300px] mx-auto'>
				{properties.map((property) => (
					<div
						key={property._id}
						className='relative group overflow-hidden rounded-2xl shadow-lg'
					>
						{property.mainImage && (
							<Image
								src={urlFor(property.mainImage).width(800).height(500).url()}
								alt={property.title}
								width={800}
								height={350}
								className='w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110'
							/>
						)}
						<div className='absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all' />
						<div className='absolute bottom-6 left-6 right-6'>
							<h3 className='text-white text-xl md:text-2xl font-semibold leading-snug line-clamp-2'>
								{property.title}
							</h3>
							<p className='text-white/80 text-sm mt-1 tracking-wide'>
								{formatPrice(property.price)}
							</p>
						</div>
						<span className='absolute top-4 left-4 bg-white/90 text-dark-brown text-xs px-3 py-1 rounded-md font-semibold'>
							Featured
						</span>
					</div>
				))}
			</div>

			<div className='mt-14 flex justify-center'>
				<Link
					href='/properties'
					className='text-dark-brown border border-dark-brown px-8 py-3 rounded-md text-sm md:text-base font-medium hover:bg-dark-brown hover:text-off-white transition-all'
				>
					View All Properties →
				</Link>
			</div>
		</section>
	);
};

export default FeaturedProperties;
