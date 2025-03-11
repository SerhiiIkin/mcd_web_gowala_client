import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from "gsap";

const useModal = () => {
    const backdropRef = useRef(null);
    const contentModalRef = useRef(null);
    const { contextSafe } = useGSAP({ scope: contentModalRef });

    const [modalState, setModalState] = useState(false);

    const changeModalState = contextSafe(() => {
        setModalState((prev) => {
            const newState = !prev;
            const duration = 0.8;

            gsap.to(backdropRef.current, {
                opacity: newState ? 1 : 0,
                duration,
            });

            gsap.to(contentModalRef.current, {
                opacity: newState ? 1 : 0,
                duration,
                display: newState ? "grid" : "none",
            });

            return newState;
        });
    });

    return { changeModalState, backdropRef, contentModalRef };
};

export default useModal;
