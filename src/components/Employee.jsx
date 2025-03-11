import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import Title from "@components/Title";

const Employee = ({ employee }) => {
    const contentCardRef = useRef(null);
    const descriptionRef = useRef(null);

    const { contextSafe } = useGSAP({ scope: contentCardRef });

    const mouseOverContent = contextSafe(() => {
        gsap.to(descriptionRef.current, {
            opacity: 1,
            duration: 1.5,
            ease: "power3.inOut",
            zIndex: 1,
            display: "block",
        });
    });
    const mouseLeaveContent = contextSafe(() => {
        setTimeout(() => {
            gsap.to(descriptionRef.current, {
                opacity: 0,
                stagger: 0.1,
                duration: 0,
                zIndex: -1,
                display: "none",
            });
        }, 1600);
    });

    return (
        <article className="shadow-md p-2" aria-label="employee">
            <div
                className=" bg-cover bg-center min-h-96 min-w-72 grid items-end pb-5 px-3"
                style={{ backgroundImage: `url(${employee.image})` }}>
                <div
                    ref={contentCardRef}
                    onPointerEnter={mouseOverContent}
                    onPointerLeave={mouseLeaveContent}
                    aria-label="content"
                    className="bg-white/80 p-5 text-center relative">
                    <p
                        className="p-5 absolute top-0 -translate-y-full xl:hidden bg-white/80 right-0 left-0"
                        ref={descriptionRef}>
                        {employee.text}
                    </p>
                    <Title type="h4" className="font-bold mx-auto ">
                        {employee.name}
                    </Title>
                </div>
            </div>
        </article>
    );
};


export default Employee;