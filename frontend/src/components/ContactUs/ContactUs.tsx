import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

import ContactUsForm from "./ContactUsForm";

const ContactUs = () => {
  return (
    <div id="contact-us" className="mt-32 my-20 flex justify-evenly items-center">
      <div className="w-2/5 flex flex-col justify-start items-start gap-5">
        <div className="text-5xl font-medium">
          Send us a <span className="text-[#ff8c00] underline">message...</span>
        </div>
        <div className="text-base text-gray-600">
          Have questions, feedback, or just want to say hello? We'd love to hear
          from you! Fill out the form below, and we'll get back to you promptly.
          Your satisfaction is our priority.
        </div>
        <div className="ml-3 mt-5 flex text-sm text-stale-400  flex-col gap-2">
          <p className="flex gap-4">
            <FaPhoneAlt />
            +91 000 0000
          </p>
          <p className="flex gap-4">
            <FaLocationDot />
            FoodFavor@foodfavor.com
          </p>
          <p className="flex gap-4">
            <MdEmail /> Greater Noida, India
          </p>
        </div>
      </div>
      <div className="mx-10 px-8 py-10 w-4/12 shadow-2xl rounded-2xl  ">
        <ContactUsForm />
      </div>
    </div>
  );
};

export default ContactUs;
