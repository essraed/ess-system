import React, { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import ServiceCard from "../services/ServiceCard";
import { useParams } from "react-router-dom";
import Footer from "../common/footer";
import Header from "../common/header";
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
      <section className="section pt-5">
        <div className="custom-container mx-auto px-4">
          {/* Header */}
          <div className="text-left ml-12 mb-8" data-aos="fade-down">
            <h2 className="text-3xl font-extrabold text-gray-800">
              {id ? currentCategory?.name : "All Categories"}
            </h2>
            <div className="mt-2 h-1 w-16 bg-gradient-to-r from-slate-50 to-teal-700 rounded-full"></div>
          </div>

          {/* Services List */}
          <section className="mb-5 mx-0">
            <div className="container">
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

          <section className="about-sec bg-gradient-to-r from-gray-50 via-gray-100 to-white py-12">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4 lg:gap-10 space-y-8 lg:space-y-0">
              {/* Image Section */}
              <div
                className="lg:w-1/2 flex justify-center mb-8 lg:mb-0"
                data-aos="fade-down"
              >
                <div className="relative">
                  <div className="absolute top-0 left-0 bg-teal-600 text-white py-2 px-4 rounded-md text-sm shadow-md">
                    20+ Years of Experience
                  </div>
                  {currentCategory?.fileEntities &&
                  currentCategory.fileEntities.length > 0 &&
                  id ? (
                    <ImageWithBasePath
                      lazyLoad={true}
                      src={
                        currentCategory.fileEntities[1]?.filePath
                          ? currentCategory.fileEntities[1].filePath
                          : "assets/img/Amer Services.png"
                      }
                      alt={currentCategory.name ?? "Service"}
                      className="rounded-lg shadow-md"
                    />
                  ) : (
                    <ImageWithBasePath
                      lazyLoad={true}
                      src="assets/img/Amer Services.png"
                      alt={currentCategory?.name ?? "Service"}
                      className="rounded-lg shadow-md"
                    />
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2" data-aos="fade-down">
                <h6 className="text-lg font-semibold text-teal-600 uppercase mb-2">
                  {id?currentCategory?.name :"AllServices"}
                </h6>
                {/* <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {id ? `About ${currentCategory?.name}` : "Who We Are"}
                </h3> */}
                <p className="text-gray-600 leading-relaxed">
                  {id?currentCategory?.description :
                    "We are committed to delivering exceptional services with over two decades of experience in the industry. Explore our categories and find what suits your needs."}
                </p>
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
