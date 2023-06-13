const Footer = () => {
    return (
        <footer>
            <hr className="border-t flex border-gray-300"/>
            <div className="mx-auto px-4 sm:px-6 lg:px-8 p-6 flex flex-col items-center sm:items-end justify-center sm:justify-end">
                <div className="flex flex-col items-center sm:flex-row text-center sm:text-left">
                    <a href="/terms-of-service" className="text-gray-400 hover:text-indigo-600 mb-2 sm:mb-0 sm:mr-10">Terms of Service</a>
                    <a href="/privacy-policy" className="text-gray-400 hover:text-indigo-600 mb-2 sm:mb-0 sm:mr-10">Privacy Policy</a>
                    <span className="text-gray-400 mb-2 sm:mb-0 sm:mr-10">Rhabdonoma Solutions</span>
                    <span className="text-indigo-600 mt-2 sm:mt-0">&copy; {new Date().getFullYear()} Copyright</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;