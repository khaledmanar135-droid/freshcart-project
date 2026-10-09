import p01 from '../assets/products/p01.webp';
import p02 from '../assets/products/p02.webp';
import p03 from '../assets/products/p03.webp';
import p04 from '../assets/products/p04.webp';
import p05 from '../assets/products/p05.webp';
import p06 from '../assets/products/p06.webp';
import p07 from '../assets/products/p07.webp';
import p08 from '../assets/products/p08.webp';
import p09 from '../assets/products/p09.webp';
import p10 from '../assets/products/p10.webp';
import p11 from '../assets/products/p11.webp';
import p12 from '../assets/products/p12.webp';
import p13 from '../assets/products/p13.webp';
import p14 from '../assets/products/p14.webp';
import p15 from '../assets/products/p15.webp';
import p16 from '../assets/products/p16.webp';
import p17 from '../assets/products/p17.webp';
import p18 from '../assets/products/p18.webp';
import p19 from '../assets/products/p19.webp';
import p20 from '../assets/products/p20.webp';
import galleryThumb1 from '../assets/images/pdp/woman-shawl/thumb-1.webp';
import galleryThumb3 from '../assets/images/pdp/woman-shawl/thumb-3.webp';

const images = [
  p01, p02, p03, p04, p05, p06, p07, p08, p09, p10,
  p11, p12, p13, p14, p15, p16, p17, p18, p19, p20,
];

const raw = [
  { category: "Women's Fashion", title: 'Woman Shawl', rating: 4.8, reviews: 18, price: 191 },
  { category: "Women's Fashion", title: 'Woman Shawl', rating: 4.8, reviews: 18, price: 149 },
  { category: "Women's Fashion", title: 'Woman Shawl', rating: 4.8, reviews: 18, price: 149 },
  { category: "Women's Fashion", title: 'Woman Shawl', rating: 4.8, reviews: 18, price: 149 },
  { category: "Women's Fashion", title: 'Woman Shawl', rating: 4.2, reviews: 10, price: 349 },
  { category: "Women's Fashion", title: 'Woman Bordeaux Long Sleeve Blouse BORDEAUX', rating: 4.2, reviews: 10, price: 349, originalPrice: 499, discount: '-30%' },
  { category: "Women's Fashion", title: 'Woman Brown Long Sleeve Tunic LT.CAMEL', rating: 4.7, reviews: 5, price: 359, originalPrice: 499, discount: '-28%' },
  { category: "Women's Fashion", title: 'Woman Standart Fit Knitted Cardigan', rating: 4.8, reviews: 5, price: 449, originalPrice: 499, discount: '-10%' },
  { category: "Women's Fashion", title: 'Relaxed Fit Knitted Joggers Lilac', rating: 1, reviews: 1, price: 189, originalPrice: 499, discount: '-62%' },
  { category: "Women's Fashion", title: 'Woman Socks', rating: 4.3, reviews: 6, price: 199 },
  { category: "Women's Fashion", title: 'Woman Karma Socks Multicolour', rating: 2, reviews: 1, price: 199 },
  { category: "Men's Fashion", title: 'Logo T-Shirt Green', rating: 2, reviews: 6, price: 379, originalPrice: 744, discount: '-49%' },
  { category: "Men's Fashion", title: 'Orca Leather Boots Anthracite', rating: 4.9, reviews: 14, price: 3064, originalPrice: 4829, discount: '-37%' },
  { category: "Men's Fashion", title: 'Softride Enzo NXT CASTLEROCK-High Risk Red', rating: 2.8, reviews: 20, price: 2999 },
  { category: "Men's Fashion", title: 'ESS Big Logo Hoodie TR Puma Black', rating: 4.8, reviews: 20, price: 2599, originalPrice: 2649, discount: '-2%' },
  { category: "Men's Fashion", title: 'Sportswear Club Graphic Hoodie Blue', rating: 4.8, reviews: 20, price: 1474, originalPrice: 2449, discount: '-40%' },
  { category: "Men's Fashion", title: "NSW Everyday Essentials No-Show Socks (Pack of 3) White/Black", rating: 4.2, reviews: 20, price: 634, originalPrice: 1079, discount: '-41%' },
  { category: "Men's Fashion", title: 'Court Tennis Track Pants Black', rating: 2.8, reviews: 17, price: 2199, originalPrice: 3159, discount: '-30%' },
  { category: "Men's Fashion", title: 'React Live Sneakers Black/White-Dk Smoke Grey', rating: 3.7, reviews: 20, price: 3759, originalPrice: 4639, discount: '-19%' },
  { category: "Men's Fashion", title: 'Essentials Embroidered Linear Logo T-Shirt Navy', rating: 3.8, reviews: 19, price: 504, originalPrice: 749, discount: '-33%' },
  { category: "Men's Fashion", title: 'Salah Track Top', rating: 3.2, reviews: 17, price: 1094, originalPrice: 1749, discount: '-37%' },
  { category: "Men's Fashion", title: 'Adicolor Classics Beckenbauer Primeblue Track Top', rating: 3.8, reviews: 13, price: 2379 },
  { category: "Men's Fashion", title: 'Duramo 10 Running Shoes', rating: 3.8, reviews: 13, price: 1314, originalPrice: 1999, discount: '-34%' },
  { category: "Men's Fashion", title: 'Hoops 3.0 Low Classic Vintage Shoes', rating: 4.5, reviews: 2, price: 1629 },
  { category: "Men's Fashion", title: 'Galaxy 6 Running Shoes', rating: 5, reviews: 1, price: 1629 },
  { category: "Men's Fashion", title: "Slim Fit Long Sleeve Dobby Men's Shirt", rating: 4.7, reviews: 3, price: 343, originalPrice: 549, discount: '-38%' },
  { category: "Men's Fashion", title: "Crew Neck Long Sleeve Men's Knitwear Sweater", rating: 4.7, reviews: 3, price: 330, originalPrice: 449, discount: '-27%' },
  { category: "Men's Fashion", title: "Crew Neck Long Sleeve Striped Men's Tricot Sweater", rating: 2, reviews: 3, price: 539, originalPrice: 599, discount: '-10%' },
  { category: "Men's Fashion", title: "Crew Neck Long Sleeve Men's Tricot Sweater with Color Block", rating: 5, reviews: 3, price: 321, originalPrice: 549, discount: '-42%' },
  { category: "Men's Fashion", title: "Polo Collar Short Sleeve Color Block Men's Knitwear Sweater", rating: 3, reviews: 16, price: 349 },
  { category: "Men's Fashion", title: "Crew Neck Long Sleeve Striped Men's Knitwear Sweater", rating: 3, reviews: 16, price: 355, originalPrice: 549, discount: '-35%' },
  { category: "Men's Fashion", title: "Standard Pattern Plaid Fleece Men's Pajamas Set", rating: 2.7, reviews: 7, price: 456, originalPrice: 699, discount: '-35%' },
  { category: "Men's Fashion", title: "Slim Fit Stand Collar Men's Leather Look Coat", rating: 2.6, reviews: 6, price: 874, originalPrice: 1499, discount: '-42%' },
  { category: 'Electronics', title: 'Archer VR300 AC1200 Wireless VDSL/ADSL Modem Router Black', rating: 4.5, reviews: 200, price: 1699 },
  { category: 'Electronics', title: 'PIXMA G3420 Multi-Function Inkjet Printer Black', rating: 4.5, reviews: 60, price: 5999 },
  { category: 'Electronics', title: 'EOS M50 Mark II Mirrorless Digital Camera With 15-45mm Lens Black', rating: 4.3, reviews: 60, price: 19199, originalPrice: 19699, discount: '-3%' },
  { category: 'Electronics', title: 'PS5 DualSense Charging Station', rating: 4.3, reviews: 497, price: 1045 },
  { category: 'Electronics', title: 'Galaxy Buds 2 Graphite', rating: 4.3, reviews: 497, price: 3999 },
  { category: 'Electronics', title: 'WH-CH510 Wireless On-Ear Bluetooth Headphones Black', rating: 4.3, reviews: 397, price: 1949 },
  { category: 'Electronics', title: 'Victus 16-D1016Ne Laptop Core i7-12700H 16GB RAM 1TB RTX3050 Ti Ceramic White', rating: 4.3, reviews: 6, price: 42960 },
];

