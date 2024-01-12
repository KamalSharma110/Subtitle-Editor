import { Outlet } from "react-router-dom";

import NavigationBar from "../components/NavigationBar";

const Root = () => {
    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    );
};

export default Root;