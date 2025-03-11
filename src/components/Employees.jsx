import SectionLayout from "@layouts/SectionLayout";
import Title from "@components/Title";
import { axiosGetEmployees } from "@utils/axios";
import { useQuery } from "@tanstack/react-query";
import DataHandleLayout from "@layouts/DataHandleLayout";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";

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

const Employees = () => {
    const data = useQuery({
        queryKey: ["employees"],
        queryFn: axiosGetEmployees,
    });

    return (
        <SectionLayout
            classNameSection="bg-[url(blob_02.jpg)] bg-cover bg-center"
            classNameContainer="text-center">
            <Title type="h2">Vores hold</Title>
            <Title type="h2" className="font-normal">
                2000+ ansatte siden 1975
            </Title>
            <p className="pb-10">
                De ansatte på Gowala Farms er passionerede fagfolk, der med
                omsorg og ekspertise sikrer sunde dyr og produkter af højeste
                kvalitet.
            </p>
            <DataHandleLayout
                data={data}
                SkeletonCount={4}
                containerClassNameSkeleton="py-5"
                emptyText="Ingen produkter fundet"
                className="py-5">
                <div className="grid grid-auto-cols-300 gap-5">
                    {data?.data &&
                        data.data.map((employee) => (
                            <Employee key={employee._id} employee={employee} />
                        ))}
                </div>
            </DataHandleLayout>
        </SectionLayout>
    );
};

export default Employees;
