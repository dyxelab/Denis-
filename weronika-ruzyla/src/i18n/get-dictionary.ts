import "server-only";
import type { Locale } from "./config";

const dictionaries = {
  pl: () => import("./dictionaries/pl").then((m) => m.default),
  en: () => import("./dictionaries/en").then((m) => m.default),
  it: () => import("./dictionaries/it").then((m) => m.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
