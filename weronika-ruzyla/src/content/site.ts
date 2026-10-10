/**
 * Data that does not change between languages.
 * Fill the TODO fields (address, social links, booking link) before going live.
 */
export const site = {
  name: "Weronika Rużyła",
  tagline: "Kosmetologia Estetyczna",
  phone: "+48 505 933 520",
  phoneHref: "tel:+48505933520",
  whatsappNumber: "48505933520",
  // TODO: replace with the real profiles
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/",
  // TODO: set a booking platform URL (e.g. Booksy). When empty, "Book now" opens WhatsApp.
  bookingUrl: "",
  // TODO: studio address. When empty, the address row and map link are hidden.
  address: "",
  url: "https://weronikaruzyla.pl",
  credit: { name: "Tomasino Denis", studio: "DNX Visuals" },
  brands: ["GF™", "FUSION MESO", "MedEstelle", "PRO XN", "Dermalux"],
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const bookingLink = (message: string) => site.bookingUrl || whatsappLink(message);

export const logo = { src: "/images/logo-wr.png", width: 341, height: 445 };

// before/after pairs, 525x700 each; captions live in the dictionaries (results.items, same order)
export const results = [
  { before: "/images/results/ba-1-before.jpg", after: "/images/results/ba-1-after.jpg" },
  { before: "/images/results/ba-2-before.jpg", after: "/images/results/ba-2-after.jpg" },
  { before: "/images/results/ba-3-before.jpg", after: "/images/results/ba-3-after.jpg" },
  { before: "/images/results/ba-4-before.jpg", after: "/images/results/ba-4-after.jpg" },
  { before: "/images/results/ba-5-before.jpg", after: "/images/results/ba-5-after.jpg" },
];

export const images = {
  hero: { src: "/images/hero.jpg", width: 1059, height: 1600 },
  portrait: { src: "/images/portrait.jpg", width: 1179, height: 1456 },
  portraitBw: { src: "/images/portrait-bw.jpg", width: 724, height: 844 },
  holidayVoucher: { src: "/images/holiday-voucher.jpg", width: 1157, height: 1600 },
  holidayBlack: { src: "/images/holiday-black.jpg", width: 1179, height: 1555 },
  voucherShelf: { src: "/images/voucher-shelf.jpg", width: 1348, height: 1502 },
  voucherEnvelope: { src: "/images/voucher-envelope.jpg", width: 1179, height: 1554 },
  medestelle: { src: "/images/medestelle.jpg", width: 1148, height: 1600 },
  proxn: { src: "/images/proxn.jpg", width: 1101, height: 1600 },
};

export const wordmark = { src: "/images/logo-name.png", width: 740, height: 320 };

// short muted loops of real treatments (480px wide, ~12s)
export const videos = [
  { src: "/videos/ritual-massage.mp4", webm: "/videos/ritual-massage.webm", poster: "/videos/ritual-massage.jpg" },
  { src: "/videos/facial-device.mp4", webm: "/videos/facial-device.webm", poster: "/videos/facial-device.jpg" },
  { src: "/videos/serum-proxn.mp4", webm: "/videos/serum-proxn.webm", poster: "/videos/serum-proxn.jpg" },
];
