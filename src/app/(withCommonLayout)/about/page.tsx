import Image from "next/image";

const AboutUs = () => {
  return (
    <div className="">
      <div className="max-w-7xl mx-auto p-6">
        <div className="relative bg-[url('https://i.ibb.co/mbKGYHg/competent-team-with-thumbs-up.jpg')] bg-cover w-full h-[500px] rounded-lg bg-fixed py-10">
          <div className="absolute inset-0 bg-black/60 rounded-lg"></div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-6 space-y-4">
            <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-md">
              ABOUT US
            </h1>
            <p className="text-lg text-white max-w-md">
              Discover the passion behind our keyboards and our commitment to
              quality.
            </p>
            <button className="bg-blue-500 text-gray-900 px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-start justify-between mt-8">
          <div className="md:w-1/2 p-4">
            <h2 className="text-3xl font-bold mb-4 text-blue-600">
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              At KeyNest, we strive to deliver high-quality keyboards tailored
              for enthusiasts and professionals. Our mission is to innovate
              continually, ensuring every product meets the highest standards of
              performance and design. We believe in building a community
              centered on quality, sustainability, and customer satisfaction.
            </p>
            <div className="mt-4">
              <h3 className="text-xl font-semibold text-blue-600">
                What Sets Us Apart:
              </h3>
              <ul className="list-disc list-inside text-gray-600">
                <li className="hover:text-blue-600 transition-colors">
                  Exceptional craftsmanship and attention to detail
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Personalized customer experiences and support
                </li>
                <li className="hover:text-blue-600 transition-colors">
                  Commitment to eco-friendly materials and practices
                </li>
              </ul>
            </div>
          </div>
          <div className="md:w-1/2 p-4">
            <Image
              width={500}
              height={500}
              className="w-96 h-auto mx-auto rounded-lg shadow-lg transition-transform transform hover:scale-105"
              src="https://i.ibb.co/VB9p5B4/6152022-general2-14.jpg"
              alt="Teamwork"
            />
          </div>
        </div>

        <div className="mt-10 text-center">
          <h2 className="text-4xl font-semibold">Our Values</h2>
          <p className="text-gray-600 mb-6">
            Our core values guide every decision we make and every product we
            create.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Innovation",
                content:
                  "We push boundaries to create cutting-edge designs that redefine user experiences.",
              },
              {
                title: "Quality",
                content:
                  "Every keyboard is crafted with the finest materials and utmost precision.",
              },
              {
                title: "Community",
                content:
                  "We foster a community where enthusiasts can connect, share, and grow together.",
              },
              {
                title: "Sustainability",
                content:
                  "We are committed to eco-friendly practices that benefit our planet and future generations.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="bg-white p-6 rounded-lg shadow-md transition-transform transform hover:scale-105"
              >
                <h3 className="font-bold text-lg text-blue-600">
                  {value.title}
                </h3>
                <p className="text-gray-700">{value.content}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">
            Meet Our Team
          </h2>
          <p className="text-gray-600 text-center max-w-xl mx-auto mb-6">
            Our dedicated team combines diverse skills and a shared passion for
            technology. Together, we aim to deliver exceptional products and
            experiences.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-5">
            <img
              className="rounded-md shadow-lg w-64 mx-auto transition-transform transform hover:scale-105"
              src="https://i.ibb.co/ZKhhTcv/business-people-posing-together-office.jpg"
              alt="Our Team"
            />
            <div className="text-left max-w-lg">
              <h3 className="text-2xl font-semibold text-blue-600">
                Our Passionate Individuals
              </h3>
              <p className="mt-2 text-gray-700">
                From our innovative designers to our dedicated customer support,
                each team member plays a vital role in making KeyNest a leader
                in keyboard technology. We are driven by a shared love for
                keyboards and a commitment to excellence.
              </p>
            </div>
          </div>
        </div>

        <div className="my-10">
          <div className="relative bg-[url('https://i.ibb.co/0qwHMXW/silhouette-confident-businesspeople.jpg')] bg-cover w-full h-[400px] rounded-lg bg-fixed py-10">
            <div className="absolute inset-0 bg-black/60 rounded-lg"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center p-8 space-y-6">
              <h1 className="text-4xl font-bold text-blue-400 mb-4">
                Our Journey
              </h1>
              <p className="text-white leading-relaxed max-w-2xl mx-auto">
                KeyNest started with a simple idea: to create keyboards that
                provide exceptional performance and a personalized experience.
                From humble beginnings in a small workshop, we have grown into a
                community of enthusiasts dedicated to innovation and quality.
                Each keyboard we produce is a testament to our dedication to
                craftsmanship and our love for technology.
              </p>
              <button className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors">
                Join Our Community
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
