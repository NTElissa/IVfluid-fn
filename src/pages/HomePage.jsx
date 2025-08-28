import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Activity, 
  Shield, 
  Users, 
  Building, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3,
  Smartphone,
  Wifi,
  ArrowRight,
  Play
} from 'lucide-react';

const HomePage = () => {
  const [currentStat, setCurrentStat] = useState(0);
  const navigate = useNavigate();

  const stats = [
    { number: '500+', label: 'Active Patients', icon: Users },
    { number: '50+', label: 'Healthcare Facilities', icon: Building },
    { number: '99.9%', label: 'System Uptime', icon: Activity },
    { number: '24/7', label: 'Monitoring', icon: Clock }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'Continuous monitoring of IV fluid levels with instant alerts when intervention is needed.'
    },
    {
      icon: AlertTriangle,
      title: 'Smart Alerts',
      description: 'Intelligent notification system that alerts medical staff before critical situations occur.'
    },
    {
      icon: Shield,
      title: 'Patient Safety',
      description: 'Enhanced patient safety through automated monitoring and reduced human error.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics and reporting to optimize healthcare delivery and resource allocation.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Access',
      description: 'Access patient data and receive alerts on any device, anywhere in the healthcare facility.'
    },
    {
      icon: Wifi,
      title: 'IoT Integration',
      description: 'Seamless integration with existing hospital systems and IoT infrastructure.'
    }
  ];

  const benefits = [
    'Reduce medical errors by up to 85% with automated monitoring',
    'Improve patient outcomes through proactive care management',
    'Optimize nursing workflow and resource allocation',
    'Decrease medication waste and healthcare costs',
    'Enable data-driven decision making for hospital administrators',
    'Ensure compliance with healthcare standards and regulations'
  ];

  return (
    <div className="min-h-screen font-sans bg-slate-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 z-50 py-4">
        <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Heart size={32} className="text-blue-500" />
            <div>
              <h1 className="text-white text-2xl font-bold">SmartIV Monitor</h1>
              <p className="text-slate-400 text-xs">Rwanda Healthcare Network</p>
            </div>
          </div>

          <nav className="flex items-center gap-8">
            <a href="#features" className="text-slate-300 font-medium hover:text-blue-500 transition">Features</a>
            <a href="#benefits" className="text-slate-300 font-medium hover:text-blue-500 transition">Benefits</a>
            <a href="#about" className="text-slate-300 font-medium hover:text-blue-500 transition">About</a>
            <a href="#contact" className="text-slate-300 font-medium hover:text-blue-500 transition">Contact</a>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
              onClick={() => navigate("/login")}
            >
              Access Dashboard
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Revolutionizing IV Fluid Monitoring in Rwanda</h1>
            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Advanced IoT-powered system that ensures patient safety through real-time IV fluid monitoring, 
              intelligent alerts, and comprehensive healthcare analytics.
            </p>
            <div className="flex gap-4">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-600 transition">
                Get Started <ArrowRight size={20} />
              </button>
              <button className="border-2 border-slate-700 text-slate-300 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:border-blue-500 hover:text-blue-500 transition">
                <Play size={20} /> Watch Demo
              </button>
            </div>
          </div>

          <div className="relative h-96 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-5 bg-gradient-to-br from-blue-500/10 to-emerald-500/10 rounded-xl flex flex-col items-center justify-center gap-5 text-center text-white">
              <Activity size={80} className="text-blue-500" />
              <div>
                <p className="text-lg font-semibold m-0">Live System Status</p>
                <p className="text-sm text-slate-300 m-0">Monitoring 247 patients across 12 facilities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-800 py-16">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-10 text-center text-white">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index}>
                <div className="flex justify-center mb-4">
                  <Icon size={32} className="text-blue-500" />
                </div>
                <h3 className="text-3xl font-bold text-blue-500 mb-2">{stat.number}</h3>
                <p className="text-slate-300">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-900 py-20">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Cutting-Edge Healthcare Technology</h2>
          <p className="text-slate-300 text-lg mb-16">Discover how SmartIV Monitor is transforming patient care across Rwanda's healthcare system</p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700/50 text-center hover:shadow-lg hover:scale-105 transition-transform">
                  <div className="flex justify-center mb-5">
                    <Icon size={32} className="text-blue-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="bg-slate-800 py-20">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Transforming Healthcare Outcomes</h2>
            <p className="text-slate-300 text-lg mb-12">Experience measurable improvements in patient care, operational efficiency, and clinical outcomes</p>
            <ul className="space-y-6">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-4 text-white">
                  <CheckCircle size={20} className="text-green-500 mt-1 flex-shrink-0" />
                  <p className="text-lg leading-relaxed">{benefit}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative h-96 bg-slate-800/50 rounded-2xl border border-slate-700/50 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-5 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl flex flex-col items-center justify-center gap-4 text-center text-white">
              <Shield size={64} className="text-green-500" />
              <div>
                <p className="font-semibold text-base m-0">Patient Safety First</p>
                <p className="text-sm text-slate-300 m-0">99.9% alert accuracy rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Healthcare Facility?</h2>
          <p className="text-slate-300 text-lg mb-8">Join leading hospitals across Rwanda in delivering safer, more efficient patient care</p>
          <div className="flex justify-center gap-4">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-blue-600 transition">
              Start Free Trial <ArrowRight size={20} />
            </button>
            <button className="border-2 border-slate-700 text-slate-300 px-6 py-3 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-500 transition">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 py-10 border-t border-slate-700/50">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <Heart size={24} className="text-blue-500" />
            <p className="text-slate-300 text-base font-medium">SmartIV Monitor</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-300 text-sm hover:text-blue-500 transition">Privacy Policy</a>
            <a href="#" className="text-slate-300 text-sm hover:text-blue-500 transition">Terms of Service</a>
            <a href="#" className="text-slate-300 text-sm hover:text-blue-500 transition">Support</a>
          </div>
          <p className="text-slate-400 text-sm">© 2025 SmartIV Monitor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
