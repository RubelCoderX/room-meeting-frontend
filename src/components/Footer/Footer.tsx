import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import logo from "../../assets/Logo 1.png";

const Footer = () => {
  return (
    <footer className="bg-[#FFF2F1]  text-[#4E7776] ">
      <div className="max-w-[1031px] pt-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex mx-auto text-center flex-col items-center mb-6 md:mb-0">
            <Image
              width={100}
              height={100}
              src={logo}
              alt="Hotel Relax"
              className="w-24 mb-3"
            />
          </div>

          <div className="flex flex-col items-center mx-auto text-center mb-6 md:mb-0">
            <h5 className="font-semibold text-[#4E7776] text-2xl mb-2">
              We Accept
            </h5>
            <div className="flex items-center gap-1">
              <Image
                width={100}
                height={100}
                src="https://i.ibb.co.com/s2yss0p/image-41.png"
                alt="Payment Method"
                className="w-10 rounded-md"
              />
              <Image
                width={100}
                height={100}
                src="https://i.ibb.co.com/CVmMd7f/image-43.png"
                alt="Payment Method"
                className="w-10 rounded-md"
              />
              <Image
                width={100}
                height={100}
                src="https://i.ibb.co.com/Dp7NPhJ/image-42.png"
                alt="Payment Method"
                className="w-10 rounded-md"
              />
              <Image
                width={100}
                height={100}
                src="https://i.ibb.co.com/Rj6FPqb/image-42525-1643965434-removebg-preview.png"
                alt="Payment Method"
                className="w-10 rounded-md bg-white"
              />
              <Image
                width={100}
                height={100}
                src="https://i.ibb.co.com/DCLvqFf/images-removebg-preview-1.png"
                alt="Payment Method"
                className="w-10 rounded-md bg-white object-cover py-1"
              />
            </div>
          </div>

          <div className="flex flex-col items-center mx-auto text-center">
            <h5 className="font-semibold text-[#4E7776] text-2xl mb-2">
              Subscribe to our Newsletter
            </h5>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md border border-gray-600 bg-gray-800 text-gray-300 focus:outline-none"
              />
              <button className="bg-yellow-500 text-gray-900 px-4 py-2 rounded-r-md hover:bg-yellow-400 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mb-3 mt-6">
          <a
            target="_blank"
            href="https://facebook.com"
            className="text-gray-400 hover:text-white"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a
            target="_blank"
            href="https://twitter.com"
            className="text-gray-400 hover:text-white"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a
            target="_blank"
            href="https://instagram.com"
            className="text-gray-400 hover:text-white"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
        </div>

        <div className="mt-8 pb-2 text-center text-sm border-t border-gray-700 pt-6">
          <p>
            &copy; {new Date().getFullYear()} Meeting Meet. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
