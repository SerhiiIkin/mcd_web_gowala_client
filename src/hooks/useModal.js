import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from "gsap";

const useModal = () => {
    const backdropRef = useRef(null);
    const contentModalRef = useRef(null);
    const { contextSafe } = useGSAP({ scope: contentModalRef });

    const [modalState, setModalState] = useState(false);

    const changeModalState = contextSafe(() => {
        setModalState((prev) => !prev);
        const duration = 0.8;

        if (modalState) {
            gsap.to(backdropRef.current, {
                opacity: 0,
                duration,
            });
            gsap.to(contentModalRef.current, {
                opacity: 0,
                duration,
                display: "none",
            });
        } else {
            gsap.to(backdropRef.current, {
                opacity: 1,
                duration,
            });
            gsap.to(contentModalRef.current, {
                opacity: 1,
                duration,
                display: "grid",
            });
        }
    });

    return { modalState, changeModalState, backdropRef, contentModalRef };
};

export default useModal;
