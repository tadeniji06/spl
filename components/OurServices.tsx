import { Icon } from "@iconify/react";

const OurServices = () => {
	const services = [
		{
			icon: "mdi:sofa-single-outline",
			title: "Interior Design",
			desc: "Clean and modern interior design services tailored to your unique lifestyle and taste.",
			items: [
				"Space Planning",
				"Furniture Selection",
				"Color Consultation",
				"Lighting Design",
			],
		},
		{
			icon: "mdi:home-city-outline",
			title: "Real Estate Advisory",
			desc: "Expert guidance to help you make confident property decisions—buying, selling, or investing.",
			items: [
				"Market Analysis",
				"Property Valuation",
				"Investment Strategy",
				"Negotiation Support",
			],
		},
		{
			icon: "mdi:office-building-marker-outline",
			title: "Property Staging",
			desc: "Professional staging services that elevate your property's appeal and attract serious buyers.",
			items: [
				"Furniture Arrangement",
				"Decor Selection",
				"Lighting Enhancement",
				"Curb Appeal Improvement",
			],
		},
		{
			icon: "mdi:tools",
			title: "Renovation Consulting",
			desc: "Full-scale renovation support—planning, budgeting, and executing your transformation with ease.",
			items: ["Project Planning", "Budget Management"],
		},
		{
			icon: "mdi:domain",
			title: "Office & Commercial Design",
			desc: "Functional and inspiring workspace design that enhances brand identity and productivity.",
			items: [
				"Workspace Planning",
				"Brand Integration",
				"Ergonomic Solutions",
				"Sustainability Consulting",
			],
		},
		{
			icon: "mdi:palette-outline",
			title: "Electronics & Lighting Design",
			desc: "Custom lighting and electronics solutions that enhance your space's ambiance and functionality.",
			items: [
				"Lighting Design",
				"Smart Home Integration",
				"Electronics Placement",
				"Energy Efficiency Consulting",
			],
		}
	];

	return (
		<section className='py-20 px-6 md:px-12 lg:px-24 bg-white'>
			{/* HEADER */}
			<div className='text-center mb-14'>
				<h2 className='text-3xl md:text-4xl font-semibold text-dark-brown'>
					Our Services
				</h2>
				<p className='text-dark-brown/70 mt-2 max-w-xl mx-auto'>
					Quality design and property solutions curated to elevate
					your living and working spaces.
				</p>
			</div>

			{/* SERVICES GRID */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1400px] mx-auto'>
				{services.map((service, index) => (
					<div
						key={index}
						className='bg-white rounded-2xl shadow-md p-8 border border-[#e9dfcd] hover:shadow-lg transition-all duration-300'
					>
						{/* Icon */}
						<div className='w-14 h-14 flex items-center justify-center rounded-xl bg-light-gold text-dark-brown mb-5'>
							<Icon icon={service.icon} className='text-3xl' />
						</div>

						{/* Title */}
						<h3 className='text-xl font-semibold text-dark-brown mb-3'>
							{service.title}
						</h3>

						{/* Description */}
						<p className='text-dark-brown/70 text-sm leading-relaxed mb-5'>
							{service.desc}
						</p>

						{/* List */}
						<ul className='space-y-2 text-sm text-dark-brown/80'>
							{service.items.map((item, idx) => (
								<li key={idx} className='flex items-start gap-2'>
									<span className='text-gold font-bold'>•</span>{" "}
									{item}
								</li>
							))}
						</ul>
					</div>
				))}
			</div>
		</section>
	);
};

export default OurServices;
