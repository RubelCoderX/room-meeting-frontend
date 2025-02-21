"use client";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import emailjs from "@emailjs/browser";
import { FieldValues } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import TechForm from "@/components/form/TechForm/TechForm";
import { TechInput } from "@/components/form/TechInput/TechInput";
import { Button } from "@heroui/button";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters long"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

const ContactUs = () => {
  const [loading, setLoading] = useState(false);

  const handleContactSubmit = (data: FieldValues) => {
    setLoading(true);
    emailjs
      .send("service_2gabbmo", "template_kxip6gc", data, "IXst6eLIBbYF_WpCt")
      .then(
        () => {
          setLoading(false);
          toast.success("email sent");
        },
        (error) => {
          setLoading(false);
          toast.error(error.message);
        }
      );
  };

  return (
    <div className="flex flex-col items-center justify-center py-40 rounded-md ">
      <div className=" shadow-lg rounded-lg p-8 w-full max-w-lg space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Contact Us
        </h2>

        <TechForm
          resolver={zodResolver(contactSchema)}
          onSubmit={handleContactSubmit}
        >
          <TechInput
            type="text"
            name="name"
            label="Name"
            radius="none"
            variant="bordered"
          />
          <TechInput
            type="email"
            name="email"
            label="Email"
            radius="none"
            variant="bordered"
          />
          <TechInput
            type="text"
            name="subject"
            label="Subject"
            radius="none"
            variant="bordered"
          />
          <TechInput
            type="textarea"
            name="message"
            label="Message"
            radius="none"
            variant="bordered"
          />
          <div className="text-center mt-6">
            <Button
              loading={loading}
              htmlType="submit"
              className="w-40 h-10"
              type="submit"
            >
              Send Message
            </Button>
          </div>
        </TechForm>
      </div>
    </div>
  );
};

export default ContactUs;
