import { Image } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import Goback from "../components/goback";

const Avatar = () => {
    const userAvatar = useSelector((state) => state.userAvatar);
    const { avatar } = userAvatar;
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname);
    }, [location]);

    return (
        <div style={{ zIndex: 1 }}>
            <div className="mt-4 mb-4" style={{ margin: "0 auto" }}>
                <Goback variant="outline-light" to="/" />
            </div>
            <div
                style={{
                    background: "white",
                    padding: "10vh",
                    margin: "10px auto",
                    borderRadius: "5%",
                    width: "75%",
                }}
            >
                <Image
                    src={
                        location.pathname === "/undefined"
                            ? "/images/user-default.png"
                            : avatar?.image
                    }
                    
                    style={{
                        boxShadow: "10px 10px 8px 10px #888888 ",
                        maxWidth: "90%",
                    }}
                ></Image>
            </div>
        </div>
    );
};

export default Avatar;
