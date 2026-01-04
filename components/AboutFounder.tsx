"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { founder } from "@/assets";

const AboutFounder = () => {
	return (
		<section className='bg-off-white py-20 px-6 md:px-16 lg:px-24'>
			<div className='max-w-[1200px] mx-auto'>
				<div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
					<motion.div
						initial={{ opacity: 0, x: -30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className='order-2 lg:order-1'
					>
						<span className='inline-block px-4 py-1.5 bg-light-gold/20 text-dark-brown text-sm font-medium rounded-full mb-4'>
							Our Story
						</span>
						<h2 className='text-3xl md:text-4xl font-bold text-dark-brown mb-6'>
							Redefining Luxury Living
						</h2>

						<blockquote className='border-l-4 border-light-gold pl-6 my-8'>
							<p className='text-dark-brown/80 text-lg md:text-xl italic leading-relaxed'>
								&ldquo;We believe that exceptional design transcends mere
								aesthetics. It&apos;s about creating spaces that resonate with
								the soul and elevate everyday living.&rdquo;
							</p>
							<footer className='mt-4'>
								<p className='text-dark-brown font-semibold'>
									Ms. Sanni Lammi
								</p>
								<p className='text-light-gold text-sm'>
									CEO, SPL Luxury Concept
								</p>
							</footer>
						</blockquote>

						<div className='space-y-4 text-dark-brown/80 leading-relaxed'>
							<p>
								With over five years of experience in luxury interior design
								and real estate, we&apos;ve cultivated a reputation for
								creating extraordinary spaces that blend timeless elegance with
								contemporary sophistication.
							</p>
							<p>
								Our portfolio spans exclusive residences, prestigious estates,
								and iconic properties across the globe. Each project is a
								testament to our unwavering commitment to excellence,
								meticulous attention to detail, and passion for transforming
								visions into reality.
							</p>
						</div>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, x: 30 }}
						whileInView={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
						className='order-1 lg:order-2'
					>
						<div className='relative'>
							<div className='absolute -top-4 -left-4 w-full h-full border-2 border-light-gold rounded-2xl' />
							<div className='relative rounded-2xl overflow-hidden'>
								<Image
									src={founder}
									alt='Ms. Sanni Lammi - CEO SPL Luxury Concept'
									className='w-full h-auto object-cover'
								/>
								<div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-brown via-dark-brown/80 to-transparent p-6'>
									<h3 className='text-white text-2xl font-bold mb-1'>
										Ms. Sanni Lammi
									</h3>
									<p className='text-light-gold text-sm mb-4'>
										Founder & CEO
									</p>
									<div className='flex gap-6'>
										<div>
											<p className='text-light-gold text-xl font-bold'>5+</p>
											<p className='text-gray-300 text-xs'>Years Experience</p>
										</div>
										<div>
											<p className='text-light-gold text-xl font-bold'>50+</p>
											<p className='text-gray-300 text-xs'>Projects Completed</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default AboutFounder;
