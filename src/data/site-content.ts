/**
 * Static Vietnamese copy for the Hoàng Hà / Le Petit Marseillais Việt Nam
 * production UI. All copy here is original, written for this project — no
 * text was copied from Caudalie or from any live Le Petit Marseillais site.
 * Avoids medical/therapeutic claims; sticks to personal-care import-retail
 * language (nhập khẩu, chiết xuất thiên nhiên, dịu nhẹ, cấp ẩm, v.v.).
 */
import type { Metadata } from "next";

export const BRAND_NAME = "Hoàng Hà";
export const BRAND_FULL_NAME = "Hoàng Hà x Le Petit Marseillais Việt Nam";

export const HH_BASE_METADATA: Metadata = {
  title: {
    default: "Hoàng Hà — Le Petit Marseillais Việt Nam",
    template: "%s | Hoàng Hà — Le Petit Marseillais Việt Nam",
  },
  description:
    "Hoàng Hà phân phối chính hãng Le Petit Marseillais tại Việt Nam: sữa tắm, xà phòng, dưỡng thể nhập khẩu từ Pháp với chiết xuất thiên nhiên.",
  icons: {
    icon: "/hh/favicon.svg",
  },
};

export const NAV_ITEMS = [
  { label: "Trang chủ", href: "/" },
  { label: "Sản phẩm", href: "/san-pham" },
  { label: "Ưu đãi", href: "/uu-dai" },
  { label: "Tư vấn chọn mùi", href: "/tu-van-chon-san-pham" },
  { label: "Câu chuyện thương hiệu", href: "/cau-chuyen-thuong-hieu" },
];

export const PROMO_MESSAGES = [
  "Miễn phí vận chuyển cho đơn từ 399.000₫",
  "Sản phẩm nhập khẩu chính hãng từ Pháp",
  "Tích điểm thành viên — đổi ưu đãi mỗi tháng",
];

export const HERO_CAMPAIGN = {
  eyebrow: "Nhập khẩu chính hãng từ Pháp",
  heading: "Le Petit Marseillais — Chăm sóc cá nhân theo tinh thần Provence",
  body: "Hoàng Hà phân phối chính hãng Le Petit Marseillais tại Việt Nam: sữa tắm, xà phòng, dưỡng thể chiết xuất thiên nhiên, hương thơm nguyên bản từ Pháp.",
  primaryCta: { label: "Mua ngay", href: "/san-pham" },
  secondaryCta: { label: "Tư vấn chọn mùi", href: "/tu-van-chon-san-pham" },
};

export const MEMBERSHIP = {
  heading: "Câu Lạc Bộ Hoàng Hà",
  body: "Tích điểm mỗi đơn hàng, đổi ưu đãi hấp dẫn và nhận ưu tiên tiếp cận sản phẩm mới trước tiên.",
  perks: [
    { title: "Tích điểm mỗi đơn hàng", detail: "10.000₫ = 1 điểm, đổi ngay ưu đãi khi đủ mốc." },
    { title: "Quà sinh nhật", detail: "Nhận mã giảm giá đặc biệt trong tháng sinh nhật." },
    { title: "Ưu tiên hàng mới", detail: "Thông báo sớm và ưu tiên đặt trước sản phẩm mới về." },
  ],
  /** "action" (not a real href) — consumed by MembershipSection, which
   * opens the AuthOverlay's register view instead of navigating, since
   * this project keeps auth as an overlay rather than a dedicated route. */
  cta: { label: "Đăng ký thành viên", action: "register" as const },
};

export const OFFERS = [
  {
    id: "o1",
    heading: "Ưu đãi nhập khẩu Pháp",
    body: "Giảm 10% cho đơn hàng đầu tiên khi đăng ký thành viên Câu Lạc Bộ Hoàng Hà.",
    code: "HHMOI10",
    cta: "Nhận ưu đãi",
  },
  {
    id: "o2",
    heading: "Mua 2 tặng 1 dòng xà phòng bánh",
    body: "Áp dụng cho toàn bộ xà phòng bánh Le Petit Marseillais, số lượng có hạn.",
    code: "XAPHONG21",
    cta: "Mua ngay",
  },
  {
    id: "o3",
    heading: "Miễn phí vận chuyển toàn quốc",
    body: "Áp dụng cho đơn hàng từ 399.000₫, giao hàng toàn quốc trong 2-5 ngày.",
    cta: "Đặt hàng",
  },
  {
    id: "o4",
    heading: "Combo quà tặng tiết kiệm hơn 20%",
    body: "Chọn combo đóng hộp sẵn, tiết kiệm hơn so với mua lẻ từng sản phẩm.",
    cta: "Xem combo",
  },
];

