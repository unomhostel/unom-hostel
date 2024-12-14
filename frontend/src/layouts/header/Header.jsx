import React from "react";
import { useSelector } from "react-redux";
import NavBar from "../../components/user/NavBar/NavBar";

const Header = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    return (
        <div className="w-full h-auto">
            <div className="flex justify-between items-center px-4 py-3">
                <NavBar />

                {isAuthenticated && (
                    <div className="flex items-center text-mediumGray gap-3 font-medium text-[14px]">
                        {/* <FontAwesomeIcon icon={faUser} className="text-[18px]" /> */}
                        <p>{user.name.split(" ")[0]}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;
