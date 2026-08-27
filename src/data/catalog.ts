import type { Category, Product, Service } from "@/lib/types";

import catLiving from "@/assets/categories/cat-living-room.jpg";
import catBedroom from "@/assets/categories/cat-bedroom.jpg";
import catDining from "@/assets/categories/cat-dining.jpg";
import catKitchen from "@/assets/categories/cat-modular-kitchen.jpg";
import catWardrobe from "@/assets/categories/cat-wardrobes.jpg";
import catOffice from "@/assets/categories/cat-office.jpg";
import catCustom from "@/assets/categories/cat-custom.jpg";
import catInterior from "@/assets/categories/cat-interior.jpg";

import svcManufacturing from "@/assets/services/svc-furniture-manufacturing.jpg";
import svcKitchen from "@/assets/services/svc-modular-kitchen.jpg";
import svcPop from "@/assets/services/svc-pop-work.jpg";
import svcPaint from "@/assets/services/svc-painting.jpg";
import svcFloor from "@/assets/services/svc-wooden-flooring.jpg";
import svcVertical from "@/assets/services/svc-vertical-blinds.jpg";
import svcVentilation from "@/assets/services/svc-ventilation-blinds.jpg";
import svcCivil from "@/assets/services/svc-civil-work.jpg";
import svcElectrical from "@/assets/services/svc-electrical-work.jpg";

import ksL from "@/assets/kitchen/ks-l-shape.jpg";
import ksU from "@/assets/kitchen/ks-u-shape.jpg";
import ksParallel from "@/assets/kitchen/ks-parallel.jpg";
import ksStraight from "@/assets/kitchen/ks-straight.jpg";
import ksIsland from "@/assets/kitchen/ks-island.jpg";
import ksPeninsula from "@/assets/kitchen/ks-peninsula.jpg";

import int01 from "@/assets/interior/int-01.jpg";
import int02 from "@/assets/interior/int-02.jpg";
import int03 from "@/assets/interior/int-03.jpg";
import int04 from "@/assets/interior/int-04.jpg";
import int05 from "@/assets/interior/int-05.jpg";
import int06 from "@/assets/interior/int-06.jpg";
import int07 from "@/assets/interior/int-07.jpg";

import p01 from "@/assets/products/p01.jpg";
import p02 from "@/assets/products/p02.jpg";
import p03 from "@/assets/products/p03.jpg";
import p04 from "@/assets/products/p04.jpg";
import p05 from "@/assets/products/p05.jpg";
import p06 from "@/assets/products/p06.jpg";
import p07 from "@/assets/products/p07.jpg";
import p08 from "@/assets/products/p08.jpg";
import p09 from "@/assets/products/p09.jpg";
import p10 from "@/assets/products/p10.jpg";
import p11 from "@/assets/products/p11.jpg";
import p12 from "@/assets/products/p12.jpg";
import p13 from "@/assets/products/p13.jpg";
import p14 from "@/assets/products/p14.jpg";
import p15 from "@/assets/products/p15.jpg";
import p16 from "@/assets/products/p16.jpg";
import p17 from "@/assets/products/p17.jpg";
import p18 from "@/assets/products/p18.jpg";
import p19 from "@/assets/products/p19.jpg";
import p20 from "@/assets/products/p20.jpg";
import p21 from "@/assets/products/p21.jpg";
import p22 from "@/assets/products/p22.jpg";
import p23 from "@/assets/products/p23.jpg";
import p24 from "@/assets/products/p24.jpg";
import p25 from "@/assets/products/p25.jpg";
import p26 from "@/assets/products/p26.jpg";
import p27 from "@/assets/products/p27.jpg";
import p28 from "@/assets/products/p28.jpg";
import p29 from "@/assets/products/p29.jpg";
import p30 from "@/assets/products/p30.jpg";
import p31 from "@/assets/products/p31.jpg";
import p32 from "@/assets/products/p32.jpg";
import p33 from "@/assets/products/p33.jpg";
import p34 from "@/assets/products/p34.jpg";
import p35 from "@/assets/products/p35.jpg";
import p36 from "@/assets/products/p36.jpg";
import p37 from "@/assets/products/p37.jpg";
import p38 from "@/assets/products/p38.jpg";
import p39 from "@/assets/products/p39.jpg";
import p40 from "@/assets/products/p40.jpg";
import p41 from "@/assets/products/p41.jpg";
import p42 from "@/assets/products/p42.jpg";
import p43 from "@/assets/products/p43.jpg";

