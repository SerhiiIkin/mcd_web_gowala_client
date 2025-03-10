import { useMemo } from "react";
import DataHandleLayout from "@/layouts/DataHandleLayout";
import SectionLayout from "@/layouts/SectionLayout";
import Article from "@components/Article";
import { useQuery } from "@tanstack/react-query";
import { axiosGetArticles } from "@utils/axios";

const Articles = ({ titles }) => {
    const data = useQuery({
        queryKey: ["articles"],
        queryFn: axiosGetArticles,
    });

    const articles = useMemo(() => {
        if (titles.length === 0) return data?.data;
        if (!data?.data) return [];
        return data?.data.filter((article) => titles.includes(article.title));
    }, [data?.data, titles]);

    return (
        <SectionLayout>
            <DataHandleLayout data={data}>
                <div className="grid gap-12 ">
                    {articles?.map((article) => (
                        <Article key={article._id} article={article} />
                    ))}
                </div>
            </DataHandleLayout>
        </SectionLayout>
    );
};

export default Articles;
