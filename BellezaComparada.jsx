import React, { useState, useMemo } from "react";
import {
  Star,
  Menu,
  X,
  ShoppingBag,
  Check,
  Minus,
  ChevronLeft,
  ChevronRight,
  Scale,
  Tag,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/* ============================================================
   1. CONFIGURACIÓN Y DATOS
   ============================================================ */

// Sustituye este tag por tu ID de afiliado real de Amazon (ej. "tuweb-20")
const AFFILIATE_TAG = "tuweb-20";

const CATEGORIES = [
  { id: "facial", label: "Cuidado facial" },
  { id: "maquillaje", label: "Maquillaje" },
  { id: "cabello", label: "Cabello" },
  { id: "cuerpo", label: "Cuerpo y baño" },
  { id: "solar", label: "Protección solar" },
  { id: "fragancias", label: "Fragancias" },
];

const RADAR_ATTRS = [
  "Eficacia",
  "Hidratación",
  "Textura",
  "Duración",
  "Relación calidad-precio",
  "Packaging",
];

// NOTA: productos de ejemplo con datos placeholder. Cuando me pases tus
// enlaces de afiliado reales, sustituimos nombre, fotos, specs y precios
// por la información real extraída de Amazon (y de la web oficial / reseñas
// si falta algún dato).
const PRODUCTS = [
  {
    id: "serum-vitc",
    name: "Sérum Facial Vitamina C 30 ml",
    brand: "Marca ejemplo",
    category: "facial",
    price: 780,
    originalPrice: null,
    currency: "MXN",
    rating: 4.6,
    reviewCount: 1240,
    badge: "Más vendido",
    asin: "PLACEHOLDER1",
    images: [
      "https://picsum.photos/seed/serumvitc1/700/700",
      "https://picsum.photos/seed/serumvitc2/700/700",
      "https://picsum.photos/seed/serumvitc3/700/700",
    ],
    specs: [
      { label: "Tipo de piel", value: "Todo tipo de piel" },
      { label: "Ingrediente principal", value: "Vitamina C 15%" },
      { label: "Volumen", value: "30 ml" },
      { label: "Textura", value: "Ligera, absorción rápida" },
      { label: "Envase", value: "Frasco con gotero, vidrio ámbar" },
      { label: "Vegano", value: "Sí" },
      { label: "Libre de crueldad animal", value: "Sí" },
      { label: "Origen", value: "Fabricado en España" },
    ],
    radar: { Eficacia: 4.5, Hidratación: 3.8, Textura: 4.7, Duración: 4.0, "Relación calidad-precio": 4.3, Packaging: 4.2 },
    description:
      "Sérum antioxidante formulado para unificar el tono y aportar luminosidad. Su textura fluida se absorbe en segundos y no deja sensación pegajosa, por lo que se lleva bien tanto en rutinas de día como de noche.",
    pros: [
      "Textura ligera que no deja residuo graso",
      "Efecto luminosidad visible en 2-3 semanas de uso continuado",
      "Envase opaco que protege el ingrediente activo de la luz",
    ],
    cons: [
      "El frasco resulta pequeño para el precio",
      "Puede generar sensibilidad si se introduce a diario desde el primer día",
    ],
    idealFor:
      "Pieles apagadas u opuestas a la falta de luminosidad, y para quienes están empezando a incorporar antioxidantes en su rutina facial.",
    reviewsSummary:
      "La mayoría de las reseñas destacan la textura ligera y el efecto luminosidad tras unas semanas de uso. Las valoraciones más bajas mencionan irritación en pieles muy sensibles y un precio alto en relación al volumen del envase.",
  },
  {
    id: "crema-hialuronico",
    name: "Crema Hidratante Ácido Hialurónico 50 ml",
    brand: "Marca ejemplo",
    category: "facial",
    price: 650,
    originalPrice: null,
    currency: "MXN",
    rating: 4.4,
    reviewCount: 890,
    badge: null,
    asin: "PLACEHOLDER2",
    images: [
      "https://picsum.photos/seed/cremahia1/700/700",
      "https://picsum.photos/seed/cremahia2/700/700",
      "https://picsum.photos/seed/cremahia3/700/700",
    ],
    specs: [
      { label: "Tipo de piel", value: "Piel seca y deshidratada" },
      { label: "Ingrediente principal", value: "Ácido hialurónico de 3 pesos moleculares" },
      { label: "Volumen", value: "50 ml" },
      { label: "Textura", value: "Gel-crema" },
      { label: "Envase", value: "Tarro con tapa rosca" },
      { label: "Vegano", value: "Sí" },
      { label: "Libre de crueldad animal", value: "Sí" },
      { label: "Origen", value: "Fabricado en Francia" },
    ],
    radar: { Eficacia: 4.2, Hidratación: 4.8, Textura: 4.3, Duración: 4.5, "Relación calidad-precio": 4.4, Packaging: 3.9 },
    description:
      "Crema de día y noche que combina ácido hialurónico de distinto peso molecular para hidratar en varias capas de la piel. Deja un acabado confortable sin sensación grasa, apta para uso bajo maquillaje.",
    pros: [
      "Hidratación profunda que dura varias horas",
      "Textura gel-crema que no satura la piel",
      "Funciona bien como base antes del maquillaje",
    ],
    cons: [
      "El tarro con apertura de rosca favorece la contaminación del producto",
      "En climas muy húmedos puede resultar demasiado rica",
    ],
    idealFor: "Pieles secas o deshidratadas que buscan una hidratación intensa y duradera durante todo el día.",
    reviewsSummary:
      "Los usuarios valoran especialmente la sensación de hidratación inmediata y duradera. Algunas reseñas piden un envase con dosificador para mayor higiene.",
  },
  {
    id: "solar-spf50",
    name: "Protector Solar Facial SPF50 Textura Ligera 50 ml",
    brand: "Marca ejemplo",
    category: "solar",
    price: 590,
    originalPrice: null,
    currency: "MXN",
    rating: 4.7,
    reviewCount: 2100,
    badge: "Más vendido",
    asin: "PLACEHOLDER3",
    images: [
      "https://picsum.photos/seed/solarspf1/700/700",
      "https://picsum.photos/seed/solarspf2/700/700",
      "https://picsum.photos/seed/solarspf3/700/700",
    ],
    specs: [
      { label: "Tipo de piel", value: "Todo tipo de piel, incluida mixta a grasa" },
      { label: "SPF", value: "50" },
      { label: "Protección", value: "UVA/UVB de amplio espectro" },
      { label: "Volumen", value: "50 ml" },
      { label: "Textura", value: "Fluido ligero, acabado seco" },
      { label: "Resistente al agua", value: "Sí, hasta 40 minutos" },
      { label: "Vegano", value: "Sí" },
      { label: "Origen", value: "Fabricado en España" },
    ],
    radar: { Eficacia: 4.8, Hidratación: 3.9, Textura: 4.6, Duración: 4.4, "Relación calidad-precio": 4.5, Packaging: 4.3 },
    description:
      "Protector solar de amplio espectro con acabado seco tipo 'fluido', pensado para pieles mixtas a grasas que rechazan las texturas untuosas típicas de otros protectores. No deja repinte blanco visible.",
    pros: [
      "Acabado seco, ideal bajo maquillaje",
      "No deja repinte blanco en pieles medias a oscuras",
      "Resistente al agua y al sudor",
    ],
    cons: [
      "Aporta poca hidratación por sí solo",
      "El envase no es recargable ni de gran formato",
    ],
    idealFor: "Pieles mixtas o grasas, y para uso diario bajo maquillaje en climas cálidos y húmedos.",
    reviewsSummary:
      "Es uno de los protectores mejor valorados por su acabado no graso y ausencia de repinte blanco. Algunas reseñas señalan que en pieles muy secas conviene aplicar una crema hidratante debajo.",
  },
  {
    id: "champu-keratina",
    name: "Champú Reparador de Keratina 500 ml",
    brand: "Marca ejemplo",
    category: "cabello",
    price: 420,
    originalPrice: 540,
    currency: "MXN",
    rating: 4.3,
    reviewCount: 670,
    badge: "Oferta",
    asin: "PLACEHOLDER4",
    images: [
      "https://picsum.photos/seed/champukeratina1/700/700",
      "https://picsum.photos/seed/champukeratina2/700/700",
      "https://picsum.photos/seed/champukeratina3/700/700",
    ],
    specs: [
      { label: "Tipo de cabello", value: "Dañado, con puntas abiertas" },
      { label: "Ingrediente principal", value: "Keratina hidrolizada" },
      { label: "Volumen", value: "500 ml" },
      { label: "Libre de sulfatos", value: "Sí" },
      { label: "Libre de parabenos", value: "Sí" },
      { label: "Apto para cabello teñido", value: "Sí" },
      { label: "Origen", value: "Fabricado en Brasil" },
    ],
    radar: { Eficacia: 4.1, Hidratación: 4.4, Textura: 4.0, Duración: 3.8, "Relación calidad-precio": 4.6, Packaging: 3.7 },
    description:
      "Champú sin sulfatos formulado para cabellos debilitados por procesos químicos o calor. Limpia sin resecar y deja el cabello más manejable desde el primer lavado.",
    pros: [
      "Limpia sin resecar el cuero cabelludo",
      "Facilita el desenredado del cabello dañado",
      "Buena relación cantidad de producto / precio",
    ],
    cons: [
      "El aroma resulta intenso para algunos usuarios",
      "En cabellos muy finos puede aportar demasiado peso",
    ],
    idealFor: "Cabello dañado por tinte, plancha o secador que necesita reparación y manejabilidad.",
    reviewsSummary:
      "Las reseñas coinciden en que mejora la manejabilidad desde el primer uso. Las críticas negativas se centran en el aroma y en el efecto de peso en cabello fino.",
  },
  {
    id: "paleta-nude",
    name: "Paleta de Sombras Nude 12 Tonos",
    brand: "Marca ejemplo",
    category: "maquillaje",
    price: 480,
    originalPrice: null,
    currency: "MXN",
    rating: 4.5,
    reviewCount: 530,
    badge: null,
    asin: "PLACEHOLDER5",
    images: [
      "https://picsum.photos/seed/paletanude1/700/700",
      "https://picsum.photos/seed/paletanude2/700/700",
      "https://picsum.photos/seed/paletanude3/700/700",
    ],
    specs: [
      { label: "Número de tonos", value: "12" },
      { label: "Acabados", value: "Mate y perlado" },
      { label: "Pigmentación", value: "Alta" },
      { label: "Formato", value: "Compacto con espejo" },
      { label: "Vegano", value: "No especificado" },
      { label: "Origen", value: "Fabricado en Italia" },
    ],
    radar: { Eficacia: 4.4, Hidratación: 3.0, Textura: 4.5, Duración: 4.2, "Relación calidad-precio": 4.5, Packaging: 4.4 },
    description:
      "Paleta versátil de tonos tierra pensada tanto para looks de día como looks ahumados de noche. La mezcla de acabados mate y perlado permite crear profundidad sin necesidad de productos adicionales.",
    pros: [
      "Muy buena pigmentación en el primer pase",
      "Combinación de acabados versátil para día y noche",
      "Espejo integrado de buen tamaño",
    ],
    cons: [
      "Algunos tonos perlados sueltan partícula",
      "El imán del cierre pierde fuerza con el uso prolongado",
    ],
    idealFor: "Quienes buscan una única paleta de tonos neutros para resolver looks de diario y de noche.",
    reviewsSummary:
      "Muy bien valorada por su pigmentación y versatilidad de tonos. Algunas reseñas mencionan caída de partícula en los tonos perlados más oscuros.",
  },
  {
    id: "aceite-argan",
    name: "Aceite Corporal Nutritivo de Argán 200 ml",
    brand: "Marca ejemplo",
    category: "cuerpo",
    price: 390,
    originalPrice: 470,
    currency: "MXN",
    rating: 4.2,
    reviewCount: 310,
    badge: "Oferta",
    asin: "PLACEHOLDER6",
    images: [
      "https://picsum.photos/seed/aceiteargan1/700/700",
      "https://picsum.photos/seed/aceiteargan2/700/700",
      "https://picsum.photos/seed/aceiteargan3/700/700",
    ],
    specs: [
      { label: "Tipo de piel", value: "Piel seca a muy seca" },
      { label: "Ingrediente principal", value: "Aceite de argán" },
      { label: "Volumen", value: "200 ml" },
      { label: "Textura", value: "Aceite seco" },
      { label: "Envase", value: "Botella con dosificador spray" },
      { label: "Vegano", value: "Sí" },
      { label: "Origen", value: "Fabricado en Marruecos" },
    ],
    radar: { Eficacia: 4.0, Hidratación: 4.6, Textura: 4.3, Duración: 3.6, "Relación calidad-precio": 4.3, Packaging: 4.0 },
    description:
      "Aceite corporal de rápida absorción que nutre sin dejar sensación grasa. El formato spray facilita la aplicación en cuerpo completo tras la ducha.",
    pros: [
      "Absorción rápida pese a ser un aceite",
      "Formato spray cómodo para todo el cuerpo",
      "Aroma suave, no empalagoso",
    ],
    cons: [
      "El dosificador spray a veces gotea en el primer uso",
      "La hidratación no dura tanto como una crema corporal densa",
    ],
    idealFor: "Piel seca que busca una rutina corporal rápida sin la pesadez de una crema tradicional.",
    reviewsSummary:
      "Se valora sobre todo la rapidez de absorción y el formato spray. Algunas reseñas piden un dosificador más preciso.",
  },
  {
    id: "perfume-floral",
    name: "Eau de Parfum Floral 50 ml",
    brand: "Marca ejemplo",
    category: "fragancias",
    price: 990,
    originalPrice: null,
    currency: "MXN",
    rating: 4.6,
    reviewCount: 415,
    badge: null,
    asin: "PLACEHOLDER7",
    images: [
      "https://picsum.photos/seed/perfumefloral1/700/700",
      "https://picsum.photos/seed/perfumefloral2/700/700",
      "https://picsum.photos/seed/perfumefloral3/700/700",
    ],
    specs: [
      { label: "Familia olfativa", value: "Floral afrutada" },
      { label: "Concentración", value: "Eau de Parfum (EDP)" },
      { label: "Volumen", value: "50 ml" },
      { label: "Notas de salida", value: "Bergamota, pera" },
      { label: "Notas de corazón", value: "Jazmín, rosa" },
      { label: "Notas de fondo", value: "Almizcle, vainilla" },
      { label: "Origen", value: "Fabricado en Francia" },
    ],
    radar: { Eficacia: 4.3, Hidratación: 2.5, Textura: 4.0, Duración: 4.5, "Relación calidad-precio": 4.0, Packaging: 4.7 },
    description:
      "Fragancia floral afrutada de larga duración, con salida fresca y un fondo cálido amaderado-almizclado que la hace versátil para uso diurno y nocturno.",
    pros: [
      "Buena duración en piel, más de 6 horas",
      "Frasco de diseño cuidado, ideal para regalo",
      "Salida fresca que no resulta empalagosa",
    ],
    cons: [
      "La estela es discreta pasadas las primeras horas",
      "Precio elevado frente al volumen de 50 ml",
    ],
    idealFor: "Quienes buscan una fragancia versátil de uso diario con un frasco atractivo para regalar.",
    reviewsSummary:
      "Muy bien valorado el frasco y la salida fresca. Las reseñas más críticas mencionan que la estela se reduce bastante tras la cuarta hora.",
  },
];

const GUIDE = {
  slug: "mejor-protector-solar-2026",
  title: "Mejor protector solar facial 2026: guía de compra",
  intro:
    "Elegir un protector solar facial no es solo mirar el número de SPF. La textura, el tipo de piel y la resistencia al agua determinan si realmente vas a usarlo todos los días, que es lo único que hace que un protector solar funcione.",
  sections: [
    {
      heading: "El SPF correcto para tu día a día",
      body:
        "Para uso diario en ciudad, un SPF 30 aplicado en cantidad generosa suele ser suficiente. Para exposición prolongada al aire libre, playa o montaña, conviene subir a SPF 50 y reaplicar cada dos horas.",
    },
    {
      heading: "Textura según tu tipo de piel",
      body:
        "Las pieles grasas o mixtas se benefician de fórmulas en fluido o gel con acabado seco. Las pieles secas toleran mejor las texturas en crema, que aportan además algo de hidratación adicional.",
    },
    {
      heading: "Resistencia al agua y al sudor",
      body:
        "Si vas a nadar, entrenar al aire libre o pasar horas en la playa, prioriza fórmulas resistentes al agua y reaplica después de secarte con la toalla, ya que el frotado retira parte del producto.",
    },
    {
      heading: "Ingredientes a tener en cuenta",
      body:
        "Los filtros de amplio espectro protegen frente a rayos UVA y UVB. Si tu piel es sensible, busca fórmulas sin fragancia y con menos ingredientes activos en general para reducir el riesgo de irritación.",
    },
  ],
  recommendedCategory: "solar",
};

/* ============================================================
   2. UTILIDADES
   ============================================================ */

function getCategoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label || id;
}

