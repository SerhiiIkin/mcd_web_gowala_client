import DataHandleLayout from "@/layouts/DataHandleLayout";
import SectionLayout from "@/layouts/SectionLayout";
import { axiosGetMessages, axiosUpdateStatusMessage } from "@/utils/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";

const Messages = () => {
    const data = useQuery({
        queryKey: ["messages"],
        queryFn: axiosGetMessages,
    });

    const headTableData = useMemo(
        () => data.data && Object.keys(data.data[0]).slice(1, 5),
        [data.data]
    );

    return (
        <SectionLayout>
            <DataHandleLayout
                data={{
                    data: data?.data,
                    isLoading: data.isLoading,
                    error: data.error,
                }}
                SkeletonCount={4}
                containerClassNameSkeleton="py-5"
                className="py-5"
                emptyText="Ingen beskeder fundet">
                <table>
                    <thead>
                        <tr>
                            {headTableData?.map((head) => (
                                <th key={head}>
                                    {head[0].toUpperCase() + head.slice(1)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.data &&
                            data?.data.map((message) => (
                                <Message key={message._id} message={message} />
                            ))}
                    </tbody>
                </table>
            </DataHandleLayout>
        </SectionLayout>
    );
};

export default Messages;

const Message = ({ message }) => {
    const [status, setStatus] = useState(message.status);

    const mutationUpdateStatus = useMutation({
        mutationFn: axiosUpdateStatusMessage,
        onSuccess: (data) => {
            toast.success(data.message);
            setStatus((prev) => !prev);
        },
    });

    const changeStatus = () => {
        const data = {
            id: message._id,
            status: !status,
        };

        mutationUpdateStatus.mutate(data);
    };

    const Td = ({ children }) => <td className="p-2 border-b">{children}</td>;

    return (
        <tr className="border">
            <Td> {message.name}</Td>
            <Td> {message.email}</Td>
            <Td> {message.description}</Td>
            <Td>
                <input
                    disabled={mutationUpdateStatus.isPending}
                    type="checkbox"
                    checked={status}
                    onChange={changeStatus}
                />
            </Td>
        </tr>
    );
};
