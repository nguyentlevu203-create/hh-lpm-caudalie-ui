/**
 * Sample product catalog for the Hoàng Hà / Le Petit Marseillais Việt Nam
 * production UI shell. All names/prices/descriptions below are original
 * placeholder content written for this project — not scraped or copied
 * from any live site — modeled on the product *types* a French personal-care
 * import distributor typically carries (shower gel, bar soap, body lotion,
 * hand cream, shampoo, gift sets). Real SKUs, prices, and photography from
 * Hoàng Hà still need to replace this before launch (see production report).
 */

export type HHCategorySlug =
  | "sua-tam"
  | "xa-phong-banh"
  | "duong-the"
  | "cham-soc-tay"
  | "cham-soc-toc"
  | "combo-qua-tang";

export interface HHCategory {
  slug: HHCategorySlug;
  name: string;
  shortName: string;
  description: string;
}

export const HH_CATEGORIES: HHCategory[] = [
  {
    slug: "sua-tam",
    name: "Sữa tắm",
    shortName: "Sữa tắm",
    description: "Sữa tắm chiết xuất thiên nhiên, hương thơm nhập khẩu từ Pháp.",
  },
  {
    slug: "xa-phong-banh",
    name: "Xà phòng bánh",
    shortName: "Xà phòng",
    description: "Xà phòng bánh truyền thống kiểu Marseille, dịu nhẹ cho da.",
  },
  {
    slug: "duong-the",
    name: "Dưỡng thể",
    shortName: "Dưỡng thể",
    description: "Sữa dưỡng thể cấp ẩm, thẩm thấu nhanh, không nhờn rít.",
  },
  {
    slug: "cham-soc-tay",
    name: "Chăm sóc tay",
    shortName: "Chăm sóc tay",
    description: "Kem dưỡng tay bỏ túi tiện lợi, làm mềm da tay khô ráp.",
  },
  {
    slug: "cham-soc-toc",
    name: "Chăm sóc tóc",
    shortName: "Chăm sóc tóc",
    description: "Dầu gội, dầu xả phục hồi tóc chắc khỏe từ thiên nhiên.",
  },
  {
    slug: "combo-qua-tang",
    name: "Combo quà tặng",
    shortName: "Combo",
    description: "Bộ quà tặng đóng hộp sẵn, tiết kiệm hơn mua lẻ.",
  },
];

export interface HHProduct {
  id: string;
  slug: string;
  name: string;
  category: HHCategorySlug;
  scent: string;
  volume: string;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  bestSeller?: boolean;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  highlights: string[];
  howToUse: string;
  colorFrom: string;
  colorTo: string;
  isCombo?: boolean;
  comboIncludes?: string[];
}

