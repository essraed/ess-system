import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { CategoryData } from "../../types/category";
import FileForm from "../common/FileForm";
import { ActionResult } from "../../types";

type Props = {
  className?: string
  category: CategoryData;
  handleSerice: (id: string) => void;
  uploadImage?: (formData: FormData) => Promise<ActionResult<string>>;
};

const CategoryCard = ({ category, handleSerice, className, uploadImage }: Props) => {
  return (
    <li>
      <FileForm entityId={category.id} uploadImage={uploadImage} />
      <Link
        className={`${className}`}
        aria-current="true"
        data-bs-toggle="tab"
        to="#"
        onClick={() => handleSerice(category.id)}
      >
        <span>
          <ImageWithBasePath src={category.filePath ?? ""} alt={category.name} />
        </span>
        {category.name}
      </Link>
    </li>
  );
};

export default CategoryCard;
