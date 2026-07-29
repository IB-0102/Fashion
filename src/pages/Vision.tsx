import { motion } from 'motion/react';
import { Eye, Target, Sparkles } from 'lucide-react';

export function Vision() {
  return (
    <div className="py-20 px-4 bg-kayhab-cream min-h-screen">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-kayhab-primary mb-6">Our Vision</h1>
          <div className="w-24 h-1 bg-kayhab-caramel mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-12">
          {/* Vision */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-10 md:p-14 rounded-3xl shadow-xl shadow-kayhab-primary/5 relative overflow-hidden border border-kayhab-caramel/10"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-kayhab-gold/10 rounded-bl-full -z-10" />
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-kayhab-primary/10 flex items-center justify-center mr-4 text-kayhab-primary">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-playfair font-bold text-kayhab-primary">The Vision</h2>
            </div>
            <p className="text-xl md:text-2xl font-playfair leading-relaxed text-kayhab-primary/80">
              "To become one of Nigeria's leading luxury fashion brands recognized for elegance, premium quality, innovation, and exceptional customer experience."
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-kayhab-primary text-kayhab-cream p-10 md:p-14 rounded-3xl shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-32 h-32 bg-kayhab-gold/10 rounded-br-full z-0" />
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-kayhab-cream/10 flex items-center justify-center mr-4 text-kayhab-gold">
                  <Target className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-playfair font-bold">Our Mission</h2>
              </div>
              <p className="text-xl md:text-2xl font-playfair leading-relaxed text-kayhab-cream/90">
                "To provide premium fashion products that empower women to express confidence and sophistication."
              </p>
            </div>
          </motion.div>

          {/* Core Values */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white p-10 rounded-3xl shadow-xl shadow-kayhab-primary/5 border border-kayhab-caramel/10 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-kayhab-gold/20 flex items-center justify-center mx-auto mb-6 text-kayhab-gold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-playfair font-bold text-kayhab-primary mb-8">Core Values</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['Excellence', 'Trust', 'Creativity', 'Elegance', 'Professionalism', 'Customer Satisfaction'].map((value, idx) => (
                <span key={idx} className="px-6 py-3 bg-kayhab-cream text-kayhab-primary font-poppins font-semibold rounded-full border border-kayhab-primary/10">
                  {value}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
