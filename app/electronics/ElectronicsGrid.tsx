"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getElectronics, urlFor, SanityElectronic } from "@/utils/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const ElectronicsGrid = () => {
	const [electronics, setElectronics] = useState<SanityElectronic[]>([]);
	const [loading, setLoading] = useState(true);
	const [activeProduct, setActiveProduct] = useState<SanityElectronic | null>(
		null
	);
	const [activeImageIndex, setActiveImageIndex] = useState(0);

	useEffect(() => {
		async function fetchElectronics() {
			try {
				const data = await getElectronics();
				setElectronics(data);
			} catch (error) {
				console.error("Error fetching electronics:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchElectronics();
	}, []);

	useEffect(() => {
		document.body.style.overflow = activeProduct ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [activeProduct]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setActiveProduct(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	const getAllImages = (product: SanityElectronic): SanityImageSource[] => {
		const images: SanityImageSource[] = [product.mainImage];
		if (product.extraImages) {
			images.push(...product.extraImages);
		}
		return images;
	};

	const formatPrice = (price?: number) => {
		if (!price) return "Contact for Price";
		return `₦${price.toLocaleString()}`;
	};

	if (loading) {
		return (
			<section className='bg-off-white py-16 px-6 md:px-16'>
				<div className='max-w-[1400px] mx-auto'>
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
						{[...Array(8)].map((_, idx) => (
							<div
								key={idx}
								className='bg-white rounded-2xl overflow-hidden shadow-md'
							>
								<div className='h-56 bg-gray-200 animate-pulse' />
								<div className='p-5 space-y-3'>
									<div className='h-5 bg-gray-200 rounded animate-pulse' />
									<div className='h-4 bg-gray-200 rounded w-2/3 animate-pulse' />
									<div className='h-6 bg-gray-200 rounded w-1/3 animate-pulse' />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className='bg-off-white py-16 px-6 md:px-16'>
			<div className='max-w-[1400px] mx-auto'>
				{electronics.length === 0 ? (
					<div className='text-center py-20'>
						<div className='inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-6'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-10 w-10 text-gray-400'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={1.5}
									d='M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
								/>
							</svg>
						</div>
						<h3 className='text-2xl font-semibold text-dark-brown mb-2'>
							No Products Available
						</h3>
						<p className='text-gray-500 max-w-md mx-auto'>
							We&apos;re currently updating our electronics inventory. Please
							check back soon for our latest products.
						</p>
					</div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.5 }}
						className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
					>
						{electronics.map((product, idx) => (
							<motion.article
								key={product._id}
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.4, delay: idx * 0.1 }}
								onClick={() => {
									setActiveProduct(product);
									setActiveImageIndex(0);
								}}
								className='bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group'
							>
								<div className='relative h-56 overflow-hidden'>
									{product.mainImage && (
										<Image
											src={urlFor(product.mainImage).width(500).height(400).url()}
											alt={product.title}
											fill
											className='object-cover transition-transform duration-500 group-hover:scale-110'
										/>
									)}
									<div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
									<div className='absolute top-3 right-3 bg-dark-brown text-white text-xs font-semibold px-3 py-1.5 rounded-full'>
										{formatPrice(product.price)}
									</div>
								</div>

								<div className='p-5'>
									<h3 className='font-semibold text-lg text-dark-brown line-clamp-2 group-hover:text-light-gold transition-colors'>
										{product.title}
									</h3>
									{product.description && (
										<p className='text-sm text-gray-600 mt-2 line-clamp-2'>
											{product.description}
										</p>
									)}
									<div className='mt-4 flex items-center justify-between'>
										<span className='text-light-gold font-bold text-lg'>
											{formatPrice(product.price)}
										</span>
										<span className='text-sm text-dark-brown font-medium flex items-center gap-1 group-hover:gap-2 transition-all'>
											View Details
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-4 w-4'
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
										</span>
									</div>
								</div>
							</motion.article>
						))}
					</motion.div>
				)}
			</div>

			<AnimatePresence>
				{activeProduct && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						aria-modal='true'
						role='dialog'
						className='fixed inset-0 z-[1000] flex items-center justify-center p-4'
					>
						<div
							className='absolute inset-0 bg-black/70 backdrop-blur-sm'
							onClick={() => setActiveProduct(null)}
						/>
						<motion.div
							initial={{ opacity: 0, scale: 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.95 }}
							className='relative bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl z-10'
						>
							<div className='flex items-center justify-between p-5 border-b bg-gray-50'>
								<div>
									<h3 className='text-xl md:text-2xl font-bold text-dark-brown'>
										{activeProduct.title}
									</h3>
									<p className='text-light-gold font-semibold mt-1'>
										{formatPrice(activeProduct.price)}
									</p>
								</div>
								<button
									onClick={() => setActiveProduct(null)}
									className='p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth={2}
											d='M6 18L18 6M6 6l12 12'
										/>
									</svg>
								</button>
							</div>

							<div className='p-5 md:p-8 overflow-y-auto max-h-[75vh]'>
								<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
									<div>
										<div className='relative w-full h-[350px] rounded-xl overflow-hidden bg-gray-100'>
											<Image
												src={urlFor(
													getAllImages(activeProduct)[activeImageIndex]
												)
													.width(800)
													.height(600)
													.url()}
												alt={activeProduct.title}
												fill
												className='object-contain'
											/>
											{getAllImages(activeProduct).length > 1 && (
												<>
													<button
														onClick={() =>
															setActiveImageIndex((prev) =>
																prev === 0
																	? getAllImages(activeProduct).length - 1
																	: prev - 1
															)
														}
														className='absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition'
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															className='h-5 w-5'
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
																prev === getAllImages(activeProduct).length - 1
																	? 0
																	: prev + 1
															)
														}
														className='absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition'
													>
														<svg
															xmlns='http://www.w3.org/2000/svg'
															className='h-5 w-5'
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

										{getAllImages(activeProduct).length > 1 && (
											<div className='flex gap-2 mt-4 overflow-x-auto pb-2'>
												{getAllImages(activeProduct).map((img, idx) => (
													<button
														key={idx}
														onClick={() => setActiveImageIndex(idx)}
														className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition ${
															idx === activeImageIndex
																? "border-light-gold"
																: "border-gray-200 hover:border-gray-300"
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
									</div>

									<div className='space-y-6'>
										<div>
											<h4 className='text-lg font-semibold text-dark-brown mb-3'>
												Product Details
											</h4>
											{activeProduct.description ? (
												<p className='text-gray-600 leading-relaxed'>
													{activeProduct.description}
												</p>
											) : (
												<p className='text-gray-500 italic'>
													No description available for this product.
												</p>
											)}
										</div>

										<div className='pt-6 border-t'>
											<h4 className='text-lg font-semibold text-dark-brown mb-4'>
												Interested in this product?
											</h4>
											<div className='space-y-3'>
												<a
													href={`mailto:electronics@spl.com?subject=Inquiry about ${encodeURIComponent(
														activeProduct.title
													)}`}
													className='flex items-center justify-center gap-2 w-full bg-dark-brown text-white py-3 rounded-xl font-medium hover:bg-black transition'
												>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														className='h-5 w-5'
														fill='none'
														viewBox='0 0 24 24'
														stroke='currentColor'
													>
														<path
															strokeLinecap='round'
															strokeLinejoin='round'
															strokeWidth={2}
															d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
														/>
													</svg>
													Email Inquiry
												</a>
												<a
													href={`https://wa.me/?text=Hi, I'm interested in the ${encodeURIComponent(
														activeProduct.title
													)} priced at ${formatPrice(activeProduct.price)}`}
													target='_blank'
													rel='noopener noreferrer'
													className='flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition'
												>
													<svg
														xmlns='http://www.w3.org/2000/svg'
														className='h-5 w-5'
														fill='currentColor'
														viewBox='0 0 24 24'
													>
														<path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' />
													</svg>
													WhatsApp
												</a>
											</div>
										</div>
									</div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
};

export default ElectronicsGrid;
