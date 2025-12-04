"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { prop } from "@/assets";

const PropsHero = () => {
	return (
		<section className='relative w-full h-[520px] md:h-[650px] overflow-hidden'>
			{/* Background Image */}
			<Image
				src={prop}
				alt='Luxury Interior'
				fill
				priority
				className='object-cover object-center'
			/>

			{/* Gradient Overlay */}
			<div className='absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70' />

			{/* Content */}
			<div className='absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1400px] mx-auto'>
				<motion.h1
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-white text-3xl md:text-5xl font-bold leading-snug md:leading-tight max-w-3xl'
				>
					Let’s Help You Get Your Dream House
				</motion.h1>

				<motion.p
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
					className='text-gray-200 text-lg md:text-2xl max-w-2xl mt-4'
				>
					Discover exceptional properties in the world’s most
					prestigious locations.
				</motion.p>

				{/* Interactive Filter Box */}
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='mt-8 w-full max-w-xl p-4 bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col md:flex-row gap-4'
				>
					<select className='w-full p-3 rounded-xl bg-white/20 text-white border border-white/25 text-sm focus:outline-none'>
						<option className='text-black'>Location</option>
						<option className='text-black'>Lagos</option>
						<option className='text-black'>Abuja</option>
						<option className='text-black'>Port Harcourt</option>
					</select>

					<select className='w-full p-3 rounded-xl bg-white/20 text-white border border-white/25 text-sm focus:outline-none'>
						<option className='text-black'>Bedrooms</option>
						<option className='text-black'>1 Bedroom</option>
						<option className='text-black'>2 Bedrooms</option>
						<option className='text-black'>3 Bedrooms</option>
						<option className='text-black'>4+ Bedrooms</option>
					</select>

					<button className='w-full md:w-auto px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition'>
						Search
					</button>
				</motion.div>
			</div>
		</section>
	);
};

export default PropsHero;
