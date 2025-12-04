import { about } from "@/assets";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
	return (
		<section className='relative w-full h-[650px] md:h-[820px] overflow-hidden'>
			{/* Background */}
			<Image
				src={about}
				alt='Luxury Interior'
				fill
				priority
				className='object-cover object-center'
			/>

			{/* Overlay */}
			<div className='absolute inset-0 bg-black/60' />

			{/* Content */}
			<div className='absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24 xl:px-32 max-w-[1400px]'>
				{/* Badge */}
				<div className='flex items-center gap-3 mb-4'>
					<span className='w-10 h-0.5 bg-light-gold'></span>
					<p className='text-light-gold tracking-[0.15em] text-xs md:text-sm uppercase'>
						Luxury Living Redefined
					</p>
				</div>

				{/* Heading */}
				<h1 className='text-white text-[32px] md:text-[52px] lg:text-[60px] font-semibold leading-tight max-w-[900px]'>
					We help you get a home and <br /> help you make it a home
				</h1>

				{/* Subtext */}
				<p className='text-white text-sm md:text-lg max-w-[700px] mt-4'>
					Curating exceptional interiors and exclusive properties that
					embody sophistication, elegance, and timeless design.
				</p>

				{/* Buttons */}
				<div className='flex items-center gap-4 mt-8'>
					<Link href='/designs'>
						<button className='bg-light-gold text-dark-brown px-6 py-3 rounded-lg font-medium shadow-md hover:bg-[#c5a059] transition-all'>
							Explore Designs
						</button>
					</Link>
					<Link href='/properties'>
						<button className='bg-white/10 backdrop-blur-md text-off-white border border-white/30 px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-all'>
							View Listing
						</button>
					</Link>
				</div>
			</div>

			{/* Bottom Stats Section */}
			<div
				className='
    w-full bg-off-white py-6 md:py-10 flex justify-center
    md:absolute md:bottom-0 md:left-0
  '
			>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center w-full max-w-[1100px] px-6'>
					<div>
						<h2 className='text-dark-brown text-2xl md:text-3xl font-semibold'>
							50+
						</h2>
						<p className='text-dark-brown/70 text-sm'>
							Project Completed
						</p>
					</div>

					<div>
						<h2 className='text-dark-brown text-2xl md:text-3xl font-semibold'>
							125+
						</h2>
						<p className='text-dark-brown/70 text-sm'>
							Properties Acquired
						</p>
					</div>

					<div>
						<h2 className='text-dark-brown text-2xl md:text-3xl font-semibold'>
							5+
						</h2>
						<p className='text-dark-brown/70 text-sm'>
							Years of Experience
						</p>
					</div>

					<div>
						<h2 className='text-dark-brown text-2xl md:text-3xl font-semibold'>
							150+
						</h2>
						<p className='text-dark-brown/70 text-sm'>
							Happy Clients
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
