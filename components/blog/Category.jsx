import Link from "next/link";
import Label from "../ui/Label";

const Category = ({ categories, nomargin = false }) => {
  console.log(categories);
  return (
    <div className="flex gap-3">
      {categories?.length &&
        categories.slice(0).map((category, index) => (
          <Link href={`/category/${"12"}`} key={index}>
            <Label nomargin={nomargin} color={"pink"}>
              {category.title}
            </Label>
          </Link>
        ))}
    </div>
  );
};

export default Category;
