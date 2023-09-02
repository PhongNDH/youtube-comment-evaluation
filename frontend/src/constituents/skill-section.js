export default function SkillSection(props) {
  return (
    <section>
      <div className="row justify-content-center">
        <h2 className="skill-title">{props.heading}</h2>
      </div>
      <div className="row justify-content-center">
        <div className="skill-icon col-sm-12 col-md-6 col-lg-2">
          <i className="devicon-cplusplus-plain-wordmark colored"></i>
        </div>
        <div className="skill-icon col-sm-12 col-md-6 col-lg-2">
          <i className="devicon-csharp-plain-wordmark colored"></i>
        </div>
        <div className="skill-icon col-sm-12 col-md-6 col-lg-2">
          <i className="devicon-python-plain-wordmark colored"></i>
        </div>
        <div className="skill-icon col-sm-12 col-md-6 col-lg-2">
          <i className="devicon-html5-plain-wordmark colored"></i>
        </div>
        <div className="skill-icon col-sm-12 col-md-6 col-lg-2">
          <i className="devicon-css3-plain-wordmark colored"></i>
        </div>
        <div className="skill-icon col-sm-12 col-md-6 col-lg-2">
          <i className="devicon-javascript-plain colored"></i>
        </div>
      </div>
    </section>
  );
}
