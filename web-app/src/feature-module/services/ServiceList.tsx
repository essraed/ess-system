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
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";

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
        <div className="custom-container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-left ml-12 mb-8" data-aos="fade-down">
            <h2 className="text-3xl font-extrabold text-gray-800">
              {id ? currentCategory?.name : "All Categories"}
            </h2>
            <p className="text-gray-600 mt-2">
              {id
                ? currentCategory?.description
                : "Explore our range of services across all categories."}
            </p>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-slate-50 to-teal-700 rounded-full"></div>
          </div>

          {/* Services List */}
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

          <section className="section about-sec">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-6" data-aos="fade-down">
                  <div className="about-img">
                    <div className="about-exp">
                      <span>12+ years of experiences</span>
                    </div>
                    <div className="abt-img">
                    {currentCategory?.fileEntities &&
                      currentCategory.fileEntities.length > 0 ? (
                        <ImageWithBasePath
                          lazyLoad={true}
                          src={
                            !currentCategory.fileEntities[1]?.filePath
                              ? "assets/img/Amer Services.png"
                              : currentCategory.fileEntities[1].filePath
                          }
                          alt={currentCategory.name ?? "Service"}
                          className="img-fluid"
                        />
                      ) : (
                        <ImageWithBasePath
                          lazyLoad={true}
                          src="assets/img/Amer Services.png"
                          alt={currentCategory?.name ?? "Service"}
                          className="img-fluid"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6" data-aos="fade-down">
                  <div className="about-content">
                    <h6>{currentCategory?.name}</h6>
                    <p>{currentCategory?.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default observer(ServiceList);
