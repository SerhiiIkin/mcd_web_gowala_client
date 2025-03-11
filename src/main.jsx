import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import MainRouteMain from "@routes/MainRoute";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import "swiper/css";
import "./index.css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-loading-skeleton/dist/skeleton.css";

gsap.registerPlugin(useGSAP);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <MainRouteMain />
    </StrictMode>
);