export const categories: Category[] = [
  {
    slug: "living-room",
    name: "Living Room",
    blurb: "Sofas, tables and media units that anchor the heart of your home.",
    image: catLiving,
  },
  {
    slug: "bedroom",
    name: "Bedroom",
    blurb: "Beds, storage and seating built for calm, restful rooms.",
    image: catBedroom,
  },
  {
    slug: "dining",
    name: "Dining",
    blurb: "Tables, chairs and crockery units made for long meals.",
    image: catDining,
  },
  {
    slug: "modular-kitchen",
    name: "Modular Kitchen",
    blurb: "Precision cabinetry, tall units and hardware that lasts.",
    image: catKitchen,
  },
  {
    slug: "wardrobes",
    name: "Wardrobes",
    blurb: "Sliding, hinged and walk-in systems tailored to your space.",
    image: catWardrobe,
  },
  {
    slug: "office",
    name: "Office",
    blurb: "Desks, workstations and storage for focused workspaces.",
    image: catOffice,
  },
  {
    slug: "custom",
    name: "Custom Furniture",
    blurb: "One-off pieces designed and built around your brief.",
    image: catCustom,
  },
];

export const interiorCategoryImage = catInterior;

interface Seed {
  id: string;
  name: string;
  category: Product["category"];
  price: number;
  mrp: number;
  material: string;
  finish: string;
  dimensions: string;
  description: string;
  image: string;
  badge?: Product["badge"];
}