export const HH_PRODUCTS: HHProduct[] = [
  {
    id: "p1",
    slug: "sua-tam-hoa-oai-huong-bo-hat-mo",
    name: "Sữa Tắm Hoa Oải Hương & Bơ Hạt Mỡ",
    category: "sua-tam",
    scent: "Oải hương",
    volume: "250ml",
    price: 129000,
    compareAtPrice: 159000,
    badge: "Bán chạy",
    bestSeller: true,
    rating: 4.7,
    reviewCount: 328,
    shortDescription: "Hương oải hương dịu nhẹ, làm sạch êm ái cho da.",
    description:
      "Sữa tắm chiết xuất hoa oải hương kết hợp bơ hạt mỡ, làm sạch nhẹ nhàng mà không làm khô da. Hương thơm thư giãn, phù hợp dùng buổi tối trước khi ngủ.",
    highlights: [
      "Chiết xuất hoa oải hương và bơ hạt mỡ",
      "Không chứa xà phòng, dịu nhẹ với da nhạy cảm",
      "Hương thơm nhập khẩu từ Pháp",
    ],
    howToUse: "Thoa đều lên da ướt, tạo bọt nhẹ và massage toàn thân, sau đó xả sạch với nước.",
    colorFrom: "#7c6fb0",
    colorTo: "#b8aede",
  },
  {
    id: "p2",
    slug: "sua-tam-dau-o-liu-hoa-cam",
    name: "Sữa Tắm Dầu Ô Liu & Hoa Cam",
    category: "sua-tam",
    scent: "Hoa cam",
    volume: "250ml",
    price: 129000,
    badge: "Nhập khẩu Pháp",
    rating: 4.6,
    reviewCount: 214,
    shortDescription: "Dầu ô liu dưỡng ẩm, hương hoa cam tươi mát.",
    description:
      "Kết hợp dầu ô liu nguyên chất và tinh dầu hoa cam, sữa tắm này vừa làm sạch vừa nuôi dưỡng da, để lại hương thơm tươi mát suốt cả ngày.",
    highlights: ["Dầu ô liu nguyên chất", "Hương hoa cam tự nhiên", "Không paraben"],
    howToUse: "Thoa lên da ướt, tạo bọt và massage nhẹ nhàng, xả lại với nước sạch.",
    colorFrom: "#e2a33a",
    colorTo: "#f3cf87",
  },
  {
    id: "p3",
    slug: "sua-tam-sua-hanh-nhan",
    name: "Sữa Tắm Sữa Hạnh Nhân",
    category: "sua-tam",
    scent: "Hạnh nhân",
    volume: "250ml",
    price: 119000,
    rating: 4.5,
    reviewCount: 152,
    shortDescription: "Chiết xuất sữa hạnh nhân, mềm mịn da tức thì.",
    description:
      "Sữa hạnh nhân giàu dưỡng chất giúp làm mềm da ngay từ lần tắm đầu tiên, phù hợp cho cả gia đình sử dụng hằng ngày.",
    highlights: ["Chiết xuất sữa hạnh nhân", "Phù hợp da khô", "Không gây kích ứng"],
    howToUse: "Dùng khi tắm, tạo bọt và massage đều lên da, xả sạch với nước.",
    colorFrom: "#d9c39b",
    colorTo: "#efe1c6",
  },
  {
    id: "p4",
    slug: "xa-phong-banh-dau-o-liu",
    name: "Xà Phòng Cục Dầu Ô Liu",
    category: "xa-phong-banh",
    scent: "Dầu ô liu",
    volume: "100g",
    price: 49000,
    badge: "Công thức truyền thống",
    rating: 4.8,
    reviewCount: 401,
    shortDescription: "Công thức xà phòng Marseille truyền thống, dịu nhẹ.",
    description:
      "Xà phòng bánh nấu theo công thức truyền thống của vùng Marseille với dầu ô liu, làm sạch dịu nhẹ mà không làm mất đi độ ẩm tự nhiên của da.",
    highlights: ["Công thức truyền thống Marseille", "72% dầu ô liu", "Phù hợp da nhạy cảm"],
    howToUse: "Làm ướt bánh xà phòng, tạo bọt trực tiếp trên da hoặc dùng bông tắm.",
    colorFrom: "#8fa06a",
    colorTo: "#c7d3a8",
  },
  {
    id: "p5",
    slug: "xa-phong-banh-hoa-hong",
    name: "Xà Phòng Cục Hoa Hồng",
    category: "xa-phong-banh",
    scent: "Hoa hồng",
    volume: "100g",
    price: 49000,
    rating: 4.6,
    reviewCount: 189,
    shortDescription: "Hương hoa hồng nhẹ nhàng, làm sạch dịu êm.",
    description:
      "Bánh xà phòng hương hoa hồng mang lại cảm giác thư giãn mỗi lần sử dụng, phù hợp làm quà tặng nhỏ xinh.",
    highlights: ["Hương hoa hồng tự nhiên", "Kích thước tiện mang theo", "Không chứa sulfate"],
    howToUse: "Làm ướt bánh xà phòng, tạo bọt và làm sạch da nhẹ nhàng.",
    colorFrom: "#d98fa0",
    colorTo: "#f3c9d3",
  },
  {
    id: "p6",
    slug: "sua-duong-the-hoa-hong",
    name: "Sữa Dưỡng Thể Hoa Hồng",
    category: "duong-the",
    scent: "Hoa hồng",
    volume: "400ml",
    price: 149000,
    badge: "Bán chạy",
    bestSeller: true,
    rating: 4.7,
    reviewCount: 276,
    shortDescription: "Cấp ẩm 24h, thẩm thấu nhanh, không nhờn rít.",
    description:
      "Sữa dưỡng thể chiết xuất hoa hồng giúp da mềm mịn, cấp ẩm suốt 24 giờ. Kết cấu mỏng nhẹ, thẩm thấu nhanh, không để lại cảm giác nhờn rít.",
    highlights: ["Cấp ẩm 24 giờ", "Thẩm thấu nhanh", "Hương hoa hồng nhẹ nhàng"],
    howToUse: "Thoa đều lên da sau khi tắm, massage nhẹ nhàng đến khi thấm hoàn toàn.",
    colorFrom: "#d98fa0",
    colorTo: "#f3c9d3",
  },
  {
    id: "p7",
    slug: "sua-duong-the-bo-hat-mo",
    name: "Sữa Dưỡng Thể Bơ Hạt Mỡ",
    category: "duong-the",
    scent: "Bơ hạt mỡ",
    volume: "400ml",
    price: 149000,
    rating: 4.6,
    reviewCount: 198,
    shortDescription: "Nuôi dưỡng chuyên sâu cho da khô.",
    description:
      "Với hàm lượng bơ hạt mỡ cao, sản phẩm phù hợp cho da khô cần được nuôi dưỡng chuyên sâu, giúp da mềm mại suốt cả ngày.",
    highlights: ["Giàu bơ hạt mỡ", "Phù hợp da khô", "Không chứa silicone"],
    howToUse: "Thoa lên da sau khi tắm hoặc bất cứ khi nào da cần cấp ẩm.",
    colorFrom: "#c7ab7a",
    colorTo: "#e8d5ac",
  },
  {
    id: "p8",
    slug: "kem-duong-tay-mat-ong-sua",
    name: "Kem Dưỡng Tay Mật Ong & Sữa",
    category: "cham-soc-tay",
    scent: "Mật ong & sữa",
    volume: "50ml",
    price: 79000,
    badge: "Mới",
    rating: 4.5,
    reviewCount: 97,
    shortDescription: "Kích thước bỏ túi, làm mềm tay khô ráp tức thì.",
    description:
      "Kem dưỡng tay dạng tuýp nhỏ gọn, tiện mang theo, giúp làm mềm da tay khô ráp chỉ sau vài lần sử dụng.",
    highlights: ["Kích thước bỏ túi tiện lợi", "Thẩm thấu nhanh, không dính tay", "Chiết xuất mật ong & sữa"],
    howToUse: "Thoa một lượng nhỏ lên tay, massage đều đến khi thấm hết.",
    colorFrom: "#e2a33a",
    colorTo: "#f3cf87",
  },
  {
    id: "p9",
    slug: "kem-duong-tay-dau-o-liu",
    name: "Kem Dưỡng Tay Dầu Ô Liu",
    category: "cham-soc-tay",
    scent: "Dầu ô liu",
    volume: "50ml",
    price: 79000,
    rating: 4.4,
    reviewCount: 88,
    shortDescription: "Dưỡng ẩm sâu, bảo vệ da tay khỏi khô nứt.",
    description:
      "Dầu ô liu nguyên chất giúp bảo vệ da tay khỏi tác động của môi trường, giữ tay luôn mềm mại quanh năm.",
    highlights: ["Dầu ô liu nguyên chất", "Không gây bết dính", "Dùng được hằng ngày"],
    howToUse: "Thoa đều lên tay, đặc biệt sau khi rửa tay hoặc tiếp xúc với nước.",
    colorFrom: "#8fa06a",
    colorTo: "#c7d3a8",
  },
  {
    id: "p10",
    slug: "dau-goi-phuc-hoi-bo-hat-mo",
    name: "Dầu Gội Phục Hồi Bơ Hạt Mỡ",
    category: "cham-soc-toc",
    scent: "Bơ hạt mỡ",
    volume: "300ml",
    price: 139000,
    rating: 4.5,
    reviewCount: 143,
    shortDescription: "Phục hồi tóc khô xơ, hư tổn.",
    description:
      "Công thức chứa bơ hạt mỡ giúp phục hồi mái tóc khô xơ, hư tổn, mang lại cảm giác mềm mượt sau mỗi lần gội.",
    highlights: ["Phục hồi tóc hư tổn", "Không chứa silicone", "An toàn khi dùng hằng ngày"],
    howToUse: "Làm ướt tóc, massage dầu gội lên da đầu, xả sạch với nước.",
    colorFrom: "#c7ab7a",
    colorTo: "#e8d5ac",
  },
  {
    id: "p11",
    slug: "dau-xa-oai-huong",
    name: "Dầu Xả Oải Hương Mềm Mượt",
    category: "cham-soc-toc",
    scent: "Oải hương",
    volume: "300ml",
    price: 139000,
    rating: 4.4,
    reviewCount: 76,
    shortDescription: "Mềm mượt tóc, hương oải hương thư giãn.",
    description:
      "Dầu xả giúp tóc mềm mượt, dễ chải, kết hợp hương oải hương mang lại cảm giác thư giãn khi sử dụng.",
    highlights: ["Giúp tóc mềm mượt", "Dễ chải, giảm gãy rụng", "Hương oải hương dịu nhẹ"],
    howToUse: "Dùng sau khi gội đầu, thoa đều lên tóc, để 1-2 phút rồi xả sạch.",
    colorFrom: "#7c6fb0",
    colorTo: "#b8aede",
  },
  {
    id: "p12",
    slug: "combo-qua-tang-oai-huong",
    name: "Combo Quà Tặng Oải Hương",
    category: "combo-qua-tang",
    scent: "Oải hương",
    volume: "3 sản phẩm",
    price: 249000,
    compareAtPrice: 307000,
    badge: "Tiết kiệm 19%",
    bestSeller: true,
    rating: 4.8,
    reviewCount: 121,
    shortDescription: "Sữa tắm, sữa dưỡng thể và xà phòng cùng hương oải hương.",
    description:
      "Bộ quà tặng đóng hộp sẵn gồm sữa tắm, sữa dưỡng thể và xà phòng bánh cùng hương oải hương, phù hợp làm quà tặng người thân, bạn bè.",
    highlights: ["Đóng hộp sẵn, sẵn sàng làm quà", "Tiết kiệm hơn mua lẻ", "Đồng bộ hương oải hương"],
    howToUse: "Sử dụng như các sản phẩm chăm sóc cá nhân thông thường.",
    colorFrom: "#7c6fb0",
    colorTo: "#b8aede",
    isCombo: true,
    comboIncludes: [
      "Sữa Tắm Hoa Oải Hương & Bơ Hạt Mỡ 250ml",
      "Sữa Dưỡng Thể Oải Hương 400ml",
      "Xà Phòng Cục Oải Hương 100g",
    ],
  },
  {
    id: "p13",
    slug: "combo-qua-tang-hoa-hong",
    name: "Combo Quà Tặng Hoa Hồng",
    category: "combo-qua-tang",
    scent: "Hoa hồng",
    volume: "3 sản phẩm",
    price: 259000,
    compareAtPrice: 327000,
    badge: "Tiết kiệm 21%",
    rating: 4.7,
    reviewCount: 94,
    shortDescription: "Trọn bộ chăm sóc da hương hoa hồng, sẵn sàng làm quà.",
    description:
      "Bộ quà tặng hương hoa hồng gồm sữa tắm, sữa dưỡng thể và xà phòng bánh, đóng hộp tinh tế, thích hợp làm quà tặng dịp lễ, sinh nhật.",
    highlights: ["Đóng hộp tinh tế", "Tiết kiệm hơn mua lẻ", "Đồng bộ hương hoa hồng"],
    howToUse: "Sử dụng như các sản phẩm chăm sóc cá nhân thông thường.",
    colorFrom: "#d98fa0",
    colorTo: "#f3c9d3",
    isCombo: true,
    comboIncludes: [
      "Sữa Dưỡng Thể Hoa Hồng 400ml",
      "Xà Phòng Cục Hoa Hồng 100g",
      "Kem Dưỡng Tay Hoa Hồng 50ml",
    ],
  },
  {
    id: "p14",
    slug: "sua-tam-mat-ong-sua",
    name: "Sữa Tắm Mật Ong & Sữa",
    category: "sua-tam",
    scent: "Mật ong & sữa",
    volume: "250ml",
    price: 129000,
    badge: "Mới",
    rating: 4.5,
    reviewCount: 67,
    shortDescription: "Làm sạch dịu nhẹ, nuôi dưỡng da mềm mại.",
    description:
      "Kết hợp mật ong và sữa, sản phẩm làm sạch nhẹ nhàng đồng thời nuôi dưỡng da mềm mại, phù hợp cho cả gia đình.",
    highlights: ["Chiết xuất mật ong và sữa", "Dịu nhẹ cho da nhạy cảm", "Hương thơm ấm áp"],
    howToUse: "Thoa lên da ướt, tạo bọt và massage nhẹ nhàng, xả sạch với nước.",
    colorFrom: "#e2a33a",
    colorTo: "#f3cf87",
  },
];

export function getProductBySlug(slug: string): HHProduct | undefined {
  return HH_PRODUCTS.find((p) => p.slug === slug);
}

export function getBestSellers(): HHProduct[] {
  return HH_PRODUCTS.filter((p) => p.bestSeller);
}

export function getCombos(): HHProduct[] {
  return HH_PRODUCTS.filter((p) => p.isCombo);
}

export function getProductsByCategory(category: HHCategorySlug): HHProduct[] {
  return HH_PRODUCTS.filter((p) => p.category === category);
}

export function getRelatedProducts(product: HHProduct, limit = 4): HHProduct[] {
  return HH_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.scent === product.scent)
  ).slice(0, limit);
}
