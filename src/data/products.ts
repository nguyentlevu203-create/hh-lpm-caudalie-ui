/**
 * Hoàng Hà / Le Petit Marseillais Việt Nam — Phase 2 demo catalogue.
 *
 * These 14 products are REAL: SKU, name, category, volume, description,
 * ingredients and usage instructions come directly from Hoàng Hà's own
 * source workbook (`data-source/hh_web_company.xlsx`, sheets
 * `01_Catalogue chuẩn` / `02_Content MKT`), selected and cross-checked in
 * `docs/production/HH_LPM_DEMO_DATA_AUDIT_REPORT.md`. Product photography
 * is the manually-matched Le Petit Marseillais France (EMEA) packshot for
 * the same scent/ingredient combination (see audit §5–§6) — a visual
 * reference aid, not confirmed to be the identical pack Hoàng Hà imports.
 *
 * `price`, `rating`, and `reviewCount` are the only fabricated fields —
 * neither source workbook contains price, barcode, stock, or review data
 * (audit §3/§8). Prices are illustrative placeholders only; see
 * `PRICE_DISCLAIMER` below, shown next to every price in the UI.
 */

export type HHCategorySlug =
  | "sua-tam"
  | "xa-phong-banh"
  | "duong-the"
  | "cham-soc-tay"
  | "cham-soc-toc"
  | "son-duong-moi"
  | "rua-tay";

export interface HHCategory {
  slug: HHCategorySlug;
  name: string;
  shortName: string;
  description: string;
}

export const HH_CATEGORIES: HHCategory[] = [
  {
    slug: "sua-tam",
    name: "Sữa tắm / Gel tắm",
    shortName: "Sữa tắm",
    description: "Sữa tắm, gel tắm chiết xuất thiên nhiên, hương thơm nhập khẩu từ Pháp.",
  },
  {
    slug: "xa-phong-banh",
    name: "Xà phòng bánh",
    shortName: "Xà phòng",
    description: "Xà phòng bánh truyền thống kiểu Marseille, dịu nhẹ cho da.",
  },
  {
    slug: "duong-the",
    name: "Sữa dưỡng thể",
    shortName: "Dưỡng thể",
    description: "Sữa dưỡng thể cấp ẩm, thẩm thấu nhanh, không nhờn rít.",
  },
  {
    slug: "cham-soc-tay",
    name: "Kem dưỡng tay",
    shortName: "Chăm sóc tay",
    description: "Kem dưỡng tay bỏ túi tiện lợi, làm mềm da tay khô ráp.",
  },
  {
    slug: "cham-soc-toc",
    name: "Dầu gội & Dầu xả",
    shortName: "Chăm sóc tóc",
    description: "Dầu gội, dầu xả phục hồi tóc chắc khỏe từ thiên nhiên.",
  },
  {
    slug: "son-duong-moi",
    name: "Son dưỡng môi",
    shortName: "Dưỡng môi",
    description: "Son dưỡng môi 3 trong 1, nuôi dưỡng và bảo vệ môi khô nứt nẻ.",
  },
  {
    slug: "rua-tay",
    name: "Gel rửa tay",
    shortName: "Rửa tay",
    description: "Gel rửa tay dịu nhẹ, làm sạch mà không gây khô da.",
  },
];

export interface HHProduct {
  id: string;
  sku: string;
  slug: string;
  name: string;
  category: HHCategorySlug;
  scent: string;
  volume: string;
  /** True when volume was blank in Hoàng Hà's own sheet and this is the
   * matched LPM France reference pack size instead (audit §6.4). */
  volumeIsReference?: boolean;
  price: number;
  compareAtPrice?: number;
  badge?: string;
  bestSeller?: boolean;
  rating: number;
  reviewCount: number;
  shortDescription: string;
  description: string;
  highlights: string[];
  ingredients: string;
  howToUse: string;
  /** Local path under /public to the matched LPM France packshot. */
  image: string;
  /** Set when the source sheet flagged a marketing claim needing RA/legal
   * sign-off before publishing (audit §7) — surfaced in QA tooling only,
   * never shown to shoppers as a customer-facing badge. */
  claimFlag?: string;
}

export const PRICE_DISCLAIMER =
  "Giá minh hoạ cho bản demo, chưa phải giá bán chính thức từ Hoàng Hà.";

