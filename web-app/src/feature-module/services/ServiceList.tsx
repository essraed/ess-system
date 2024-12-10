import React, { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import ServiceCard from "../services/ServiceCard";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../common/breadcrumbs";
import Footer from "../common/footer";
import Header from "../common/header";
import { Card } from "@nextui-org/react";
import EmptyListComponent from "../common/EmptyListComponent";
import LoadingSpinner from "../common/LoadingSpinner";

const ServiceList = () => {
  const { id } = useParams();
  const {
    serviceStore: { services, loadServices },
    categoryStore: { currentCategory, getCategory },
    userStore,
  } = useStore();

  useEffect(() => {
    if (id) {
      loadServices(id);
      getCategory(id);
    } else loadServices();
  }, [loadServices, userStore.token, id]);

  if (!services) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <section className="section">
        <div className="listing-page">
          <div className="custom-container">
            <div className="text-left ml-12" data-aos="fade-down">
              <h2
                className="text-xl md:text-xl lg:text-2xl font-extrabold  text-gray-800"
              >
                {id ? currentCategory?.name : "All Services"}
              </h2>
              <div className="mt-2 h-1 w-16 bg-gradient-to-r from-slate-50 to-teal-700 rounded-full"></div>
            </div>

            {/* <Breadcrumbs title="Services List" subtitle="Services" /> */}

            <section className="section car-listing pt-0">
              <div className="custom-container">
                <div className="p-6 mt-4 bg-white">
                  <div className="flex items-center flex-wrap ">
                    {services.length > 0 ? (
                      services.map((service) => (
                        <ServiceCard
                          id={id}
                          key={service.id}
                          service={service}
                        />
                      ))
                    ) : (
                      <EmptyListComponent label="services" />
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default observer(ServiceList);
