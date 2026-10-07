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
  brands: ["GF™", "FUSION MESO", "MedEstelle", "Dermalux"],
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const bookingLink = (message: string) => site.bookingUrl || whatsappLink(message);

export const images = {
  hero: { src: "/images/hero.jpg", width: 942, height: 1451 },
  voucherGift: { src: "/images/gallery-voucher-gift.jpg", width: 538, height: 649 },
  portrait: { src: "/images/gallery-portrait.jpg", width: 374, height: 649 },
  voucher: { src: "/images/gallery-voucher.jpg", width: 538, height: 641 },
  product: { src: "/images/gallery-product.jpg", width: 315, height: 641 },
  facial: { src: "/images/treatment-facial.jpg", width: 580, height: 562 },
  hands: { src: "/images/treatment-hands.jpg", width: 485, height: 773 },
};
