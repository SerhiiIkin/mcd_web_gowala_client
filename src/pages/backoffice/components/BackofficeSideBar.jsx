import Arrow from "@/components/Arrow";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Link } from "react-router";
import gsap from "gsap";

const BackofficeSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const sideBarLinks = [
        { name: "Backoffice", path: "/backoffice" },
        { name: "Produkter", path: "/backoffice/products" },
        { name: "Messages", path: "/backoffice/messages" },
    ];

    const sideBar = useRef(null);
    const arrowSvg = useRef(null);

    const { contextSafe } = useGSAP({ scope: sideBar });

    const handleSideBar = contextSafe(() => {
        setIsOpen((prev) => !prev);

        if (isOpen) {
            gsap.to(sideBar.current, {
                translateX: "-100%",
                duration: 0.5,
                ease: "power3.inOut",
            });
            gsap.to(arrowSvg.current, { rotate: 0, duration: 0.5 });
        } else {
            gsap.to(sideBar.current, {
                translateX: 0,
                duration: 0.5,
                ease: "power3.inOut",
            });
            gsap.to(arrowSvg.current, { rotate: 180, duration: 0.5 });
        }
    });

    return (
        <>
            <aside ref={sideBar} className="fixed z-50 -translate-x-full">
                <button
                    onClick={handleSideBar}
                    type="button"
                    className="bg-secondary p-2 rounded-tr-2xl rounded-br-2xl absolute right-0 top-1/2 translate-x-full -translate-y-1/2">
                    <Arrow ref={arrowSvg} />
                </button>
                <ul className="grid gap-4 bg-secondary p-2 min-h-screen content-center rounded-t-lg rounded-b-lg ">
                    {sideBarLinks.map((link) => (
                        <li key={link.name}>
                            <Link onClick={handleSideBar} to={link.path}> {link.name} </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );
};

export default BackofficeSideBar;