const seeds: Seed[] = [
  { id: "p01", name: "Marlowe 3-Seater Sofa", category: "living-room", price: 84900, mrp: 99900, material: "Solid teak frame", finish: "Sand linen upholstery", dimensions: "84 x 36 x 32 in", description: "A generous three-seater on a hand-joined teak frame, wrapped in tight-weave linen with feather-blend cushions.", image: p01, badge: "Bestseller" },
  { id: "p02", name: "Cove L-Shaped Sectional", category: "living-room", price: 129900, mrp: 149900, material: "Kiln-dried hardwood", finish: "Textured weave", dimensions: "108 x 76 x 33 in", description: "A modular corner sectional with a deep lounging chaise, reversible on request during production.", image: p02 },
  { id: "p03", name: "Sablewood TV Console", category: "living-room", price: 42900, mrp: 51900, material: "Plywood with veneer", finish: "Walnut matte", dimensions: "72 x 16 x 20 in", description: "Wall-hung media console with soft-close drawers and integrated cable management.", image: p03 },
  { id: "p04", name: "Aria Coffee Table", category: "living-room", price: 24900, mrp: 29900, material: "Solid sheesham", finish: "Espresso oil", dimensions: "48 x 26 x 17 in", description: "A low, grounded coffee table with a floating lower shelf and softly chamfered edges.", image: p04 },
  { id: "p05", name: "Fenwick Accent Armchair", category: "living-room", price: 32900, mrp: 38900, material: "Beech frame", finish: "Bronze bouclé", dimensions: "31 x 33 x 30 in", description: "A sculpted lounge chair with a curved back and tapered legs, ideal beside a reading lamp.", image: p05, badge: "New" },
  { id: "p06", name: "Halden Side Table", category: "living-room", price: 12900, mrp: 15900, material: "Mango wood", finish: "Natural wax", dimensions: "18 x 18 x 22 in", description: "Compact round side table with a turned pedestal base and a lightly figured top.", image: p06 },
  { id: "p07", name: "Pemberton Recliner", category: "living-room", price: 68900, mrp: 79900, material: "Steel-reinforced frame", finish: "Top-grain leather", dimensions: "34 x 38 x 41 in", description: "A single-seat recliner with a smooth manual mechanism and deep lumbar support.", image: p07 },
  { id: "p08", name: "Ashcroft Bookshelf", category: "living-room", price: 28900, mrp: 34900, material: "Engineered wood", finish: "Walnut veneer", dimensions: "36 x 14 x 78 in", description: "Five open bays with an anti-tip wall fixing and adjustable middle shelves.", image: p08 },

  { id: "p09", name: "Regalia King Bed", category: "bedroom", price: 94900, mrp: 112900, material: "Solid teak", finish: "Espresso polish", dimensions: "78 x 84 x 48 in", description: "A statement king bed with an upholstered headboard panel and a slatted base.", image: p09, badge: "Bestseller" },
  { id: "p10", name: "Linden Queen Bed", category: "bedroom", price: 72900, mrp: 86900, material: "Rubberwood", finish: "Honey matte", dimensions: "66 x 82 x 44 in", description: "Clean-lined queen bed with a low profile and a hand-finished headboard.", image: p10 },
  { id: "p11", name: "Rowan Nightstand", category: "bedroom", price: 14900, mrp: 18900, material: "Plywood core", finish: "Walnut veneer", dimensions: "20 x 16 x 24 in", description: "Two soft-close drawers with recessed pulls and a wire cut-out at the back.", image: p11 },
  { id: "p12", name: "Vesta Six-Drawer Dresser", category: "bedroom", price: 46900, mrp: 55900, material: "Engineered wood", finish: "Sand lacquer", dimensions: "58 x 18 x 32 in", description: "A wide dresser with full-extension runners and a bronze-toned handle set.", image: p12 },
  { id: "p13", name: "Ottoline Storage Bench", category: "bedroom", price: 18900, mrp: 22900, material: "Hardwood frame", finish: "Linen top", dimensions: "44 x 18 x 18 in", description: "A bed-end bench with a lift-up lid and a soft-close hinge for linen storage.", image: p13 },
  { id: "p14", name: "Juno Bunk Bed", category: "bedroom", price: 58900, mrp: 68900, material: "Solid pine", finish: "White wash", dimensions: "80 x 42 x 66 in", description: "A safety-rail bunk with an angled ladder and reinforced corner joinery.", image: p14 },
  { id: "p15", name: "Halstead Storage Bed", category: "bedroom", price: 88900, mrp: 104900, material: "Marine ply", finish: "Walnut matte", dimensions: "78 x 84 x 42 in", description: "Hydraulic lift storage under the full mattress area, with a breathable base.", image: p15, badge: "Limited" },
  { id: "p16", name: "Della Bedroom Lounge Chair", category: "bedroom", price: 26900, mrp: 31900, material: "Ash frame", finish: "Sand weave", dimensions: "28 x 30 x 32 in", description: "A compact corner chair for the bedroom, softly padded with a curved backrest.", image: p16 },

  { id: "p17", name: "Everly 6-Seater Dining Table", category: "dining", price: 76900, mrp: 89900, material: "Solid acacia", finish: "Espresso oil", dimensions: "72 x 38 x 30 in", description: "A single-slab-look dining top on trestle legs, finished with a hardwearing oil.", image: p17, badge: "Bestseller" },
  { id: "p18", name: "Astor Dining Set with Bench", category: "dining", price: 112900, mrp: 132900, material: "Sheesham", finish: "Walnut matte", dimensions: "78 x 40 x 30 in", description: "Table, four chairs and a bench, sized for family dining in open-plan homes.", image: p18 },
  { id: "p19", name: "Nell Dining Chair (Set of 2)", category: "dining", price: 21900, mrp: 26900, material: "Beech", finish: "Sand upholstery", dimensions: "18 x 21 x 34 in", description: "Slim-profile dining chairs with a supportive curved back and padded seat.", image: p19 },
  { id: "p20", name: "Brenna Crockery Unit", category: "dining", price: 54900, mrp: 64900, material: "Plywood with glass", finish: "Walnut and clear glass", dimensions: "48 x 18 x 78 in", description: "Glazed upper display with closed lower storage and internal warm lighting.", image: p20 },
  { id: "p21", name: "Corbin Bar Stool", category: "dining", price: 9900, mrp: 12900, material: "Solid oak", finish: "Natural wax", dimensions: "16 x 16 x 30 in", description: "A counter-height stool with a footrest ring and lightly saddled seat.", image: p21 },
  { id: "p22", name: "Willow Round Dining Table", category: "dining", price: 48900, mrp: 57900, material: "Mango wood", finish: "Honey matte", dimensions: "48 in diameter", description: "A four-seater round table on a pedestal base, easy to move around.", image: p22 },

  { id: "p23", name: "Signature Modular Kitchen Set", category: "modular-kitchen", price: 289000, mrp: 339000, material: "BWP marine ply", finish: "Acrylic shutters", dimensions: "Customised per site", description: "A complete base and wall cabinet package with premium soft-close hardware.", image: p23, badge: "Bestseller" },
  { id: "p24", name: "L-Shape Kitchen Cabinetry", category: "modular-kitchen", price: 219000, mrp: 259000, material: "HDHMR core", finish: "Laminate matte", dimensions: "10 x 8 ft run", description: "An efficient corner layout with a carousel unit and tall pull-out pantry option.", image: p24 },
  { id: "p25", name: "Kitchen Island Unit", category: "modular-kitchen", price: 134000, mrp: 158000, material: "Marine ply", finish: "Quartz top", dimensions: "84 x 36 x 36 in", description: "A prep island with deep drawers on one face and open shelving on the other.", image: p25 },
  { id: "p26", name: "Tall Pantry Unit", category: "modular-kitchen", price: 68900, mrp: 79900, material: "BWP ply", finish: "Laminate", dimensions: "24 x 22 x 84 in", description: "Six-tier pull-out pantry with heavy-duty telescopic channels.", image: p26 },
  { id: "p27", name: "Wall Cabinet Range", category: "modular-kitchen", price: 42900, mrp: 51900, material: "Marine ply", finish: "Matte grey", dimensions: "Per running foot", description: "Handleless wall cabinets with lift-up shutters and internal LED profile.", image: p27 },
  { id: "p28", name: "Breakfast Counter Unit", category: "modular-kitchen", price: 56900, mrp: 66900, material: "Ply with veneer", finish: "Walnut and quartz", dimensions: "60 x 24 x 40 in", description: "A counter with overhang seating and hidden storage on the kitchen side.", image: p28 },

  { id: "p29", name: "Meridian Sliding Wardrobe", category: "wardrobes", price: 128900, mrp: 152900, material: "BWP ply", finish: "Laminate with mirror", dimensions: "96 x 24 x 96 in", description: "Two-track sliding wardrobe with a full internal loft and drawer bank.", image: p29, badge: "Bestseller" },
  { id: "p30", name: "Aldon Hinged Wardrobe", category: "wardrobes", price: 96900, mrp: 114900, material: "HDHMR", finish: "Sand matte", dimensions: "72 x 24 x 84 in", description: "Four-door hinged wardrobe with hanging, shelving and a locker section.", image: p30 },
  { id: "p31", name: "Walk-In Wardrobe System", category: "wardrobes", price: 245000, mrp: 289000, material: "Marine ply", finish: "Walnut veneer", dimensions: "Customised per room", description: "Open-module dressing room with glass shutters, island drawers and lighting.", image: p31, badge: "Limited" },
  { id: "p32", name: "Lumen Mirrored Wardrobe", category: "wardrobes", price: 108900, mrp: 128900, material: "BWP ply", finish: "Bronze mirror", dimensions: "84 x 24 x 90 in", description: "Full-height mirrored shutters that visually widen compact bedrooms.", image: p32 },
  { id: "p33", name: "Pip Kids Wardrobe", category: "wardrobes", price: 62900, mrp: 74900, material: "Engineered wood", finish: "Soft pastel laminate", dimensions: "54 x 22 x 78 in", description: "A child-height wardrobe with low hanging rails and rounded safety edges.", image: p33 },

  { id: "p34", name: "Kingsley Executive Desk", category: "office", price: 84900, mrp: 99900, material: "Solid oak", finish: "Walnut matte", dimensions: "72 x 34 x 30 in", description: "A wide executive desk with a modesty panel and integrated cable trough.", image: p34 },
  { id: "p35", name: "Aeronis Ergonomic Chair", category: "office", price: 26900, mrp: 32900, material: "Nylon and mesh", finish: "Charcoal", dimensions: "27 x 27 x 46 in", description: "Breathable mesh back with adjustable lumbar, arms and synchro tilt.", image: p35, badge: "New" },
  { id: "p36", name: "Consulate Conference Table", category: "office", price: 168900, mrp: 198900, material: "Ply with oak veneer", finish: "Natural oak", dimensions: "144 x 48 x 30 in", description: "A twelve-seat boardroom table with flush power and data ports.", image: p36 },
  { id: "p37", name: "Corvus Office Storage", category: "office", price: 38900, mrp: 46900, material: "Powder-coated steel", finish: "Light grey", dimensions: "36 x 18 x 48 in", description: "Shutter-front filing storage with a locking mechanism and adjustable shelves.", image: p37 },
  { id: "p38", name: "Nexus 4-Person Workstation", category: "office", price: 142900, mrp: 168900, material: "Engineered wood", finish: "White and beech", dimensions: "120 x 60 x 30 in", description: "A cluster workstation with fabric screens, cable spines and pedestal units.", image: p38 },

  { id: "p39", name: "Bespoke Pooja Mandir", category: "custom", price: 74900, mrp: 88900, material: "Solid teak", finish: "Hand-carved polish", dimensions: "36 x 20 x 60 in", description: "A hand-carved temple unit with brass detailing and concealed warm lighting.", image: p39, badge: "Bestseller" },
  { id: "p40", name: "Entryway Shoe Cabinet", category: "custom", price: 32900, mrp: 39900, material: "Plywood", finish: "Walnut matte", dimensions: "48 x 16 x 20 in", description: "A three-tier shoe cabinet topped with a cushioned seat for the foyer.", image: p40 },
  { id: "p41", name: "Built-In Study Unit", category: "custom", price: 89900, mrp: 106900, material: "BWP ply", finish: "Ivory and oak", dimensions: "Customised per wall", description: "A full-wall study with desk, overhead cabinets, open shelves and pinboard.", image: p41 },
  { id: "p42", name: "Jaali Partition Screen", category: "custom", price: 44900, mrp: 53900, material: "Solid teak", finish: "Natural lacquer", dimensions: "48 x 2 x 96 in", description: "A CNC-cut lattice screen that divides spaces while keeping light flowing.", image: p42 },
  { id: "p43", name: "Home Bar Cabinet", category: "custom", price: 98900, mrp: 116900, material: "Ply with veneer", finish: "Espresso and bronze mirror", dimensions: "72 x 20 x 84 in", description: "A bar unit with glass shelving, bottle bays and a mirrored back panel.", image: p43, badge: "Limited" },
];

