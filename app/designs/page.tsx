import BookConsultation from "@/components/BookConsultation";
import DesignGallery from "./DesignGallery";
import DesignHero from "./DesignHero";

const page = () => {
	return (
		<div>
			<DesignHero />
			<DesignGallery />
			<BookConsultation />
		</div>
	);
};
export default page;
