
import React, { useEffect, useRef } from 'react';
import { Check, Star, Crown, Music } from 'lucide-react';
import { gsap } from 'gsap';

const Premium = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
    }
    if (cardsRef.current) {
      gsap.fromTo(cardsRef.current.children,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, delay: 0.3, ease: "power2.out" }
      );
    }
  }, []);

  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      features: [
        "Limited skips",
        "Ads between songs",
        "Standard audio quality",
        "Shuffle play only",
        "Limited downloads"
      ],
      buttonText: "Current Plan",
      buttonClass: "bg-gray-600 text-white cursor-not-allowed",
      icon: Music,
      popular: false
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "month",
      features: [
        "Unlimited skips",
        "No ads",
        "High quality audio",
        "Choose what to play",
        "Unlimited downloads",
        "Offline listening",
        "Background play"
      ],
      buttonText: "Upgrade Now",
      buttonClass: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700",
      icon: Star,
      popular: true
    },
    {
      name: "Family",
      price: "$15.99",
      period: "month",
      features: [
        "Everything in Premium",
        "6 accounts",
        "Family mix playlist",
        "Parental controls",
        "Individual profiles",
        "Block explicit content"
      ],
      buttonText: "Choose Family",
      buttonClass: "bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700",
      icon: Crown,
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <div ref={containerRef} className="max-w-7xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Choose Your Music Experience
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Unlock the full potential of NYONKS Music with our premium plans
          </p>
        </div>

        {/* Pricing Cards */}
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative bg-black/40 backdrop-blur-xl rounded-2xl p-8 border transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-purple-500 shadow-2xl shadow-purple-500/20' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <plan.icon className="w-12 h-12 mx-auto mb-4 text-purple-400" />
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-400">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center">
                    <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-lg font-medium transition-all duration-300 ${plan.buttonClass}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-black/20 backdrop-blur-xl rounded-2xl p-12 border border-white/10">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Premium?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🎵",
                title: "Ad-Free Music",
                description: "Enjoy uninterrupted music without any advertisements"
              },
              {
                icon: "📱",
                title: "Offline Downloads",
                description: "Download your favorite songs and listen offline anywhere"
              },
              {
                icon: "🔊",
                title: "High Quality Audio",
                description: "Experience crystal clear sound with high-quality audio streaming"
              },
              {
                icon: "⏭️",
                title: "Unlimited Skips",
                description: "Skip as many songs as you want to find your perfect track"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time. You'll continue to have premium access until the end of your current billing period."
              },
              {
                question: "What happens to my downloaded music if I cancel?",
                answer: "Downloaded music will become unavailable once your subscription ends, but your playlists and account data remain intact."
              },
              {
                question: "Can I upgrade or downgrade my plan?",
                answer: "Absolutely! You can change your plan at any time. Changes take effect at your next billing cycle."
              },
              {
                question: "Is there a student discount?",
                answer: "Yes, we offer a 50% discount for eligible students. Contact support with your student verification."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-black/20 backdrop-blur-xl rounded-lg p-6 border border-white/10">
                <h3 className="text-lg font-semibold mb-2 text-white">{faq.question}</h3>
                <p className="text-gray-400">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
