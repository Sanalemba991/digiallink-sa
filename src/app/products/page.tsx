"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Variants } from "framer-motion";
import { 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaTimes, 
  FaBox, 
  FaStar, 
  FaArrowRight, 
  FaHeart, 
  FaShare, 
  FaTh,
  FaListUl 
} from 'react-icons/fa';

type Product = {
  _id?: string;
  name: string;
  category: string;
  subCategory: string;
  description: string;
  image: string;
  imagePublicId?: string;
  createdAt?: string;
  updatedAt?: string;
  details?: {
    title: string;
    fullDescription: string;
    featureImages: Array<{
      url: string;
      publicId: string;
    }>;
    features: string[];
    specifications: Array<{
      name: string;
      value: string;
    }>;
  };
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};
const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Fetch products from API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Using the backend API from the admin system - fix double slash issue
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://sa-digi.vercel.app';
      const cleanUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
      const response = await fetch(`${cleanUrl}/api/products`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
      } else {
        console.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.subCategory || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSubCategory = !selectedSubCategory || product.subCategory === selectedSubCategory;
    
    return matchesSearch && matchesCategory && matchesSubCategory;
  });

  // Get unique categories and subcategories
  const uniqueCategories = [...new Set(products.map(p => p.category))].sort();
  const uniqueSubCategories = [...new Set(products.map(p => p.subCategory))].sort();
  
  const filteredSubCategories = selectedCategory 
    ? [...new Set(products.filter(p => p.category === selectedCategory).map(p => p.subCategory))].sort()
    : uniqueSubCategories;

  // Clear filters
  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setSelectedSubCategory("");
  };

  // Count active filters
  const activeFiltersCount = [searchTerm, selectedCategory, selectedSubCategory].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Professional Hero Section with Banner Image */}
      <section className="relative h-96 overflow-hidden">
        {/* Banner Image */}
        <div className="absolute inset-0">
          <img 
            src="/banner/P 2.png"
            alt="Technology products workspace"
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Professional Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
             
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Our <span className="text-blue-400">Products</span>
              </h1>
              <p className="text-xl text-gray-200 leading-relaxed max-w-xl">
                Discover innovative technology solutions designed to transform your business operations and drive growth.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold">{products.length}</div>
                <div className="text-gray-300 text-sm">Products Available</div>
              </div>
              <div className="w-px h-12 bg-gray-400"></div>
              <div className="text-center">
                <div className="text-3xl font-bold">Premium</div>
                <div className="text-gray-300 text-sm">Quality Assured</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Clean Search and Filter Section */}
      <section className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-lg">
              <div className="relative">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {searchTerm && (
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'grid' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <FaTh size={14} />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    viewMode === 'list' 
                      ? 'bg-white text-blue-600 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <FaListUl size={14} />
                  List
                </button>
              </div>

              {/* Filter Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  showFilters 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                <FaFilter size={14} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mt-6 bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Filter Products
                    </h3>
                    {activeFiltersCount > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors text-sm font-medium"
                      >
                        <FaTimes size={12} />
                        Clear All
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setSelectedSubCategory("");
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Categories</option>
                        {uniqueCategories.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Sub Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sub Category
                      </label>
                      <select
                        value={selectedSubCategory}
                        onChange={(e) => setSelectedSubCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={!selectedCategory && filteredSubCategories.length === 0}
                      >
                        <option value="">All Sub Categories</option>
                        {filteredSubCategories.map((subCategory) => (
                          <option key={subCategory} value={subCategory}>
                            {subCategory}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Results Summary */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Showing <span className="font-semibold">{filteredProducts.length}</span> of{" "}
                      <span className="font-semibold">{products.length}</span> products
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-6 py-12">
        {loading ? (
          // Loading State
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-3 border-gray-300 border-t-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading products...</p>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={
              viewMode === 'grid'
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-6"
            }
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                variants={itemVariants}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
                whileTap={{ scale: 0.98 }}
                className={
                  viewMode === 'grid'
                    ? "bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-200 h-full group"
                    : "bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md border border-gray-200"
                }
              >
                {viewMode === 'grid' ? (
                  // Grid Card Layout
                  <>
                    <div className="relative h-48 w-full bg-gray-50 overflow-hidden">
                      <Image
                        src={product.image || '/images/placeholder.jpg'}
                        alt={product.name}
                        fill
                        unoptimized={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
                      />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {product.category}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                          <FaHeart className="text-gray-600 text-sm" />
                        </button>
                        <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                          <FaShare className="text-gray-600 text-sm" />
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      {/* Sub Category */}
                      {product.subCategory && (
                        <p className="text-xs text-gray-500 mb-2 font-medium">{product.subCategory}</p>
                      )}

                      <h3 className="text-base font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>

                      {/* Action Button */}
                      <Link
                        href={`/products/${product._id}`}
                        className="inline-flex items-center text-blue-600 font-medium text-xs group-hover:text-blue-700 transition-colors duration-200"
                      >
                        View Products
                        <svg className="ml-1 w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </>
                ) : (
                  // List Layout
                  <div className="flex gap-6 p-6">
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-gray-50">
                      <Image
                        src={product.image || '/images/placeholder.jpg'}
                        alt={product.name}
                        fill
                        unoptimized={true}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-contain p-3"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {product.category}
                        </span>
                        {product.subCategory && (
                          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                            {product.subCategory}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {product.name}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                            <FaHeart className="text-gray-600 text-sm" />
                          </button>
                          <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                            <FaShare className="text-gray-600 text-sm" />
                          </button>
                        </div>
                        
                        <Link
                          href={`/products/${product._id}`}
                          className="inline-flex items-center text-blue-600 font-medium text-sm hover:text-blue-700 transition-colors duration-200"
                        >
                          View Details
                          <svg className="ml-1 w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        ) : (
          // No Products State
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-24"
          >
            <div className="max-w-lg mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto flex items-center justify-center mb-6">
                <FaBox className="text-3xl text-gray-400" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No Products Found</h3>
              <p className="text-gray-600 mb-6">
                No products match your current search criteria. Try adjusting your filters or search terms.
              </p>
              
              {(searchTerm || selectedCategory || selectedSubCategory) && (
                <button
                  onClick={clearAllFilters}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Results Summary */}
        {filteredProducts.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 text-center bg-white rounded-lg p-6 border border-gray-200"
          >
            <p className="text-lg font-medium text-gray-900 mb-2">
              {filteredProducts.length} Products Found
            </p>
            <p className="text-gray-600">
              Showing results from our catalog of {products.length} products
            </p>
            
            {(searchTerm || selectedCategory || selectedSubCategory) && (
              <button
                onClick={clearAllFilters}
                className="mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium"
              >
                View All Products
              </button>
            )}
          </motion.div>
        )}
      </section>
    </div>
  );
}