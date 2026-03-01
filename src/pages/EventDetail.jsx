import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { events } from "../data/events";
import Footer from "../components/Footered";
import Footblue from "../components/Footblue";

export default function EventDetail() {
  const { category, eventId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const event = events.find((e) => e.id === eventId);

  const isTechnical = category === "technical";
  const theme = {
    text: isTechnical ? "text-blue-500" : "text-red-500",
    border: isTechnical ? "border-blue-800" : "border-red-800",
    cardBorder: isTechnical ? "border-blue-500/30" : "border-red-500/30",
    badgeBg: isTechnical ? "bg-blue-600" : "bg-red-600",
    bulletBg: isTechnical ? "bg-blue-500" : "bg-red-500",
    buttonGradient: isTechnical ? "from-blue-600 to-blue-500" : "from-red-600 to-red-500",
    buttonHover: isTechnical ? "hover:from-blue-500 hover:to-blue-600" : "hover:from-red-500 hover:to-red-600",
    shadowHex: isTechnical ? "#3b82f6" : "#ef4444",
    cardShadow: isTechnical ? "0 0 20px rgba(59, 130, 246, 0.3)" : "0 0 20px rgba(255, 0, 0, 0.3)",
    buttonShadow: isTechnical ? "hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]" : "hover:shadow-[0_0_25px_rgba(255,0,0,0.5)]"
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-3xl font-bold">EVENT NOT FOUND</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-auto">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">

        {/* BACK BUTTON */}
        <motion.button
          onClick={() => navigate(`/events/${category}`)}
          className={`flex items-center gap-2 mb-8 font-orbitron ${theme.text}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ x: -5 }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm tracking-wider">
            BACK TO EVENTS
          </span>
        </motion.button>

        {/* =========================
            MAGNETIC TILT BANNER
        ========================== */}
        <MagneticBanner event={event} theme={theme} />

        {/* =========================
            TWO COLUMN LAYOUT
        ========================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-10">

            {/* DESCRIPTION */}
            <Section title="DESCRIPTION" theme={theme}>
              {event.fullDescription}
            </Section>

            {/* PREREQUISITES */}
            <ListSection
              title="PREREQUISITES"
              icon={<CheckCircle className="w-6 h-6" />}
              items={event.prerequisites}
              theme={theme}
            />

            {/* RULES */}
            <ListSection
              title="RULES"
              icon={<AlertCircle className="w-6 h-6" />}
              items={event.rules}
              theme={theme}
            />
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-1">
            <motion.div
              className="sticky top-8 transition-transform duration-300 hover:scale-[1.02]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div
                className={`bg-black/50 backdrop-blur-sm rounded-2xl p-8 space-y-6 border ${theme.cardBorder}`}
                style={{
                  boxShadow: theme.cardShadow,
                }}
              >
                <h3
                  className={`text-2xl font-semibold tracking-widest uppercase font-orbitron text-center ${theme.text}`}
                >
                  EVENT INFO
                </h3>

                <InfoRow label="Date" value={event.date} />
                <InfoRow label="Time" value={event.time} />
                <InfoRow label="Venue" value={event.venue} />

                <hr className="border-gray-700" />

                <h4 className={`${theme.text} font-semibold tracking-widest uppercase font-orbitron text-lg`}>
                  STUDENT COORDINATORS
                </h4>

                <p className="text-base">{event.coordinator1} - {event.contact1}</p>
                <p className="text-base">{event.coordinator2} - {event.contact2}</p>

                <h4 className={`${theme.text} font-semibold tracking-widest uppercase font-orbitron text-lg mt-6`}>
                  STAFF COORDINATORS
                </h4>
                <p className="text-base">{event.staffCoordinator}</p>

                <motion.a
                  href={event.registrationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-4 text-center font-bold rounded-xl text-white bg-gradient-to-r ${theme.buttonGradient} transition-all duration-300 ${theme.buttonHover} ${theme.buttonShadow}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  REGISTER NOW
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {isTechnical ? <Footblue /> : <Footer />}
    </div>
  );
}

/* =========================================
   REACTBITS MAGNETIC TILT BANNER
========================================= */

function MagneticBanner({ event, theme }) {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 });

  function handleMove(e) {
    if (window.innerWidth < 768) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateXVal = ((y - rect.height / 2) / rect.height) * -15;
    const rotateYVal = ((x - rect.width / 2) / rect.width) * 15;

    rotateX.set(rotateXVal);
    rotateY.set(rotateYVal);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformPerspective: 1200,
      }}
      className="relative w-full h-[260px] sm:h-[300px] md:h-[340px] rounded-2xl overflow-hidden mb-16 flex items-center"
    >
      {/* Poster Half Background */}
      <div
        className="absolute inset-0 bg-cover bg-left opacity-40"
        style={{
          backgroundImage: `url(${event.poster})`,
        }}
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(90deg, black 40%, rgba(0,0,0,0.8) 70%, transparent 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-10">
        <span
          className={`inline-block text-xs px-3 py-1 rounded mb-4 uppercase tracking-wider ${theme.badgeBg} text-white`}
        >
          {event.category}
        </span>

        <h1
          className="text-3xl sm:text-4xl font-bold font-orbitron text-white"
          style={{
            textShadow: `0 0 20px ${theme.shadowHex}`,
          }}
        >
          {event.name}
        </h1>
      </div>
    </motion.div>
  );
}

/* Helper Components */

function Section({ title, children, theme }) {
  return (
    <section>
      <h2 className={`text-2xl font-semibold tracking-widest uppercase font-orbitron ${theme.text} border-b ${theme.border} pb-2`}>
        {title}
      </h2>
      <p className="text-gray-300 text-base leading-relaxed mt-4">{children}</p>
    </section>
  );
}

function ListSection({ title, icon, items, theme }) {
  return (
    <section>
      <h2 className={`text-2xl font-semibold tracking-widest uppercase font-orbitron ${theme.text} border-b ${theme.border} pb-2 flex items-center gap-3`}>
        {icon}
        {title}
      </h2>
      <ul className="space-y-3 mt-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-gray-300 text-base">
            <span
              className={`w-2.5 h-2.5 rounded-full mt-2 ${theme.bulletBg}`}
              style={{
                boxShadow: `0 0 8px ${theme.shadowHex}`,
              }}
            />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between text-gray-300 text-base">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}