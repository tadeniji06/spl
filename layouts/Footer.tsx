import { headerLinks, categories, regions } from "@/utils/data";
import { logo } from "@/assets";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<div className='bg-dark-brown text-white	border-t border-gray-300'>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
				<footer className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12'>
					{/* Brand Section */}
					<div className='md:col-span-2 lg:col-span-1 space-y-4'>
						<Link href='/' className='inline-block'>
							<Image
								src={logo}
								alt='Showcase Africa Logo'
								width={150}
								height={50}
								className='h-auto'
							/>
						</Link>
						<p className='text-white text-sm leading-relaxed max-w-sm'>
							Curating exceptional interiors and exclusive properties
							.
						</p>
					</div>

					{/* Company Links */}
					<div className='space-y-4'>
						<h3 className='font-bold text-lg'>Services</h3>
						<nav className='space-y-3'>
							{headerLinks.map((link) => (
								<Link
									key={link.title}
									href={link.link}
									className='block text-white hover:text-gray-600 text-sm transition-colors duration-200 hover:underline'
								>
									{link.title}
								</Link>
							))}
						</nav>
					</div>

					{/* Sections */}
					<div className='space-y-4'>
						<h3 className='font-bold text-lg'>Company</h3>
						<nav className='space-y-3'>
							{categories.map((category) => (
								<Link
									key={category.title}
									href={category.link}
									className='block text-white hover:text-gray-600 text-sm transition-colors duration-200 hover:underline'
								>
									{category.title}
								</Link>
							))}
						</nav>
					</div>
				</footer>
			</div>

			{/* Bottom Bar */}
			<div className='border-t border-white/20'>
				<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6'>
					<div className='flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white'>
						<p>
							© {new Date().getFullYear()} SPL Concepts. All rights
							reserved.
						</p>
						<p>
							Developed by{" "}
							<Link
								href='https://tech360online.com'
								target='_blank'
								rel='noopener noreferrer'
								className='text-white hover:underline font-medium transition-colors duration-200'
							>
								Btech360
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
