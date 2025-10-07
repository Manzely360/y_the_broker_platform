"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { 
  Home, 
  Building2, 
  Waves, 
  TrendingUp,
  Shield,
  Users,
  MapPin,
  Calculator,
  FileText,
  Search,
  Handshake,
  Star,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const services = [
  {
    icon: Home,
    title: "Residential Sales",
    description: "Find your perfect home with our extensive collection of residential properties",
    features: ["Luxury Villas", "Modern Apartments", "Townhouses", "Penthouses"],
    color: "bg-blue-50 text-blue-600",
    borderColor: "border-blue-200",
    hoverColor: "hover:bg-blue-50"
  },
  {
    icon: Building2,
    title: "Commercial Real Estate",
    description: "Invest in prime commercial properties for maximum returns",
    features: ["Office Spaces", "Retail Units", "Warehouses", "Mixed-Use"],
    color: "bg-green-50 text-green-600",
    borderColor: "border-green-200",
    hoverColor: "hover:bg-green-50"
  },
  {
    icon: Waves,
    title: "Coastal Properties",
    description: "Own a piece of paradise with our exclusive coastal properties",
    features: ["Beachfront Villas", "Resort Apartments", "Marina Views", "Investment Units"],
    color: "bg-cyan-50 text-cyan-600",
    borderColor: "border-cyan-200",
    hoverColor: "hover:bg-cyan-50"
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Expert guidance for profitable real estate investments",
    features: ["Market Analysis", "ROI Calculations", "Risk Assessment", "Portfolio Management"],
    color: "bg-orange-50 text-orange-600",
    borderColor: "border-orange-200",
    hoverColor: "hover:bg-orange-50"
  },
  {
    icon: Shield,
    title: "Property Management",
    description: "Comprehensive property management services for landlords",
    features: ["Tenant Screening", "Rent Collection", "Maintenance", "Legal Support"],
    color: "bg-purple-50 text-purple-600",
    borderColor: "border-purple-200",
    hoverColor: "hover:bg-purple-50"
  },
  {
    icon: Users,
    title: "Consultation Services",
    description: "Professional consultation for all your real estate needs",
    features: ["Property Valuation", "Legal Advice", "Market Research", "Negotiation"],
    color: "bg-red-50 text-red-600",
    borderColor: "border-red-200",
    hoverColor: "hover:bg-red-50"
  }
];

const processSteps = [
  {
    step: "01",
    title: "Initial Consultation",
    description: "We discuss your requirements, budget, and preferences",
    icon: Search,
    color: "bg-blue-100 text-blue-600"
  },
  {
    step: "02", 
    title: "Property Search",
    description: "Our team finds the best properties matching your criteria",
    icon: MapPin,
    color: "bg-green-100 text-green-600"
  },
  {
    step: "03",
    title: "Property Viewing",
    description: "Arrange visits to shortlisted properties with our experts",
    icon: Home,
    color: "bg-orange-100 text-orange-600"
  },
  {
    step: "04",
    title: "Negotiation",
    description: "We negotiate the best price and terms on your behalf",
    icon: Handshake,
    color: "bg-purple-100 text-purple-600"
  },
  {
    step: "05",
    title: "Legal Process",
    description: "Handle all legal documentation and property transfer",
    icon: FileText,
    color: "bg-red-100 text-red-600"
  },
  {
    step: "06",
    title: "Completion",
    description: "Finalize the deal and hand over your new property",
    icon: CheckCircle,
    color: "bg-green-100 text-green-600"
  }
];

const testimonials = [
  {
    name: "Ahmed Hassan",
    role: "Property Investor",
    image: "/media/img/testimonial-1.jpg",
    rating: 5,
    text: "Y The Brokers helped me find the perfect investment property. Their market knowledge and negotiation skills saved me thousands of EGP."
  },
  {
    name: "Sarah Mohamed",
    role: "First-time Buyer",
    image: "/media/img/testimonial-2.jpg", 
    rating: 5,
    text: "As a first-time buyer, I was nervous about the process. The team guided me through every step and made it stress-free."
  },
  {
    name: "Khaled Ali",
    role: "Business Owner",
    image: "/media/img/testimonial-3.jpg",
    rating: 5,
    text: "We needed a commercial space for our business. Y The Brokers found us the perfect location with great terms."
  }
];

export default function ServicesSection() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff7b34' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
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
            Our <span className="text-orange-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive real estate services tailored to meet your unique needs. 
            From buying and selling to investment advisory and property management.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${service.borderColor} ${service.hoverColor} p-8 group`}
            >
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={28} />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <CheckCircle size={16} className="text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className={`w-full border-2 ${service.borderColor} text-gray-700 hover:bg-gray-50 transition-all duration-300 group-hover:border-orange-500 group-hover:text-orange-600`}
              >
                Learn More
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a proven 6-step process to ensure a smooth and successful property transaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300">
                  <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <step.icon size={28} />
                  </div>
                  
                  <div className="text-4xl font-bold text-orange-600 mb-2">{step.step}</div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
                
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-orange-200 transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="bg-white rounded-3xl p-12 shadow-xl"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">What Our Clients Say</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about our services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                className="bg-gray-50 rounded-2xl p-8 text-center"
              >
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  &quot;{testimonial.text}&quot;
                </p>
                
                <div className="flex items-center justify-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-orange-600 font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-orange-100 mb-8 max-w-2xl mx-auto">
              Contact our expert team today for a free consultation and let us help you 
              achieve your real estate goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Get Free Consultation
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3 rounded-xl font-semibold transition-all duration-300">
                View Our Properties
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
