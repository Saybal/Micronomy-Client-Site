import React from 'react';
import HeroSection from './HeroSection';
import Top_Workers from './Top_Workers';
import Testimonial from './Testimonial';
import { useTheme } from '../../Hooks/useTheme';
import ExtraSections from './ExtraSections';

const Home = () => {

    const currentTheme = useTheme();
    return (
        <div className={`min-h-screen ${currentTheme === "acid"
          ? "bg-gradient-to-br from-white via-indigo-50 to-indigo-100"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
      }}`}>
            <HeroSection />
            <Top_Workers />
            <Testimonial />
            <ExtraSections/>
        </div>
    );
};

export default Home;