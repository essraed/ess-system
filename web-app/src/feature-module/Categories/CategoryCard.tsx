import React from "react";
import { Link } from "react-router-dom";
import ImageWithBasePath from "../../core/data/img/ImageWithBasePath";
import { CategoryData } from "../../types/category";

type Props = {
  src?: string;
  className?: string
  category: CategoryData;
  handleSerice: (id: string) => void;
};

const CategoryCard = ({ category, src, handleSerice, className }: Props) => {
  return (
    <li>
      <Link
        className={`${className}`}
        aria-current="true"
        data-bs-toggle="tab"
        to="#"
        onClick={() => handleSerice(category.id)}
      >
        <span>
          <ImageWithBasePath src={src ?? ""} alt={category.name} />
        </span>
        {category.name}
      </Link>
    </li>
  );
};

export default CategoryCard;
