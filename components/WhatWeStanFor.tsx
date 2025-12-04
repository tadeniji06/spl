import { home } from "@/assets";
import Image from "next/image";

const WhatWeStanFor = () => {
	return (
		<section className='flex flex-col md:flex-row items-center bg-white py-16 px-4 md:px-16 gap-10'>
			{/* Image */}
			<div className='w-full md:w-1/2 h-64 md:h-[400px]'>
				<Image
					src={home}
					alt='Home'
					className='w-full h-full object-cover rounded-xl shadow-lg'
					priority
				/>
			</div>

			{/* Text / Grid */}
			<div className='w-full md:w-1/2 text-center md:text-left'>
				<h2 className='text-3xl md:text-4xl font-bold mb-8 text-dark-brown'>
					What We Stand For
				</h2>

				<div className='grid grid-cols-2 gap-6 text-dark-brown'>
					<div className='bg-gray-50 rounded-lg shadow-sm p-6 flex flex-col items-center md:items-start h-40 justify-center'>
						<h3 className='text-xl font-semibold mb-2'>Excellence</h3>
						<p className='text-gray-500 text-sm'>
							Delivering top quality designs that exceed expectations.
						</p>
					</div>

					<div className='bg-gray-50 rounded-lg shadow-sm p-6 flex flex-col items-center md:items-start h-40 justify-center'>
						<h3 className='text-xl font-semibold mb-2'>
							Collaboration
						</h3>
						<p className='text-gray-500 text-sm'>
							Working closely with clients to realize their vision.
						</p>
					</div>

					<div className='bg-gray-50 rounded-lg shadow-sm p-6 flex flex-col items-center md:items-start h-40 justify-center'>
						<h3 className='text-xl font-semibold mb-2'>Innovation</h3>
						<p className='text-gray-500 text-sm'>
							Creating forward-thinking designs with fresh ideas.
						</p>
					</div>

					<div className='bg-gray-50 rounded-lg shadow-sm p-6 flex flex-col items-center md:items-start h-40 justify-center'>
						<h3 className='text-xl font-semibold mb-2'>Integrity</h3>
						<p className='text-gray-500 text-sm'>
							Upholding honesty and transparency in every project.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default WhatWeStanFor;
