import Title from "@components/Title";
import SectionLayout from "@layouts/SectionLayout";

const PartnersArticle = () => {
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


export default PartnersArticle;