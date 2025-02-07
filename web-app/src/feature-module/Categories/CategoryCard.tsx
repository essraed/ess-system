import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { CategoryData } from "../../types/category";
import FileForm from "../common/FileForm";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useTranslation } from "react-i18next";

type Props = {
  className?: string;
  category: CategoryData;
};

const CategoryCard = ({ category }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    userStore: { isAdmin, language },
    categoryStore: { uploadImage },
  } = useStore();

  const isRTL = language === "ar";
  const formattedName = category.name.replace(/\s+/g, "-"); // Keeps spaces

  return (
    <div
      className="col-lg-3 col-md-3 col-6 aos-init aos-animate wow zoomIn"
      data-wow-delay="0.3s"
      data-aos="fade-down"
    >
      <div className="listing-item position-relative">
        {/* Top-right FileForm */}
        {uploadImage && isAdmin() && (
          <div
            className="position-absolute top-0 end-0 m-2"
            style={{ zIndex: 10 }}
          >
            <FileForm
              label=""
              entityId={category.id}
              uploadImage={uploadImage}
            />
          </div>
        )}

        <div className="listing-img">
          <div className="img-slider owl-carousel owl-loaded owl-drag">
            <div className="owl-stage-outer">
              <div className="owl-stage">
                <div className="owl-item cloned">
                  <div className="slide-images">
                    {/* Button for navigation */}
                    <button
                      onClick={() => navigate(`/services/${formattedName}/${category.id}`)}
                      style={{
                        background: "none",
                        border: "none",
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    ></button>

                    {/* Link for navigation */}
                    <Link to={`/services/${formattedName}/${category.id}`}>
                      {category.fileEntities &&
                      category.fileEntities.length > 0 ? (
                        <ImageWithBasePath
                          lazyLoad={true}
                          src={
                            category.fileEntities[0]?.filePath ||
                            "assets/img/Amer Services.png"
                          }
                          alt={category.name ?? "Category"}
                          className="img-fluid"
                        />
                      ) : (
                        <ImageWithBasePath
                          lazyLoad={true}
                          src="assets/img/Amer Services.png"
                          alt={category.name ?? "Category"}
                          className="img-fluid"
                        />
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="listing-content">
            <div className="listing-features d-flex align-items-end justify-content-between">
              <div className="list-rating">
                <h3 className="listing-title">
                  <button
                    onClick={() => navigate(`/listing-details`)}
                    className="btn btn-link p-0 text-decoration-none font-semibold text-large lg:text-xl"
                    style={{ background: "none", border: "none", color: "inherit" }}
                  >
                    {category.name ?? "Category Name"}
                  </button>
                </h3>
              </div>
            </div>
            <div className="view-more-btn text-center">
              <button
                onClick={() => navigate(`/services/${formattedName}/${category.id}`)}
                className="btn btn-secondary-new"
              >
                {t("View Services")}{" "}
                <i
                  className="fas fa-arrow-right ps-3"
                  style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
                ></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(CategoryCard);
