const WhyChooseUs = () => {
  return (
    <div className="lg:pt-20 md:pt-10 pb-20 max-w-7xl lg:mx-auto md:mx-auto mx-5 space-y-16">
      <h1 className="text-4xl text-center font-semibold text-[#4E7776] ">
        Why Choose Us
      </h1>

      <div className="flex gap-10 lg:flex-row md:flex-row flex-col items-center justify-around p-8 bg-[#4E7776] rounded-lg ">
        <div className="lg:max-w-md md:w-[60%] text-center lg:text-left md:text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-900">
            Secure <span className="text-white">Transactions</span>
          </h1>
          <p className="text-base text-gray-300 leading-relaxed">
            We have integrated Amar Pay, a trusted and reliable payment gateway
            in Bangladesh. Amar Pay offers a seamless payment experience,
            supporting a wide range of payment methods including mobile banking,
            credit/debit cards, and bank transfers. Whether your making a
            payment online or through your mobile, Amar Pay ensures a smooth and
            secure transaction process.
          </p>
        </div>
        <div className="lg:w-[440px] md:w-[440px] px-3 mx-auto lg:h-[250px] md:h-[250px]">
          <iframe
            src="https://www.youtube.com/embed/gwntHc3UTUk?si=LFtQvd3EHoWTlThi"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            className="rounded-lg shadow-xl w-full h-full hover:scale-105 transition-transform"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
