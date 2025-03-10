import BackofficeSideBar from "@/pages/backoffice/components/BackofficeSideBar";
import Header from "@components/Header";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const BackofficeLayout = () => {
    return (
        <div className="flex flex-col  min-h-dvh">
            <Header />
            <main className="flex-1">
                <BackofficeSideBar/>
                <Outlet />
            </main>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default BackofficeLayout;
