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
  User,
  Building2,
  CheckCircle,
  AlertCircle,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import toast from "react-hot-toast";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Office",
    details: ["123 Real Estate Street", "Cairo, Egypt 12345"],
    color: "bg-blue-50 text-blue-600",
    action: "Get Directions",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+20 123 456 7890", "+20 987 654 3210"],
    color: "bg-green-50 text-green-600",
    action: "Call Now",
  },
  {
    icon: Mail,
    title: "Email Us",
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
  "Property Consultation",
  "Market Analysis",
  "Investment Advisory",
  "Property Management",
  "Legal Support",
  "Mortgage Assistance",
];

export default function ContactSection() {
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff7b34' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get In <span className="text-orange-600">Touch</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Ready to start your real estate journey? Contact our expert team for
            personalized consultation and discover how we can help you achieve
            your property goals.
          </p>
        </motion.div>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div
                className={`w-16 h-16 ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}
              >
                <info.icon size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {info.title}
              </h3>
              <div className="space-y-1 mb-4">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">
                    {detail}
                  </p>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full border-2 border-orange-200 text-orange-600 hover:bg-orange-50 hover:border-orange-300 transition-all duration-300"
              >
                {info.action}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Send Us a Message
              </h3>
              <p className="text-gray-600">
                Fill out the form below and we&apos;ll get back to you within 24
                hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
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
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
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
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
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
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
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
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={16} className="mr-1" />
                      {formErrors.service}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="propertyType"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select property type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="coastal">Coastal</option>
                    <option value="land">Land</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Budget Range
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-1m">Under 1M EGP</option>
                    <option value="1m-3m">1M - 3M EGP</option>
                    <option value="3m-5m">3M - 5M EGP</option>
                    <option value="5m-10m">5M - 10M EGP</option>
                    <option value="10m+">10M+ EGP</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Preferred Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
                  placeholder="Enter preferred location"
                />
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
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 resize-none ${
                    formErrors.message
                      ? "border-red-300 bg-red-50"
                      : "border-gray-300"
                  }`}
                  placeholder="Tell us about your requirements..."
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    {formErrors.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white py-4 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending Message...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send size={20} className="mr-2" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </motion.div>

          {/* Contact Information & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-8"
          >
            {/* Office Information */}
            <div className="bg-gradient-to-br from-orange-600 to-orange-700 rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Visit Our Office</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin size={24} className="mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Main Office</p>
                    <p className="text-orange-100">
                      123 Real Estate Street, Cairo, Egypt 12345
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone size={24} className="mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-orange-100">+20 123 456 7890</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail size={24} className="mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-orange-100">info@ythebrokers.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock size={24} className="mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold">Hours</p>
                    <p className="text-orange-100">
                      Mon-Fri: 9AM-6PM, Sat: 10AM-4PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin size={48} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Interactive Map</p>
                  <p className="text-sm text-gray-500">
                    Click to view location
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 ${social.color} transition-colors duration-300`}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
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
                <Button
                  variant="outline"
                  className="w-full border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <Phone size={20} className="mr-2" />
                  Call Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
