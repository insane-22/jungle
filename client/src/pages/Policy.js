import React from "react";
import Layout from "./../components/Layout";


const Policy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/privacy.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>
            We use Your Personal data to provide and improve the Service. By
            using the Service, You agree to the collection and use of
            information in accordance with this Privacy Policy.{" "}
          </p>
          <p>
            While using Our Service, We ask You to provide Us with certain
            personally identifiable information that can be used to contact or
            identify You. When You access the Service by or through a mobile
            device, We may collect certain information automatically, including,
            but not limited to, the type of mobile device You use, Your mobile
            device unique ID, the IP address of Your mobile device, Your mobile
            operating system, the type of mobile Internet browser You use,
            unique device identifiers and other diagnostic data.
          </p>
          <p>
            The security of Your Personal Data is important to Us, but remember
            that no method of transmission over the Internet, or method of
            electronic storage is 100% secure. While We strive to use
            commercially acceptable means to protect Your Personal Data, We
            cannot guarantee its absolute security.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
