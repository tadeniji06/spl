"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { getProperties, urlFor, SanityProperty } from "@/utils/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export default function Properties() {
	const [properties, setProperties] = useState<SanityProperty[]>([]);
	const [loading, setLoading] = useState(true);
	const [active, setActive] = useState<SanityProperty | null>(null);
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const [contactOpen, setContactOpen] = useState(false);
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		async function fetchProperties() {
			try {
				const data = await getProperties();
				setProperties(data);
			} catch (error) {
				console.error("Error fetching properties:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchProperties();
	}, []);

	useEffect(() => {
		document.body.style.overflow = active ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [active]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setActive(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	useEffect(() => {
		if (active && closeBtnRef.current) {
			closeBtnRef.current.focus();
		}
	}, [active]);

	const [contact, setContact] = useState({
		name: "",
		email: "",
		message: "",
	});
	const [sending, setSending] = useState(false);
	const [sent, setSent] = useState(false);

	const submitContact = async (e: React.FormEvent) => {
		e.preventDefault();
		setSending(true);
		await new Promise((r) => setTimeout(r, 800));
		setSending(false);
		setSent(true);
	};

	const getAllImages = (property: SanityProperty): SanityImageSource[] => {
		const images: SanityImageSource[] = [property.mainImage];
		if (property.extraImages) {
			images.push(...property.extraImages);
		}
		return images;
	};

	const formatPrice = (price?: number) => {
		if (!price) return "Contact for Price";
		if (price >= 1000000000) {
			return `₦${(price / 1000000000).toFixed(1)}B`;
		}
		if (price >= 1000000) {
			return `₦${(price / 1000000).toFixed(0)}M`;
		}
		return `₦${price.toLocaleString()}`;
	};

	if (loading) {
		return (
			<section className='px-6 md:px-12 py-16 max-w-[1400px] mx-auto'>
				<h2 className='text-3xl md:text-4xl font-semibold text-dark-brown mb-10'>
					Available Properties
				</h2>
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{[...Array(6)].map((_, idx) => (
						<div
							key={idx}
							className='bg-white rounded-xl shadow-md overflow-hidden'
						>
							<div className='h-64 bg-gray-200 animate-pulse' />
							<div className='p-5 space-y-3'>
								<div className='h-6 bg-gray-200 rounded animate-pulse' />
								<div className='h-4 bg-gray-200 rounded w-2/3 animate-pulse' />
								<div className='h-8 bg-gray-200 rounded w-1/3 animate-pulse' />
							</div>
						</div>
					))}
				</div>
			</section>
		);
	}

	return (
		<section className='px-6 md:px-12 py-16 max-w-[1400px] mx-auto'>
			<h2 className='text-3xl md:text-4xl font-semibold text-dark-brown mb-10'>
				Available Properties
			</h2>

			{properties.length === 0 ? (
				<div className='text-center py-16'>
					<p className='text-gray-500 text-lg'>
						No properties available at the moment.
					</p>
				</div>
			) : (
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
					{properties.map((p) => (
						<article
							key={p._id}
							className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer'
						>
							<div className='relative h-64'>
								{p.mainImage && (
									<Image
										src={urlFor(p.mainImage).width(600).height(400).url()}
										alt={p.title}
										fill
										className='object-cover'
									/>
								)}
							</div>

							<div className='p-5'>
								<h3 className='font-semibold text-lg text-dark-brown line-clamp-2'>
									{p.title}
								</h3>
								{p.description && (
									<p className='text-sm text-gray-600 mt-1 line-clamp-1'>
										{p.description}
									</p>
								)}
								<div className='text-light-gold font-bold text-lg mt-3'>
									{formatPrice(p.price)}
								</div>

								<div className='mt-4 flex gap-3'>
									<button
										onClick={() => {
											setActive(p);
											setContactOpen(false);
											setSent(false);
											setContact({ name: "", email: "", message: "" });
										}}
										className='flex-1 bg-dark-brown text-white py-2 rounded-lg hover:bg-black transition'
									>
										View Details
									</button>

									<a
										href={`mailto:support@spl.com?subject=Inquiry about ${encodeURIComponent(
											p.title
										)}`}
										className='px-4 py-2 border border-gray-200 rounded-lg text-sm flex items-center justify-center'
									>
										Quick Contact
									</a>
								</div>
							</div>
						</article>
					))}
				</div>
			)}

			{active && (
				<div
					aria-modal='true'
					role='dialog'
					className='fixed inset-0 z-[1000] flex items-center justify-center p-4'
				>
					<div
						className='absolute inset-0 bg-black/60 backdrop-blur-sm'
						onClick={() => setActive(null)}
					/>

					<div className='relative bg-white w-full max-w-5xl max-h-[90vh] rounded-xl overflow-hidden shadow-xl z-10'>
						<div className='flex items-start justify-between p-4 border-b'>
							<div>
								<h3 className='text-xl md:text-2xl font-bold text-dark-brown max-w-[70%]'>
									{active.title}
								</h3>
								<p className='text-sm text-gray-600'>
									<span className='font-semibold text-light-gold'>
										{formatPrice(active.price)}
									</span>
								</p>
							</div>

							<div className='flex gap-2 items-start'>
								<button
									ref={closeBtnRef}
									onClick={() => setActive(null)}
									aria-label='Close details'
									className='ml-2 rounded-md px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200'
								>
									Close
								</button>
							</div>
						</div>

						<div className='p-4 md:p-6 overflow-y-auto max-h-[72vh]'>
							<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
								<div className='lg:col-span-2'>
									<Swiper
										modules={[Navigation, Thumbs]}
										navigation
										thumbs={{
											swiper:
												thumbsSwiper && !thumbsSwiper.destroyed
													? thumbsSwiper
													: null,
										}}
										className='rounded-lg mb-3'
										style={{ height: "420px" }}
									>
										{getAllImages(active).map((img, i) => (
											<SwiperSlide key={i}>
												<div className='relative w-full h-[420px]'>
													<Image
														src={urlFor(img).width(1200).height(800).url()}
														alt={`${active.title} ${i + 1}`}
														fill
														className='object-cover'
													/>
												</div>
											</SwiperSlide>
										))}
									</Swiper>

									<Swiper
										onSwiper={setThumbsSwiper}
										modules={[Thumbs]}
										slidesPerView={6}
										spaceBetween={8}
										className='mt-2'
										breakpoints={{
											320: { slidesPerView: 3 },
											640: { slidesPerView: 4 },
											1024: { slidesPerView: 6 },
										}}
										style={{ height: 72 }}
									>
										{getAllImages(active).map((img, i) => (
											<SwiperSlide key={i}>
												<div className='relative w-full h-16 rounded-md overflow-hidden border border-gray-100'>
													<Image
														src={urlFor(img).width(150).height(100).url()}
														alt={`thumb ${i}`}
														fill
														className='object-cover'
													/>
												</div>
											</SwiperSlide>
										))}
									</Swiper>
								</div>

								<aside className='space-y-4'>
									{active.description && (
										<div>
											<h4 className='text-lg font-semibold text-dark-brown'>
												Description
											</h4>
											<p className='mt-2 text-sm text-gray-700'>
												{active.description}
											</p>
										</div>
									)}

									{active.features && active.features.length > 0 && (
										<div>
											<h4 className='text-lg font-semibold text-dark-brown'>
												Features
											</h4>
											<ul className='mt-3 grid grid-cols-1 gap-2 text-sm text-gray-700 max-h-[28vh] overflow-auto pr-2'>
												{active.features.map((f, idx) => (
													<li key={idx} className='flex items-start gap-2'>
														<span className='text-light-gold mt-1'>•</span>
														<span>{f}</span>
													</li>
												))}
											</ul>
										</div>
									)}

									<div className='pt-3 border-t'>
										<div className='flex items-center justify-between'>
											<h4 className='text-lg font-semibold'>Contact Agent</h4>
											<button
												onClick={() => {
													setContactOpen((s) => !s);
													setSent(false);
												}}
												className='text-sm text-dark-brown underline'
											>
												{contactOpen ? "Close" : "Send a message"}
											</button>
										</div>

										{contactOpen ? (
											<form className='mt-3 space-y-3' onSubmit={submitContact}>
												<input
													required
													className='w-full border rounded-md px-3 py-2 text-sm'
													placeholder='Your name'
													value={contact.name}
													onChange={(e) =>
														setContact({
															...contact,
															name: e.target.value,
														})
													}
												/>
												<input
													required
													type='email'
													className='w-full border rounded-md px-3 py-2 text-sm'
													placeholder='Email'
													value={contact.email}
													onChange={(e) =>
														setContact({
															...contact,
															email: e.target.value,
														})
													}
												/>
												<textarea
													required
													className='w-full border rounded-md px-3 py-2 text-sm h-20'
													placeholder='Message (ask about viewing, price negotiation, etc.)'
													value={contact.message}
													onChange={(e) =>
														setContact({
															...contact,
															message: e.target.value,
														})
													}
												/>

												<button
													type='submit'
													disabled={sending}
													className='w-full bg-dark-brown text-white py-2 rounded-md'
												>
													{sending ? "Sending..." : sent ? "Sent ✓" : "Send Message"}
												</button>

												{!sent && (
													<a
														className='block text-center text-sm text-gray-600 underline mt-1'
														href={`mailto:agent@spl.com?subject=Inquiry about ${encodeURIComponent(
															active.title
														)}&body=${encodeURIComponent(
															contact.message || "Hi, I'm interested in this property."
														)}`}
													>
														Or email agent directly
													</a>
												)}
											</form>
										) : (
											<div className='mt-3'>
												<p className='text-sm text-gray-600'>
													Want a viewing or price breakdown? Send a message to
													our agent.
												</p>
												<a
													className='inline-block mt-3 bg-dark-brown text-white px-4 py-2 rounded-md'
													href={`mailto:agent@spl.com?subject=Interested in ${encodeURIComponent(
														active.title
													)}`}
												>
													Quick Email
												</a>
											</div>
										)}
									</div>
								</aside>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	);
}
