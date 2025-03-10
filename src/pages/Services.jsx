import Articles from "@/components/Articles";
import Newsletter from "@/components/Newsletter";
import Welcome from "@components/Welcome";

const Services = () => {
    const titles = ["Stærk genetik", "Plads til udfoldelse", "Valg af de bedste køer"]
    const welcomeData = {
        title: "Gowala tilbyder",
        subtitle:"Hvad vi tilbyder vores forbrugere"
    }

    return (
        <>
            <Welcome  {...welcomeData} />
            <Articles titles={titles} />
            <Newsletter/>
        </>
    );
};

export default Services;
