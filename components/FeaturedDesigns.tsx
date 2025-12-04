import Image from "next/image";
import Link from "next/link";
import { i1, i2, i3, i4, i5, i6 } from "@/assets";

const FeaturedDesigns = () => {
	const images = [i1, i2, i3, i4, i5, i6];

	return (
		<section className='w-full py-16 px-6 md:px-12 lg:px-24'>
			{/* Header */}
			<div className='flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10'>
				<div>
					<h2 className='text-3xl md:text-4xl font-semibold text-dark-brown'>
						Featured Designs
					</h2>

					<p className='text-dark-brown/70 mt-2 max-w-[380px]'>
						A curated selection of our most distinguished interior
						design projects.
					</p>
				</div>

				<Link
					href='/designs'
					className='text-light-gold border border-light-gold px-5 py-2 rounded-md text-sm md:text-base font-medium hover:bg-light-gold hover:text-dark-brown transition-all'
				>
					View Our Portfolio →
				</Link>
			</div>

			{/* Image Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
				{images.map((img, idx) => (
					<div
						key={idx}
						className='group relative overflow-hidden rounded-xl shadow-md'
					>
						<Image
							src={img}
							alt={`Design ${idx + 1}`}
							className='w-full h-[280px] object-cover transition-transform duration-500 group-hover:scale-110'
						/>

						{/* Subtle overlay */}
						<div className='absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-all' />

						{/* Caption */}
						<p className='absolute bottom-4 left-4 text-white text-lg font-medium opacity-0 group-hover:opacity-100 transition-all'>
							Design {idx + 1}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default FeaturedDesigns;
