import { } from "react";
import CategoryCategory from "../components/CategoryCategory";
import CategoryColor from "../components/CategoryColor";
import CategoryMaterial from "../components/CategoryMaterial"
import CategorySize from "../components/CategorySize";

const Category = () => {
  return (
    <div className="">
      <div className="pr-5 pt-2 pb-6 flex flex-col gap-y-2 mt-12">
        <div className="bg-gray-50 border-gray-300 px-2 pt-4 pb-1 rounded-lg hover:shadow-md transition-transform transform duration-500 ease-linear z-10 ">
          <CategoryCategory />
        </div>
        <div className="bg-gray-50 border-gray-300 px-2 pt-4 pb-1 rounded-lg hover:shadow-md transition-transform transform duration-500 ease-linear z-[9] ">
          <CategoryColor />
        </div>
        <div className="bg-gray-50 border-gray-300 px-2 pt-4 pb-1 rounded-lg hover:shadow-md transition-transform transform duration-500 ease-linear z-[8] ">
          <CategorySize />
        </div>
        <div className="bg-gray-50 border-gray-300 px-2 pt-4 pb-1 rounded-lg hover:shadow-md transition-transform transform duration-500 ease-linear ">
          <CategoryMaterial />
        </div>
      </div>
    </div>
  );

};

export default Category;
