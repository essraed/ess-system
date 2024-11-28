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
    if (id)
      loadServices(id);
  }, [loadServices, userStore.token, id]);

  if (!services) return <LoadingSpinner />;

  return (

    <>
      <Header />
      <div className="listing-page">
        <Breadcrumbs title="Services List" subtitle="Services" />
        <section className="section car-listing pt-0">
          <div className="container">
            <Card className="p-6 mt-4 shadow-lg rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center flex-wrap ">
            {services.length > 0 ? (
                services.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))
              ) : (
                <EmptyListComponent label='services' />
              )}
            </div>
            </Card>

          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default observer(ServiceList);
