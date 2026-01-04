import AboutHero from "@/components/AboutHero";
import BookConsultation from "@/components/BookConsultation";
import OurServices from "@/components/OurServices";
import WhatWeStanFor from "@/components/WhatWeStanFor";
import AboutFounder from "@/components/AboutFounder";
const page = () => {
	return (
		<div>
			<AboutHero />
			<AboutFounder />
			<OurServices />
			<WhatWeStanFor />
			<BookConsultation />
		</div>
	);
};
export default page;
