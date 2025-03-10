import SectionLayout from "@/layouts/SectionLayout";
import Title from "@components/Title";
import ContactList from "@/components/ContactList";

const FastContact = () => {
    const contactData = {
        mobilePhone: "+88130-589-745-6987",
        phone: "+1655-456-532",
        daysHours: "Mon - Fri 09:00 - 18:00",
        noteDayHour: "(except public holidays)",
        street: "25/2 Lane2 Vokte Street Building",
        city: "Melborn City",
    };

    return (
        <SectionLayout>
            <div className="shadow-lg p-5 ">
                <div className="max-w-xs grid gap-10">
                    <Title type="h4">Hurgit kontakt</Title>
                    <p>
                        Har du spørgsmål eller ønsker du at høre mere om vores
                        produkter? Kontakt os – vi står altid klar til at
                        hjælpe!
                    </p>
                    <ContactList contactData={contactData} />
                </div>
            </div>
        </SectionLayout>
    );
};

export default FastContact;
