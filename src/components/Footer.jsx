import LogoLink from "@components/LogoLink";
import ContactList from "@components/ContactList";

const Footer = () => {

    const contactData = {
        mobilePhone: "+88130-589-745-6987",
        phone: "+1655-456-532",
        daysHours: "Mon - Fri 09:00 - 18:00",
        noteDayHour: "(except public holidays)",
        street: "Mejerigade 14",
        city: "Mejeby",
    };

    return (
        <footer className="pt-16">
            <div className="bg-no-repeat bg-[url(footer_bg.jpg)] bg-cover bg-center ">
                <div className="container  px-3 md:px-4 xl:px-5 pb-[450px] max-w-xs">
                    <LogoLink className="mb-12 inline-block" />
                    <p className="pb-16">
                        Gowala Farms er en dedikeret gård, der producerer friske
                        mejeriprodukter og kvalitetskød med fokus på
                        dyrevelfærd, bæredygtighed og autentisk smag.
                    </p>
                    <ContactList contactData={contactData} />
                </div>
            </div>
            <div className="container mx-auto px-3 md:px-4 xl:px-5 text-center py-5">
                © 2024 <span className="text-primary">Gowala.</span> All rights
                Reserved By <span className="text-primary">LabArtisian</span> &{" "}
                <span className="text-primary">Viborg Media College</span>
            </div>
        </footer>
    );
};

export default Footer;
