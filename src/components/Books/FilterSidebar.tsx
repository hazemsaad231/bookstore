import { useState } from "react";
import { BsFilterLeft } from "react-icons/bs";
import { TiDelete } from "react-icons/ti";
import React from "react";








interface FilterSidebarProps {
  showPrice: boolean;
  setShowPrice: (v: boolean) => void;
  showCategory: boolean;
  setShowCategory: (v: boolean) => void;
  minPrice: string;
  setMinPrice: (v: string) => void;
  maxPrice: string;
  setMaxPrice: (v: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (v: string[]) => void;
  sortOption: string;
  setSortOption: (v: string) => void;
  displayCount: number;
  setDisplayCount: (v: number) => void;
  booksLength: number;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  showPrice,
  setShowPrice,
  showCategory,
  setShowCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedCategories,
  setSelectedCategories,
  sortOption,
  setSortOption,
  displayCount,
  setDisplayCount,
  booksLength
}) => {

const categories = [
  "Religion",          // كتب دينية
  "Literature",        // روايات وأدب
  "Self-Help",         // تطوير الذات
  "Science & Tech",    // علوم وتكنولوجيا
  "History",           // تاريخ
  "Children",          // أطفال
  "Business",          // أعمال واقتصاد
  "Cooking",           // طبخ
  "Sports",             // رياضة
  "Romance",           // رومانس
  "Other"              // أخرى
];


  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  }

  const handleCategoryChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <>
    <div className="w-max hidden md:block bg-white p-4 rounded-xl shadow-md">
      <h2 className="font-semibold text-lg mb-4">Filters</h2>

      {/* Price Filter */}
      <div>
        <button
          onClick={() => setShowPrice(!showPrice)}
          className="flex justify-between items-center w-full font-medium"
        >
          Price {showPrice ? "-" : "+"}
        </button>
        {showPrice && (
          <div className="mt-2 flex flex-col gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 border rounded px-2 py-1"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 border rounded px-2 py-1"
            />
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="mt-4">
        <button
          onClick={() => setShowCategory(!showCategory)}
          className="flex justify-between items-center w-full font-medium"
        >
          Categories {showCategory ? "-" : "+"}
        </button>
        {showCategory && (
          <div className="mt-2 flex flex-col gap-1">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Sort & Show */}
      <div className="mt-6">
        <label className="block mb-2 font-medium">Sort By</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-52 border rounded px-2 py-1"
        >
          <option value="alphabetical">Alphabetical</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="block mb-2 font-medium">Show</label>
        <select
          value={displayCount}
          onChange={(e) => setDisplayCount(Number(e.target.value))}
          className="w-52 border rounded px-2 py-1"
        >
          {[4, 8, 16, 24].map((count) => (
            <option key={count} value={count}>
              {count} per page
            </option>
          ))}
        </select>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Total Books: {booksLength}
      </p>
    </div>
{
    isMobileFilterOpen ? (
      <TiDelete
        size={30}
        className="md:hidden cursor-pointer mb-1"
        onClick={toggleMobileFilter}
    />
  ):(
      
        <BsFilterLeft
      size={30}
      className="md:hidden cursor-pointer mb-1"
      onClick={toggleMobileFilter}
      />
    )
}
    

    {isMobileFilterOpen && (
      <>
       {/* Responsive Filter Button */}
       <div className="w-full md:hidden bg-white p-4 rounded-xl shadow-md">
      {/* <h2 className="font-semibold text-lg mb-4">Filters</h2> */}

{/* Price Filter */}
      <div className="my-4">
        <button
          onClick={() => setShowPrice(!showPrice)}
          className="flex justify-between items-center w-full font-medium"
        >
          Price {showPrice ? "-" : "+"}
        </button>
        {showPrice && (
          <div className="mt-2 flex flex-col gap-2">
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-1/2 border rounded px-2 py-1"
            />
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-1/2 border rounded px-2 py-1"
            />
          </div>
        )}
      </div>

      {/* Categories */}
      <div className="my-4">
        <button
          onClick={() => setShowCategory(!showCategory)}
          className="flex justify-between items-center w-full font-medium"
        >
          Categories {showCategory ? "-" : "+"}
        </button>
        {showCategory && (
          <div className="mt-2 flex flex-col gap-1">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        )}
      </div>


      

      {/* Sort & Show */}
      <div className="mt-2">
        <label className="block mb-2 font-medium">Sort By</label>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="w-40 border rounded px-2 py-1"
        >
          <option value="alphabetical">Alphabetical</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="priceHighToLow">Price: High to Low</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="block mb-2 font-medium">Show</label>
        <select
          value={displayCount}
          onChange={(e) => setDisplayCount(Number(e.target.value))}
          className="w-40 border rounded px-2 py-1"
        >
          {[4, 8, 16, 24].map((count) => (
            <option key={count} value={count}>
              {count} per page
            </option>
          ))}
        </select>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Total Books: {booksLength}
      </p>
    </div>
      
      
      
      
      </>
   
    )}

    </>
  );
};

export default React.memo(FilterSidebar);
