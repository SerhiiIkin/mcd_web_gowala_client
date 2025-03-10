import ContactForm from "@/components/ContactForm";
import Employees from "@/components/Employees";

import FastContact from "@/components/FastContact";
import Welcome from "@/components/Welcome";

const Contact = () => {
    const welcomeData = {
        title: "Kontakt Gowala",
        subtitle: "Vores kontaktinformationer",
    };

    return (
        <>
            <Welcome {...welcomeData} />
            <div className="lg:grid lg:grid-cols-2 gap-4">
                <ContactForm />
                <FastContact />
            </div>
            <Employees />
        </>
    );
};

export default Contact;