const SUBCATEGORY_BY_CATEGORY = {
  "Women's Fashion": "Women's Clothing",
  "Men's Fashion": "Men's Clothing",
  Electronics: 'Electronics & Gadgets',
};

const BRAND_POOL_BY_CATEGORY = {
  "Women's Fashion": ['DeFacto', 'LC Waikiki', 'Koton', 'Mavi'],
  "Men's Fashion": ['DeFacto', 'Nike', 'Adidas', 'Puma'],
  Electronics: ['Samsung', 'Sony', 'LG', 'Canon'],
};

const MATERIALS = ['Polyester Blend', 'Cotton Blend', 'Premium Leather', 'Aluminum & Glass'];
const COLOURS = ['Multicolour', 'Black', 'Navy', 'White', 'Grey'];
const DEPARTMENTS = { "Women's Fashion": 'Women', "Men's Fashion": 'Men', Electronics: 'Unisex' };

const KEY_FEATURES = [
  'Premium Quality Product',
  '100% Authentic Guarantee',
  'Fast & Secure Packaging',
  'Quality Tested',
];

const SAMPLE_REVIEWS = [
  { name: 'Mona A.', rating: 5, date: '2 weeks ago', comment: 'Exactly as described, great quality for the price. Would buy again.' },
  { name: 'Karim S.', rating: 4, date: '1 month ago', comment: 'Good product overall, delivery took a bit longer than expected.' },
  { name: 'Nourhan T.', rating: 5, date: '1 month ago', comment: 'Love it! Matches the photos perfectly and fits well.' },
  { name: 'Ahmed R.', rating: 4, date: '2 months ago', comment: 'Solid value for money. Packaging was secure and neat.' },
];

export const products = raw.map((item, index) => {
  const id = index + 1;
  const material = MATERIALS[index % MATERIALS.length];
  const colour = COLOURS[index % COLOURS.length];
  const department = DEPARTMENTS[item.category];
  const brandPool = BRAND_POOL_BY_CATEGORY[item.category] ?? ['FreshCart'];

  return {
    id,
    image: images[index % images.length],
    gallery: id === 2 ? [galleryThumb1, images[0], galleryThumb3, images[0]] : [images[index % images.length]],
    subcategory: SUBCATEGORY_BY_CATEGORY[item.category] ?? item.category,
    brand: brandPool[index % brandPool.length],
    description: `Material ${material} Colour Name ${colour} Department ${department}`,
    inStock: true,
    stock: 50 + ((index * 37) % 250),
    itemsSold: 100 + ((index * 53) % 900),
    keyFeatures: KEY_FEATURES,
    reviewsList: SAMPLE_REVIEWS,
    ...item,
  };
});
