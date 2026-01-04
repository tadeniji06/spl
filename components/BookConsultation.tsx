import { n1 } from "@/assets";
import Image from "next/image";
import Link from "next/link";

const BookConsultation = () => {
	return (
		<section className='px-4 py-12 md:py-20 bg-off-white'>
			<div className='max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center md:justify-between gap-10'>
				{/* Text Content */}
				<div className='flex-1 text-center md:text-left'>
					<h2 className='text-3xl md:text-4xl font-bold text-gray-800 mb-4'>
						Let's Help You Find A Home And Style It
					</h2>
					<p className='text-gray-600 mb-6 leading-relaxed'>
						We design homes that look good, feel comfortable, and work
						for everyday living. Our goal is to create spaces that
						match your style while still being practical for your
						daily routine. Whether you want something modern, cozy, or
						clean and simple, we help you bring it to life in a way
						that feels natural and easy to live in.
					</p>
					<Link
						target='_blank'
						href='https://wa.me/2349033704954?text=Hi%2C%20I%20would%20like%20to%20book%20a%20consultation'
					>
						<button className='bg-light-gold hover:bg-gold-dark transition-colors text-white font-semibold py-3 px-6 rounded-lg'>
							Book Consultation
						</button>
					</Link>
				</div>

				{/* Image */}
				<div className='flex-1 flex justify-center md:justify-end'>
					<div className='w-full max-w-md md:max-w-lg'>
						<Image
							src={n1}
							alt='Home'
							width={500}
							height={500}
							className='rounded-xl shadow-lg object-cover'
							priority
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BookConsultation;
