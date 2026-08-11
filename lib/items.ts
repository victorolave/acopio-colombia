import { normalize } from "./utils";

/**
 * Categorías de donación tal como las piensa una persona que quiere ayudar
 * ("tengo agua", "tengo cobijas"), no como las clasifica una bodega.
 *
 * Cada categoría trae las palabras clave con las que se compara contra
 * `accepted_items` de cada centro. La comparación es por subcadena normalizada.
 */
export type DonationCategory = {
  id: string;
  label: string;
  keywords: string[];
};

export const DONATION_CATEGORIES: DonationCategory[] = [
  { id: "agua", label: "Agua", keywords: ["agua"] },
  {
    id: "alimentos",
    label: "Alimentos",
    keywords: [
      "aliment",
      "arroz",
      "aceite",
      "pasta",
      "enlatad",
      "frijol",
      "lenteja",
      "garbanzo",
      "arveja",
      "harina",
      "panela",
      "leche",
      "chocolate",
      "avena",
      "frutos secos",
      "colada",
      "grano",
    ],
  },
  {
    id: "aseo",
    label: "Aseo e higiene",
    keywords: [
      "aseo",
      "higiene",
      "jabon",
      "shampoo",
      "champu",
      "dental",
      "papel higienico",
      "toallas higienicas",
      "toallitas",
      "limpieza",
    ],
  },
  { id: "ropa", label: "Ropa", keywords: ["ropa"] },
  {
    id: "medicamentos",
    label: "Medicamentos e insumos médicos",
    keywords: [
      "medicament",
      "insumo",
      "endovenoso",
      "endotraqueal",
      "laringea",
      "yelco",
      "succion",
      "jeringa",
      "aguja",
      "antisept",
      "curacion",
      "salud",
    ],
  },
  {
    id: "primeros-auxilios",
    label: "Primeros auxilios",
    keywords: ["primeros auxilios", "gasa", "alcohol", "clorhexidina", "tapabocas", "guantes"],
  },
  {
    id: "descanso",
    label: "Colchonetas y mantas",
    keywords: ["colchoneta", "manta", "cobija", "frazada", "almohada", "sabana", "toldillo", "carpa"],
  },
  {
    id: "bebes",
    label: "Artículos para bebés",
    keywords: ["bebe", "panal", "biberon", "antipanalitis"],
  },
  {
    id: "mascotas",
    label: "Alimento para mascotas",
    keywords: ["mascota", "perro", "gato", "animal"],
  },
  {
    id: "rescate",
    label: "Equipos de rescate",
    keywords: ["casco", "gafas", "guantes de construccion", "pala", "linterna", "bolsas resistentes", "generadora"],
  },
];

/** ¿Este centro recibe algo de la categoría indicada? */
export function centerAcceptsCategory(acceptedItems: string[], categoryId: string): boolean {
  const category = DONATION_CATEGORIES.find((c) => c.id === categoryId);
  if (!category) return false;
  const haystack = acceptedItems.map(normalize);
  return category.keywords.some((keyword) => haystack.some((item) => item.includes(keyword)));
}

export const CENTER_TYPE_LABELS: Record<string, string> = {
  general: "Ayuda general",
  food: "Alimentos",
  medical: "Insumos médicos",
  rescue_supplies: "Equipos de rescate",
  animal_aid: "Ayuda animal",
  mixed: "Mixto",
};
