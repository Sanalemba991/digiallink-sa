"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeft,
  FaHeart,
  FaShare,
  FaExpand,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaLink
} from "react-icons/fa";

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
    resources?: Array<{
      title: string;
      url: string;
      type?: string;
      date?: string;
    }>;
  };
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (params.id) fetchProduct(params.id as string);
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    try {
      setLoading(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://sa-digi.vercel.app";
      const cleanUrl = apiUrl.endsWith("/") ? apiUrl.slice(0, -1) : apiUrl;
      const response = await fetch(`${cleanUrl}/api/products`);
      const data = await response.json();
      if (data.success) {
        const foundProduct = data.products.find((p: Product) => p._id === id);
        setProduct(foundProduct || null);
      }
    } catch (e) {
      console.error("Error fetching product:", e);
    } finally {
      setLoading(false);
    }
  };

  const allImages = product ? [product.image, ...(product.details?.featureImages?.map(i => i.url) || [])].filter(Boolean) : [];

  const prevImage = () => {
    setSelectedImageIndex(i => (i - 1 + allImages.length) % allImages.length);
  };
  const nextImage = () => {
    setSelectedImageIndex(i => (i + 1) % allImages.length);
  };

  const handleNativeShare = async () => {
    if (!product) return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinks = useMemo(() => {
    const url = encodeURIComponent(typeof window !== "undefined" ? window.location.href : "");
    const text = encodeURIComponent(product?.name || "");
    return {
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    };
  }, [product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="aspect-square bg-white rounded-2xl p-2 shadow-sm">
                <div className="h-full w-full rounded-xl bg-gray-100 animate-pulse"></div>
              </div>
              <div className="mt-4 flex gap-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="w-20 h-20 rounded-lg bg-gray-100 animate-pulse"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="h-6 w-40 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-10 w-3/4 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-24 w-full bg-gray-100 rounded animate-pulse"></div>
              <div className="h-48 w-full bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-3 tracking-tight">Product not found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/products" className="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors">
            <FaArrowLeft />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-700">Products</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Back */}
      <div className="container mx-auto px-6 py-6">
        <button onClick={() => router.back()} className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <FaArrowLeft />
          <span>Back</span>
        </button>
      </div>

      {/* Main */}
      <div className="container mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Gallery with enhanced hover effects */}
          <div className="space-y-4">
            <motion.div 
              className="relative aspect-[4/3] w-full max-w-[500px] mx-auto bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm group cursor-pointer"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Image
                src={allImages[selectedImageIndex] || "/placeholder-product.jpg"}
                alt={product.name}
                fill
                className="object-contain p-5 transition-transform duration-300"
                sizes="(min-width:1024px) 500px, 100vw"
                priority
              />

              {/* Navigation arrows - enhanced visibility on hover */}
              {allImages.length > 1 && (
                <>
                  <motion.button
                    aria-label="Previous image"
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/95 text-gray-700 border border-gray-200 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0, 
                      x: isHovered ? 0 : -10 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaChevronLeft size={16} />
                  </motion.button>
                  <motion.button
                    aria-label="Next image"
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/95 text-gray-700 border border-gray-200 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0, 
                      x: isHovered ? 0 : 10 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <FaChevronRight size={16} />
                  </motion.button>
                </>
              )}

              {/* Expand button */}
              <motion.button
                onClick={() => setIsImageExpanded(true)}
                className="absolute top-4 right-4 bg-white/95 text-gray-700 border border-gray-200 px-3 py-2.5 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
                aria-label="Expand image"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: isHovered ? 1 : 0.7, 
                  scale: isHovered ? 1 : 0.9 
                }}
                transition={{ duration: 0.2 }}
              >
                <FaExpand size={14} />
              </motion.button>

              {/* Image indicator */}
              {allImages.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        selectedImageIndex === idx ? "bg-blue-600 w-6" : "bg-white/70 hover:bg-white"
                      }`}
                    />
                  ))}
                </div>
              )}
            </motion.div>

            {/* Thumbnail gallery with enhanced active states */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
                {allImages.map((img, idx) => (
                  <motion.button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all duration-300 ${
                      selectedImageIndex === idx 
                        ? "border-blue-600 shadow-lg ring-2 ring-blue-100" 
                        : "border-gray-200 hover:border-gray-400 hover:shadow-md"
                    }`}
                    aria-label={`View image ${idx + 1}`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Image 
                      src={img} 
                      alt={`${product.name} ${idx + 1}`} 
                      fill 
                      className="object-cover"
                    />
                    {selectedImageIndex === idx && (
                      <motion.div
                        className="absolute inset-0 bg-blue-600/10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Title + quick actions + concise bullets */}
          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 tracking-tight">{product.name}</h1>
              <div className="h-1.5 w-16 bg-blue-600 rounded mt-2"></div>
              {product.details?.title && <h2 className="text-base md:text-lg text-gray-600 mt-2">{product.details.fullDescription}</h2>}
            </motion.div>

            {/* Overview bullets */}
            {(product.details?.features?.length || product.description) && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="rounded-xl p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {(product.details?.features?.length ? product.details.features : product.description.split(". ").filter(Boolean)).map((f, i) => (
                    <motion.li 
                      key={i} 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></span>
                      <span className="text-gray-800">{f}</span>
                    </motion.li>
                  ))}
                </ul>
                
              </motion.div>
            )}

            {/* Inline share buttons row (platform links) */}
            <div className="flex items-center gap-3">
              <motion.a 
                href={shareLinks.whatsapp} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Share on WhatsApp" 
                className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 transition-all duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp size={18} />
              </motion.a>
              <motion.a 
                href={shareLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Share on X" 
                className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-blue-50 text-sky-600 border border-sky-200 hover:bg-blue-100 transition-all duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter size={18} />
              </motion.a>
              <motion.a 
                href={shareLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Share on Facebook" 
                className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-all duration-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebookF size={18} />
              </motion.a>
              <motion.button
                onClick={async () => {
                  await navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                aria-label="Copy link"
                className="inline-flex w-12 h-12 items-center justify-center rounded-full bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 transition-all duration-200 relative"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLink size={16} />
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-lg"
                  >
                    Copied!
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Enhanced Specifications section */}
        {product.details?.specifications?.length ? (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="mt-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Technical Specifications</h3>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6 border-b border-gray-100">
                <h4 className="text-lg font-semibold text-gray-900">Product Details</h4>
                <p className="text-gray-600 text-sm mt-1">Complete technical information and specifications</p>
              </div>
              
              <div className="p-8">
                <div className="grid gap-1">
                  {product.details.specifications.map((spec, idx) => (
                    <motion.div 
                      key={idx} 
                      className="grid grid-cols-1 md:grid-cols-5 gap-4 py-4 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05 }}
                      whileHover={{ x: 4 }}
                    >
                      <div className="md:col-span-2 flex items-center">
                        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                        <span className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors duration-200">
                          {spec.name}
                        </span>
                      </div>
                      <div className="md:col-span-3 flex items-center">
                        <span className="text-gray-700 bg-gray-50 px-4 py-2 rounded-lg group-hover:bg-blue-50 group-hover:text-blue-800 transition-all duration-200 flex-1">
                          {spec.value}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional info card if needed */}
            <motion.div 
              className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <h5 className="font-semibold text-gray-900">Additional Information</h5>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                All specifications are subject to change without notice. For the most up-to-date information, 
                please contact our technical support team or refer to the official product documentation.
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </div>

      {/* Enhanced Image modal */}
      {isImageExpanded && (
        <motion.div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm" 
          onClick={() => setIsImageExpanded(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="relative max-w-6xl max-h-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={allImages[selectedImageIndex] || "/placeholder-product.jpg"}
              alt={product.name}
              width={1200}
              height={900}
              className="object-contain max-h-full rounded-xl shadow-2xl"
            />
            <motion.button
              onClick={() => setIsImageExpanded(false)}
              className="absolute top-4 right-4 text-white bg-black/20 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-black/40 transition-all duration-200"
              aria-label="Close"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes size={18} />
            </motion.button>

            {/* Modal navigation */}
            {allImages.length > 1 && (
              <>
                <motion.button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/20 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-black/40 transition-all duration-200"
                  aria-label="Previous image"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaChevronLeft size={18} />
                </motion.button>
                <motion.button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/20 backdrop-blur-sm border border-white/20 rounded-full p-3 hover:bg-black/40 transition-all duration-200"
                  aria-label="Next image"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaChevronRight size={18} />
                </motion.button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}