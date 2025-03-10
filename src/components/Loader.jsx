import { classes } from "@/utils/classes";

const Loader = ({ className }) => {
    return (
        <span
            className={classes([
                "animate-spin rounded-full border-b border-b-white w-4 aspect-square ",
                className,
            ])}></span>
    );
};

export default Loader;
