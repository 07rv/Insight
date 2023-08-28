import Link from "next/link";
import Label from "../ui/Label";

const Category = ({ categories, nomargin = false }) => {
  return (
    <div className="flex gap-3">
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Link href={`/category?id=${category._id}`} key={index}>
            <Label nomargin={nomargin} color={category.color}>
              {category.label}
            </Label>
          </Link>
        ))}
    </div>
  );
};

export default Category;
