import Skeleton from "react-loading-skeleton";

import { classes } from "@utils/classes";

const DataHandleLayout = ({
    data,
    children,
    className,
    SkeletonCount = 5,
    containerClassNameSkeleton,
    emptyText
}) => {
    
    if (data.error) {
        return (
            <div
                className={classes([
                    "mb-5 text-secondaryRed",
                    className ?? "",
                ])}>
                {data.error}
            </div>
        );
    }
    if (data?.data?.length === 0 && !data.isLoading && !data.error) {
        return (
            <div className={classes(["mb-5", className ?? ""])}> {emptyText} </div>
        );
    }

    if (data.isLoading) {
        return (
            <Skeleton
                containerClassName={containerClassNameSkeleton}
                count={SkeletonCount}
            />
        );
    }

    return <>{children}</>;
};

export default DataHandleLayout;
