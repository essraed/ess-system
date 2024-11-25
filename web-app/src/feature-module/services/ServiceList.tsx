import React, { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import ServiceCard from "../services/ServiceCard";


const ServiceList = () => {
  const {
    serviceStore: { services, loadServices },
    userStore,
  } = useStore();

  useEffect(() => {
    loadServices();
  }, [loadServices, userStore.token]);

  if (!services) return <p>Loading...</p>;

  return (
    <>
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </>
  );
};

export default observer(ServiceList);
