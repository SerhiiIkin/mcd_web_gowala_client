import SectionLayout from "@layouts/SectionLayout";
import Title from "@components/Title";
import NewsletterForm from "./NewsletterForm";


const Newsletter = () => {
    return (
        <SectionLayout>
            <div className="bg-[url(blob_01.jpg)] bg-cover bg-center p-6 ">
                <div
                    aria-label="content"
                    className="bg-secondary pt-14 pb-8 px-9 text-center mb-4">
                    <Title type="h3" className="font-bold ">
                        Nyhedsbrev
                    </Title>
                    <Title type="h3" className="text-primary pb-12">
                        Få nyhederne fra gården på din mail.
                    </Title>
                    <p>
                        Tilmeld dig vores nyhedsbrev - så kan du altid følge med
                        i, hvad der sker på farmen.
                    </p>
                </div>
                <NewsletterForm />
            </div>
        </SectionLayout>
    );
};

export default Newsletter;
