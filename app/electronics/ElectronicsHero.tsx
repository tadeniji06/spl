"use client";

import { motion } from "framer-motion";

const ElectronicsHero = () => {
	return (
		<section className='relative w-full bg-dark-brown py-20 md:py-28 overflow-hidden'>
			<div className='absolute inset-0 opacity-10'>
				<div className='absolute top-20 left-10 w-72 h-72 bg-light-gold rounded-full blur-3xl' />
				<div className='absolute bottom-20 right-10 w-96 h-96 bg-light-gold rounded-full blur-3xl' />
			</div>

			<div className='relative max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24'>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className='text-center'
				>
					<span className='inline-block px-4 py-1.5 bg-light-gold/20 text-light-gold text-sm font-medium rounded-full mb-6'>
						Premium Electronics
					</span>
					<h1 className='text-white text-3xl md:text-5xl font-bold leading-snug md:leading-tight max-w-3xl mx-auto'>
						Smart Home & Security Solutions
					</h1>
					<motion.p
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1, delay: 0.2 }}
						className='text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mt-4'
					>
						Discover our curated collection of premium electronic products for
						modern living.
					</motion.p>
				</motion.div>
			</div>
		</section>
	);
};

export default ElectronicsHero;
