import Articles from "@components/Articles";
import Cards from "@components/Cards";
import PartnersArticle from "@components/PartnersArticle";
import Sponsors from "@components/Sponsors";
import Welcome from "@components/Welcome";

const About = () => {
    const welcomeData = {
        title: "Om Gowala Farms",
        subtitle: "Vores kvalitet og service",
    };
    const titles = ["Om Gowala Farms"];

    return (
        <>
            <Welcome {...welcomeData} />
            <Articles titles={titles} />
            <PartnersArticle />
            <Sponsors />
            <Cards />
        </>
    );
};

export default About;
