import Image from "next/image";
import { Building2, Waves, Home } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Waves,
    title: "Coastal Retreats",
    body: "Beachfront chalets and villas with private club access and resort-grade amenities.",
    href: "/coastal",
    image: "/media/img/nmq-600x400-1.jpg",
    tag: "North Coast",
  },
  {
    icon: Building2,
    title: "Prime Commercial",
    body: "Mixed-use developments positioned in thriving business districts for flagship tenants.",
    href: "/commercial",
    image: "/media/img/prive-mall.jpg",
    tag: "New Capital",
  },
  {
    icon: Home,
    title: "Luxury Residences",
    body: "Designer residences in gated communities with concierge services and smart living.",
    href: "/residential-projects",
    image: "/media/img/mid_town_new_cairo.jpg",
    tag: "New Cairo",
  },
];

export default function FeatureCards() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-orange-700">
            Our Portfolio
          </span>
          <h2 className="mt-6 text-4xl font-bold text-gray-900 sm:text-5xl">
            Signature Collections
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            From coastline escapes to city landmarks, explore the destinations that define Egypt&apos;s premium real estate market.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, body, href, image, tag }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-900/90 shadow-xl shadow-orange-100/50"
            >
              <div className="relative h-[420px] w-full">
                <Image
                  src={image}
                  alt={title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              </div>

              <div className="absolute top-5 left-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur">
                  <Icon size={24} className="text-white" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.4em] text-white/70">
                  {tag}
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm text-white/75 leading-relaxed">{body}</p>
                <Link
                  href={href}
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.4em] text-white/80 transition-colors duration-300 hover:text-orange-200"
                >
                  Explore Collection
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
