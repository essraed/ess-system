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
    userStore,
  } = useStore();

  useEffect(() => {
    if (id) loadServices(id);else loadServices();
  }, [loadServices, userStore.token, id]);

  if (!services) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <section className="section"> 
      <div className="listing-page">
      <div className="custom-container">
            <div className="section-heading" data-aos="fade-down">
              <h2 className="section-title"> DHA Medical </h2>
            </div>
        {/* <Breadcrumbs title="Services List" subtitle="Services" /> */}
        
        <section className="section car-listing pt-0">
          <div className="custom-container">
            <div className="p-6 mt-4 bg-white">
              <div className="flex items-center flex-wrap ">
                {services.length > 0 ? (
                  services.map((service) => (
                    <ServiceCard id={id} key={service.id} service={service} />
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
