import React, { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import CategoryCard from "./CategoryCard";

const CategoryList = () => {
  const {
    categoryStore: { categories, loadCategories, uploadImage },
    serviceStore: { setCategoryIdParam, loadServices },
    userStore,
  } = useStore();

  function handleSerice(id: string) {
    setCategoryIdParam(id);
    loadServices();
  }

  useEffect(() => {
    loadCategories();
  }, [loadCategories, userStore.token]);

  if (!categories) return <p>Loading...</p>;

  const categoryInitial = {
    id: "",
    name: "All",
  };

  return (
    <section className="section-top">
      <div id="Services" className="homesection servicessection saa viewon">
        <div className="custom-container">
          <div className="row">
            <h2 className="section-title">Our Services</h2>
            <div className="row justify-content-center">
              <div className="col-lg-12" data-aos="fade-down">
                <div className="listing-tabs-group">
                  <ul className="nav listing-buttons gap-3" data-bs-tabs="tabs">
              
                    {categories.map((category) => (
                      <CategoryCard
                        uploadImage={uploadImage}
                        key={category.id}
                        category={category}
                      />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default observer(CategoryList);
