import BookConsultation from "@/components/BookConsultation";
import FeaturedDesigns from "@/components/FeaturedDesigns";
import FeaturedProperties from "@/components/FeaturedProperties";
import Hero from "@/components/Hero";
import OurServices from "@/components/OurServices";

const page = () => {
	return (
		<div className='min-h-screen'>
			<Hero />
			<FeaturedDesigns />
			<FeaturedProperties />
			<OurServices />
			<BookConsultation />
		</div>
	);
};
export default page;
