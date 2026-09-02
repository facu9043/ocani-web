import Link from "next/link";

const WHATSAPP_URL = "https://wa.me/543624158218";
const INSTAGRAM_URL = "https://instagram.com/ocani_mayorista";
const ADDRESS = "Tomás García P 172, Resistencia, Chaco";
const MAPS_URL = "https://maps.app.goo.gl/jTgB6WnmwEoW2ckVA";

export default function Footer() {
  return (
    <footer className="bg-forest-dark text-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-xl font-semibold text-gold">Ocani</span>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              Frutos secos, semillas, harinas y más. Dietética mayorista con envíos a
              todo Argentina.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-gold uppercase">
              Contacto
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-cream/80">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  WhatsApp: +54 3624 15-8218
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  @ocani_mayorista
                </a>
              </li>
              <li>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                  {ADDRESS}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-gold uppercase">
              Horario de atención
            </h3>
            <ul className="mt-3 space-y-1 text-sm text-cream/80">
              <li>Lunes a viernes</li>
              <li>9:00 a 13:00 y 16:00 a 20:00 hs</li>
              <li className="pt-1.5">Sábados</li>
              <li>10:30 a 13:30 hs</li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold tracking-wide text-gold uppercase">
              Navegación
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-cream/80">
              <li>
                <Link href="/catalogo" className="hover:text-gold">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link href="/sobre-nosotros" className="hover:text-gold">
                  Sobre Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-gold">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-cream/15 pt-6 text-center text-xs text-cream/60">
          Precios mayoristas a partir de 1 kg por producto (o bulto cerrado) · © {new Date().getFullYear()} Ocani
        </div>
      </div>
    </footer>
  );
}
