"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getDesigns, urlFor, SanityDesign } from "@/utils/sanity";

const DesignGallery = () => {
	const [designs, setDesigns] = useState<SanityDesign[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeDesign, setActiveDesign] = useState<SanityDesign | null>(null);
	const [activeImageIndex, setActiveImageIndex] = useState(0);

	useEffect(() => {
		async function fetchDesigns() {
			try {
				const data = await getDesigns();
				setDesigns(data);
			} catch (error) {
				console.error("Error fetching designs:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchDesigns();
	}, []);

	useEffect(() => {
		document.body.style.overflow = activeDesign ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [activeDesign]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setActiveDesign(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	const getAllImages = (design: SanityDesign) => {
		const images = [design.mainImage];
		if (design.extraImages) {
			images.push(...design.extraImages);
		}
		return images;
	};

	if (loading) {
		return (
			<section className='bg-white py-16 px-4 md:px-16'>
				<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
					{[...Array(8)].map((_, idx) => (
						<div
							key={idx}
							className='h-48 md:h-60 bg-gray-200 rounded-xl animate-pulse'
						/>
					))}
				</div>
			</section>
		);
	}

	return (
		<section className='bg-white py-16 px-4 md:px-16'>
			<div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
				{designs.map((design) => (
					<div
						key={design._id}
						onClick={() => {
							setActiveDesign(design);
							setActiveImageIndex(0);
						}}
						className='relative overflow-hidden rounded-xl shadow-lg group cursor-pointer h-48 md:h-60'
					>
						{design.mainImage && (
							<Image
								src={urlFor(design.mainImage).width(600).height(400).url()}
								alt={design.title || "Design"}
								fill
								className='object-cover transition-transform duration-500 group-hover:scale-110'
								sizes='(max-width: 768px) 50vw, 25vw'
							/>
						)}
						<div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
						<div className='absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
							<p className='text-white font-medium text-sm truncate'>
								{design.title}
							</p>
						</div>
					</div>
				))}
			</div>

			{activeDesign && (
				<div
					aria-modal='true'
					role='dialog'
					className='fixed inset-0 z-[1000] flex items-center justify-center p-4'
				>
					<div
						className='absolute inset-0 bg-black/70 backdrop-blur-sm'
						onClick={() => setActiveDesign(null)}
					/>
					<div className='relative bg-white w-full max-w-4xl max-h-[90vh] rounded-xl overflow-hidden shadow-xl z-10'>
						<div className='flex items-center justify-between p-4 border-b'>
							<h3 className='text-xl font-bold text-dark-brown'>
								{activeDesign.title}
							</h3>
							<button
								onClick={() => setActiveDesign(null)}
								className='rounded-md px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200'
							>
								Close
							</button>
						</div>
						<div className='p-4 overflow-y-auto max-h-[75vh]'>
							<div className='relative w-full h-[400px] rounded-lg overflow-hidden mb-4'>
								<Image
									src={urlFor(getAllImages(activeDesign)[activeImageIndex])
										.width(1200)
										.height(800)
										.url()}
									alt={activeDesign.title || "Design"}
									fill
									className='object-cover'
								/>
								{getAllImages(activeDesign).length > 1 && (
									<>
										<button
											onClick={() =>
												setActiveImageIndex((prev) =>
													prev === 0
														? getAllImages(activeDesign).length - 1
														: prev - 1
												)
											}
											className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg'
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-6 w-6'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M15 19l-7-7 7-7'
												/>
											</svg>
										</button>
										<button
											onClick={() =>
												setActiveImageIndex((prev) =>
													prev === getAllImages(activeDesign).length - 1
														? 0
														: prev + 1
												)
											}
											className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg'
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-6 w-6'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M9 5l7 7-7 7'
												/>
											</svg>
										</button>
									</>
								)}
							</div>
							{getAllImages(activeDesign).length > 1 && (
								<div className='flex gap-2 overflow-x-auto pb-2'>
									{getAllImages(activeDesign).map((img, idx) => (
										<button
											key={idx}
											onClick={() => setActiveImageIndex(idx)}
											className={`relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border-2 transition ${
												idx === activeImageIndex
													? "border-light-gold"
													: "border-transparent"
											}`}
										>
											<Image
												src={urlFor(img).width(100).height(100).url()}
												alt={`Thumbnail ${idx + 1}`}
												fill
												className='object-cover'
											/>
										</button>
									))}
								</div>
							)}
							{activeDesign.description && (
								<p className='text-gray-600 mt-4'>{activeDesign.description}</p>
							)}
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default DesignGallery;
