import { Link } from "react-router-dom";

const Address = () => {
  const handleEmailClick = (emailAddress) => {
    const gmailComposeURL = `https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${emailAddress}`;
    window.open(gmailComposeURL, '_blank');
  };

  return (
    <>
      <h1 className=" text-2xl sm:text-3xl uppercase text-center text-textSecondary font-semibold mt-16 font-title">
        Contact Us
      </h1>
      <div className="md:grid space-y-12 md:space-y-0 grid-cols-2 w-[90%] mx-auto mt-8 text-textSecondary tracking-wide shadow-lg  shadow-secondary pb-8 pt-4 rounded-lg bg-white">
        <div className="space-y-4 px-2 md:px-10 md:py-10">
          <h2 className="text-3xl md:text-4xl text-textSecondary font-semibold font-title">
            Mathurata Maha Vidyalaya
          </h2>
          <div className="font-semibold">
            <p className="lg:text-justify font-description">
            CP/HK/Mathurata Maha Vidyalaya, Mathurata, Mathurata, Nuwara-Eliya. – 22200.
            </p>
            <Link
              className="hover:ml-2 transition-all duration-200"
              to={"https://maps.app.goo.gl/YRBfLinMLsxfaQB68"}
            >
              Direction &gt;
            </Link>
          </div>
          <div className="space-y-8 w-[90%]">
          <h4 className="font-semibold">
              Admission Officer Name :
              <br />
              <span className="font-normal break-words text-sm md:text-lg tracking-wider">
                Ms. Ranjitha
              </span>
            </h4>
            
            <h4 className="font-semibold">
              Admission Officer E-mail address :
              <br />
              <span
                onClick={() => handleEmailClick('admissions@mathuratamv.com')}
                className="font-normal break-words text-sm md:text-lg tracking-wide cursor-pointer"
              >
                admissions@mathuratamv.com
              </span>
            </h4>
            <h4 className="font-semibold">
              Admission Officer Mobile No :
              <br />
              <a href="tel:+94117656685" className="font-normal break-words text-sm md:text-lg">
              +94117656685
              </a>{' '}
              /{' '}
              <a href="tel:0717686685" className="font-normal break-words text-sm md:text-lg">
                +94717686685
              </a>
            </h4>
            <h4 className="font-semibold">
              Accountant's Name :
              <br />
              <span className="font-normal break-words text-sm md:text-lg tracking-wider">
                Mrs. Sureka De Silva
              </span>
            </h4>
            <h4 className="font-semibold">
              Accountant Email Address :
              <br />
              <span
                onClick={() => handleEmailClick('lithuvithu1109@gmail.com')}
                className="font-normal break-words text-sm md:text-lg tracking-wider cursor-pointer"
              >
                lithuvithu1109@gmail.com
              </span>
            </h4>
          
            <h4 className="font-semibold">
              Telephone Number :
              <br />
              <a href="tel:+94717686685" className="font-normal break-words text-sm md:text-lg">
                +94717686685
              </a>{' '}
              /{' '}
              <a href="tel:+94717686685" className="font-normal break-words text-sm md:text-lg">
              +94717686685
              </a>
            </h4>
            
            
            
          </div>
        </div>
        <div className="px-10 py-10 ">
          <iframe
            title="Google Map"
            width="100%"
            height="400"
            frameBorder="0"
            scrolling="no"
            marginHeight="0"
            marginWidth="0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1979.6968274902827!2d80.80006700009109!3d7.080278497810849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae37e04bfffffff%3A0x36554e3060bf0d4!2sMathurata%20Maha%20Vidyalaya!5e0!3m2!1sen!2slk!4v1740202759888!5m2!1sen!2slk"
            allowFullScreen=""
          ></iframe>
          
        </div>
      </div>
    </>
  );
};

export default Address;