import Title from "@components/Title";
const Welcome = ( {title,subtitle} ) => {
    return (
        <section className="bg-[url(bg-welcome.jpg)] bg-cover bg-center text-center min-h-80 grid place-items-center">
            <article>
                <Title type="h3" className="font-bold">
                    {title}
                </Title>
                <Title type="h5" className="text-primary">
                    {subtitle}
                </Title>
            </article>
        </section>
    );
};

export default Welcome;
