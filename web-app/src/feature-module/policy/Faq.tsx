
import React, { useState } from "react";
import Header from "../common/header";
import Footer from "../common/footer";
import Breadcrumbs from "../common/breadcrumbs";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Karama Business Center?",
      answer:
        "We are a one-stop service center offering government-related services such as medical fitness screening, Amer services, Tasheel services, notary public services, and more.",
    },
    {
      question: "How do I book an appointment?",
      answer:
        "You can book an appointment directly through our website's booking form or by calling us at +(971) 4342-6666.",
    },
    {
      question: "What documents do I need for a medical fitness test?",
      answer:
        "Typically, you will need your Emirates ID (or application receipt), original passport, and visa documents. For detailed requirements, check our Services page.",
    },
    {
      question: "Do you provide same-day services?",
      answer:
        "Yes, we offer express options for certain services including medical tests. Availability depends on service type and timing.",
    },
    {
      question: "What are your opening hours?",
      answer:
        "We are open from Monday to Thursday, 7:00 AM to 10:00 PM. Weekend hours may vary.",
    },
    {
      question: "Where are you located?",
      answer:
        "We are located next to Karama Post Office, Dubai. Visit the Contact page on our website for directions.",
    },
    {
      question: "How can I follow up on my request or service status?",
      answer:
        "Please contact our customer service team by phone or email with your reference number or appointment details.",
    },
    {
      question: "Can I reschedule my appointment?",
      answer:
        "Yes, you can reschedule your appointment by contacting our team at least 24 hours before your original appointment time.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept payments via credit card, debit card, and cash at our center.",
    },
    {
      question: "How early should I arrive for my appointment?",
      answer:
        "Please arrive at least 15 minutes before your scheduled time to complete any necessary paperwork.",
    },
    {
      question: "Do you offer corporate or group services?",
      answer:
        "Yes, we offer customized packages for businesses, including employee visa and medical processing services. Please contact us for more details.",
    },
    {
      question: "What should I do if I have an urgent service request?",
      answer: "Please call us directly at +(971) 4342-6666 for urgent matters.",
    },
  ];


  const toggleFAQ = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="main-wrapper">
    <Header/>
    <Breadcrumbs title="Faq" subtitle="Pages" />
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border transition-all duration-300"
          >
            <button
              className="w-full text-left p-3 font-medium text-lg flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-4 pt-0 text-gray-600 transition-all duration-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </div>
 
  );
};

export default Faq;
