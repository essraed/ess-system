import React, { useEffect } from "react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import CategoryCard from "./CategoryCard";
import LoadingSpinner from "../common/LoadingSpinner";
import { useTranslation } from "react-i18next";

const CategoryList = () => {
  const {
    categoryStore: { categories, loadCategories },
    userStore,
  } = useStore();

  const { t } = useTranslation();
  
  useEffect(() => {
    loadCategories();
  }, [loadCategories, userStore.token]);

  if (!categories) return <LoadingSpinner />;

  return (
    <section className="section-top">
      <div id="Services" className="homesection servicessection saa viewon">
        <div className="custom-container">
          <div className="row">
            <h2 className="section-title">{t("Our Services")}</h2>
                    {categories.map((category) => (
                      <CategoryCard
                        key={category.id}
                        category={category}
                      />
                    ))}
               
              </div>
            </div>
          </div>
    </section>
  );
};

export default observer(CategoryList);
