// import BookConsultation from "@/components/BookConsultation";
import ElectronicsHero from "./ElectronicsHero";
import ElectronicsGrid from "./ElectronicsGrid";

const page = () => {
	return (
		<div className='min-h-screen'>
			<ElectronicsHero />
			<ElectronicsGrid />
			{/* <BookConsultation /> */}
		</div>
	);
};

export default page;
