"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getDesigns, urlFor, SanityDesign } from "@/utils/sanity";

const FeaturedDesigns = () => {
	const [designs, setDesigns] = useState<SanityDesign[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchDesigns() {
			try {
				const data = await getDesigns();
				setDesigns(data.slice(0, 6));
			} catch (error) {
				console.error("Error fetching designs:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchDesigns();
	}, []);

	if (loading) {
		return (
			<section className='w-full py-16 px-6 md:px-12 lg:px-24'>
				<div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10'>
					<div>
						<h2 className='text-3xl md:text-4xl font-semibold text-dark-brown'>
							Featured Designs
						</h2>
						<p className='text-dark-brown/70 mt-2 max-w-[380px]'>
							A curated selection of our most distinguished interior design
							projects.
						</p>
					</div>
					<Link
						href='/designs'
						className='text-light-gold border border-light-gold px-5 py-2 rounded-md text-sm md:text-base font-medium hover:bg-light-gold hover:text-dark-brown transition-all'
					>
						View Our Portfolio →
					</Link>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
					{[...Array(6)].map((_, idx) => (
						<div
							key={idx}
							className='h-[280px] bg-gray-200 rounded-xl animate-pulse'
						/>
					))}
				</div>
			</section>
		);
	}

	if (designs.length === 0) {
		return null;
	}

	return (
		<section className='w-full py-16 px-6 md:px-12 lg:px-24'>
			<div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10'>
				<div>
					<h2 className='text-3xl md:text-4xl font-semibold text-dark-brown'>
						Featured Designs
					</h2>
					<p className='text-dark-brown/70 mt-2 max-w-[380px]'>
						A curated selection of our most distinguished interior design
						projects.
					</p>
				</div>
				<Link
					href='/designs'
					className='text-light-gold border border-light-gold px-5 py-2 rounded-md text-sm md:text-base font-medium hover:bg-light-gold hover:text-dark-brown transition-all'
				>
					View Our Portfolio →
				</Link>
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{designs.map((design, idx) => (
					<div
						key={design._id}
						className='group relative overflow-hidden rounded-xl shadow-md'
					>
						{design.mainImage && (
							<Image
								src={urlFor(design.mainImage).width(600).height(400).url()}
								alt={design.title || `Design ${idx + 1}`}
								width={600}
								height={280}
								className='w-full h-[280px] object-cover transition-transform duration-500 group-hover:scale-110'
							/>
						)}
						<div className='absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all' />
						<p className='absolute bottom-4 left-4 text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-all'>
							{design.title || `Design ${idx + 1}`}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default FeaturedDesigns;
