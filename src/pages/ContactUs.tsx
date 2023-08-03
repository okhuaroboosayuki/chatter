import { Helmet } from "react-helmet-async";
import { Header } from "../components/Header";

export const ContactUs = () => {
  return (
    <>
      <Helmet>
        <title>
          Contact Us | Get In Touch With Us, We'd Love to Hear From You
        </title>
        <meta
          name="description"
          content="Get In Touch With Us, We'd Love to Hear From You"
        />
        <link rel="canonical" href={"/"} />
      </Helmet>
      <div className="contact_us">
        <Header />
      </div>
    </>
  );
};
