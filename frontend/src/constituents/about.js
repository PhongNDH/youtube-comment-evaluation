import "../styles.scss";

export default function About() {
  return (
    <section id="about">
      <div className="wrapper">
        <div className="profile-card js-profile-card container">
          <div className="profile-card__img">
            <img src="images/img-profile-dp.png" alt="profile card" />
          </div>

          <div className="profile-card__cnt js-profile-cnt">
            <div className="profile-card__name">Muhammad Zakaria</div>
            <div className="profile-card__txt">
              I am an IT graduate, Software Devloper and Machine Learning
              Expert. I love software development and good software
              architecture. I contribute to open-source projects from
              time-to-time.
            </div>
            <div className="profile-card-loc">
              <span className="profile-card-loc__.profile-icon">
                <i
                  className="profile-icon fa fa-map-marker"
                  aria-hidden="true"
                ></i>
              </span>

              <span className="profile-card-loc__txt">Quetta, Pakistan</span>
            </div>

            <div className="profile-card-social">
              <a
                href="https://www.facebook.com/muhammad.zakaria616"
                className="profile-card-social__item facebook"
              >
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>

              <a
                href="https://twitter.com/MZakariaFani"
                className="profile-card-social__item twitter"
              >
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>

              <a
                href="https://www.linkedin.com/in/zakk616"
                className="profile-card-social__item behance"
              >
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>

              <a
                href="https://github.com/zakk616"
                className="profile-card-social__item github"
              >
                <i className="fa fa-github" aria-hidden="true"></i>
              </a>
            </div>

            <div className="profile-card-ctr">
              <button className="profile-card__button button--blue js-message-btn">
                Message
              </button>
              <button
                className="profile-card__button button--orange"
                href="https://www.upwork.com/freelancers/zakk616"
              >
                Hire
              </button>
            </div>
          </div>

          <div className="profile-card-message js-message">
            <form className="profile-card-form" action="send.php" method="POST">
              <div className="container">
                <div className="row">
                  <input
                    className="col-md-5 col-sm-6 mr-lg-2"
                    placeholder="Your Name"
                    name="uname"
                    minlength="2"
                    maxlength="50"
                    required
                  />
                  <input
                    className="col"
                    placeholder="Your email"
                    type="email"
                    name="email"
                    minlength="5"
                    maxlength="50"
                    required
                  />
                </div>
                <div className="row">
                  <textarea
                    className="col"
                    placeholder="Say something..."
                    name="message"
                    minlength="10"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="profile-card-form__bottom">
                <button
                  className="profile-card__button button--blue"
                  type="submit"
                  name="Submit"
                >
                  Send
                </button>

                <button className="profile-card__button button--gray js-message-close">
                  Cancel
                </button>
              </div>
            </form>

            <div className="profile-card__overlay js-message-close"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
