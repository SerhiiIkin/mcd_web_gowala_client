import Title from "@components/Title";
import SectionLayout from "@layouts/SectionLayout";

const Cards = () => {
    const cards = [
        {
            _id: 1,
            title: "Farmens teknologi",
            description:
                "Vores avancerede teknologi kombinerer effektivitet med høj hygiejnestandard, hvilket garanterer produkter af den bedste kvalitet.",
            image: "/cards/01.png",
        },
        {
            _id: 2,
            title: "Farmens landmænd",
            description:
                "Landmændene hos Gowala Farms er dedikeret til dyrevelfærd og bæredygtigt landbrug, hvor omsorg for køerne altid kommer i første række.",
            image: "/cards/02.png",
        },
        {
            _id: 3,
            title: "Fra mejeriet til forbrugeren",
            description:
                "Transporten fra mejeriet til butikken foregår hurtigt og skånsomt for at bevare produkternes friskhed og kvalitet.",
            image: "/cards/03.png",
        },
    ];

    return (
        <SectionLayout classNameContainer="text-center">
            <Title type="h4" className="">
                Den førende mælkeproducent
            </Title>
            <Title type="h3" className="font-bold">
                Sund og nærende mælk siden 1975
            </Title>
            <div
                aria-label="cards-container"
                className="flex flex-wrap gap-4 gap-y-8 justify-center">
                {cards.map((card) => (
                    <article
                        key={card._id}
                        className="shadow-md py-13 px-12 grid gap-5 justify-items-center flex-[500px] grow-0">
                        <img src={card.image} alt="image card" />
                        <Title type="h4">{card.title}</Title>
                        <p className="text-[0.9375rem]">{card.description}</p>
                    </article>
                ))}
            </div>
        </SectionLayout>
    );
};

export default Cards;