export const HH_PRODUCTS: HHProduct[] = [
  {
    id: "st54463",
    sku: "ST54463",
    slug: "gel-tam-diu-nhe-muoi-bien",
    name: "Gel Tắm Pháp Le Petit Marseillais Dịu Nhẹ Muối Biển",
    category: "sua-tam",
    scent: "Dịu Nhẹ Muối Biển",
    volume: "250ml",
    price: 119000,
    rating: 4.6,
    reviewCount: 142,
    shortDescription:
      "Với chiết xuất từ muối biển Địa Trung Hải giàu khoáng chất, gel tắm dưỡng ẩm Le Petit Marseillais Muối Biển nhẹ nhàng làm sạch da, đồng thời cung cấp độ ẩm cần thiết, mang lại cảm giác tươi mát và sảng khoái suốt cả ngày.",
    description:
      "Muối biển được thu hoạch tự nhiên dọc theo bờ biển nước Pháp, mang đến nguồn khoáng chất tinh khiết và cảm giác tươi mát đầy sảng khoái. Sữa tắm Le Petit Marseillais chiết xuất muối biển giúp làm sạch nhẹ nhàng, thanh lọc làn da sau mỗi lần sử dụng. Công thức giàu dưỡng chất từ thiên nhiên (92% thành phần có nguồn gốc tự nhiên) giúp làm sạch nhẹ nhàng mà vẫn giữ được độ ẩm tự nhiên cho da, nuôi dưỡng làn da mềm mại, mịn màng.",
    highlights: [
      "92% thành phần có nguồn gốc tự nhiên",
      "Chiết xuất muối biển Địa Trung Hải giàu khoáng chất",
      "Bao bì có thể tái chế 100%",
    ],
    ingredients:
      "Nước (aqua), sodium laureth sunfat, cocamidopropyl betaine, glycerin, sodium chloride, muối biển (aqua maris), magnesium chloride, axit citric, sodium hydroxide, sodium benzoate, hương liệu (perfume), hexyl cinnamal, citronellol.",
    howToUse:
      "Lấy một lượng gel vừa đủ ra lòng bàn tay, tạo bọt trên da và massage nhẹ nhàng, sau đó rửa sạch với nước.",
    image: "/images/hh/products/st54463-muoi-bien.jpg",
  },
  {
    id: "st01868",
    sku: "ST01868",
    slug: "gel-tam-cam-huu-co-buoi-huu-co",
    name: "Gel Tắm Pháp Le Petit Marseillais Dịu Nhẹ Cam Hữu Cơ & Bưởi Hữu Cơ",
    category: "sua-tam",
    scent: "Dịu Nhẹ Cam Hữu Cơ & Bưởi Hữu Cơ",
    volume: "650ml",
    price: 179000,
    badge: "Bán chạy",
    bestSeller: true,
    rating: 4.7,
    reviewCount: 256,
    shortDescription:
      "Gel tắm Le Petit Marseillais kết hợp hương chanh vàng tươi mát với bưởi hồng Địa Trung Hải rạng rỡ, mang đến cảm giác sảng khoái, đánh thức mọi giác quan. Sản phẩm giúp làm sạch da, lưu lại hương thơm tươi mới cả ngày dài.",
    description:
      "Được tạo nên từ những quả cam hữu cơ hái bằng tay dưới ánh nắng rực rỡ của nước Ý và bưởi hữu cơ chín mọng từ đảo Corse, Gel Tắm Dịu Nhẹ Cam Hữu Cơ & Bưởi Hữu Cơ mang đến trải nghiệm làm sạch da tươi mát, tràn đầy năng lượng. Hương thơm sảng khoái, giàu vitamin từ phần thịt quả mọng nước giúp đánh thức mọi giác quan, cho bạn cảm giác thư giãn và tươi mới mỗi ngày. Công thức giàu dưỡng chất từ thiên nhiên (92%) giúp làm sạch nhẹ nhàng mà vẫn giữ được độ ẩm tự nhiên cho da.",
    highlights: [
      "Cam hữu cơ hái tay từ nước Ý, bưởi hữu cơ từ đảo Corse",
      "92% thành phần có nguồn gốc tự nhiên",
      "Hương thơm the mát, sảng khoái",
    ],
    ingredients:
      "Nước (Aqua), sodium laureth sunfat, cocamidopropyl betaine, glycerin, sodium chloride, chiết xuất cam ngọt (Citrus aurantium dulcis fruit extract), chiết xuất bưởi (Citrus paradisi fruit extract), axit citric, sodium hydroxide, potassium sorbate, sodium benzoate, hương liệu (perfume), limonene, linalool.",
    howToUse:
      "Lấy một lượng gel vừa đủ ra lòng bàn tay, tạo bọt trên da và massage nhẹ nhàng, sau đó rửa sạch với nước.",
    image: "/images/hh/products/st01868-cam-buoi.jpg",
  },
  {
    id: "st00809",
    sku: "ST00809",
    slug: "sua-tam-mo-huu-co-hat-phi-huu-co",
    name: "Sữa Tắm Pháp Le Petit Marseillais Dịu Nhẹ Chiết Xuất Mơ Hữu Cơ Và Hạt Phỉ Hữu Cơ",
    category: "sua-tam",
    scent: "Dịu Nhẹ Chiết Xuất Mơ Hữu Cơ Và Hạt Phỉ Hữu Cơ",
    volume: "650ml",
    badge: "Hữu cơ",
    price: 179000,
    rating: 4.6,
    reviewCount: 187,
    shortDescription:
      "Sữa Tắm Le Petit Marseillais Quả Mơ & Hạt Phỉ là sự kết hợp giữa hương thơm tươi mát của quả mơ chín mọng và nét béo ngậy, ấm áp từ hạt phỉ. Làm sạch da hiệu quả mà vẫn lưu giữ hương thơm dịu nhẹ suốt cả ngày.",
    description:
      "Được chiết xuất từ những quả mơ hữu cơ chín mọng dưới ánh nắng vùng Provence và hạt phỉ hữu cơ tuyển chọn từ vùng Auvergne, Sữa Tắm Dịu Nhẹ Mơ Hữu Cơ & Hạt Phỉ Hữu Cơ mang đến trải nghiệm làm sạch da nhẹ nhàng, nuôi dưỡng làn da mềm mại và tỏa hương thơm ngọt ngào, ấm áp. Công thức dịu nhẹ phù hợp cho mọi loại da (92% thành phần có nguồn gốc tự nhiên).",
    highlights: [
      "Mơ hữu cơ từ Provence, hạt phỉ hữu cơ từ Auvergne",
      "92% thành phần có nguồn gốc tự nhiên",
      "Phù hợp cho mọi loại da",
    ],
    ingredients:
      "Nước (Aqua), sodium laureth sunfat, cocamidopropyl betaine, glycerin, sodium chloride, chiết xuất quả mơ (Prunus armeniaca fruit extract), chiết xuất hạt phỉ (Corylus avellana seed extract), glycol distearate, hydroxypropyl methylcellulose, axit citric, sodium hydroxide, natri benzoate, hương liệu (perfume), hexy cinnamal, geraniol, limonene.",
    howToUse:
      "Lấy một lượng sữa tắm vừa đủ ra lòng bàn tay, tạo bọt trên da và massage nhẹ nhàng, sau đó rửa sạch với nước.",
    image: "/images/hh/products/st00809-mo-hat-phi.jpg",
  },
  {
    id: "st19308",
    sku: "ST19308",
    slug: "gel-tam-luu-huu-co",
    name: "Gel Tắm Pháp Le Petit Marseillais Dịu Nhẹ Lựu Hữu Cơ",
    category: "sua-tam",
    scent: "Dịu Nhẹ Lựu Hữu Cơ",
    volume: "250ml",
    badge: "Hữu cơ",
    price: 119000,
    rating: 4.5,
    reviewCount: 118,
    shortDescription:
      "Gel tắm hữu cơ Le Petit Marseillais hương lựu với chiết xuất từ những quả lựu đỏ căng mọng, nhẹ nhàng làm sạch và nuôi dưỡng làn da mềm mại. Hương thơm tươi mát mang đến cảm giác thư giãn và sảng khoái dài lâu.",
    description:
      "Dưới ánh nắng chan hòa của vùng Địa Trung Hải, những quả lựu hữu cơ được tuyển chọn và thu hoạch vào thời điểm chín mọng nhất, giữ trọn hương vị tươi mới và dưỡng chất thiên nhiên. Le Petit Marseillais đã chắt lọc tinh túy ấy để tạo nên dòng sữa tắm dịu nhẹ, giúp làm sạch và nuôi dưỡng làn da (92% thành phần có nguồn gốc tự nhiên).",
    highlights: [
      "Lựu hữu cơ Địa Trung Hải, thu hoạch chín mọng",
      "92% thành phần có nguồn gốc tự nhiên",
      "Hương thơm ngọt ngào, dịu nhẹ",
    ],
    ingredients:
      "Nước (aqua), sodium laureth sunfat, cocamidopropyl betaine, natri clorua, glycerin, chiết xuất lựu (punica granatum fruit extract), axit citric, natri hydroxide, kali sorbate, natri benzoate, hương liệu (fragrance), citronellol.",
    howToUse:
      "Lấy một lượng gel vừa đủ ra lòng bàn tay, tạo bọt trên da và massage nhẹ nhàng, sau đó rửa sạch với nước.",
    image: "/images/hh/products/st19308-luu.jpg",
  },
  {
    id: "st99493",
    sku: "ST99493",
    slug: "gel-tam-hoa-tiare",
    name: "Gel Tắm Pháp Le Petit Marseillais Dịu Nhẹ Hoa Tiaré",
    category: "sua-tam",
    scent: "Dịu Nhẹ Hoa Tiaré",
    volume: "250ml",
    price: 119000,
    rating: 4.6,
    reviewCount: 103,
    shortDescription:
      "Gel tắm Le Petit Marseillais Hoa Tiaré với chiết xuất từ những đóa hoa Tiaré tinh khiết giúp làm sạch da dịu nhẹ, nuôi dưỡng làn da mềm mại và lưu lại hương thơm quyến rũ như đang nghỉ dưỡng tại một bãi biển nhiệt đới.",
    description:
      "Hoa Tiaré được thu hoạch tại Polynésie thuộc Pháp, trên hòn đảo Tahiti — nơi thiên nhiên nhiệt đới rực rỡ hội tụ. Loài hoa biểu tượng này đã truyền cảm hứng để tạo nên hương thơm tươi sáng, quyến rũ và đầy sức sống cho dòng sữa tắm Le Petit Marseillais (92% thành phần có nguồn gốc tự nhiên).",
    highlights: [
      "Hoa Tiaré thu hoạch tại Tahiti, Polynésie thuộc Pháp",
      "92% thành phần có nguồn gốc tự nhiên",
      "Hương thơm ngọt ngào, quyến rũ",
    ],
    ingredients:
      "Nước (aqua), sodium laureth sunfat, cocamidopropyl betaine, glycerin, sodium chloride, chiết xuất hoa/lá/thân bạc hà (Mentha spicata flower/leaf/stem extract), axit citric, sodium hydroxide, kali sorbate, natri benzoate, hương liệu (fragrance), hexyl cinnamal.",
    howToUse:
      "Lấy một lượng gel vừa đủ ra lòng bàn tay, tạo bọt trên da và massage nhẹ nhàng, sau đó rửa sạch với nước.",
    image: "/images/hh/products/st99493-hoa-tiare.jpg",
  },
  {
    id: "dg74646",
    sku: "DG74646",
    slug: "dau-goi-tam-ma-chanh-huu-co",
    name: "Dầu Gội Pháp Le Petit Marseillais Ngăn Ngừa Gàu Chiết Xuất Tầm Ma & Chanh Hữu Cơ",
    category: "cham-soc-toc",
    scent: "Ngăn Ngừa Gàu Chiết Xuất Tầm Ma & Chanh Hữu Cơ",
    volume: "300ml",
    volumeIsReference: true,
    badge: "Hữu cơ",
    price: 139000,
    rating: 4.5,
    reviewCount: 96,
    shortDescription:
      "Le Petit Marseillais mang đến giải pháp chăm sóc tóc từ thiên nhiên với sự kết hợp giữa cây tầm ma và chanh. Công thức dồi dào dưỡng chất và vitamin giúp làm sạch da đầu, ngăn ngừa gàu ngứa hiệu quả.",
    description:
      "Tóc thường có xu hướng nhanh bết dầu và thiếu đi sự tươi mới, nhẹ nhàng? Dầu Gội Ngăn Ngừa Gàu Chiết Xuất Tầm Ma & Chanh Hữu Cơ giúp làm sạch sâu, loại bỏ tạp chất trên da đầu, mang lại cảm giác thông thoáng và dễ chịu. Độ pH tối ưu bảo vệ sợi tóc và da đầu; công thức không chứa silicon giúp giảm nguy cơ bít tắc da đầu.",
    highlights: [
      "Lá tầm ma hữu cơ: thanh lọc và giảm bã nhờn",
      "Chanh hữu cơ giàu vitamin, tươi mát",
      "Không chứa silicon",
    ],
    ingredients:
      "Nước (aqua), ammonium lauryl sunfat, glycerin, cocamidopropyl betaine, natri clorua, axit citric, hương liệu (parfum), natri benzoate, coco-glucoside, glyceryl oleate, hydroxypropyl guar hydroxypropyltrimonium chloride, kẽm PCA, limonene, linalool, chiết xuất tầm ma (urtica dioica extract), dầu vỏ chanh (citrus limon peel oil), tocopherol, kali sorbate.",
    howToUse:
      "Làm ướt tóc, lấy một lượng dầu gội vừa đủ vào lòng bàn tay, thoa đều và massage nhẹ nhàng lên tóc và da đầu, xả sạch với nước.",
    image: "/images/hh/products/dg74646-tam-ma-chanh.jpg",
  },
  {
    id: "dg01841",
    sku: "DG01841",
    slug: "dau-goi-hanh-nhan-hat-lanh-huu-co",
    name: "Dầu Gội Pháp Le Petit Marseillais Vào Nếp Suôn Mượt Chiết Xuất Hạnh Nhân Và Hạt Lanh Hữu Cơ",
    category: "cham-soc-toc",
    scent: "Vào Nếp Suôn Mượt Chiết Xuất Hạnh Nhân Và Hạt Lanh Hữu Cơ",
    volume: "300ml",
    badge: "Bán chạy",
    bestSeller: true,
    price: 139000,
    rating: 4.6,
    reviewCount: 174,
    shortDescription:
      "Le Petit Marseillais Hạt Lanh & Hoa Hạnh Nhân Dầu Gội Vào Nếp Suôn Mượt giúp bạn sở hữu mái tóc suôn mượt, vào nếp và tràn đầy sức sống, nuôi dưỡng và phục hồi tóc hư tổn từ sâu bên trong.",
    description:
      "Dầu gội Le Petit Marseillais được chiết xuất từ Hạnh Nhân Hữu Cơ và Hạt Lanh Hữu Cơ — những thành phần tự nhiên cao cấp, giúp cấp ẩm hoàn hảo và bảo vệ tóc từ gốc đến ngọn. Công thức đặc biệt giúp tóc mềm mại, nhẹ nhàng, mang lại độ linh hoạt và bóng mượt tự nhiên. Với độ pH tối ưu, sản phẩm an toàn cho da đầu và phù hợp với mọi loại tóc, đặc biệt là tóc dài dễ hư tổn.",
    highlights: [
      "Hạnh nhân hữu cơ: sữa thực vật mịn màng, tóc mềm mại khỏe mạnh",
      "Hạt lanh hữu cơ thu hoạch tại Pháp: bóng mượt tự nhiên",
      "Không chứa silicon",
    ],
    ingredients:
      "Nước (aqua), ammonium lauryl sunfat, cocamidopropyl betaine, glycerin, natri clorua, hương liệu (parfum), natri benzoate, carbomer, polyquaternium-10, glycol distearate, starch hydroxypropyltrimonium chloride, natri hydroxit, axit citric, sodium lactate, axit lactic, urea, limonene, benzaldehyde, chiết xuất quả hạnh nhân ngọt, chiết xuất hạt lanh, xanthan gum, kali sorbate.",
    howToUse:
      "Làm ướt tóc, lấy một lượng dầu gội vừa đủ vào lòng bàn tay, thoa đều và massage nhẹ nhàng lên tóc và da đầu, xả sạch với nước.",
    image: "/images/hh/products/dg01841-hanh-nhan-hat-lanh.jpg",
    claimFlag: "phục hồi/tái tạo — cần kiểm tra hồ sơ công bố/chứng từ trước khi dùng rộng rãi",
  },
  {
    id: "dx61916",
    sku: "DX61916",
    slug: "dau-xa-hanh-nhan-hat-lanh-huu-co",
    name: "Dầu Xả Dưỡng Tóc Le Petit Marseillais Làm Mềm Mượt, Bóng Khỏe Nhanh Từ Hạnh Nhân Và Hạt Lanh Hữu Cơ",
    category: "cham-soc-toc",
    scent: "Làm Mềm Mượt, Bóng Khỏe Nhanh Từ Hạnh Nhân Và Hạt Lanh Hữu Cơ",
    volume: "200ml",
    badge: "Hữu cơ",
    price: 139000,
    rating: 4.5,
    reviewCount: 88,
    shortDescription:
      "Chăm sóc mái tóc thiếu mềm mại và thường bị khô xơ ở phần ngọn chưa bao giờ dễ dàng đến thế. Công thức dịu nhẹ và hiệu quả cao giúp cấp ẩm, gỡ rối tức thì và bảo vệ toàn bộ chiều dài tóc — từ chân đến ngọn.",
    description:
      "Chiết xuất từ hạnh nhân ngọt — loại hạt giàu dưỡng chất tạo nên lớp sữa thực vật mịn màng — và hạt lanh hữu cơ được thu hoạch tại Pháp vào mùa hè, dầu xả mang lại cho mái tóc vẻ mềm mại, nhẹ nhàng, dẻo dai và sáng bóng rạng rỡ. Phù hợp cho tóc dài có ngọn khô xơ. Tỷ lệ thành phần: 95% có nguồn gốc từ thiên nhiên.",
    highlights: [
      "95% thành phần có nguồn gốc từ thiên nhiên",
      "Gỡ rối tức thì, không làm nặng tóc",
      "Ghép cặp cùng dòng với Dầu Gội Hạnh Nhân & Hạt Lanh Hữu Cơ",
    ],
    ingredients:
      "Aqua, cetearyl alcohol, glycerin, behentrimonium chloride, oleic/linoleic/linolenic polyglycerides, ceteareth-20, citric acid, parfum, sodium benzoate, isopropyl alcohol, limonene, benzaldehyde, prunus amygdalus dulcis (sweet almond) fruit extract, linum usitatissimum seed extract, xanthan gum, potassium sorbate.",
    howToUse:
      "Thoa một lượng nhỏ lên toàn bộ mái tóc đã gội sạch, để yên trong 1 phút rồi xả sạch với nước.",
    image: "/images/hh/products/dx61916-dau-xa-hanh-nhan-hat-lanh.jpg",
    claimFlag: "phục hồi/tái tạo — cần kiểm tra hồ sơ công bố/chứng từ trước khi dùng rộng rãi",
  },
  {
    id: "dt83916",
    sku: "DT83916",
    slug: "sua-duong-the-bo-hat-mo-hanh-nhan-argan",
    name: "Sữa Dưỡng Thể Pháp Le Petit Marseillais Dưỡng Ẩm Bơ Hạt Mỡ, Hạnh Nhân & Argan",
    category: "duong-the",
    scent: "Dưỡng Ẩm Bơ Hạt Mỡ, Hạnh Nhân & Argan",
    volume: "400ml",
    badge: "Bán chạy",
    bestSeller: true,
    price: 159000,
    rating: 4.7,
    reviewCount: 203,
    shortDescription:
      "Le Petit Marseillais mang đến công thức dưỡng ẩm kết hợp hài hòa ba dưỡng chất từ thiên nhiên: bơ hạt mỡ, hạnh nhân và dầu argan. Da luôn mềm mại, mịn màng và được nuôi dưỡng suốt 24 giờ.",
    description:
      "Dành riêng cho da rất khô, Le Petit Marseillais kết hợp ba thành phần dưỡng chất nổi bật: bơ hạt mỡ giúp dưỡng ẩm sâu, hạnh nhân làm mềm và dịu da, dầu argan bảo vệ và phục hồi làn da khô ráp. Kết cấu mềm mịn, thẩm thấu nhanh mà không gây bết dính. Đã được kiểm nghiệm da liễu.",
    highlights: [
      "Bơ hạt mỡ, hạnh nhân ngọt và dầu argan",
      "Đã được kiểm nghiệm da liễu",
      "Thẩm thấu nhanh, không gây nhờn dính",
    ],
    ingredients:
      "Nước (aqua), dầu khoáng (paraffinum liquidum), glycerin, bơ hạt mỡ (butyrospermum parkii butter), dầu hạnh nhân (prunus amygdalus dulcis oil), dầu hạt argan (argania spinosa kernel oil), glyceride dầu cọ hydro hóa, caprylyl glycol, carbomer, potassium cetyl phosphate, axit p-anisic, natri hydroxide, phenoxyethanol, hương liệu (parfum).",
    howToUse:
      "Thoa đều lên da, massage nhẹ nhàng cho đến khi thấm hết. Sử dụng hàng ngày để đạt hiệu quả tốt nhất.",
    image: "/images/hh/products/dt83916-bo-hat-mo-hanh-nhan-argan.jpg",
    claimFlag: "phục hồi/tái tạo — cần kiểm tra hồ sơ công bố/chứng từ trước khi dùng rộng rãi",
  },
  {
    id: "kt18485",
    sku: "KT18485",
    slug: "kem-duong-tay-bo-hat-mo-hanh-nhan-argan",
    name: "Kem Dưỡng Tay Pháp Le Petit Marseillais Bơ Hạt Mỡ, Hạnh Nhân & Dầu Argan",
    category: "cham-soc-tay",
    scent: "Bơ Hạt Mỡ, Hạnh Nhân & Dầu Argan",
    volume: "75ml",
    volumeIsReference: true,
    price: 79000,
    rating: 4.5,
    reviewCount: 91,
    shortDescription:
      "Le Petit Marseillais Bơ Hạt Mỡ, Hạnh Nhân & Dầu Argan Kem Dưỡng Tay là bí quyết cho đôi tay mềm mại, mịn màng. Công thức từ ba loại dầu quý giá giúp nuôi dưỡng chuyên sâu, cho đôi tay luôn mềm mại suốt cả ngày.",
    description:
      "Công thức đặc biệt từ ba loại dầu quý giá giúp nuôi dưỡng chuyên sâu, cho đôi tay luôn mềm mại, mịn màng suốt cả ngày: dưỡng ẩm sâu cho da tay khô ráp, nứt nẻ; làm dịu các kích ứng, mẩn đỏ; kết cấu kem mềm mịn, thẩm thấu nhanh, không gây bết dính.",
    highlights: [
      "Bơ hạt mỡ: dưỡng ẩm sâu, làm mềm da",
      "Dầu hạnh nhân: vitamin E và chất chống oxy hóa",
      "Dầu argan: giúp da sáng khỏe, đàn hồi",
    ],
    ingredients:
      "Nước (aqua), paraffinum liquidum, glycerin, stearyl alcohol, glyceryl stearate SE, bơ hạt mỡ (butyrospermum parkii butter), dầu hạnh nhân ngọt (prunus amygdalus dulcis oil), dầu argan (argania spinosa kernel oil), caprylyl glycol, p-anisic acid, carbomer, sodium polyacrylate, hydrogenated palm glycerides, potassium cetyl phosphate, natri hydroxit, chlorphenesin, hương liệu (parfum).",
    howToUse:
      "Lấy một lượng kem vừa đủ thoa đều lên tay, massage nhẹ nhàng cho đến khi thấm hết. Có thể dùng nhiều lần trong ngày.",
    image: "/images/hh/products/kt18485-kem-tay-bo-hat-mo-hanh-nhan-argan.jpg",
    claimFlag: "phục hồi/tái tạo, chống lão hóa — claim rủi ro cao nhất trong danh sách, cần bỏ hoặc xác minh trước khi dùng",
  },
  {
    id: "xp80996",
    sku: "XP80996",
    slug: "xa-phong-banh-hanh-nhan-ngot",
    name: "Hộp 2 Bánh Xà Phòng Tắm Le Petit Marseillais Dầu Hạnh Nhân Ngọt",
    category: "xa-phong-banh",
    scent: "Dầu Hạnh Nhân Ngọt",
    volume: "2 x 100g",
    badge: "Bán chạy",
    bestSeller: true,
    price: 69000,
    rating: 4.8,
    reviewCount: 231,
    shortDescription:
      "Hạnh nhân ngọt — món quà từ thiên nhiên miền nam nước Pháp. Những quả hạnh được thu hoạch vào cuối mùa hè và ép lạnh để chiết xuất ra loại dầu hạnh nhân ngọt giàu dưỡng chất, nổi tiếng với khả năng làm mềm và dưỡng ẩm cho da.",
    description:
      "Kế thừa bí quyết chăm sóc da truyền thống từ năm 1984, Le Petit Marseillais mang đến bánh xà phòng Soin Surgras — kết tinh giữa công thức cổ điển và các thành phần tự nhiên dịu nhẹ, dành cho cả cơ thể và đôi tay của mọi thành viên trong gia đình. Được sản xuất bằng phương pháp xà phòng hóa từ các loại dầu thực vật, bổ sung glycerin và tinh dầu hạnh nhân ngọt. 98% thành phần có nguồn gốc tự nhiên, phù hợp cho cả gia đình (trẻ em trên 3 tuổi), bao bì giấy chứng nhận FSC.",
    highlights: [
      "98% thành phần có nguồn gốc tự nhiên",
      "Thời gian sử dụng gấp 10 lần sữa tắm 250ml",
      "Bao bì giấy được chứng nhận FSC",
    ],
    ingredients:
      "Sodium Palmate, Sodium Palm Kernelate, Aqua, Glycerin, Prunus Amygdalus Dulcis Oil, Palm Kernel Acid, Sodium Chloride, Tetrasodium EDTA, Tetrasodium Etidronate, Parfum, Alpha-Isomethyl Ionone, Eugenol, Linalool, CI 77891, CI 77492, CI 77491.",
    howToUse: "Làm ướt bánh xà phòng, tạo bọt trực tiếp trên da hoặc dùng bông tắm, xả sạch với nước.",
    image: "/images/hh/products/xp80996-xa-phong-hanh-nhan.jpg",
  },
  {
    id: "sd72373",
    sku: "SD72373",
    slug: "son-duong-moi-3-trong-1-bo-hat-mo-dau-bo",
    name: "Son Dưỡng Môi 3 Trong 1 Le Petit Marseillais Với Bơ Hạt Mỡ Và Dầu Bơ",
    category: "son-duong-moi",
    scent: "Với Bơ Hạt Mỡ Và Dầu Bơ",
    volume: "4.9g",
    price: 49000,
    rating: 4.4,
    reviewCount: 52,
    // Hoàng Hà's own sheet has no description/ingredients for this SKU
    // (flagged "Cao" severity in 04_QA thiếu dữ liệu — audit §6.4/§9 row 12).
    // Copy below is sourced from the matched LPM France reference product
    // instead, per the audit's documented fallback policy (§3).
    shortDescription:
      "Môi khô và căng cần được chăm sóc đúng cách để được nuôi dưỡng sâu. Công thức với 94% thành phần tự nhiên từ bơ hạt mỡ, tác dụng 3 trong 1: nuôi dưỡng, phục hồi và bảo vệ đôi môi khô và nứt nẻ. (Mô tả tham khảo từ sản phẩm LPM Pháp đã khớp ảnh — Hoàng Hà chưa có mô tả riêng cho SKU này.)",
    description:
      "Bơ hạt mỡ nổi tiếng với công dụng dưỡng ẩm. Ngày qua ngày, son dưỡng phục hồi và cải thiện độ ẩm cho đôi môi, làm dịu cảm giác căng khô và mang lại sự thoải mái. 94% thành phần có nguồn gốc tự nhiên.",
    highlights: ["94% thành phần có nguồn gốc tự nhiên", "Công thức 3 trong 1: nuôi dưỡng, phục hồi, bảo vệ"],
    ingredients:
      "Caprylic/Capric Triglyceride, Bơ Butyrospermum Parkii, Sáp ong tổng hợp, Dầu Olus, Glyceryl Behenate, Dầu thực vật hydro hóa, Sáp Copernicia Cerifera, Tocopheryl Acetate, Sáp Candelilla, Vanillin, Dầu Persea Gratissima.",
    howToUse: "Thoa một hoặc nhiều lớp son dưỡng 3 trong 1 lên môi.",
    image: "/images/hh/products/sd72373-son-duong-3in1.jpg",
  },
  {
    id: "nr50699",
    sku: "NR50699",
    slug: "gel-rua-tay-pure-soap",
    name: "Gel Rửa Tay Le Petit Marseillais Với Xà Phòng Nguyên Chất",
    category: "rua-tay",
    scent: "Với Xà Phòng Nguyên Chất",
    volume: "500ml",
    price: 99000,
    rating: 4.5,
    reviewCount: 74,
    shortDescription:
      "Gel rửa tay Le Petit Marseillais với xà phòng nguyên chất giúp làm sạch dịu nhẹ và chăm sóc đôi tay mỗi ngày. Công thức chứa xà phòng tinh khiết từ dầu thực vật tự nhiên, nhẹ nhàng loại bỏ bụi bẩn mà không làm khô da.",
    description:
      "Hương thơm cổ điển, dễ chịu kết hợp cùng lớp bọt mịn mang lại cảm giác sạch sẽ và thư giãn sau mỗi lần sử dụng. Bao bì hoàn toàn có thể tái chế, thân thiện với môi trường. 92% thành phần có nguồn gốc tự nhiên.",
    highlights: ["92% thành phần có nguồn gốc tự nhiên", "Bao bì hoàn toàn có thể tái chế"],
    ingredients:
      "Aqua, sodium laureth sulfate, cocamidopropyl betaine, glycerin, sodium chloride, parfum, citric acid, sodium benzoate, potassium cocoate, limonene, linalool, sodium hydroxide, alpha-isomethyl ionone, potassium olivate, cocos nucifera oil, CI 47005, tocopherol, olea europaea fruit oil.",
    howToUse: "Lấy một lượng nhỏ sản phẩm ra tay ướt, chà xát trong một phút, rửa sạch lại với nước.",
    image: "/images/hh/products/nr50699-gel-rua-tay-pure-soap.jpg",
  },
  {
    id: "nr50729",
    sku: "NR50729",
    slug: "gel-rua-tay-dao-trang-xuan-dao",
    name: "Gel Rửa Tay Le Petit Marseillais Với Chiết Xuất Đào Trắng Và Xuân Đào",
    category: "rua-tay",
    scent: "Với Chiết Xuất Đào Trắng Và Xuân Đào",
    volume: "500ml",
    badge: "Hữu cơ",
    price: 99000,
    rating: 4.6,
    reviewCount: 81,
    shortDescription:
      "Gel Rửa Tay Le Petit Marseillais Với Chiết Xuất Đào Trắng Và Xuân Đào — sự lựa chọn cho đôi tay mềm mại và thơm ngát. Công thức dịu nhẹ, giàu thành phần thiên nhiên và hương thơm trái cây tươi mát.",
    description:
      "Chiết xuất đào trắng hữu cơ & xuân đào chín mọng từ miền Nam nước Pháp mang đến trải nghiệm rửa tay thư giãn, trong khi kết cấu tạo bọt mềm mịn giúp làm sạch nhẹ nhàng mà không gây khô da. Bao bì hoàn toàn có thể tái chế. 92% thành phần có nguồn gốc tự nhiên.",
    highlights: ["Đào trắng hữu cơ & xuân đào từ miền Nam nước Pháp", "92% thành phần có nguồn gốc tự nhiên"],
    ingredients:
      "Aqua, sodium laureth sulfate, cocamidopropyl betaine, glycerin, sodium chloride, prunus amygdalus dulcis fruit extract, prunus persica nectarina fruit extract, sodium hydroxide, citric acid, sodium benzoate, potassium sorbate, parfum, limonene.",
    howToUse: "Lấy một lượng nhỏ sản phẩm ra tay ướt, chà xát trong một phút, rửa sạch lại với nước.",
    image: "/images/hh/products/nr50729-gel-rua-tay-dao-xuan-dao.jpg",
  },
];

export function getProductBySlug(slug: string): HHProduct | undefined {
  return HH_PRODUCTS.find((p) => p.slug === slug);
}

export function getBestSellers(): HHProduct[] {
  return HH_PRODUCTS.filter((p) => p.bestSeller);
}

export function getProductsByCategory(category: HHCategorySlug): HHProduct[] {
  return HH_PRODUCTS.filter((p) => p.category === category);
}

export function getRelatedProducts(product: HHProduct, limit = 4): HHProduct[] {
  return HH_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.scent === product.scent)
  ).slice(0, limit);
}
