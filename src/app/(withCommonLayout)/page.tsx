import HeroSection from "@/components/HeroSection/HeroSection";
import HowItWorks from "@/components/HowItWorks/HowItsWork";
import Service from "@/components/Service/Service";
// import Container from "@/components/UI/Container";
import WhyChooseUs from "@/components/whyChoosse/whyChoose";

const Page = () => {
  return (
    <div className="bg-[#FFF2F1]">
      <HeroSection />
      <Service />
      <WhyChooseUs />
      <HowItWorks />
      <hr />
    </div>
  );
};

export default Page;