export const SCENT_ADVISOR_QUESTIONS = [
  {
    id: "relax",
    scent: "Oải hương",
    title: "Muốn thư giãn cuối ngày",
    body: "Hương oải hương dịu nhẹ, phù hợp dùng buổi tối trước khi ngủ.",
    color: "#7c6fb0",
  },
  {
    id: "fresh",
    scent: "Hoa cam",
    title: "Thích cảm giác tươi mới",
    body: "Hương hoa cam tươi mát, lý tưởng để bắt đầu ngày mới.",
    color: "#e2a33a",
  },
  {
    id: "warm",
    scent: "Mật ong & sữa",
    title: "Yêu thích hương ấm áp, ngọt dịu",
    body: "Mật ong và sữa mang lại cảm giác ấm áp, nhẹ nhàng.",
    color: "#e2a33a",
  },
  {
    id: "sweet",
    scent: "Hoa hồng",
    title: "Yêu sự lãng mạn, nữ tính",
    body: "Hương hoa hồng nhẹ nhàng, tinh tế cho mọi khoảnh khắc.",
    color: "#d98fa0",
  },
  {
    id: "classic",
    scent: "Dầu ô liu",
    title: "Ưa chuộng công thức truyền thống",
    body: "Dầu ô liu nguyên chất theo công thức Marseille lâu đời.",
    color: "#8fa06a",
  },
  {
    id: "gentle",
    scent: "Hạnh nhân",
    title: "Cần chăm sóc dịu nhẹ cho da khô",
    body: "Sữa hạnh nhân giàu dưỡng chất, làm mềm da tức thì.",
    color: "#d9c39b",
  },
];

export const BRAND_STORY = {
  heading: "Le Petit Marseillais tại Việt Nam",
  intro:
    "Le Petit Marseillais mang tinh thần chăm sóc cá nhân vùng Provence, Pháp — nơi những công thức xà phòng, sữa tắm truyền thống được gìn giữ qua nhiều thế hệ. Hoàng Hà tự hào là đơn vị phân phối, đưa các sản phẩm này đến gần hơn với người tiêu dùng Việt Nam.",
  milestones: [
    {
      year: "Truyền thống",
      heading: "Khởi nguồn từ Marseille",
      body: "Công thức xà phòng bánh truyền thống của vùng Marseille, Pháp, được gìn giữ và phát triển qua nhiều thế hệ với thành phần từ dầu ô liu.",
    },
    {
      year: "Chiết xuất thiên nhiên",
      heading: "Nguyên liệu từ vùng Provence",
      body: "Oải hương, hoa cam, hoa hồng, hạnh nhân — những chiết xuất quen thuộc của vùng Provence được đưa vào từng dòng sản phẩm.",
    },
    {
      year: "Hoàng Hà tại Việt Nam",
      heading: "Đồng hành cùng người tiêu dùng Việt",
      body: "Hoàng Hà phân phối sản phẩm chính hãng, đảm bảo nguồn gốc rõ ràng và dịch vụ chăm sóc khách hàng tận tâm tại thị trường Việt Nam.",
    },
  ],
};

export const FOOTER_LINKS = {
  "Về Hoàng Hà": [
    { label: "Câu chuyện thương hiệu", href: "/cau-chuyen-thuong-hieu" },
    { label: "Ưu đãi", href: "/uu-dai" },
    { label: "Tư vấn chọn mùi", href: "/tu-van-chon-san-pham" },
  ],
  "Hỗ trợ khách hàng": [
    { label: "Câu hỏi thường gặp", href: "#" },
    { label: "Chính sách đổi trả", href: "#" },
    { label: "Chính sách vận chuyển", href: "#" },
    { label: "Liên hệ", href: "#" },
  ],
  "Tài khoản": [
    { label: "Đăng nhập", href: "#", action: "sign-in" as const },
    { label: "Đăng ký thành viên", href: "#", action: "register" as const },
    { label: "Câu Lạc Bộ Hoàng Hà", href: "/#hoi-vien" },
  ],
};

export const CONTACT_INFO = {
  hotline: "1900 0000",
  email: "cskh@hoangha.example.vn",
  address: "Việt Nam",
};

export const CART_SEED_ITEM = {
  slug: "sua-tam-hoa-oai-huong-bo-hat-mo",
  quantity: 1,
};