function hashRating(id: string) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) % 1000;
  return { rating: Number((4.2 + (h % 8) / 10).toFixed(1)), reviews: 18 + (h % 160) };
}

export const products: Product[] = seeds.map((s) => ({
  ...s,
  ...hashRating(s.id),
  inStock: true,
}));

export const services: Service[] = [
  {
    slug: "furniture-manufacturing",
    name: "Furniture Manufacturing",
    blurb: "Made-to-order furniture built in our own workshop.",
    points: ["Solid wood and marine ply builds", "Hand-applied finishes", "Site measurement included"],
    image: svcManufacturing,
  },
  {
    slug: "modular-kitchen",
    name: "Modular Kitchen",
    blurb: "End-to-end kitchen design, fabrication and installation.",
    points: ["Layout planning and 3D views", "Premium soft-close hardware", "Counter and backsplash coordination"],
    image: svcKitchen,
  },
  {
    slug: "pop-work",
    name: "POP & False Ceiling",
    blurb: "Ceiling profiles, cove lighting and decorative POP work.",
    points: ["Cove and profile lighting", "Seamless finishing", "Moisture-resistant options"],
    image: svcPop,
  },
  {
    slug: "painting",
    name: "Painting & Texture",
    blurb: "Interior and exterior painting with premium emulsions.",
    points: ["Surface prep and putty", "Texture and accent walls", "Low-VOC paint systems"],
    image: svcPaint,
  },
  {
    slug: "wooden-flooring",
    name: "Wooden Flooring",
    blurb: "Laminate, engineered and solid wood flooring.",
    points: ["Level and moisture checks", "Skirting and beading", "Ten-year finish warranty"],
    image: svcFloor,
  },
  {
    slug: "vertical-blinds",
    name: "Vertical Blinds",
    blurb: "Made-to-measure vertical blinds for homes and offices.",
    points: ["Fabric and PVC options", "Chain and wand controls", "Blackout variants"],
    image: svcVertical,
  },
  {
    slug: "ventilation-blinds",
    name: "Ventilation Blinds",
    blurb: "Louvered ventilation systems for kitchens and utilities.",
    points: ["Aluminium louvers", "Insect mesh integration", "Weather-sealed frames"],
    image: svcVentilation,
  },
  {
    slug: "civil-work",
    name: "Civil Work",
    blurb: "Structural alterations, tiling and masonry.",
    points: ["Demolition and rebuild", "Waterproofing", "Tile and stone laying"],
    image: svcCivil,
  },
  {
    slug: "electrical-work",
    name: "Electrical Work",
    blurb: "Safe, certified wiring and lighting installation.",
    points: ["Load planning", "Concealed conduits", "Lighting and automation"],
    image: svcElectrical,
  },
];

export const kitchenLayouts = [
  { name: "L-Shaped", blurb: "Efficient corner use with a natural work triangle.", image: ksL },
  { name: "U-Shaped", blurb: "Three walls of storage for serious cooking.", image: ksU },
  { name: "Parallel", blurb: "Two facing runs, ideal for narrow kitchens.", image: ksParallel },
  { name: "Straight Line", blurb: "A single-wall layout for compact apartments.", image: ksStraight },
  { name: "Island", blurb: "A central prep and gathering counter.", image: ksIsland },
  { name: "Peninsula", blurb: "Open-plan with a breakfast counter edge.", image: ksPeninsula },
];

export const interiorGallery = [
  { title: "Living Room, Panelled Feature Wall", image: int01 },
  { title: "Master Bedroom, Textured Backdrop", image: int02 },
  { title: "Foyer with Decorative Ceiling", image: int03 },
  { title: "Office Reception Interior", image: int04 },
  { title: "Formal Dining with Crockery Unit", image: int05 },
  { title: "Kids Room with Play Storage", image: int06 },
  { title: "Balcony Study with Vertical Blinds", image: int07 },
];

export const getProduct = (id: string) => products.find((p) => p.id === id);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const inr = (n: number) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(n);
