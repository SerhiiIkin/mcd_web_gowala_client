const ContactList = ({ contactData }) => {
    const PhoneSvg = ({ className }) => (
        <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.13667 14.7817C9.77667 19.97 14.03 24.205 19.2183 26.8633L23.2517 22.83C23.7467 22.335 24.48 22.17 25.1217 22.39C27.175 23.0683 29.3933 23.435 31.6667 23.435C32.675 23.435 33.5 24.26 33.5 25.2683V31.6667C33.5 32.675 32.675 33.5 31.6667 33.5C14.4517 33.5 0.5 19.5483 0.5 2.33333C0.5 1.325 1.325 0.5 2.33333 0.5H8.75C9.75833 0.5 10.5833 1.325 10.5833 2.33333C10.5833 4.625 10.95 6.825 11.6283 8.87833C11.83 9.52 11.6833 10.235 11.17 10.7483L7.13667 14.7817Z"
                fill="#5E9A13"
            />
        </svg>
    );

    const OpeningHoursSvg = ({ className }) => (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19.98 0C8.94 0 0 8.96 0 20C0 31.04 8.94 40 19.98 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 19.98 0ZM26.58 29.42L18 20.82V10H22V19.18L29.42 26.6L26.58 29.42Z"
                fill="#5E9A13"
            />
        </svg>
    );

    const LocationSvg = ({ className }) => (
        <svg
            width="31"
            height="46"
            viewBox="0 0 31 46"
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.5 0.5C6.93071 0.5 0 7.5425 0 16.25C0 28.0625 15.5 45.5 15.5 45.5C15.5 45.5 31 28.0625 31 16.25C31 7.5425 24.0693 0.5 15.5 0.5ZM15.5 21.875C12.4443 21.875 9.96429 19.355 9.96429 16.25C9.96429 13.145 12.4443 10.625 15.5 10.625C18.5557 10.625 21.0357 13.145 21.0357 16.25C21.0357 19.355 18.5557 21.875 15.5 21.875Z"
                fill="#5E9A13"
            />
        </svg>
    );

    return (
        <ul className="grid gap-y-4">
            <li className="grid gap-x-5 items-center justify-start">
                <PhoneSvg className="col-start-1 row-span-2 justify-self-center " />
                <a
                    href="tel:+88130-589-745-6987"
                    className=" col-start-2 xl:hover:underline">
                    {contactData.mobilePhone}
                </a>
                <a
                    href="tel:+1655-456-532"
                    className=" col-start-2 xl:hover:underline">
                    {contactData.phone}
                </a>
            </li>
            <li className="grid gap-x-5 items-center justify-start">
                <OpeningHoursSvg className="col-start-1 row-span-2 justify-self-center " />
                <span className="col-start-2">{contactData.daysHours}</span>
                <span className="col-start-2">{contactData.noteDayHour}</span>
            </li>
            <li className="grid gap-x-5 items-center justify-start">
                <LocationSvg className="col-start-1 row-span-2 justify-self-center " />
                <a
                    href="https://maps.app.goo.gl/Q5tpgbDDKtHhMvfG9"
                    className="col-start-2 xl:hover:underline">
                    {contactData.street}
                    <div>{contactData.city} </div>
                </a>
            </li>
        </ul>
    );
};

export default ContactList;
