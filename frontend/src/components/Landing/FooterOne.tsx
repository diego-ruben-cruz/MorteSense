import { Link } from 'react-router-dom';


const FooterOne = () => {
    return (
        <footer
            className="bg-gray-100 rounded-b-lg text-center text-gray-600 lg:text-left">

            <div className="flex justify-center lg:justify-between border-b-2 border-gray-300 p-6">
                <div className="mr-12 text-black hidden select-none lg:block">
                    <span>Senior Design Project: Social Media Links Don't Work</span>
                </div>
                <div className="flex">
                    {/* Facebook */}
                    <Link to="#"
                          className="mr-6 hover:text-rose-900">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 "
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                        </svg>
                    </Link>
                    {/* Instagram */}
                    <Link to="#"
                          className="mr-6 hover:text-rose-900 text-gray-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                    </Link>
                    {/* Youtube */}
                    <Link  to="#"
                           className="hover:text-rose-900 text-gray-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 24 24">
                            <path
                                d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                    </Link>

                </div>
            </div>
            <div className="mx-6 py-10 text-center md:text-left grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div className="flex justify-center md:justify-start">
                    <Link to="/" className="mb-4 select-none">
                        <img src="/logo.png" width={300} height={300} alt="" />
                    </Link>
                </div>
                <div className="text-neutral-600 space-y-4 select-none">
                    <h6 className="text-rose-900 font-semibold">
                        OTHER
                    </h6>
                    <p>
                        <Link to="#" className="hover:text-rose-900">
                            Blank
                        </Link>
                    </p>
                    <p>
                        <Link to="#" className="hover:text-rose-900">
                            Blank
                        </Link>
                    </p>
                    <p>
                        <Link to="" className="hover:text-rose-900">
                            Blank
                        </Link>
                    </p>

                </div>
                <div className="text-neutral-600 space-y-4 select-none">
                    <h6 className="font-semibold text-rose-900">
                        TEAM GITHUB
                    </h6>
                    <p>
                        <Link to="https://github.com/shohinsan" className="hover:text-rose-900">
                            Shohin Abdulkhamidov
                        </Link>
                    </p>
                    <p>
                        <Link to="https://github.com/diego-ruben-cruz" className="hover:text-rose-900">
                            Diego Ruben-Cruz
                        </Link>
                    </p>
                    <p>
                        <Link to="https://github.com/artak10t" className="hover:text-rose-900">
                            Spartak Gevorgyan
                        </Link>
                    </p>
                    <p>
                        <Link to="https://github.com/DiegoGarciaCarrasco" className="hover:text-gray-900">
                            Diego Garcia-Carrasco
                        </Link>
                    </p>
                </div>
                <div className="space-y-4 text-gray-900">
                    <h6 className="font-semibold select-none text-rose-900">
                        CONTACT
                    </h6>
                    <p className="flex items-center justify-center md:justify-start">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-3 h-5 w-5">
                            <path
                                d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                            <path
                                d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                        </svg>
                        One Washington Square San José, CA 95192
                    </p>
                    <p className="flex items-center justify-center md:justify-start">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-3 h-5 w-5">
                            <path
                                d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                            <path
                                d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                        </svg>
                        engineering@sjsu.edu
                    </p>
                    <p className="flex items-center justify-center md:justify-start">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="mr-3 h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                                clipRule="evenodd" />
                        </svg>
                        <span>+1&nbsp;</span>408 924 3800
                    </p>
                </div>
            </div>
            <div className="select-none rounded-b-lg p-6 text-center bg-gray-200">
                <span className="text-rose-900">© {new Date().getFullYear()} Copyright : </span>
                <span className="font-semibold text-gray-400">MorteSense</span>
            </div>
        </footer>
    )
};

export default FooterOne;