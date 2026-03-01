import { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { events } from "../data/events";
import Footblue from "../components/Footblue";
import Footered from "../components/Footered";

export default function EventsList() {
  const navigate = useNavigate();
  const { category } = useParams();
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to top when the component mounts or category changes
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const filteredEvents = events.filter(
    (event) =>
      event.category &&
      category &&
      event.category.toLowerCase() === category.toLowerCase()
  );

  const isTechnical = category?.toLowerCase() === "technical";
  
  // Theme constants
  const theme = {
    text: isTechnical ? "text-blue-500" : "text-red-500",
    headingShadow: isTechnical 
      ? "drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" 
      : "drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  // Separate AI Arena for Technical
  const flagshipEvent = isTechnical ? filteredEvents.find(e => e.name === "AI Arena") : null;
  const displayEvents = isTechnical ? filteredEvents.filter(e => e.name !== "AI Arena") : filteredEvents;

  return (
    <div className="min-h-screen bg-black px-4 sm:px-8 lg:px-12 pt-24 pb-16 overflow-x-hidden font-inter">
      <div className="max-w-7xl mx-auto">

        {/* BACK BUTTON */}
        <motion.button
          onClick={() => navigate("/#events")}
          className={`flex items-center gap-2 mb-12 ${theme.text} hover:opacity-80 transition-opacity group`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-base font-semibold tracking-wide">BACK TO HOME</span>
        </motion.button>

        {/* TITLE */}
        <h1 className={`text-3xl md:text-5xl font-bold mb-16 text-center uppercase tracking-widest ${theme.text} ${theme.headingShadow}`}>
          {category} Events
        </h1>

        {/* FLAGSHIP EVENT (Technical Only) */}
        {flagshipEvent && (
          <div className="relative w-full mt-20 mb-24">
            {/* Background Stage */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-black to-black -z-10" />
            
            {/* Halo Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 blur-3xl bg-blue-500/10 rounded-full -z-10" />

            <div className="max-w-6xl mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <FeaturedCard event={flagshipEvent} navigate={navigate} category={category} />
              </motion.div>
            </div>

            {/* Divider Line */}
            <div className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-blue-900/50 to-transparent mt-20" />
          </div>
        )}

        {/* GRID */}
        <motion.div 
          className={isTechnical ? "grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mt-10" : "flex flex-wrap justify-center gap-8 sm:gap-10"}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {displayEvents.map((event) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                className={isTechnical ? "flex justify-center w-full" : "flex justify-center w-full sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.67rem)]"}
              >
                <FlipCard
                  event={event}
                  navigate={navigate}
                  category={category}
                />
              </motion.div>
          ))}

        </motion.div>

        {/* EMPTY STATE */}
        {displayEvents.length === 0 && !flagshipEvent && (
          <p className="text-gray-400 text-center mt-20 text-lg">
            No events found in this category.
          </p>
        )}
      </div>

      {/* SPACE BEFORE FOOTER */}
      <div className="mt-24">
        {isTechnical ? <Footblue /> : <Footered />}
      </div>
    </div>
  );
}

/* ===========================
   FLIP CARD
=========================== */

function FlipCard({ event, navigate, category }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const isTechnical = category?.toLowerCase() === "technical";

  // Theme Configuration
  const theme = {
    text: isTechnical ? "text-blue-500" : "text-red-500",
    border: isTechnical ? "border-blue-500/40" : "border-red-500/40",
    shadow: isTechnical ? "shadow-[0_0_12px_rgba(59,130,246,0.35)]" : "shadow-[0_0_12px_rgba(255,0,0,0.35)]",
    buttonBg: isTechnical ? "bg-blue-600 hover:bg-blue-500" : "bg-red-600 hover:bg-red-500",
    buttonShadow: isTechnical ? "hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]" : "hover:shadow-[0_0_15px_rgba(220,38,38,0.6)]",
    badge: isTechnical ? "bg-blue-500/10 text-blue-400 border-blue-500/20" : "bg-red-500/10 text-red-400 border-red-500/20",
    divider: isTechnical ? "bg-blue-500/20" : "bg-red-500/20"
  };

  function handleMouseLeave() {
    if (window.innerWidth >= 1024) setIsFlipped(false);
  }

  return (
    <motion.div
      className="w-full max-w-[340px] h-[420px] perspective cursor-pointer group"
      onMouseEnter={() => window.innerWidth >= 1024 && setIsFlipped(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => window.innerWidth < 1024 && setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.02, translateY: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="relative w-full h-full rounded-2xl transition-transform duration-700 preserve-3d"
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* FRONT FACE */}
        <div 
          className={`absolute inset-0 backface-hidden rounded-2xl overflow-hidden border ${theme.border} ${theme.shadow} bg-black/80 backdrop-blur-sm`}
        >
          <img
            src={event.poster}
            alt={event.name}
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
        </div>

        {/* BACK FACE */}
        <div
          className={`absolute inset-0 backface-hidden rounded-2xl border ${theme.border} ${theme.shadow} bg-black/95 backdrop-blur-md p-6 flex flex-col justify-between`}
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="space-y-4">
            {/* Title */}
            <h2 className={`text-lg font-semibold tracking-wide uppercase ${theme.text}`}>
              {event.name}
            </h2>

            {/* Divider */}
            <div className={`h-px w-full ${theme.divider}`} />

            {/* Description */}
            <p className="text-sm text-gray-300 leading-relaxed line-clamp-5">
              {event.description}
            </p>

            {/* Badge */}
            <div className="flex">
              <span className={`text-xs font-medium uppercase px-3 py-1 rounded-full border ${theme.badge}`}>
                {event.type || "Team / Solo"}
              </span>
            </div>
          </div>

          {/* Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/events/${category}/${event.id}`);
            }}
            className={`w-full py-3 rounded-lg text-white font-medium tracking-wide transition-all duration-300 shadow-lg ${theme.buttonBg} ${theme.buttonShadow}`}
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ===========================
   FEATURED CARD (AI ARENA)
=========================== */

function FeaturedCard({ event, navigate, category }) {
  return (
    <div
      onClick={() => navigate(`/events/${category}/${event.id}`)}
      className="relative w-full h-[520px] group overflow-hidden rounded-3xl cursor-pointer shadow-[0_0_40px_rgba(59,130,246,0.6)] hover:shadow-[0_0_60px_rgba(59,130,246,0.8)] transition-shadow duration-500"
    >
      {/* Background Image with Zoom */}
      <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105">
        <img
          src={event.poster}
          alt={event.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/70 transition-all duration-500" />

      {/* Flagship Badge */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full border border-blue-400/50 bg-black/30 backdrop-blur-md text-sm md:text-lg font-bold uppercase tracking-widest text-blue-400 z-20">
        FLAGSHIP EVENT
      </div>

      {/* Centered Title */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 transition-transform duration-500">
        <h2 className="text-4xl md:text-6xl font-bold tracking-wide text-white drop-shadow-lg">
          {event.name}
        </h2>
      </div>

      {/* Hover Reveal Description */}
      <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center text-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20 px-10">
        <p className="text-gray-300 text-sm max-w-2xl mb-4 line-clamp-2">
          {event.description}
        </p>
        
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-blue-500/40 font-medium tracking-wide">
          View Details
        </button>
      </div>
    </div>
  );
}