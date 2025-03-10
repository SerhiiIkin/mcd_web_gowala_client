import { classes } from "@utils/classes";

const Title = ({ type, className, children }) => {
    switch (type) {
        case "h2":
            return (
                <h2 className={classes(["font-semibold text-[2.5rem]", className])}>
                    {children}
                </h2>
            );
        case "h3":
            return (
                <h3 className={classes([" text-4xl", className])}>
                    {children}
                </h3>
            );

        case "h4":
            return (
                <h4 className={classes(["font-semibold text-2xl", className])}>
                    {children}
                </h4>
            );

        case "h5":
            return (
                <h5 className={classes(["font-semibold text-xl", className])}>
                    {children}
                </h5>
            );

        default:
            return (
                <h1 className={classes(["font-semibold text-[2.5rem]", className])}>
                    {children}
                </h1>
            );
    }
};

export default Title;
