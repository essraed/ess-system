import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";
import Breadcrumbs from "../common/breadcrumbs";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { ourTeamData } from "../../core/data/json/ourteam_data";
import Header from "../common/header";
import Footer from "../common/footer";

const TeamManagement = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);
  return (
    <>
      <Header />
      <div className="main-wrapper my-3">
        <Breadcrumbs title="Meet our Team" subtitle="Pages" />
        <section className="our-team-section">
        <div className="custom-container">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {ourTeamData.map((member, index) => (
                <div
                  key={index}
                  className={`
                    our-team
                    bg-white
                    rounded-xl
                    shadow-md
                    p-5
                    flex flex-col items-center text-center
                    transition-transform transition-shadow duration-300
                    hover:-translate-y-1 hover:shadow-lg
                  `}
                  data-aos="fade-down"
                  data-aos-duration={1200}
                  data-aos-delay={100}
                >
                  <div className="profile-pic mb-4">
                    <ImageWithBasePath
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover shadow-sm"
                    />
                  </div>
                  <div className="team-prof">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {member.name}
                    </h3>
                    <span className="text-sm text-gray-500 mb-4 block">
                      {member.designation}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default TeamManagement;
