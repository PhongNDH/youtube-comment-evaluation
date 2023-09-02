import "../styles.scss";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
//import ExampleDoc from "../Dotnet_CV.pdf";

export default function Cover() {
    const particlesInit = async (main) => {
        await loadFull(main);
    };

    const particlesLoaded = (container) => {};

    return (
        <div id="particles-js">
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    fpsLimit: 120,
                    interactivity: {
                        events: {
                            onClick: {
                                enable: false,
                                mode: "push",
                            },
                            onHover: {
                                enable: true,
                                mode: "repulse",
                            },
                            resize: true,
                        },
                        modes: {
                            push: {
                                quantity: 4,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.4,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: "#ffffff",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 1,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 1, max: 5 },
                        },
                    },
                    detectRetina: true,
                }}
            />

            {/* <a
        id="js-download"
        className="download"
        href={ExampleDoc}
        target="_blank"
        rel="noreferrer"
      >q</a> */}

            <div className="header">
                <h1>
                    <span className="site-title"></span>
                    <div className="site-description">
                        <p id="typed" className="typed"></p>
                    </div>
                </h1>

                <div className="header-links">
                    {/* <a className="link" href="#about" data-scroll></a>
          <a className="link" href="#skills" data-scroll></a> */}
                </div>
            </div>
            {/* <a className="down" href="#about" data-scroll>
        <i className="icon fa fa-chevron-down" aria-hidden="true"></i>
      </a> */}
        </div>
    );
}
