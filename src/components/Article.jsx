import { classes } from "@/utils/classes";
import Title from "@components/Title";

const Article = ({ article }) => {
    const CheckBoxSvg = () => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                id="Vector"
                d="M2.64889 23.3333C1.92044 23.3333 1.29663 23.0833 0.777449 22.5833C0.259149 22.0824 0 21.4805 0 20.7778V2.88887C0 2.18609 0.259149 1.58426 0.777449 1.08337C1.29663 0.583331 1.92044 0.333313 2.64889 0.333313H21.1911C21.9196 0.333313 22.5434 0.583331 23.0626 1.08337C23.5809 1.58426 23.84 2.18609 23.84 2.88887V20.7778C23.84 21.4805 23.5809 22.0824 23.0626 22.5833C22.5434 23.0833 21.9196 23.3333 21.1911 23.3333H2.64889ZM10.0658 16.6569C10.2424 16.6569 10.4079 16.6305 10.5624 16.5777C10.717 16.524 10.8604 16.4333 10.9929 16.3055L18.5091 9.05415C18.7519 8.81989 18.8733 8.53239 18.8733 8.19165C18.8733 7.8509 18.7409 7.55276 18.476 7.2972C18.2332 7.06294 17.9241 6.94581 17.5489 6.94581C17.1736 6.94581 16.8646 7.06294 16.6218 7.2972L10.0658 13.6222L7.18511 10.843C6.9423 10.6088 6.6443 10.4916 6.29111 10.4916C5.93793 10.4916 5.62889 10.6194 5.364 10.875C5.12119 11.1092 4.99978 11.4074 4.99978 11.7694C4.99978 12.1315 5.12119 12.4296 5.364 12.6639L9.13867 16.3055C9.27111 16.4333 9.41459 16.524 9.56911 16.5777C9.72363 16.6305 9.88919 16.6569 10.0658 16.6569Z"
                fill="#5E9A13"
            />
        </svg>
    );
    return (
        <article className={classes(["grid lg:flex gap-3",  "even:lg:flex-row-reverse"])}>
            <img src={article.image} alt="aritcle image" className="" />
            <div className="lg:col-start-2">
                <Title type="h4">{article.title}</Title>
                <p className="whitespace-pre-wrap">{article.description}</p>
                <ul className="grid gap-4">
                    {article.list.map((item, index) => (
                        <li key={index} className="flex gap-4">
                            <CheckBoxSvg /> {item}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
};

export default Article;
