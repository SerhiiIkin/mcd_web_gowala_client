
import { Link } from "react-router";
import { classes } from "@utils/classes";
const LogoLink = ({ className}) => (
    <Link to="/" className={classes(["mr-auto xl:hover:scale-110 xl:duration-700", className])}>
        <img src="/logo.png" alt="logo" />
    </Link>
);

export default LogoLink;
