import { motion } from 'motion/react';
import { Diamond, CheckCircle, Shield, Smile, Lightbulb } from 'lucide-react';

export function About() {
  return (
    <div className="py-20 px-4 bg-kayhab-cream min-h-screen">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-playfair font-bold text-kayhab-primary mb-6">About KAYHAB</h1>
          <div className="w-24 h-1 bg-kayhab-caramel mx-auto rounded-full" />
        </motion.div>

        <div className="bg-white rounded-3xl p-8 md:p-16 shadow-xl shadow-kayhab-primary/5 mb-16 border border-kayhab-caramel/10">
          <div className="prose prose-lg max-w-none font-poppins text-kayhab-primary/80">
            <p className="text-xl md:text-2xl leading-relaxed font-playfair text-kayhab-primary mb-8 text-center">
              KAYHAB is a Nigerian luxury fashion brand committed to delivering elegant shoes, handbags, and clothing for women who value style, confidence, and quality.
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 mt-12">
              <div>
                <h3 className="font-playfair text-2xl font-bold text-kayhab-primary mb-4 flex items-center">
                  <span className="w-8 h-px bg-kayhab-caramel mr-4"></span> Our Story
                </h3>
                <p className="mb-6 leading-relaxed">
                  We believe luxury should be timeless, accessible, and unforgettable. Born out of a passion for high-end fashion, KAYHAB was established to bridge the gap between premium quality and modern elegance in the Nigerian fashion landscape.
                </p>
              </div>
              <div>
                <h3 className="font-playfair text-2xl font-bold text-kayhab-primary mb-4 flex items-center">
                  <span className="w-8 h-px bg-kayhab-caramel mr-4"></span> Our Commitment
                </h3>
                <p className="mb-6 leading-relaxed">
                  Every collection is carefully selected to reflect sophistication while meeting the lifestyle of today's modern woman. Our mission is to ensure every customer enjoys exceptional fashion with outstanding customer service.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-playfair font-bold text-kayhab-primary mb-4">Our Values</h2>
          <p className="font-poppins text-kayhab-primary/60">The pillars that define the KAYHAB experience</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Quality', icon: Diamond, desc: 'Uncompromising attention to detail and materials.' },
            { title: 'Elegance', icon: Diamond, desc: 'Timeless designs that radiate sophistication.' },
            { title: 'Integrity', icon: Shield, desc: 'Honest, transparent, and trustworthy in all we do.' },
            { title: 'Customer Satisfaction', icon: Smile, desc: 'Your happiness is our ultimate luxury.' },
            { title: 'Innovation', icon: Lightbulb, desc: 'Constantly evolving to bring you the best in fashion.' },
          ].map((value, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-kayhab-primary text-kayhab-cream p-8 rounded-2xl text-center shadow-lg border border-kayhab-gold/10"
            >
              <div className="w-12 h-12 rounded-full bg-kayhab-gold/20 flex items-center justify-center mx-auto mb-4 text-kayhab-gold">
                <value.icon className="w-6 h-6" />
              </div>
              <h4 className="font-playfair text-xl font-bold mb-2">{value.title}</h4>
              <p className="font-poppins text-sm text-kayhab-cream/70">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
