"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubscribed(true);
    setIsLoading(false);
    setEmail("");
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <Mail size={40} className="text-white" />
          </motion.div>

          {/* Header */}
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Stay in the Loop
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Get exclusive access to new properties, market insights, and special offers 
            delivered straight to your inbox.
          </p>

          {/* Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-orange-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-orange-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-orange-600 border-t-transparent rounded-full animate-spin" />
                      Subscribing...
                    </>
                  ) : (
                    <>
                      Subscribe
                      <Send size={18} />
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                className="bg-white/20 backdrop-blur-sm rounded-full p-6 border border-white/30"
              >
                <div className="flex items-center justify-center gap-3 text-white">
                  <CheckCircle size={24} className="text-green-300" />
                  <span className="font-semibold">Successfully subscribed!</span>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: "🏠", title: "New Properties", desc: "First access to latest listings" },
              { icon: "📊", title: "Market Insights", desc: "Weekly market analysis & trends" },
              { icon: "🎁", title: "Exclusive Offers", desc: "Special deals for subscribers" }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <div className="text-3xl mb-3">{benefit.icon}</div>
                <h4 className="text-lg font-semibold text-white mb-2">{benefit.title}</h4>
                <p className="text-orange-100 text-sm">{benefit.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Privacy Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-orange-200 text-sm mt-8"
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