function getAffiliateUrl(product) {
  if (!product) return "#";
  return `https://www.amazon.com.mx/dp/${product.asin}?tag=${AFFILIATE_TAG}`;
}

function formatPrice(value, currency) {
  return `$${value.toLocaleString("es-MX")} ${currency}`;
}

const SERIES_COLORS = ["#A9823C", "#7A2E42", "#4C6B5C", "#38618C"];

/* ============================================================
   3. COMPONENTES DE UI COMPARTIDOS
   ============================================================ */

function StarRating({ rating, size = 14 }) {
  const full = Math.round(rating * 2) / 2;
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Valoración ${rating} de 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          strokeWidth={1.5}
          className={n <= full ? "fill-current" : ""}
          style={{ color: "#A9823C", opacity: n <= full ? 1 : 0.28 }}
        />
      ))}
    </span>
  );
}

function BadgeChip({ children, tone = "gold" }) {
  const tones = {
    gold: { background: "#F4E9D8", color: "#7A5B21" },
    rose: { background: "#F6E3E6", color: "#8A3B4A" },
  };
  return (
    <span
      className="text-xs px-2.5 py-1 rounded-sm font-medium tracking-wide"
      style={tones[tone]}
    >
      {children}
    </span>
  );
}

function BuyButton({ product, full = false, label = "Ver precio en Amazon" }) {
  return (
    <a
      href={getAffiliateUrl(product)}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium transition-colors ${
        full ? "w-full" : ""
      }`}
      style={{ background: "#33121F", color: "#FBF6F1" }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#4A1D30")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "#33121F")}
    >
      <ShoppingBag size={16} strokeWidth={1.75} />
      {label}
    </a>
  );
}

function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <p className="text-sm mb-2" style={{ color: "#A9823C" }}>
          {eyebrow}
        </p>
      )}
      <h2
        className="text-3xl md:text-4xl leading-tight"
        style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 max-w-xl text-[15px]" style={{ color: "#6B5A5F" }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ============================================================
   4. TARJETA DE PRODUCTO (grids)
   ============================================================ */

function ProductCard({ product, onOpen, compareMode, isCompared, onToggleCompare }) {
  return (
    <div className="group flex flex-col border" style={{ borderColor: "#E4D9D0", background: "#FFFDFB" }}>
      <div className="relative aspect-square overflow-hidden" style={{ background: "#F1E9E1" }}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <BadgeChip tone={product.badge === "Oferta" ? "rose" : "gold"}>{product.badge}</BadgeChip>
          </div>
        )}
        {compareMode && (
          <button
            onClick={() => onToggleCompare(product.id)}
            className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-sm border"
            style={{
              background: isCompared ? "#33121F" : "#FBF6F1",
              borderColor: "#33121F",
              color: isCompared ? "#FBF6F1" : "#33121F",
            }}
            aria-label="Añadir al comparador"
          >
            {isCompared ? <Check size={15} /> : <Scale size={14} />}
          </button>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs mb-1" style={{ color: "#A9823C" }}>
          {getCategoryLabel(product.category)}
        </p>
        <button onClick={() => onOpen(product.id)} className="text-left">
          <h3 className="text-[15px] leading-snug mb-1.5" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
            {product.name}
          </h3>
        </button>
        <div className="flex items-center gap-2 mb-2">
          <StarRating rating={product.rating} />
          <span className="text-xs" style={{ color: "#8A757A" }}>
            ({product.reviewCount})
          </span>
        </div>
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <span className="text-xs line-through mr-1.5" style={{ color: "#B39EA3" }}>
                {formatPrice(product.originalPrice, product.currency)}
              </span>
            )}
            <span className="text-[15px] font-medium" style={{ color: "#2B1A20" }}>
              {formatPrice(product.price, product.currency)}
            </span>
          </div>
          <button
            onClick={() => onOpen(product.id)}
            className="text-xs underline underline-offset-4"
            style={{ color: "#33121F" }}
          >
            Ver ficha
          </button>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   5. FICHA DE PRODUCTO
   ============================================================ */

function Gallery({ images, name }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div className="aspect-square overflow-hidden mb-3" style={{ background: "#F1E9E1" }}>
        <img src={images[active]} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex gap-2">
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="w-16 h-16 overflow-hidden border"
            style={{ borderColor: active === i ? "#33121F" : "#E4D9D0" }}
          >
            <img src={src} alt={`${name} vista ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

function SpecsTable({ specs }) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {specs.map((row, i) => (
          <tr key={i} style={{ borderTop: "1px solid #E4D9D0" }}>
            <td className="py-2.5 pr-4 align-top" style={{ color: "#8A757A", width: "45%" }}>
              {row.label}
            </td>
            <td className="py-2.5 align-top" style={{ color: "#2B1A20" }}>
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SingleRadar({ product }) {
  const data = RADAR_ATTRS.map((attr) => ({ attr, valor: product.radar[attr] }));
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <RadarChart data={data} outerRadius="75%">
          <PolarGrid stroke="#E4D9D0" />
          <PolarAngleAxis dataKey="attr" tick={{ fill: "#6B5A5F", fontSize: 11 }} />
          <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: "#B39EA3", fontSize: 10 }} />
          <Radar dataKey="valor" stroke="#A9823C" fill="#A9823C" fillOpacity={0.35} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

function ProductPage({ product, onOpen, onGoCompare }) {
  if (!product) return null;
  const related = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <p className="text-xs mb-6" style={{ color: "#A9823C" }}>
        {getCategoryLabel(product.category)}
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <Gallery images={product.images} name={product.name} />

        <div>
          <h1 className="text-3xl mb-2 leading-tight" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
            {product.name}
          </h1>
          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={product.rating} size={16} />
            <span className="text-sm" style={{ color: "#8A757A" }}>
              {product.rating} · {product.reviewCount} reseñas
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            {product.originalPrice && (
              <span className="text-base line-through" style={{ color: "#B39EA3" }}>
                {formatPrice(product.originalPrice, product.currency)}
              </span>
            )}
            <span className="text-2xl" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
              {formatPrice(product.price, product.currency)}
            </span>
          </div>

          <p className="text-[15px] leading-relaxed mb-6" style={{ color: "#4A3B40" }}>
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <BuyButton product={product} full />
            <button
              onClick={() => onGoCompare(product.id)}
              className="inline-flex items-center justify-center gap-2 rounded-sm px-5 py-3 text-sm font-medium border"
              style={{ borderColor: "#33121F", color: "#33121F" }}
            >
              <Scale size={16} strokeWidth={1.75} />
              Añadir al comparador
            </button>
          </div>

          <div className="p-4" style={{ background: "#F8F1EA" }}>
            <p className="text-sm" style={{ color: "#5A4A4F" }}>
              <span className="font-medium" style={{ color: "#2B1A20" }}>
                Ideal para:
              </span>{" "}
              {product.idealFor}
            </p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mt-14">
        <div>
          <h3 className="text-xl mb-4" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
            Características técnicas
          </h3>
          <SpecsTable specs={product.specs} />
        </div>
        <div>
          <h3 className="text-xl mb-4" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
            Valoración por aspectos
          </h3>
          <SingleRadar product={product} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mt-14">
        <div>
          <h3 className="text-xl mb-4" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
            Pros y contras
          </h3>
          <div className="space-y-2 mb-5">
            {product.pros.map((p, i) => (
              <div key={i} className="flex gap-2 text-sm" style={{ color: "#4A3B40" }}>
                <Check size={16} style={{ color: "#4C6B5C", flexShrink: 0, marginTop: 2 }} />
                {p}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {product.cons.map((c, i) => (
              <div key={i} className="flex gap-2 text-sm" style={{ color: "#4A3B40" }}>
                <Minus size={16} style={{ color: "#8A3B4A", flexShrink: 0, marginTop: 2 }} />
                {c}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-xl mb-4" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
            Resumen de reseñas
          </h3>
          <p className="text-sm leading-relaxed" style={{ color: "#4A3B40" }}>
            {product.reviewsSummary}
          </p>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-16">
          <h3 className="text-xl mb-5" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
            También en {getCategoryLabel(product.category).toLowerCase()}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} onOpen={onOpen} compareMode={false} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   6. COMPARADOR
   ============================================================ */

function ComparadorPage({ compareIds, setCompareIds, onOpen }) {
  const selected = PRODUCTS.filter((p) => compareIds.includes(p.id));
  const allSpecLabels = useMemo(() => {
    const set = new Set();
    selected.forEach((p) => p.specs.forEach((s) => set.add(s.label)));
    return Array.from(set);
  }, [selected]);

  const radarData = RADAR_ATTRS.map((attr) => {
    const row = { attr };
    selected.forEach((p) => {
      row[p.name] = p.radar[attr];
    });
    return row;
  });

  function toggle(id) {
    setCompareIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 4 ? [...prev, id] : prev
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <SectionHeading
        eyebrow="El comparador"
        title="Enfrenta hasta 4 productos"
        subtitle="Selecciona los productos que quieres comparar. Verás sus especificaciones lado a lado y sus valoraciones superpuestas en un mismo gráfico."
      />

      <div className="mb-10">
        <div className="flex flex-wrap gap-2 mb-2">
          {CATEGORIES.map((cat) => (
            <span key={cat.id} className="sr-only" />
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {PRODUCTS.map((p) => {
            const active = compareIds.includes(p.id);
            return (
              <button
                key={p.id}
                onClick={() => toggle(p.id)}
                className="flex items-center gap-2 px-3 py-2 border text-sm"
                style={{
                  borderColor: active ? "#33121F" : "#E4D9D0",
                  background: active ? "#33121F" : "#FFFDFB",
                  color: active ? "#FBF6F1" : "#2B1A20",
                }}
              >
                <img src={p.images[0]} alt="" className="w-6 h-6 object-cover" />
                {p.name}
                {active && <Check size={14} />}
              </button>
            );
          })}
        </div>
        {compareIds.length >= 4 && (
          <p className="text-xs mt-2" style={{ color: "#8A3B4A" }}>
            Puedes comparar un máximo de 4 productos a la vez.
          </p>
        )}
      </div>

      {selected.length === 0 && (
        <p className="text-sm py-10 text-center" style={{ color: "#8A757A" }}>
          Aún no has seleccionado ningún producto. Elige al menos dos arriba para empezar a comparar.
        </p>
      )}

      {selected.length > 0 && (
        <>
          {/* Tabla básica */}
          <div className="overflow-x-auto mb-14">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr>
                  <td className="w-40" />
                  {selected.map((p) => (
                    <td key={p.id} className="p-3 align-top">
                      <img src={p.images[0]} alt={p.name} className="w-full aspect-square object-cover mb-2" />
                      <button onClick={() => onOpen(p.id)} className="text-left">
                        <p className="text-sm leading-snug" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
                          {p.name}
                        </p>
                      </button>
                    </td>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderTop: "1px solid #E4D9D0" }}>
                  <td className="py-3 pr-4" style={{ color: "#8A757A" }}>
                    Precio
                  </td>
                  {selected.map((p) => (
                    <td key={p.id} className="py-3 font-medium" style={{ color: "#2B1A20" }}>
                      {formatPrice(p.price, p.currency)}
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: "1px solid #E4D9D0" }}>
                  <td className="py-3 pr-4" style={{ color: "#8A757A" }}>
                    Valoración
                  </td>
                  {selected.map((p) => (
                    <td key={p.id} className="py-3">
                      <StarRating rating={p.rating} /> <span className="text-xs">({p.reviewCount})</span>
                    </td>
                  ))}
                </tr>
                <tr style={{ borderTop: "1px solid #E4D9D0" }}>
                  <td className="py-3 pr-4" style={{ color: "#8A757A" }}>
                    Categoría
                  </td>
                  {selected.map((p) => (
                    <td key={p.id} className="py-3" style={{ color: "#2B1A20" }}>
                      {getCategoryLabel(p.category)}
                    </td>
                  ))}
                </tr>
                {allSpecLabels.map((label) => (
                  <tr key={label} style={{ borderTop: "1px solid #E4D9D0" }}>
                    <td className="py-3 pr-4" style={{ color: "#8A757A" }}>
                      {label}
                    </td>
                    {selected.map((p) => {
                      const found = p.specs.find((s) => s.label === label);
                      return (
                        <td key={p.id} className="py-3" style={{ color: found ? "#2B1A20" : "#B39EA3" }}>
                          {found ? found.value : "—"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                <tr style={{ borderTop: "1px solid #E4D9D0" }}>
                  <td className="py-4 pr-4" />
                  {selected.map((p) => (
                    <td key={p.id} className="py-4">
                      <BuyButton product={p} label="Comprar" />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Radar superpuesto */}
          <div>
            <h3 className="text-xl mb-4" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
              Valoraciones superpuestas
            </h3>
            <div style={{ width: "100%", height: 380 }}>
              <ResponsiveContainer>
                <RadarChart data={radarData} outerRadius="75%">
                  <PolarGrid stroke="#E4D9D0" />
                  <PolarAngleAxis dataKey="attr" tick={{ fill: "#6B5A5F", fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 5]} tick={{ fill: "#B39EA3", fontSize: 10 }} />
                  {selected.map((p, i) => (
                    <Radar
                      key={p.id}
                      name={p.name}
                      dataKey={p.name}
                      stroke={SERIES_COLORS[i % SERIES_COLORS.length]}
                      fill={SERIES_COLORS[i % SERIES_COLORS.length]}
                      fillOpacity={0.18}
                    />
                  ))}
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================================================
   7. HOME / CATEGORÍA / OFERTAS / GUÍA / LEGAL
   ============================================================ */

function Hero({ onGoCompare, onGoCategory }) {
  return (
    <div className="grid md:grid-cols-2 border-b" style={{ borderColor: "#E4D9D0" }}>
      <div className="px-6 md:px-14 py-16 md:py-24 flex flex-col justify-center order-2 md:order-1">
        <p className="text-sm mb-4" style={{ color: "#A9823C" }}>
          Comparativas de belleza en Amazon
        </p>
        <h1
          className="text-4xl md:text-5xl leading-[1.1] mb-6"
          style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}
        >
          Elige tu producto de belleza sin adivinar
        </h1>
        <p className="text-[15px] leading-relaxed mb-8 max-w-md" style={{ color: "#5A4A4F" }}>
          Fichas completas, valoraciones por aspectos y un comparador que enfrenta
          hasta cuatro productos lado a lado, para que decidas con datos y no solo
          con el número de estrellas.
        </p>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={onGoCompare}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium"
            style={{ background: "#33121F", color: "#FBF6F1" }}
          >
            <Scale size={16} />
            Ir al comparador
          </button>
          <button
            onClick={() => onGoCategory("facial")}
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium border"
            style={{ borderColor: "#33121F", color: "#33121F" }}
          >
            Explorar productos
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 order-1 md:order-2">
        <img src="https://picsum.photos/seed/heroa/600/800" alt="" className="w-full h-full object-cover" />
        <div className="grid grid-rows-2">
          <img src="https://picsum.photos/seed/herob/600/400" alt="" className="w-full h-full object-cover" />
          <img src="https://picsum.photos/seed/heroc/600/400" alt="" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}

function HomePage({ onOpen, onGoCategory, onGoCompare, onGoGuide, onGoOfertas }) {
  const destacados = PRODUCTS.filter((p) => p.badge === "Más vendido");
  const ofertas = PRODUCTS.filter((p) => p.originalPrice).slice(0, 3);

  return (
    <div>
      <Hero onGoCompare={onGoCompare} onGoCategory={onGoCategory} />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <SectionHeading
          eyebrow="Selección editorial"
          title="Los más recomendados"
          subtitle="Productos con mejor valoración media entre las reseñas analizadas."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {destacados.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} compareMode={false} />
          ))}
        </div>
      </div>

      <div className="py-16" style={{ background: "#F8F1EA" }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-sm mb-2" style={{ color: "#A9823C" }}>
                Explora por categoría
              </p>
              <h2 className="text-3xl" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
                Encuentra tu rutina
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onGoCategory(cat.id)}
                className="text-left p-6 border transition-colors"
                style={{ borderColor: "#E4D9D0", background: "#FFFDFB" }}
              >
                <p className="text-lg" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
                  {cat.label}
                </p>
                <p className="text-xs mt-1" style={{ color: "#8A757A" }}>
                  {PRODUCTS.filter((p) => p.category === cat.id).length} productos
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <SectionHeading eyebrow="Precio rebajado" title="Ofertas de la semana" />
          <button onClick={onGoOfertas} className="text-sm underline underline-offset-4" style={{ color: "#33121F" }}>
            Ver todas
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {ofertas.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} compareMode={false} />
          ))}
        </div>
      </div>

      <div className="py-16" style={{ background: "#33121F" }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl mb-4" style={{ fontFamily: "Fraunces, serif", color: "#FBF6F1" }}>
            ¿Dudando entre dos productos?
          </h2>
          <p className="text-[15px] mb-8" style={{ color: "#E7D8C8" }}>
            El comparador enfrenta hasta cuatro fichas al mismo tiempo, con sus
            especificaciones y valoraciones superpuestas en un solo gráfico.
          </p>
          <button
            onClick={onGoCompare}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium"
            style={{ background: "#A9823C", color: "#2B1A20" }}
          >
            <Scale size={16} />
            Comparar productos
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <button onClick={onGoGuide} className="block group">
          <p className="text-sm mb-2" style={{ color: "#A9823C" }}>
            Guía de compra
          </p>
          <h2
            className="text-3xl md:text-4xl mb-3 group-hover:underline underline-offset-4"
            style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}
          >
            {GUIDE.title}
          </h2>
          <p className="text-[15px] max-w-2xl" style={{ color: "#5A4A4F" }}>
            {GUIDE.intro}
          </p>
        </button>
      </div>
    </div>
  );
}

function CategoryPage({ categoryId, onOpen }) {
  const products = PRODUCTS.filter((p) => p.category === categoryId);
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <SectionHeading title={getCategoryLabel(categoryId)} subtitle={`${products.length} productos analizados en esta categoría.`} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={onOpen} compareMode={false} />
        ))}
      </div>
    </div>
  );
}

function OfertasPage({ onOpen }) {
  const products = PRODUCTS.filter((p) => p.originalPrice);
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <SectionHeading
        eyebrow="Precio rebajado"
        title="Ofertas activas"
        subtitle="Productos con un precio actual por debajo de su precio habitual."
      />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onOpen={onOpen} compareMode={false} />
        ))}
      </div>
    </div>
  );
}

function GuidePage({ onOpen }) {
  const recommended = PRODUCTS.filter((p) => p.category === GUIDE.recommendedCategory);
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <p className="text-sm mb-3" style={{ color: "#A9823C" }}>
        Guía de compra
      </p>
      <h1 className="text-4xl mb-6 leading-tight" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
        {GUIDE.title}
      </h1>
      <p className="text-[16px] leading-relaxed mb-10" style={{ color: "#4A3B40" }}>
        {GUIDE.intro}
      </p>

      {GUIDE.sections.map((s, i) => (
        <div key={i} className="mb-8">
          <h2 className="text-xl mb-2" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
            {s.heading}
          </h2>
          <p className="text-[15px] leading-relaxed" style={{ color: "#4A3B40" }}>
            {s.body}
          </p>
        </div>
      ))}

      <div className="mt-14 pt-10" style={{ borderTop: "1px solid #E4D9D0" }}>
        <h3 className="text-xl mb-5" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
          Nuestras recomendaciones
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
          {recommended.map((p) => (
            <ProductCard key={p.id} product={p} onOpen={onOpen} compareMode={false} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LegalPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl mb-8" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
        Aviso legal y de afiliación
      </h1>
      <div className="space-y-6 text-[15px] leading-relaxed" style={{ color: "#4A3B40" }}>
        <p>
          Esta web participa en el Programa de Afiliados de Amazon, un programa de
          publicidad de afiliados diseñado para ofrecer un medio por el que se
          puedan obtener comisiones por publicidad, publicitando y enlazando a
          Amazon. Como afiliados, obtenemos ingresos por las compras adscritas que
          cumplen los requisitos aplicables, sin coste adicional alguno para ti.
        </p>
        <p>
          Los enlaces "Comprar" o "Ver precio en Amazon" que aparecen en esta web
          contienen un identificador de afiliado. Al hacer clic y realizar una
          compra en Amazon, esta web puede recibir una pequeña comisión que no
          modifica el precio que pagas.
        </p>
        <p>
          Los precios, disponibilidad e imágenes mostrados son orientativos y
          pueden variar respecto a los que encuentres en Amazon en el momento de
          la compra. Te recomendamos siempre confirmar el precio final en la
          página del producto antes de completar tu pedido.
        </p>
        <p>
          Las opiniones, valoraciones y comparativas publicadas en esta web
          reflejan un análisis propio basado en la información del producto y en
          reseñas de usuarios disponibles públicamente. No sustituyen el
          asesoramiento de un profesional de la salud o la piel en caso de
          condiciones dermatológicas específicas.
        </p>
        <p>
          Si tienes dudas sobre el uso de tus datos al navegar por esta web,
          puedes contactarnos a través del correo indicado en la sección de
          contacto.
        </p>
      </div>
    </div>
  );
}

/* ============================================================
   8. NAVEGACIÓN
   ============================================================ */

function Header({ view, go, onGoCategory }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  const NavLink = ({ active, children, onClick }) => (
    <button
      onClick={onClick}
      className="text-sm py-2"
      style={{ color: active ? "#2B1A20" : "#6B5A5F", borderBottom: active ? "1px solid #A9823C" : "1px solid transparent" }}
    >
      {children}
    </button>
  );

  return (
    <header className="sticky top-0 z-30 border-b" style={{ background: "#FBF6F1", borderColor: "#E4D9D0" }}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={() => go("home")} className="flex items-center gap-2">
          <Sparkles size={18} style={{ color: "#A9823C" }} />
          <span className="text-lg" style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>
            Belleza Comparada
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-7">
          <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
            <NavLink active={view === "categoria"}>Categorías</NavLink>
            {catOpen && (
              <div className="absolute top-full left-0 w-52 border shadow-sm" style={{ background: "#FFFDFB", borderColor: "#E4D9D0" }}>
                {CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onGoCategory(c.id);
                      setCatOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2.5 text-sm hover:bg-black/[0.02]"
                    style={{ color: "#4A3B40" }}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <NavLink active={view === "comparador"} onClick={() => go("comparador")}>
            Comparador
          </NavLink>
          <NavLink active={view === "ofertas"} onClick={() => go("ofertas")}>
            Ofertas
          </NavLink>
          <NavLink active={view === "guia"} onClick={() => go("guia")}>
            Guías
          </NavLink>
        </nav>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t px-6 py-4 space-y-1" style={{ borderColor: "#E4D9D0", background: "#FBF6F1" }}>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                onGoCategory(c.id);
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm"
              style={{ color: "#4A3B40" }}
            >
              {c.label}
            </button>
          ))}
          <div style={{ borderTop: "1px solid #E4D9D0" }} className="pt-2 mt-2">
            <button
              onClick={() => {
                go("comparador");
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm"
              style={{ color: "#4A3B40" }}
            >
              Comparador
            </button>
            <button
              onClick={() => {
                go("ofertas");
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm"
              style={{ color: "#4A3B40" }}
            >
              Ofertas
            </button>
            <button
              onClick={() => {
                go("guia");
                setMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-sm"
              style={{ color: "#4A3B40" }}
            >
              Guías
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer({ go }) {
  return (
    <footer className="border-t mt-4" style={{ borderColor: "#E4D9D0", background: "#F8F1EA" }}>
      <div className="max-w-6xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} style={{ color: "#A9823C" }} />
            <span style={{ fontFamily: "Fraunces, serif", color: "#2B1A20" }}>Belleza Comparada</span>
          </div>
          <p className="text-xs" style={{ color: "#8A757A" }}>
            Comparativas independientes de productos de belleza disponibles en Amazon.
          </p>
        </div>
        <div>
          <p className="text-xs mb-3" style={{ color: "#8A757A" }}>
            Navegación
          </p>
          <div className="flex flex-col gap-1.5 text-sm" style={{ color: "#4A3B40" }}>
            <button onClick={() => go("comparador")} className="text-left">Comparador</button>
            <button onClick={() => go("ofertas")} className="text-left">Ofertas</button>
            <button onClick={() => go("guia")} className="text-left">Guías de compra</button>
          </div>
        </div>
        <div>
          <p className="text-xs mb-3" style={{ color: "#8A757A" }}>
            Legal
          </p>
          <button onClick={() => go("legal")} className="text-sm text-left flex items-center gap-1.5" style={{ color: "#4A3B40" }}>
            <ShieldCheck size={14} />
            Aviso legal y de afiliación
          </button>
          <p className="text-xs mt-4 leading-relaxed" style={{ color: "#8A757A" }}>
            Como afiliados de Amazon, obtenemos ingresos por las compras que cumplen los requisitos aplicables.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   9. APP PRINCIPAL (enrutado por estado)
   ============================================================ */

export default function App() {
  const [view, setView] = useState("home");
  const [categoryId, setCategoryId] = useState("facial");
  const [productId, setProductId] = useState(null);
  const [compareIds, setCompareIds] = useState([]);

  function go(v) {
    setView(v);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function openProduct(id) {
    setProductId(id);
    setView("producto");
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function openCategory(id) {
    setCategoryId(id);
    setView("categoria");
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function addToCompareAndGo(id) {
    setCompareIds((prev) => (prev.includes(id) ? prev : [...prev, id].slice(0, 4)));
    go("comparador");
  }

  const currentProduct = PRODUCTS.find((p) => p.id === productId);

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: "#FBF6F1", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap');
      `}</style>

      <Header view={view} go={go} onGoCategory={openCategory} />

      {view === "home" && (
        <HomePage
          onOpen={openProduct}
          onGoCategory={openCategory}
          onGoCompare={() => go("comparador")}
          onGoGuide={() => go("guia")}
          onGoOfertas={() => go("ofertas")}
        />
      )}
      {view === "categoria" && <CategoryPage categoryId={categoryId} onOpen={openProduct} />}
      {view === "producto" && <ProductPage product={currentProduct} onOpen={openProduct} onGoCompare={addToCompareAndGo} />}
      {view === "comparador" && <ComparadorPage compareIds={compareIds} setCompareIds={setCompareIds} onOpen={openProduct} />}
      {view === "ofertas" && <OfertasPage onOpen={openProduct} />}
      {view === "guia" && <GuidePage onOpen={openProduct} />}
      {view === "legal" && <LegalPage />}

      <Footer go={go} />
    </div>
  );
}
