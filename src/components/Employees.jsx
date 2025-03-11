import SectionLayout from "@layouts/SectionLayout";
import Title from "@components/Title";
import { axiosGetEmployees } from "@utils/axios";
import { useQuery } from "@tanstack/react-query";
import DataHandleLayout from "@layouts/DataHandleLayout";
import Employee from "@components/Employee";

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
