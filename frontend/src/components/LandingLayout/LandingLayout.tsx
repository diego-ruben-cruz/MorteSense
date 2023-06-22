import {Outlet} from "react-router-dom";
import Landing from "../Landing/Landing";
import FooterOne from "../Landing/FooterOne";

const LandingLayout = () => {

    return (
        <main className="App">
            <>
                <Landing />
                <Outlet />
                <FooterOne/>
            </>
        </main>
    );
};
export default LandingLayout;