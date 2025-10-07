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
    borderColor: "border-blue-200"
  },
  {
    icon: Building2,
    title: "Commercial Real Estate",
    description: "Invest in prime commercial properties for maximum returns",
    features: ["Office Spaces", "Retail Units", "Warehouses", "Mixed-Use"],
    color: "bg-green-50 text-green-600",
    borderColor: "border-green-200"
  },
  {
    icon: Waves,
    title: "Coastal Properties",
    description: "Own a piece of paradise with our exclusive coastal properties",
    features: ["Beachfront Villas", "Resort Apartments", "Marina Views", "Investment Units"],
    color: "bg-cyan-50 text-cyan-600",
    borderColor: "border-cyan-200"
  },
  {
    icon: TrendingUp,
    title: "Investment Advisory",
    description: "Expert guidance for profitable real estate investments",
    features: ["Market Analysis", "ROI Calculations", "Risk Assessment", "Portfolio Management"],
    color: "bg-orange-50 text-orange-600",
    borderColor: "border-orange-200"
  },
  {
    icon: Shield,
    title: "Property Management",
    description: "Comprehensive property management services for landlords",
    features: ["Tenant Screening", "Rent Collection", "Maintenance", "Legal Support"],
    color: "bg-purple-50 text-purple-600",
    borderColor: "border-purple-200"
  },
  {
    icon: Users,
    title: "Consultation Services",
    description: "Professional consultation for all your real estate needs",
    features: ["Property Valuation", "Legal Advice", "Market Research", "Negotiation"],
    color: "bg-red-50 text-red-600",
    borderColor: "border-red-200"
  }
];

const processSteps = [
  {
    step: "01",
    title: "Initial Consultation",
    description: "We discuss your requirements, budget, and preferences"
  },
  {
    step: "02", 
    title: "Property Search",
    description: "Our team finds the best properties matching your criteria"
  },
  {
    step: "03",
    title: "Property Viewing",
    description: "Arrange visits to shortlisted properties with our experts"
  },
  {
    step: "04",
    title: "Negotiation",
    description: "We negotiate the best price and terms on your behalf"
  },
  {
    step: "05",
    title: "Legal Process",
    description: "Handle all legal documentation and property transfer"
  },
  {
    step: "06",
    title: "Completion",
    description: "Finalize the deal and hand over your new property"
  }
];

export default function CleanServices() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${service.borderColor} p-6 group`}
            >
              <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon size={24} />
              </div>
              
              <h3 className="text-lg font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">{service.description}</p>
              
              <ul className="space-y-2 mb-4">
                {service.features.slice(0, 3).map((feature, idx) => (
                  <li key={feature} className="flex items-center text-xs text-gray-600">
                    <CheckCircle size={14} className="text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="outline" 
                className={`w-full border-2 ${service.borderColor} text-gray-700 hover:bg-gray-50 transition-all duration-300 group-hover:border-orange-500 group-hover:text-orange-600 text-sm py-2`}
              >
                Learn More
                <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Process</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We follow a proven 6-step process to ensure a smooth and successful property transaction.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300">
                  <div className="text-3xl font-bold text-orange-600 mb-3">{step.step}</div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h4>
                  <p className="text-gray-600 leading-relaxed text-sm">{step.description}</p>
                </div>
                
                {/* Connector Line */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-orange-200 transform -translate-y-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
              Contact our expert team today for a free consultation and let us help you 
              achieve your real estate goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Get Free Consultation
              </Button>
              <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-6 py-3 rounded-xl font-semibold transition-all duration-300">
                View Our Properties
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
