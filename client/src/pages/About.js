import React from "react";
import Layout from "./../components/Layout";

const About = () => {
  return (
    <Layout title={"About us - JUNGLE"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpg"
            alt="contactus"
            style={{ width: "90%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
            We, welcome you to our e-commece application, Jungle. It's another
            successful launch of KG enterprises. e have always believed in
            delivering the best services to our dear customers and try our best
            to ease your experience. As a growing company with a vision of
            catering to the needs and demands of the public, we are always open
            to suggestions.


          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
