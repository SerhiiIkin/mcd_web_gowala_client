    import { RouterProvider, createBrowserRouter } from "react-router";
    import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
    import { routes } from "@constants/routes";

    const MainRoute = () => {
        const queryClient = new QueryClient();

        const router = createBrowserRouter(routes);

        return (
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        );
    };

    export default MainRoute;
