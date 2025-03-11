import { Link } from "react-router";
import { classes } from "@utils/classes";
import { useEffect, useState, useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BasketIco from "@components/BasketIco";
import LogoLink from "@components/LogoLink";
import { useLocalStorage } from "@uidotdev/usehooks";

const BurgerButton = ({ onClickBurgerMenu, openNav }) => (
    <button
        className="ml-auto h-5 w-8 relative text-inherit  hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden"
        onClick={onClickBurgerMenu}>
        <span
            className={classes([
                "w-full h-1 bg-primary rounded absolute left-0 top-0 duration-300",
                openNav ? "rotate-45 top-1/2 -translate-y-1/2" : "",
            ])}></span>
        <span
            className={classes([
                "w-full h-1 bg-primary rounded absolute left-0 top-1/2 -translate-y-1/2 duration-300",
                openNav ? "w-0 bg-transparent" : "",
            ])}></span>
        <span
            className={classes([
                "w-full h-1 bg-primary rounded absolute left-0 bottom-0 duration-300",
                openNav ? " -rotate-45 top-1/2 -translate-y-1/2 " : "",
            ])}></span>
    </button>
);

const Basket = () => {
    const [items] = useLocalStorage("items", []);
    const count = useMemo(() => {
        return items.length;
    }, [items]);
    return (
        <Link to="/checkout" className="relative ml-6 group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full grid place-items-center  text-xs text-white  group-hover:xl:scale-110 xl:duration-700 z-10">
                {count}
            </div>
            <BasketIco className="fill-primary  group-hover:xl:scale-110 xl:duration-700" />
        </Link>
    );
};

const NavBar = ({ navBarRef, isMobile, onClickBurgerMenu }) => {
    const navList = [
        {
            name: "Shop",
            href: "/shop",
        },
        {
            name: "Services",
            href: "/services",
        },
        {
            name: "Om",
            href: "/about",
        },
        {
            name: "Kontakt",
            href: "/contact",
        },
        {
            name: "Checkout",
            href: "/checkout",
        },
    ];

    return (
        <nav
            ref={navBarRef}
            className={classes([
                isMobile
                    ? "hidden absolute left-0 right-0 -bottom-full translate-y-[calc(50%+13px)] bg-white gap-4 pr-2  text-right z-20 "
                    : "hidden md:flex md:gap-4 md:static md:translate-y-0 md:bg-transparent",
            ])}>
            {navList.map((item, i) => (
                <Link
                    key={i}
                    className="text-2xl font-semibold hover:text-primary duration-300"
                    onClick={onClickBurgerMenu}
                    to={item.href}>
                    {item.name}
                </Link>
            ))}
        </nav>
    );
};

const Header = () => {
    const navBarRef = useRef(null);
    const [openNav, setOpenNav] = useState(false);
    const { contextSafe } = useGSAP({ scope: navBarRef });

    const onClickBurgerMenu = contextSafe(() => {
        setOpenNav((prev) => !prev);
        const duration = 0.5;

        if (openNav) {
            Array.from(navBarRef.current.children).forEach((element, i) => {
                gsap.to(element, {
                    delay: i * 0.1,
                    translateX: "-100%",
                    opacity: 0,
                    display: "none",
                    duration,
                    ease: "power3.inOut",
                });
            });
            gsap.to(navBarRef.current, {
                delay: duration + 0.2,
                height: 0,
                opacity: 0,
                display: "none",
                duration,
                ease: "power3.inOut",
            });
        } else {
            gsap.to(navBarRef.current, {
                height: "auto",
                opacity: 1,
                display: "grid",
                duration,
                ease: "power3.inOut",
            });
            Array.from(navBarRef.current.children).forEach((element, i) => {
                gsap.fromTo(
                    element,
                    {
                        translateX: "-100%",
                        opacity: 0,
                        display: "block",
                        duration,
                        ease: "power3.inOut",
                    },
                    {
                        delay: i * 0.1,
                        translateX: "0",
                        opacity: 1,
                        display: "block",
                    }
                );
            });
        }
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setOpenNav(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <header className="bg-secondary relative">
                <div className="container mx-auto flex items-center p-2  relative z-30">
                    <LogoLink />
                    <NavBar />
                    <BurgerButton
                        onClickBurgerMenu={onClickBurgerMenu}
                        openNav={openNav}
                        setOpenNav={setOpenNav}
                    />
                    <Basket />
                </div>
                <NavBar
                    isMobile
                    navBarRef={navBarRef}
                    onClickBurgerMenu={onClickBurgerMenu}
                />
            </header>
        </>
    );
};

export default Header;
