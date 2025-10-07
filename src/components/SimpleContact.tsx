"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Phone, Mail, Send, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

const contactHighlights = [
  {
    icon: Phone,
    title: "Direct Line",
    description: "+20 123 456 7890",
    href: "tel:+201234567890",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "info@ythebrokers.com",
    href: "mailto:info@ythebrokers.com",
  },
  {
    icon: Clock,
    title: "Availability",
    description: "Dedicated advisors 24/7",
  },
];

export default function SimpleContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.1 });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gray-900 py-20 lg:py-24">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.15),rgba(17,24,39,0.9))]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center text-white"
        >
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Let&apos;s Talk
          </p>
          <h2 className="mt-6 text-4xl font-bold sm:text-5xl">
            Schedule a Private Consultation
          </h2>
          <p className="mt-4 text-lg text-white/70 max-w-3xl mx-auto">
            Our senior advisors are on-call to help with acquisition planning, valuations, leasing strategies, and holistic property portfolios.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_1.4fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden rounded-3xl"
          >
            <Image
              src="/media/img/solana-by-ora-web-2.jpg"
              alt="Luxury waterfront property"
              width={760}
              height={920}
              className="h-full min-h-[420px] w-full object-cover"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-orange-900/40 to-black/70" />

            <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
              <div>
                <div className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.4em] text-white/70">
                  Headquarters
                </div>
                <h3 className="mt-4 text-3xl font-semibold">Y The Brokers</h3>
                <p className="mt-3 text-sm text-white/70 leading-relaxed">
                  123 Real Estate Street, Business District<br />
                  Cairo, Egypt 12345
                </p>
              </div>

              <div className="space-y-4">
                {contactHighlights.map(({ icon: Icon, title, description, href }) => (
                  <div
                    key={title}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                      <Icon size={22} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm uppercase tracking-widest text-white/60">{title}</p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-1 inline-flex text-lg font-semibold text-white hover:text-orange-200 transition-colors"
                        >
                          {description}
                        </a>
                      ) : (
                        <p className="mt-1 text-lg font-semibold text-white">{description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4 backdrop-blur">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                  <Users size={22} className="text-white" />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-white/70">Dedicated Team</p>
                  <p className="text-lg font-semibold">Property advisors, legal experts & financial analysts</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="rounded-3xl bg-white p-8 shadow-2xl shadow-orange-100/60"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                  Project Requirements
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-all duration-300 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200"
                  placeholder="Tell us more about your objectives, budget, and timelines..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 py-3 text-white transition-all duration-300 hover:from-orange-700 hover:to-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Request a Call Back
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 rounded-2xl bg-gray-50 p-5 text-sm text-gray-600">
              <p className="font-semibold text-gray-800">Prefer to visit our showroom?</p>
              <p className="mt-1">
                Book an in-person appointment at our Cairo headquarters or request a virtual property tour tailored to your shortlist.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
