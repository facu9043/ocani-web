import { useId, type SVGProps } from "react";

/*
 * Ilustraciones de la guía "¿Cómo compro?" (originales, paleta ocani).
 * Cada SVG define sus propios degradados/filtros con un prefijo de useId(),
 * así no hay ids duplicados aunque la guía se renderice más de una vez.
 * Los tonos intermedios (kraft, sombras) quedan fijos acá a propósito.
 */

type IllustrationProps = SVGProps<SVGSVGElement>;

function useSvgIds() {
  // useId() puede traer caracteres no válidos en url(#...); se dejan solo
  // letras, números, "_" y "-" (el resultado sigue siendo único).
  const prefix = `htb${useId().replace(/[^\w-]/g, "")}`;
  return {
    id: (name: string) => `${prefix}-${name}`,
    url: (name: string) => `url(#${prefix}-${name})`,
  };
}

function SoftShadow({ id }: { id: string }) {
  return (
    <filter id={id} x="-30%" y="-30%" width="160%" height="170%">
      <feDropShadow dx="0" dy="1.6" stdDeviation="1.4" floodColor="#3a2e1c" floodOpacity=".22" />
    </filter>
  );
}

function Gradient({
  id,
  from,
  to,
  vertical = false,
}: {
  id: string;
  from: string;
  to: string;
  vertical?: boolean;
}) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={vertical ? "0" : "1"} y2="1">
      <stop offset="0" stopColor={from} />
      <stop offset="1" stopColor={to} />
    </linearGradient>
  );
}

