import "./App.scss";
import { useEffect } from "react";
import WebFont from "webfontloader";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Cover from "./constituents/cover";

import { useSelector } from "react-redux";

import Footer from "./routes/footer";
import Header from "./routes/header";
import Home from "./routes/home";
import Register from "./routes/register";
import Signin from "./routes/signin";
import Profile from "./routes/profile";
import Avatar from "./routes/avatar";
import History from "./routes/history";
import Comment from "./routes/comment";
import "./assets/fonts/CachaPersonalUseRegular-GOx6g.ttf"
import "./assets/fonts/SkylensitalicpersonaluseBdit-Yz8gq.otf"
import "./assets/fonts/ConcretepersonaluseRegular-DOzG0.otf"
import "./assets/fonts/AquireBold-8Ma60.otf"

const App = () => {
    const userAvatar = useSelector((state) => state.userAvatar);
    const { avatar } = userAvatar;

    useEffect(() => {
        WebFont.load({
            google: {
                families: [
                    "Rubik Bubbles",
                    "Roboto",
                    "Righteous",
                    "Lilita One",
                    "Kavoon",
                    "Shantell Sans",
                    "Fugaz One",
                    "Niramit",
                ],
            },
        });
    }, []);

    return (
        <div className="App">
            <Header />
            <main>
                <Container className="d-flex justify-content-center">
                    <Cover />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path={`${avatar?.image}`} element={<Avatar />} />
                        <Route path={"/history"} element={<History />} />
                        <Route path={"/comment/:id"} element={<Comment />} />
                        {/* <Route path="/product/:id" element={<ProductScreen/>} />
                        <Route path="/cart/:id?" element={<CartScreen/>} /> */}
                    </Routes>
                </Container>
            </main>
            <Footer />
        </div>
    );
};

export default App;
