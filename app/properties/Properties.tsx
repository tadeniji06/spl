"use client";

import React, { JSX, useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import {
	l1,
	l10,
	l2,
	l3,
	l4,
	l5,
	l6,
	l7,
	l8,
	l9,
	os1,
	os10,
	os2,
	os3,
	os4,
	os5,
	os6,
	os7,
	os8,
	os9,
} from "@/assets/properties";

type Property = {
	id: number;
	title: string;
	location: string;
	price: string;
	mainImg: StaticImageData;
	images: StaticImageData[];
	features: string[];
	titleDoc?: string;
};

const properties: Property[] = [
	{
		id: 1,
		title:
			"Magnificent Luxury Spacious 5 Bedroom Fully Detached Duplex with BQ, Swimming pool, Cinema, Rooftop terrace, Home salon, water fountain, Home Office, Elevator and Garden",
		location: "Osapa London, Lekki",
		price: "₦1.5B",
		mainImg: os6,
		images: [os1, os2, os3, os4, os5, os6, os7, os8, os9, os10],
		features: [
			"All rooms en-suite",
			"Spacious living Area",
			"Fully fitted kitchen",
			"Quality finishing",
			"Smart home features",
			"Fitted Wardrobes",
			"Well ventilated",
			"Modern POP ceilings & aesthetic lighting",
			"Walk-in shower & walk-in closet",
			"Top quality tiles",
			"Ample parking space",
			"Good road network",
			"Good electricity",
			"Flood free area",
			"Family lounge",
			"Inbuilt speakers",
			"BQ",
			"Swimming pool",
			"Cinema",
			"Rooftop terrace",
			"Home salon",
			"Elevator",
			"Water fountain",
			"Home Office",
			"Garden",
		],
		titleDoc: "Certificate of Occupancy",
	},
	{
		id: 2,
		title:
			"2.5 Units of 5 Bedroom Fully Detached Duplex For Sale (With & Without Pool Option)",
		location: "Lekki Phase 1",
		price: "₦770M - ₦820M",
		mainImg: l8,
		images: [l1, l2, l3, l4, l5, l6, l7, l8, l9, l10],
		features: [
			"Superdecent finishing",
			"Brand New",
			"5 Bedrooms",
			"Maids quarters",
			"Spacious Ensuite Bedrooms",
			"Alluring Lighting",
			"Fully fitted kitchen",
			"Microwave, gas burner & Oven",
			"Heat Extractor",
			"Inbuilt Fridge",
			"Inbuilt washing machine",
			"Jacuzzi in Masters & Madam's bathroom",
			"State of the art wood works",
			"CCTV",
			"Gym house",
			"Cinema",
			"Inbuilt speaker",
			"Ample parking space",
			"Spanish tiles finishing",
			"Modern wardrobes with lighting",
			"Family Lounge",
			"Water Heater",
			"Modern Design",
			"Secured Estate",
			"Inbuilt Wine bar",
			"Good neighborhood",
		],
		titleDoc: "Governor's Consent",
	},
];

export default function Properties(): JSX.Element {
	const [active, setActive] = useState<Property | null>(null);
	const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
	const [contactOpen, setContactOpen] = useState(false);
	const closeBtnRef = useRef<HTMLButtonElement | null>(null);

	// Lock body scroll when modal open
	useEffect(() => {
		document.body.style.overflow = active ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [active]);

	// Close on ESC
	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") setActive(null);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	// focus close button when modal opens (accessibility)
	useEffect(() => {
		if (active && closeBtnRef.current) {
			closeBtnRef.current.focus();
		}
	}, [active]);

	// Simple contact form state
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
		// placeholder — you can wire this to your API or email
		await new Promise((r) => setTimeout(r, 800));
		setSending(false);
		setSent(true);
	};

	return (
		<section className='px-6 md:px-12 py-16 max-w-[1400px] mx-auto'>
			<h2 className='text-3xl md:text-4xl font-semibold text-dark-brown mb-10'>
				Available Properties
			</h2>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
				{properties.map((p) => (
					<article
						key={p.id}
						className='bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer'
					>
						<div className='relative h-64'>
							<Image
								src={p.mainImg}
								alt={p.title}
								fill
								className='object-cover'
							/>
						</div>

						<div className='p-5'>
							<h3 className='font-semibold text-lg text-dark-brown line-clamp-2'>
								{p.title}
							</h3>
							<p className='text-sm text-gray-600 mt-1'>
								{p.location}
							</p>
							<div className='text-light-gold font-bold text-lg mt-3'>
								{p.price}
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
									onClick={(e) => {
										// optional analytics or tracking
									}}
									className='px-4 py-2 border border-gray-200 rounded-lg text-sm flex items-center justify-center'
								>
									Quick Contact
								</a>
							</div>
						</div>
					</article>
				))}
			</div>

			{/* Modal */}
			{active && (
				<div
					aria-modal='true'
					role='dialog'
					className='fixed inset-0 z-1000 flex items-center justify-center p-4'
				>
					{/* overlay */}
					<div
						className='absolute inset-0 bg-black/60 backdrop-blur-sm'
						onClick={() => setActive(null)}
					/>

					{/* dialog */}
					<div className='relative bg-white w-full max-w-5xl max-h-[90vh] rounded-xl overflow-hidden shadow-xl z-10'>
						{/* header */}
						<div className='flex items-start justify-between p-4 border-b'>
							<div>
								<h3 className='text-xl md:text-2xl font-bold text-dark-brown max-w-[70%]'>
									{active.title}
								</h3>
								<p className='text-sm text-gray-600'>
									{active.location} •{" "}
									<span className='font-semibold text-light-gold'>
										{active.price}
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

						{/* content */}
						<div className='p-4 md:p-6 overflow-y-auto max-h-[72vh]'>
							<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
								{/* left: carousel + thumbs */}
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
										{active.images.map((img, i) => (
											<SwiperSlide key={i}>
												<div className='relative w-full h-[420px]'>
													<Image
														src={img}
														alt={`${active.title} ${i + 1}`}
														fill
														className='object-cover'
													/>
												</div>
											</SwiperSlide>
										))}
									</Swiper>

									{/* thumbnails */}
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
										{active.images.map((img, i) => (
											<SwiperSlide key={i}>
												<div className='relative w-full h-16 rounded-md overflow-hidden border border-gray-100'>
													<Image
														src={img}
														alt={`thumb ${i}`}
														fill
														className='object-cover'
													/>
												</div>
											</SwiperSlide>
										))}
									</Swiper>
								</div>

								{/* right: details + contact */}
								<aside className='space-y-4'>
									<div>
										<h4 className='text-lg font-semibold text-dark-brown'>
											Features
										</h4>
										<ul className='mt-3 grid grid-cols-1 gap-2 text-sm text-gray-700 max-h-[28vh] overflow-auto pr-2'>
											{active.features.map((f, idx) => (
												<li
													key={idx}
													className='flex items-start gap-2'
												>
													<span className='text-light-gold mt-1'>
														•
													</span>
													<span>{f}</span>
												</li>
											))}
										</ul>
									</div>

									<div>
										<h4 className='text-lg font-semibold text-dark-brown'>
											Title Document
										</h4>
										<p className='mt-2 text-sm text-gray-700'>
											{active.titleDoc ?? "Not specified"}
										</p>
									</div>

									{/* Contact area */}
									<div className='pt-3 border-t'>
										<div className='flex items-center justify-between'>
											<h4 className='text-lg font-semibold'>
												Contact Agent
											</h4>
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
											<form
												className='mt-3 space-y-3'
												onSubmit={submitContact}
											>
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
													{sending
														? "Sending..."
														: sent
														? "Sent ✓"
														: "Send Message"}
												</button>

												{!sent && (
													<a
														className='block text-center text-sm text-gray-600 underline mt-1'
														href={`mailto:agent@splexample.com?subject=Inquiry about ${encodeURIComponent(
															active.title
														)}&body=${encodeURIComponent(
															contact.message ||
																"Hi, I'm interested in this property."
														)}`}
													>
														Or email agent directly
													</a>
												)}
											</form>
										) : (
											<div className='mt-3'>
												<p className='text-sm text-gray-600'>
													Want a viewing or price breakdown? Send a
													message to our agent.
												</p>
												<a
													className='inline-block mt-3 bg-dark-brown text-white px-4 py-2 rounded-md'
													href={`mailto:agent@splexample.com?subject=Interested in ${encodeURIComponent(
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
