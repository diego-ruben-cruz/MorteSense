import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full flex-shrink-0 bg-white">
            <hr className="w-full border-t border-gray-300" />
            <div className="container mx-auto flex flex-col items-center sm:items-end justify-center sm:justify-end">
                <div className="flex py-5 flex-col items-center sm:flex-row text-center sm:text-left">
                    <Link
                        to="/dashboard/terms-of-service"
                        className="text-gray-400 hover:text-indigo-600 mb-2 sm:mb-0 sm:mr-10"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        to="/dashboard/privacy-policy"
                        className="text-gray-400 hover:text-indigo-600 mb-2 sm:mb-0 sm:mr-10"
                    >
                        Privacy Policy
                    </Link>
                    <span className="text-gray-400 mb-2 sm:mb-0 sm:mr-10">The Boys</span>
                    <span className="text-indigo-600 mt-2 sm:mt-0">
        &copy; {new Date().getFullYear()} Company Name
      </span>
                </div>
            </div>
        </footer>


    );
};

export default Footer;