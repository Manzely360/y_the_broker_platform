import { Building2, Waves, Home } from "lucide-react";
import Link from "next/link";

const features = [
  { icon: Waves, title: "Coastal Properties", body: "Luxury living in premium coastal resorts.", href: "/coastal" },
  { icon: Building2, title: "Commercial Space", body: "Premium office & commercial properties.", href: "/commercial" },
  { icon: Home, title: "Buy a Home", body: "Browse our residential collection.", href: "/residential-projects" },
];

export default function FeatureCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid md:grid-cols-3 gap-6">
      {features.map(({ icon: Icon, title, body, href }) => (
        <div key={title} className="rounded-2xl border bg-white shadow-sm p-6">
          <Icon className="h-8 w-8 text-orange-600" />
          <h3 className="mt-4 text-xl font-semibold">{title}</h3>
          <p className="mt-2 text-sm text-slate-600">{body}</p>
          <Link href={href} className="mt-4 inline-block text-sm font-medium text-orange-600 hover:text-orange-700">
            Explore →
          </Link>
        </div>
      ))}
    </section>
  );
}
