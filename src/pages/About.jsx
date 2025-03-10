import Articles from "@/components/Articles";
import Cards from "@/components/Cards";
import Sponsors from "@/components/Sponsors";
import Title from "@/components/Title";
import SectionLayout from "@/layouts/SectionLayout";
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
            <Partners />
            <Sponsors />
            <Cards />
        </>
    );
};

export default About;

const Partners = () => {
    return (
        <SectionLayout classNameContainer="text-center grid gap-2">
            <Title type="h2">Vores partnere</Title>
            <Title type="h2" className="font-normal">
                er vi stolte af
            </Title>
            <p>
                Hos Gowala Farms samarbejder vi med nøje udvalgte partnere, der
                deler vores værdier om kvalitet, bæredygtighed og dyrevelfærd.
                Gennem disse partnerskaber sikrer vi, at vores produkter altid
                lever op til de højeste standarder.
            </p>
        </SectionLayout>
    );
};
