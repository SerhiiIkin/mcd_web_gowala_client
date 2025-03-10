import Header from "@components/Header";
import Footer from "@components/Footer";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
    return (
        <div className="flex flex-col  min-h-dvh">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <Footer />
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

export default MainLayout;
