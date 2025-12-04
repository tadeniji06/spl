import Image from "next/image";
import Link from "next/link";
import { dh1, h2 } from "@/assets";

const FeaturedProperties = () => {
	const properties = [
		{
			title: "5UNITS OF 5 BEDROOMS FULLY DETACHED DUPLEX",
			location: "LEKKI, LAGOS",
			image: dh1,
		},
		{
			title: "Magnificent Luxury Spacious 5 Bedroom",
			location: "LEKKI, LAGOS",
			image: h2,
		},
	];

	return (
		<section className='bg-off-white py-16 px-6 md:px-12 lg:px-24'>
			{/* Header */}
			<div className='text-center mb-12'>
				<h2 className='text-3xl md:text-4xl font-semibold text-dark-brown'>
					Featured Properties
				</h2>
				<p className='text-dark-brown/80 mt-2 max-w-[540px] mx-auto'>
					Discover exceptional properties in the world's most
					prestigious locations
				</p>
			</div>

			{/* Property Cards */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1300px] mx-auto'>
				{properties.map((property, index) => (
					<div
						key={index}
						className='relative group overflow-hidden rounded-2xl shadow-lg'
					>
						<Image
							src={property.image}
							alt={property.title}
							className='w-full h-[350px] object-cover transition-transform duration-700 group-hover:scale-110'
						/>

						{/* Dark overlay */}
						<div className='absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all'></div>

						{/* Text */}
						<div className='absolute bottom-6 left-6 right-6'>
							<h3 className='text-white text-xl md:text-2xl font-semibold leading-snug'>
								{property.title}
							</h3>
							<p className='text-white/80 text-sm mt-1 tracking-wide'>
								{property.location}
							</p>
						</div>

						{/* Subtle Top Label */}
						<span className='absolute top-4 left-4 bg-white/90 text-dark-brown text-xs px-3 py-1 rounded-md font-semibold'>
							Featured
						</span>
					</div>
				))}
			</div>

			{/* View All CTA */}
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
