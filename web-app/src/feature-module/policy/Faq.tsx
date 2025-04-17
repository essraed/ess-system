import React, { useState } from "react";
import Header from "../common/header";
import Footer from "../common/footer";
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemPanel } from "react-accessible-accordion";
import { AccordionItemHeading } from "react-accessible-accordion/dist/types/components/AccordionItemHeading";
import { t } from "i18next";

const PrivacyPolicy = () => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    // You can add more actions here, like saving the acceptance to local storage or sending it to a server
  };

  return (
    <>
      <Header />
      <div className="privacy-policy-container">
        <div className="privacy-policy">
        <section className="section faq-section bg-light-primary">
        <div id="Services" className="homesection servicessection saa viewon">
          <div className="custom-container">
            {/* Heading title*/}
            <div className="section-heading" data-aos="fade-down">
              <h2 className="section-title">
                {t("Frequently Asked Questions")}{" "}
              </h2>
            </div>{" "}
            {/* Heading title*/}
            <Accordion
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    {t("Karama Medical Fitness Center Medical Timing")}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    <h4>DHA Medical Fitness Test </h4>
                    {t("Monday - Saturday 07:00 AM - 10:00 PM")}
                    <br></br>
                    <br></br>
            
                    {t("Sunday 08:00 AM - 08:00 PM")}
                    <br></br>
                    <br></br>
                    {t("Note : Saturday and Sunday after 01:00 PM only Visa Renewal is accepted(Xray service not available after 01:00 PM)")}
                  </p>
                  <p>
                    <h4>OHC </h4>
                    {t("Monday - Thursday 07:30 AM - 08:00 PM")}
                    <br></br>
                    <br></br>
                    {t("Friday - 07:30 AM - 11:00 AM")}
                    <br></br>
                    {t("Friday - 04:30 AM - 08:00 AM")}
                    <br></br>
                    <br></br>
                    {t("Saturday & Sunday - Closed")}
                    <br></br>
                    <br></br>
                    </p>
                    <p>
                    <h4>DED </h4>
                    {t("Monday - Saturday 08:00 AM - 08:00 PM")}
                    <br></br>
                    <br></br>
                    {t("Sunday - Closed")}
                    <br></br>
                    <br></br>
                    </p>
                    <p>
                    <h4>Amer </h4>
                    {t("Monday - Saturday 07:00 AM - 10:00 PM")}
                    <br></br>
                    <br></br>
                    {t("Sunday - Closed")}
                    <br></br>
                    <br></br>
                    </p>
                    <p>
                    <h4>Tas-Heel </h4>
                    {t("Monday - Saturday 08:00 AM - 08:00 PM")}
                    <br></br>
                    <br></br>
                    {t("Sunday - Closed")}
                    <br></br>
                    <br></br>
                    </p>
                    <p>
                    <h4>Taw-Jeeh </h4>
                    {t("Monday - Saturday 08:00 AM - 08:00 PM")}
                    <br></br>
                    <br></br>
                    {t("Sunday - 09:00 AM - 05:00 PM")}
                    <br></br>
                    <br></br>
                    </p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    {t("How to check visa medical report online?")}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    {t(
                      "Dubai visa medical report can be tracked and downloaded from DHA mobile application."
                    )}
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    {t(
                      "What are the different types of Tourist or visit visas available?"
                    )}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    {t(
                      "A tourist visa is available for 30 and 60 days and a sponsored family visit visa for 30 and 90 days."
                    )}
                  </p>
                </AccordionItemPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionItemHeading>
                  <AccordionItemButton
                    style={{ backgroundColor: "transparent", border: "none" }}
                  >
                    {t(
                      "Can I travel without applying for the visa stamping application?"
                    )}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                  <p>
                    {t(
                      "No, the applicant must complete the visa stamping application for he/she to travel."
                    )}
                  </p>
                </AccordionItemPanel>
              </AccordionItem>
            </Accordion>
            {/* /Heading title */}
          </div>
        </div>
      </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
