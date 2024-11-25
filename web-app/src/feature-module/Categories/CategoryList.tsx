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

  if (!Array.isArray(categories)) return <p>Loading...</p>;

  const categoryInitial = {
    id: "",
    name: "All",
  };

  return (
    <div className="row justify-content-center">
      <div className="col-lg-12" data-aos="fade-down">
        <div className="listing-tabs-group">
          <ul className="nav listing-buttons gap-3" data-bs-tabs="tabs">
            <CategoryCard
          
              className="active"
              key={null}
              category={categoryInitial}
              handleSerice={handleSerice}
            />
            {categories.map((category) => (
              <CategoryCard
                uploadImage={uploadImage}
                key={category.id}
                category={category}
                handleSerice={handleSerice}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default observer(CategoryList);
