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
                  <div
                    className="slide-images"
                    style={{ position: "relative" }}
                  >
                    {/* Overlay button for Visit Visa & Pick & Drop */}
                    {(category.name === "Visit Visa" ||
                      category.name === "Pick & Drop") && (
                      <button
                        onClick={() =>
                          window.open("https://uberevisa.com", "_blank")
                        }
                        style={{
                          background: "none",
                          border: "none",
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          top: 0,
                          left: 0,
                          cursor: "pointer",
                          zIndex: 10,
                        }}
                      />
                    )}

                    {/* Original Link—only used for other categories */}
                    {category.name !== "Visit Visa" &&
                      category.name !== "Pick & Drop" && (
                        <Link to={`/services/${formattedName}/${category.id}`}>
                          <ImageWithBasePath
                            lazyLoad
                            src={
                              category.fileEntities?.[0]?.filePath ||
                              "assets/img/Amer Services.png"
                            }
                            alt={category.name ?? "Category"}
                            className="img-fluid"
                          />
                        </Link>
                      )}

                    {/* Fallback Image for externals so they still see it */}
                    {(category.name === "Visit Visa" ||
                      category.name === "Pick & Drop") && (
                      <ImageWithBasePath
                        lazyLoad
                        src={
                          category.fileEntities?.[0]?.filePath ||
                          "assets/img/Amer Services.png"
                        }
                        alt={category.name ?? "Category"}
                        className="img-fluid"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="listing-content">
            <div className="listing-features d-flex align-items-end justify-content-between">
              <div className="list-rating">
                <h3 className="listing-title">
                  {category.name === "Visit Visa" ||
                  category.name === "Pick & Drop" ? (
                    <button
                      onClick={() =>
                        window.open("https://uberevisa.com", "_blank")
                      }
                      className="btn btn-link p-0 text-decoration-none font-semibold text-large lg:text-xl"
                      style={{
                        background: "none",
                        border: "none",
                        color: "inherit",
                        cursor: "pointer",
                      }}
                    >
                      {category.name}
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        navigate(`/services/${formattedName}/${category.id}`)
                      }
                      className="btn btn-link p-0 text-decoration-none font-semibold text-large lg:text-xl"
                      style={{
                        background: "none",
                        border: "none",
                        color: "inherit",
                      }}
                    >
                      {category.name}
                    </button>
                  )}
                </h3>
              </div>
            </div>

            <div className="view-more-btn text-center hidden lg:block">
              {category.name === "Visit Visa" ||
              category.name === "Pick & Drop" ? (
                <button
                  onClick={() => window.open("https://uberevisa.com", "_blank")}
                  className="btn btn-secondary-new"
                >
                  {t("View Services")}{" "}
                  <i
                    className="fas fa-arrow-right ps-3"
                    style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
                  />
                </button>
              ) : (
                <button
                  onClick={() =>
                    navigate(`/services/${formattedName}/${category.id}`)
                  }
                  className="btn btn-secondary-new"
                >
                  {t("View Services")}{" "}
                  <i
                    className="fas fa-arrow-right ps-3"
                    style={{ transform: isRTL ? "rotate(180deg)" : "none" }}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(CategoryCard);
