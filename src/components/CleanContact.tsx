"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  Calendar,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Office",
    details: ["123 Real Estate Street", "Cairo, Egypt 12345"],
    color: "bg-blue-50 text-blue-600",
    action: "Get Directions",
  },
  {
    icon: Phone,
    title: "Phone Number",
    details: ["+20 123 456 7890", "+20 987 654 3210"],
    color: "bg-green-50 text-green-600",
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Address",
    details: ["info@ythebrokers.com", "sales@ythebrokers.com"],
    color: "bg-orange-50 text-orange-600",
    action: "Send Email",
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
    color: "bg-purple-50 text-purple-600",
    action: "Schedule Meeting",
  },
];

const socialLinks = [
  {
    icon: Facebook,
    href: "#",
    label: "Facebook",
    color: "hover:text-blue-600",
  },
  {
    icon: Instagram,
    href: "#",
    label: "Instagram",
    color: "hover:text-pink-600",
  },
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:text-blue-400" },
  {
    icon: Linkedin,
    href: "#",
    label: "LinkedIn",
    color: "hover:text-blue-700",
  },
  { icon: Youtube, href: "#", label: "YouTube", color: "hover:text-red-600" },
];

const services = [
  "Buy a Home",
  "Sell a Home",
  "Rent a Property",
  "Property Valuation",
  "Investment Advisory",
  "Property Management",
  "Legal Support",
  "Mortgage Assistance",
];

export default function CleanContact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
    budget: "",
    propertyType: "",
    location: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref, inView } = useInView({ threshold: 0.1 });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.phone.trim()) errors.phone = "Phone is required";
    if (!formData.service) errors.service = "Please select a service";
    if (!formData.message.trim()) errors.message = "Message is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Form submitted:", formData);
      toast.success(
        "Your message has been sent successfully! We'll get back to you within 24 hours."
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        budget: "",
        propertyType: "",
        location: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch With Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to start your real estate journey? Contact our expert team for
            personalized consultation and discover how we can help you achieve
            your property goals.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div
                  className={`w-12 h-12 ${info.color} rounded-xl flex items-center justify-center mx-auto mb-4`}
                >
                  <info.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {info.title}
                </h3>
                <div className="space-y-1 mb-4">
                  {info.details.map((detail, idx) => (
                    <p key={detail} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full border-orange-500 text-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-300 text-sm py-2"
                >
                  {info.action}
                </Button>
              </div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-xl shadow-lg p-8 border border-gray-100"
          >
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Send Us a Message
              </h3>
              <p className="text-gray-600">
                Fill out the form below and we&apos;ll get back to you within 24
                hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${
                      formErrors.name
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${
                      formErrors.email
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your email"
                  />
                  {formErrors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${
                      formErrors.phone
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                    placeholder="Enter your phone number"
                  />
                  {formErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Service Needed *
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 ${
                      formErrors.service
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300"
                    }`}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {formErrors.service && (
                    <p className="text-red-500 text-xs mt-1">
                      {formErrors.service}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none ${
                    formErrors.message
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Tell us about your requirements..."
                ></textarea>
                {formErrors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {formErrors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center px-6 py-3 bg-orange-600 text-white rounded-xl hover:bg-orange-700 transition-all duration-300 font-semibold disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Send size={20} className="mr-2 animate-pulse" /> Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} className="mr-2" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Social Media & Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Social Media */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full bg-gray-100 text-gray-600 hover:bg-orange-600 hover:text-white transition-all duration-300 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Quick Actions
            </h3>
            <div className="space-y-4">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 rounded-xl font-semibold transition-all duration-300">
                <MessageCircle size={20} className="mr-2" />
                WhatsApp Chat
              </Button>
              <Button
                variant="outline"
                className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white py-3 rounded-xl font-semibold transition-all duration-300"
              >
                <Calendar size={20} className="mr-2" />
                Schedule Meeting
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
