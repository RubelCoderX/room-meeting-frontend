"use client";
import { Calendar, CheckCircle, DoorOpen } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    id: 1,
    title: "Select a Room",
    description:
      "Browse through our available rooms and pick the one that fits your needs.",
    icon: <DoorOpen />,
    iconColor: "text-blue-600",
  },
  {
    id: 2,
    title: "Choose Date & Time",
    description:
      "Select your preferred date and time to make sure the room is available.",
    icon: <Calendar />,
    iconColor: "text-green-600",
  },
  {
    id: 3,
    title: "Confirm Booking",
    description: "Review your selection and confirm your booking with ease.",
    icon: <CheckCircle />,
    iconColor: "text-red-600",
  },
];

const HowItWorks = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  return (
    <div className="lg:pt-1 max-w-[1031px] mx-auto py-16 px-4">
      <h2 className="text-center text-4xl font-bold text-[#4E7776] mb-10">
        How It Works
      </h2>
      <div className="flex justify-center mb-12">
        <div className="relative w-full lg:max-w-4xl">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full border-t-2 border-gray-300 z-0"></div>
          </div>

          <div className="relative z-10 flex justify-between">
            {steps.map((step) => (
              <div
                key={step.id}
                className="relative flex flex-col items-center"
              >
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full border-4 ${
                    currentStep >= step.id
                      ? "border-blue-500 bg-[#4E7776] text-white"
                      : "border-gray-300 bg-white text-gray-500"
                  } transition-all duration-300 ease-in-out cursor-pointer`}
                  onClick={() => handleStepClick(step.id)}
                >
                  {step.icon}
                </div>
                <span
                  className={`mt-2 text-sm ${
                    currentStep >= step.id ? "text-[#4E7776]" : "text-gray-600"
                  }`}
                >
                  {step.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-12">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`group text-center p-8 rounded-lg bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 ${
              currentStep === step.id ? "ring-4 ring-[#4E7776]" : ""
            }`}
            onClick={() => handleStepClick(step.id)}
          >
            <div className="flex items-center justify-center mb-6">
              <step.icon.type
                className={`text-6xl group-hover:scale-110 transition-transform duration-300 ${step.iconColor}`}
              />
            </div>
            <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
            <p className="text-gray-600 text-lg">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