export const STICKY_MOBILE_CTA = {
  label: "Mua ngay",
  secondaryLabel: "Tư vấn chọn mùi",
};

/**
 * Below: additive copy blocks added for the homepage structural-alignment
 * pass (bringing src/app/page.tsx back in line with the original 13-file
 * Caudalie homepage clone's section order/patterns). Nothing above this
 * line was changed or removed.
 */

/** Second hero slide — HeroCampaign pairs this with HERO_CAMPAIGN to
 * reproduce the reference HeroBanner's 2-slide desktop/mobile-carousel
 * pattern (see src/components/HeroBanner.tsx). */
export const HERO_SECONDARY_SLIDE = {
  eyebrow: "Dịch vụ tư vấn miễn phí",
  heading: "Tìm hương thơm phù hợp với bạn",
  body: "Trả lời vài câu hỏi ngắn để Hoàng Hà gợi ý dòng sản phẩm và hương thơm phù hợp nhất với bạn.",
  cta: { label: "Tư vấn ngay", href: "/tu-van-chon-san-pham" },
};

/** Homepage highlight rail — structural analog of the reference
 * ExperienceCards.tsx ("The Caudalie Experience"). */
export const EXPERIENCE_HIGHLIGHTS = [
  {
    id: "nhap-khau",
    title: "Nhập khẩu chính hãng từ Pháp",
    description:
      "Sản phẩm Le Petit Marseillais nguyên bản, nguồn gốc rõ ràng, phân phối chính hãng bởi Hoàng Hà.",
    cta: "Mua ngay",
    href: "/san-pham",
    colorFrom: "#2f6b4f",
    colorTo: "#5c9b7c",
  },
  {
    id: "tu-van-mui-huong",
    title: "Tư vấn chọn mùi hương",
    description: "Trả lời vài câu hỏi ngắn để tìm ra hương thơm phù hợp nhất với bạn.",
    cta: "Tư vấn ngay",
    href: "/tu-van-chon-san-pham",
    colorFrom: "#7c6fb0",
    colorTo: "#b8aede",
  },
  {
    id: "tich-diem",
    title: "Tích điểm mỗi đơn hàng",
    description: "Tham gia Câu Lạc Bộ Hoàng Hà để tích điểm và đổi ưu đãi hấp dẫn.",
    cta: "Tham gia ngay",
    href: "/#hoi-vien",
    colorFrom: "#e2a33a",
    colorTo: "#f3cf87",
  },
  {
    id: "uu-dai-thanh-vien-moi",
    title: "Ưu đãi thành viên mới",
    description: "Giảm 10% cho đơn hàng đầu tiên khi đăng ký thành viên Câu Lạc Bộ Hoàng Hà.",
    cta: "Nhận ưu đãi",
    href: "/uu-dai",
    colorFrom: "#d98fa0",
    colorTo: "#f3c9d3",
  },
  {
    id: "giao-hang-toan-quoc",
    title: "Giao hàng toàn quốc",
    description: "Miễn phí vận chuyển cho đơn từ 399.000₫, giao nhanh toàn quốc.",
    cta: "Xem chính sách",
    href: "/uu-dai",
    colorFrom: "#cd6a3c",
    colorTo: "#e8ab84",
  },
];

/** Structural analog of the reference DiscoverCults.tsx (two-column: static
 * brand-promise text + CTA on one side, horizontal scroll of product art on
 * the other). */
export const FEATURED_COLLECTION = {
  eyebrow: "Khám phá bộ sưu tập",
  heading: "Chiết xuất thiên nhiên, công thức nguyên bản từ vùng Provence.",
  cta: { label: "Mua ngay", href: "/san-pham" },
};

/** Structural analog of the reference SkinAnalysisBanner.tsx, repointed at
 * the HH scent-advisor route instead of a skin-diagnosis tool. */
export const SCENT_ADVISOR_BANNER = {
  heading: "Tư vấn chọn mùi hương",
  body: "Trả lời vài câu hỏi ngắn, Hoàng Hà sẽ gợi ý dòng sản phẩm và hương thơm phù hợp nhất với bạn trong 30 giây.",
  cta: { label: "Bắt đầu tư vấn", href: "/tu-van-chon-san-pham" },
};

/** Structural analog of the reference BrandValues.tsx (header + CTA, 4-tile
 * alternating-background grid). */
