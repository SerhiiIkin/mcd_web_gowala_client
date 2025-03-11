import { useEffect, useRef, useState } from "react";

const Select = ({ onChange, options }) => {
    const [selected, setSelected] = useState(options[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const selectRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setHighlightedIndex(0);
        }
    }, [isOpen]);

    const handleKeyDown = (event) => {
        if (!isOpen) {
            if (event.key === "Enter" || event.key === "ArrowDown") {
                event.preventDefault();
                setIsOpen(true);
            }
            return;
        }

        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                setHighlightedIndex((prev) => (prev + 1) % options.length);
                break;
            case "ArrowUp":
                event.preventDefault();
                setHighlightedIndex((prev) =>
                    prev === 0 ? options.length - 1 : prev - 1
                );
                break;
            case "Enter":
                event.preventDefault();
                const selectedOption = options[highlightedIndex];
                setSelected(selectedOption);
                onChange(selectedOption.value); // Викликаємо onChange з value
                setIsOpen(false);
                break;
            case "Escape":
                setIsOpen(false);
                break;
        }
    };

    return (
        <div
            className="relative"
            ref={selectRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onBlur={() => setIsOpen(false)}>
            <div
                className="w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer bg-white"
                onClick={() => setIsOpen(!isOpen)}>
                {selected.label}
            </div>

            {isOpen && (
                <div className="absolute mt-1 w-full left-0 bg-white shadow-md rounded-md z-30">
                    {options.map((option, index) => (
                        <div
                            key={option.value}
                            onClick={() => {
                                setSelected(option);
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`px-3 py-2 cursor-pointer ${
                                highlightedIndex === index
                                    ? "bg-indigo-100"
                                    : ""
                            }`}>
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};


export default Select;