/* Paso 1 · Bolsa kraft + frasco con frutos secos + "+" */
export function AddToCartIllustration(props: IllustrationProps) {
  const { id, url } = useSvgIds();
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false" {...props}>
      <defs>
        <Gradient id={id("kraft")} from="#ecd1a4" to="#c8955a" />
        <Gradient id={id("kraft-dark")} from="#c39058" to="#a87843" vertical />
        <Gradient id={id("leaf")} from="#9aa860" to="#606c38" />
        <Gradient id={id("forest")} from="#8c9a56" to="#55612f" />
        <Gradient id={id("forest-dark")} from="#46582a" to="#232f14" />
        <Gradient id={id("nuts")} from="#d79a55" to="#a7642a" vertical />
        <linearGradient id={id("glass")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity=".95" />
          <stop offset=".6" stopColor="#f5f0d2" stopOpacity=".85" />
          <stop offset="1" stopColor="#e2dbb0" stopOpacity=".9" />
        </linearGradient>
        <clipPath id={id("jar")}>
          <rect x="44" y="49" width="28" height="35" rx="6" />
        </clipPath>
        <SoftShadow id={id("soft")} />
      </defs>
      <ellipse cx="46" cy="85" rx="33" ry="4.2" fill="#3a2e1c" opacity=".13" />
      <path d="M26 33C19 30 15 22 17 14c7 3 11 11 9 19Z" fill={url("leaf")} />
      <path d="M34 32c1-8 7-14 15-14-2 8-8 13-15 14Z" fill={url("leaf")} />
      <path
        d="M26 33c-3-7-5-12-8-17M34 32c5-5 9-9 13-12"
        stroke="#3f4a22"
        strokeOpacity=".45"
        strokeWidth=".9"
        fill="none"
        strokeLinecap="round"
      />
      <g filter={url("soft")}>
        <path
          d="m21 33 2.5-3 2.5 3 2.5-3 2.5 3 2.5-3 2.5 3 2.5-3 2.5 3 3 7H18Z"
          fill={url("kraft-dark")}
        />
        <path d="M18 40h26l3 42q0 2-2 2H17q-2 0-2-2Z" fill={url("kraft")} />
        <path d="M38 40h6l3 42q0 2-2 2h-5Z" fill="#3a2e1c" opacity=".09" />
        <path d="M18 40h26" stroke="#a87843" strokeWidth="1.2" />
        <rect x="20" y="51" width="20" height="17" rx="3.5" fill="#fefae0" />
        <path d="M30 54.5c3.5 2 4.5 5.5 2 9-3.5-1.5-4.5-5-2-9Z" fill="#606c38" />
        <path d="m30.5 56.5 1.1 6" stroke="#fefae0" strokeWidth=".7" strokeLinecap="round" />
        <rect x="23.5" y="65" width="13" height="1.4" rx=".7" fill="#7c8a4a" opacity=".55" />
      </g>
      <g filter={url("soft")}>
        <rect
          x="44"
          y="49"
          width="28"
          height="35"
          rx="6"
          fill={url("glass")}
          stroke="#cfc799"
          strokeWidth="1"
        />
        <g clipPath={url("jar")}>
          <rect x="44" y="60" width="28" height="26" fill={url("nuts")} />
          <ellipse cx="49" cy="61" rx="3.6" ry="2.4" fill="#bc6c25" />
          <ellipse cx="56" cy="60" rx="3.4" ry="2.3" fill="#e0a865" transform="rotate(-18 56 60)" />
          <ellipse cx="63" cy="61.5" rx="3.6" ry="2.4" fill="#9b5a20" transform="rotate(12 63 61.5)" />
          <ellipse cx="69.5" cy="60.5" rx="3" ry="2.2" fill="#dda15e" />
          <ellipse cx="52" cy="67" rx="3.2" ry="2.2" fill="#e8b97c" transform="rotate(20 52 67)" />
          <ellipse cx="60" cy="68" rx="3.4" ry="2.3" fill="#c07432" />
          <ellipse cx="67" cy="67.5" rx="3" ry="2.1" fill="#e0a865" transform="rotate(-25 67 67.5)" />
          <ellipse cx="48" cy="73" rx="3" ry="2.1" fill="#a8652a" />
          <ellipse cx="56" cy="75" rx="3.4" ry="2.3" fill="#dda15e" transform="rotate(-10 56 75)" />
          <ellipse cx="64" cy="74" rx="3.2" ry="2.2" fill="#b56a28" />
          <ellipse cx="70" cy="77" rx="2.8" ry="2" fill="#e8b97c" />
        </g>
        <rect x="47" y="53" width="3" height="27" rx="1.5" fill="#fff" opacity=".75" />
        <rect x="45.5" y="46.5" width="25" height="4" rx="1.2" fill="#e4dfb8" />
        <rect x="45" y="39" width="26" height="9" rx="2.4" fill={url("forest-dark")} />
        <rect x="47" y="40.6" width="22" height="1.6" rx=".8" fill="#7c8a4a" opacity=".7" />
      </g>
      <g filter={url("soft")}>
        <circle cx="76" cy="25" r="11" fill={url("forest")} stroke="#fefae0" strokeWidth="2.5" />
        <path d="M76 19.5v11M70.5 25h11" stroke="#fefae0" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}

/* Paso 2 · Celular con "Finalizar pedido" tocado + globo de chat verde */
export function CheckoutIllustration(props: IllustrationProps) {
  const { id, url } = useSvgIds();
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false" {...props}>
      <defs>
        <Gradient id={id("forest")} from="#8c9a56" to="#55612f" />
        <Gradient id={id("forest-dark")} from="#46582a" to="#232f14" />
        <SoftShadow id={id("soft")} />
      </defs>
      <ellipse cx="44" cy="86" rx="25" ry="3.8" fill="#3a2e1c" opacity=".13" />
      <g filter={url("soft")}>
        <rect x="24" y="12" width="38" height="72" rx="7.5" fill={url("forest-dark")} />
        <rect x="27.5" y="18" width="31" height="60" rx="4" fill="#fefae0" />
        <rect x="38" y="14.3" width="10" height="2" rx="1" fill="#7c8a4a" opacity=".7" />
        <rect x="30.5" y="21.5" width="13" height="3" rx="1.5" fill="#7c8a4a" opacity=".55" />
        <rect x="30.5" y="29" width="8" height="8" rx="2" fill="#dda15e" opacity=".8" />
        <rect x="30.5" y="40.5" width="8" height="8" rx="2" fill="#bc6c25" opacity=".55" />
        <rect x="40.5" y="30" width="15" height="2" rx="1" fill="#3a2e1c" opacity=".25" />
        <rect x="40.5" y="34" width="9" height="1.8" rx=".9" fill="#bc6c25" opacity=".6" />
        <rect x="40.5" y="41.5" width="13" height="2" rx="1" fill="#3a2e1c" opacity=".25" />
        <rect x="40.5" y="45.5" width="9" height="1.8" rx=".9" fill="#bc6c25" opacity=".6" />
        <path d="M30.5 54.5h25" stroke="#3a2e1c" strokeOpacity=".18" strokeDasharray="1.5 1.5" />
        <rect x="30.5" y="57.5" width="10" height="1.8" rx=".9" fill="#3a2e1c" opacity=".25" />
        <rect x="47.5" y="57.5" width="8" height="1.8" rx=".9" fill="#283618" opacity=".45" />
        <rect x="30.5" y="66" width="25" height="8" rx="4" fill={url("forest")} />
        <rect x="35" y="69.2" width="16" height="1.6" rx=".8" fill="#fefae0" opacity=".9" />
      </g>
      <circle cx="47" cy="70" r="6.5" fill="none" stroke="#dda15e" strokeWidth="1.6" opacity=".9" />
      <circle cx="47" cy="70" r="10.5" fill="none" stroke="#dda15e" strokeWidth="1.2" opacity=".45" />
      <g filter={url("soft")}>
        <path
          d="M59 18h16a9 9 0 0 1 9 9v6a9 9 0 0 1-9 9H61l-8 6 1.5-7.5A9 9 0 0 1 50 33v-6a9 9 0 0 1 9-9Z"
          fill={url("forest")}
        />
        <path
          d="M57.5 25.5h2.6l2.4 8.6h9.6l2.2-6.2h-13"
          fill="none"
          stroke="#fefae0"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="64" cy="37.6" r="1.5" fill="#fefae0" />
        <circle cx="71" cy="37.6" r="1.5" fill="#fefae0" />
        <circle cx="78.5" cy="23.5" r="3.2" fill="#dda15e" />
        <path
          d="m77.1 23.6 1 1 1.8-2"
          fill="none"
          stroke="#283618"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/* Paso 3 · Avión de papel + mensaje con nombre/localidad + mapa con pin */
export function SendMessageIllustration(props: IllustrationProps) {
  const { id, url } = useSvgIds();
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false" {...props}>
      <defs>
        <Gradient id={id("map")} from="#ece7c3" to="#dcd6a8" vertical />
        <Gradient id={id("rust")} from="#da8a43" to="#a95c1c" />
        <Gradient id={id("paper")} from="#fff" to="#f1ecd0" />
        <SoftShadow id={id("soft")} />
      </defs>
      <ellipse cx="45" cy="87" rx="34" ry="3.8" fill="#3a2e1c" opacity=".13" />
      <g filter={url("soft")}>
        <path d="m12 64 20-6v22l-20 6Zm42 0 22-6v22l-22 6Z" fill={url("map")} />
        <path d="m32 58 22 6v22l-22-6Z" fill="#d3cc98" />
        <circle cx="21" cy="71" r="3.4" fill="#7c8a4a" opacity=".45" />
        <circle cx="69" cy="77" r="3.2" fill="#7c8a4a" opacity=".45" />
        <path
          d="M12 78q12-8 21-5t21 3 22-8"
          fill="none"
          stroke="#fefae0"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path
          d="M18 81q12-9 22-5t23-5"
          fill="none"
          stroke="#bc6c25"
          strokeWidth="1.3"
          strokeDasharray="2 2.2"
          strokeLinecap="round"
        />
      </g>
      <ellipse cx="64" cy="72.5" rx="4" ry="1.4" fill="#3a2e1c" opacity=".3" />
      <g filter={url("soft")}>
        <path d="M64 72S54 61 54 54a10 10 0 0 1 20 0c0 7-10 18-10 18Z" fill={url("rust")} />
        <circle cx="64" cy="54" r="4" fill="#fefae0" />
        <path
          d="M58 50a7 7 0 0 1 4-3.5"
          fill="none"
          stroke="#fff"
          strokeOpacity=".55"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </g>
      <path
        d="M6 52c6-2 9-7 15-12"
        fill="none"
        stroke="#dda15e"
        strokeWidth="1.5"
        strokeDasharray="2.2 2.6"
        strokeLinecap="round"
      />
      <g filter={url("soft")}>
        <path d="m12 30 40-16-24 22Z" fill={url("paper")} />
        <path d="m28 36 24-22-19 32Z" fill="#e4dfb8" />
        <path d="m28 36 5 10-7-5.5Z" fill="#c9c296" />
        <path
          d="m12 30 40-16-19 32-7-5.5 2-4.5Z"
          fill="none"
          stroke="#3a2e1c"
          strokeOpacity=".18"
          strokeWidth=".8"
          strokeLinejoin="round"
        />
      </g>
      <g filter={url("soft")}>
        <path
          d="M66 10h16a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H70l-5 4.5.6-4.7A5 5 0 0 1 61 23v-8a5 5 0 0 1 5-5Z"
          fill="#fff"
        />
        <rect x="66" y="15" width="16" height="2.2" rx="1.1" fill="#606c38" opacity=".7" />
        <rect x="66" y="20.5" width="10" height="2.2" rx="1.1" fill="#bc6c25" opacity=".7" />
      </g>
    </svg>
  );
}

/* Paso 4 · Caja de envío + globo "escribiendo" + moneda */
export function DeliveryIllustration(props: IllustrationProps) {
  const { id, url } = useSvgIds();
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" focusable="false" {...props}>
      <defs>
        <Gradient id={id("box-top")} from="#f0d6aa" to="#ddb67f" />
        <Gradient id={id("box-left")} from="#d3a46a" to="#bf8d52" vertical />
        <Gradient id={id("box-right")} from="#b98747" to="#9e7038" vertical />
        <radialGradient id={id("coin")} cx=".35" cy=".3" r=".8">
          <stop offset="0" stopColor="#f7d79f" />
          <stop offset=".55" stopColor="#e3aa66" />
          <stop offset="1" stopColor="#c88a45" />
        </radialGradient>
        <SoftShadow id={id("soft")} />
      </defs>
      <ellipse cx="48" cy="86" rx="33" ry="4" fill="#3a2e1c" opacity=".13" />
      <g filter={url("soft")}>
        <path d="m20 48 28 8v28l-28-9Z" fill={url("box-left")} />
        <path d="m48 56 26-10v28l-26 10Z" fill={url("box-right")} />
        <path d="m20 48 26-10 28 8-26 10Z" fill={url("box-top")} />
        <path
          d="m20 48 28 8 26-10"
          fill="none"
          stroke="#fff3d8"
          strokeOpacity=".6"
          strokeWidth=".9"
          strokeLinejoin="round"
        />
        <path d="m30.7 44.4 4.6-1.8 28 8-4.6 1.8Z" fill="#dda15e" />
        <path d="m58.7 52.4 4.6-1.8v28l-4.6 1.8Z" fill="#c88a45" />
        <ellipse
          cx="34"
          cy="66"
          rx="6.2"
          ry="6.6"
          fill="none"
          stroke="#606c38"
          strokeOpacity=".7"
          strokeWidth="1.2"
          transform="skewY(16) translate(0 -9.6)"
        />
        <path d="M34 61.5c3 2 3.5 5.5 1 8.5-3.2-1.4-3.8-5-1-8.5Z" fill="#606c38" opacity=".85" />
      </g>
      <g filter={url("soft")}>
        <path
          d="M17 9h20a8 8 0 0 1 8 8v4a8 8 0 0 1-8 8h-4l3 6.5-9-6.5H17a8 8 0 0 1-8-8v-4a8 8 0 0 1 8-8Z"
          fill="#fff"
        />
        <circle cx="19" cy="19" r="2.4" fill="#606c38" />
        <circle cx="27" cy="19" r="2.4" fill="#7c8a4a" opacity=".8" />
        <circle cx="35" cy="19" r="2.4" fill="#7c8a4a" opacity=".55" />
      </g>
      <g filter={url("soft")}>
        <circle cx="76" cy="73" r="11" fill={url("coin")} />
        <circle cx="76" cy="73" r="8" fill="none" stroke="#b97a36" strokeOpacity=".6" strokeWidth="1.1" />
        <path
          d="M79 69.2c-.8-1-2-1.5-3.2-1.5-1.9 0-3.2 1-3.2 2.4 0 3.4 6.6 1.8 6.6 5.3 0 1.5-1.4 2.5-3.4 2.5-1.4 0-2.7-.6-3.5-1.6M76 66.2v1.5m0 10.3v1.6"
          fill="none"
          stroke="#8a4e17"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M69.5 69a8 8 0 0 1 4-3.6"
          fill="none"
          stroke="#fff"
          strokeOpacity=".6"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
      </g>
      <path d="M84 52v5m-2.5-2.5h5" stroke="#dda15e" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="56" r="1.6" fill="#7c8a4a" opacity=".6" />
    </svg>
  );
}
