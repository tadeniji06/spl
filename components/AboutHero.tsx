const AboutHero = () => {
	return (
		<section className='bg-dark-brown text-white py-20 px-4 md:px-16'>
			<div className='max-w-4xl mx-auto text-center md:text-left'>
				<h2 className='text-3xl md:text-4xl font-bold mb-6'>
					ABOUT SPL LUXURY CONCEPT
				</h2>
				<p className='text-gray-200 text-lg md:text-xl leading-relaxed mb-12'>
					At SPL Luxury Concept, we create intentional solutions
					across real estate, interior design, and electronics that
					enhance how people live and work. We combine refined
					aesthetics, practical functionality, and reliable
					performance to deliver spaces, properties, and technology
					designed for everyday comfort, value, and lasting impact.
				</p>

				{/* Stats Section */}
				<div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center w-full max-w-[1100px] mx-auto'>
					<div className='transition-transform hover:scale-105'>
						<h2 className='text-light-gold text-2xl md:text-3xl font-semibold'>
							50+
						</h2>
						<p className='text-gray-300 text-sm mt-1'>
							Projects Completed
						</p>
					</div>

					<div className='transition-transform hover:scale-105'>
						<h2 className='text-light-gold text-2xl md:text-3xl font-semibold'>
							125+
						</h2>
						<p className='text-gray-300 text-sm mt-1'>
							Properties Acquired
						</p>
					</div>

					<div className='transition-transform hover:scale-105'>
						<h2 className='text-light-gold text-2xl md:text-3xl font-semibold'>
							5+
						</h2>
						<p className='text-gray-300 text-sm mt-1'>
							Years of Experience
						</p>
					</div>

					<div className='transition-transform hover:scale-105'>
						<h2 className='text-light-gold text-2xl md:text-3xl font-semibold'>
							150+
						</h2>
						<p className='text-gray-300 text-sm mt-1'>
							Happy Clients
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default AboutHero;