export const BRAND_VALUES = [
  {
    id: "thien-nhien",
    title: "Chiết xuất thiên nhiên",
    description: "Thành phần chiết xuất tự nhiên từ vùng Provence, Pháp.",
  },
  {
    id: "diu-nhe",
    title: "Dịu nhẹ cho da",
    description: "Không chứa xà phòng gây khô da, phù hợp cả da nhạy cảm.",
  },
  {
    id: "chinh-hang",
    title: "Nhập khẩu chính hãng",
    description: "Phân phối chính hãng, nguồn gốc xuất xứ rõ ràng.",
  },
  {
    id: "bao-bi",
    title: "Bao bì thân thiện",
    description: "Hướng đến bao bì thân thiện với môi trường, giảm nhựa dùng một lần.",
  },
];

/** Structural analog of the reference InstagramFeed.tsx — static
 * placeholder tiles only, no real social embed/API. */
export const SOCIAL_PROOF = {
  heading: "Cộng đồng Hoàng Hà",
  cta: "Theo dõi cộng đồng",
};

/** Structural analog of the reference SeoTextBlock.tsx. */
export const SEO_INTRO = {
  heading: "Chăm sóc cá nhân thiên nhiên cho cả gia đình",
  paragraphs: [
    "Hoàng Hà tự hào là đơn vị phân phối chính hãng Le Petit Marseillais tại Việt Nam — thương hiệu chăm sóc cá nhân mang tinh thần vùng Provence, Pháp. Chúng tôi tin vào sức mạnh của thiên nhiên: những công thức sữa tắm, xà phòng bánh, dưỡng thể dịu nhẹ, chiết xuất từ hoa oải hương, hoa cam, hạnh nhân và dầu ô liu nguyên chất.",
    "Tất cả sản phẩm Le Petit Marseillais được nhập khẩu nguyên bản từ Pháp, giữ trọn công thức truyền thống vùng Marseille kết hợp cùng nguyên liệu thiên nhiên chọn lọc. Dù bạn tìm sữa tắm dưỡng ẩm, xà phòng bánh truyền thống hay kem dưỡng tay tiện lợi, Hoàng Hà luôn có sản phẩm phù hợp với nhu cầu của bạn.",
    "Với dịch vụ tư vấn chọn mùi hương miễn phí và chương trình thành viên Câu Lạc Bộ Hoàng Hà, chúng tôi mong muốn mang đến trải nghiệm mua sắm trọn vẹn, giúp bạn tìm ra sản phẩm và hương thơm yêu thích của riêng mình.",
  ],
  disclaimer: "Sản phẩm phân phối chính hãng, không phải hàng xách tay.",
};

/** Structural analog of the reference PermanentBenefits.tsx trust/benefit
 * icon band — distinct from MEMBERSHIP (the loyalty-program section). */
export const TRUST_BENEFITS = [
  { id: "free-ship", title: "Miễn phí vận chuyển", subtitle: "Cho đơn hàng từ 399.000₫" },
  { id: "loyalty", title: "Câu Lạc Bộ Hoàng Hà", subtitle: "Tích điểm đổi ưu đãi mỗi đơn hàng" },
  { id: "chinh-hang", title: "Cam kết chính hãng", subtitle: "100% nhập khẩu nguyên bản từ Pháp" },
  { id: "doi-tra", title: "Đổi trả dễ dàng", subtitle: "Trong vòng 7 ngày nếu lỗi từ nhà sản xuất" },
];

/** Footer newsletter/social block — structural analog of the reference
 * Footer.tsx "Let's be grape friends" 5th column. */
export const NEWSLETTER = {
  heading: "Kết nối với Hoàng Hà",
  placeholder: "Email của bạn...",
  cta: "Đăng ký",
  disclaimer: "Bằng việc đăng ký, bạn đồng ý nhận email ưu đãi và thông tin sản phẩm mới từ Hoàng Hà.",
};

/** No real social platform icons/assets are used — see SOCIAL_LINKS
 * consumers, which render a plain initial badge instead of a brand icon. */
export const SOCIAL_LINKS = [
  { label: "Facebook", href: "#" },
  { label: "Zalo", href: "#" },
  { label: "YouTube", href: "#" },
];

/** Footer bottom legal bar — structural analog of the reference Footer.tsx
 * legal-links row. */
export const LEGAL_LINKS = [
  { label: "Chính sách bảo mật", href: "#" },
  { label: "Điều khoản dịch vụ", href: "#" },
  { label: "Chính sách thành viên", href: "/#hoi-vien" },
];
