import {
	i1,
	i2,
	i3,
	i4,
	i5,
	i6,
	i7,
	i8,
	i9,
	i10,
	i11,
	i12,
	i13,
	i14,
	i15,
	i17,
} from "@/assets";
import Image from "next/image";

const DesignGallery = () => {
	const images = [
		i1,
		i2,
		i3,
		i4,
		i5,
		i6,
		i7,
		i8,
		i9,
		i10,
		i11,
		i12,
		i13,
		i14,
		i15,
		i17,
	];

	return (
		<section className='bg-white py-16 px-4 md:px-16'>
			{/* Hero */}
			{/* <div className='max-w-3xl mx-auto text-center mb-12'>
				<h2 className='text-3xl md:text-4xl font-bold text-dark-brown mb-4'>
					Explore Our Designs
				</h2>
				<p className='text-gray-600 text-lg md:text-xl'>
					Explore our exclusive collection of designs, featuring a
					variety of styles and inspirations to suit every taste.
				</p>
			</div> */}

			{/* Gallery Grid */}
			<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
				{images.map((img, idx) => (
					<div
						key={idx}
						className='relative overflow-hidden rounded-xl shadow-lg group cursor-pointer h-48 md:h-60'
					>
						<Image
							src={img}
							alt={`Design ${idx + 1}`}
							fill
							className='object-cover transition-transform duration-500 group-hover:scale-110'
							sizes='(max-width: 768px) 50vw, 25vw'
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default DesignGallery;
