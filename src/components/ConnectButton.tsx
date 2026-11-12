import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope, faPaperPlane, faXmark, faComment } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faBehance, faMedium } from "@fortawesome/free-brands-svg-icons";
import contactDrawerImage from "../imports/Main/suman_sahu.png";

function ArrowForward({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none">
      <path
        d="M16 25.333 14.133 23.4l6-6H6.667v-2.8H20.133l-6-6L16 6.667 25.333 16 16 25.333Z"
        fill="currentColor"
      />
    </svg>
  );
}

type ConnectButtonProps = {
  /** Show the pulsing rings and "Let's Connect" label after 5s (desktop). */
  hotspot?: boolean;
  /** Render the floating mobile trigger. Turn off when the page renders its own. */
  mobileButton?: boolean;
  /** Controlled open state, for pages that open the drawer from their own trigger. */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/** Floating contact button (top right) that opens the contact drawer. */
export default function ConnectButton({
  hotspot = true,
  mobileButton = true,
  open,
  onOpenChange,
}: ConnectButtonProps = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isDrawerOpen = open ?? internalOpen;
  const setIsDrawerOpen = (value: boolean) => {
    if (open === undefined) setInternalOpen(value);
    onOpenChange?.(value);
  };
  const [showForm, setShowForm] = useState(false);
  const [showHotspot, setShowHotspot] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  // Show hotspot after 5 seconds
  useEffect(() => {
    if (!hotspot) return;
    const timer = setTimeout(() => {
      setShowHotspot(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, [hotspot]);

  const contactInfo = {
    name: "Suman S.",
    title: "Product Designer",
    email: "mail@sumansahu.in",
    phone: "+91-9399274668",
    whatsapp: "+919399274668",
    bio: "Let's connect and collaborate.",
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setShowForm(false);
  };

  return (
    <>
      {/* Floating Chat Button - Desktop - Fixed positioning outside animated containers */}
      <div className="hidden lg:block fixed top-8 right-8 lg:right-16 z-50">
        {/* Hotspot pulse rings */}
        <AnimatePresence>
          {showHotspot && (
            <>
              {/* Outer pulse ring */}
              <motion.div
                initial={{ scale: 0.8, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full border-2 border-lilac"
              />
              
              {/* Inner pulse ring */}
              <motion.div
                initial={{ scale: 0.9, opacity: 1 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                className="absolute inset-0 rounded-full border-2 border-lilac"
              />
              
              {/* Hotspot text label */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white text-lilac px-3 py-1.5 rounded-full text-xs font-medium shadow-lg border border-lilac/20"
              >
                Let's Connect
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Button */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="relative flex items-center justify-center size-12 sm:size-[54px] rounded-full bg-white text-lilac border-2 border-lilac hover:bg-lilac hover:text-white transition-colors duration-300"
          title="Start a chat"
        >
          <FontAwesomeIcon icon={faComment} className="text-lg sm:text-xl" />
        </button>
      </div>

      {/* Floating Contact Button - Mobile Only */}
      {mobileButton && (
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="fixed right-4 lg:hidden z-50 flex items-center justify-center size-14 rounded-full bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-all"
          style={{ top: '16px' }}
          title="Contact"
        >
          <FontAwesomeIcon icon={faComment} className="text-brand text-lg" />
        </button>
      )}

      {/* ---- Contact Drawer ---- */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: 400, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 400, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="fixed inset-0 z-50 h-screen w-full sm:max-w-[420px] sm:right-0 sm:left-auto overflow-y-auto bg-white shadow-2xl flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setIsDrawerOpen(false);
                  setShowForm(false);
                }}
                aria-label="Close drawer"
                className="absolute right-6 top-6 flex size-12 items-center justify-center rounded-full bg-brand text-white shadow-lg transition-all hover:bg-brand-600 hover:shadow-xl z-50 cursor-pointer"
              >
                <FontAwesomeIcon icon={faXmark} className="size-6" />
              </button>

              {/* Purple Top Section */}
              <div 
                className="bg-gradient-to-br from-brand via-brand-600 to-brand-900 px-8 py-6 relative overflow-hidden"
              >
                <div className="relative z-10 flex flex-col items-center justify-between h-full min-h-[200px] sm:min-h-[280px]">
                  {/* Profile Image with Circular Design */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 flex items-center justify-center"
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="absolute inset-0 w-32 h-32 sm:w-48 sm:h-48 bg-white/20 rounded-full blur-lg" />
                      <div className="relative flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 w-32 h-32 sm:w-44 sm:h-44 overflow-hidden">
                        <img
                          src={contactDrawerImage}
                          alt="Suman S."
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Spacer */}
                  <div className="h-3" />
                  
                  {/* Social Icons at Bottom */}
                  <div className="flex items-center justify-center gap-5">
                    <a
                      href="https://www.linkedin.com/in/suman-sahu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-12 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm transition-all hover:bg-white/50"
                      title="LinkedIn"
                    >
                      <FontAwesomeIcon icon={faLinkedin} style={{ fontSize: '20px' }} className="text-white" />
                    </a>
                    <a
                      href="https://www.behance.net/sumansahu2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-12 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm transition-all hover:bg-white/50"
                      title="Behance"
                    >
                      <FontAwesomeIcon icon={faBehance} style={{ fontSize: '20px' }} className="text-white" />
                    </a>
                    <a
                      href="https://medium.com/@2013sumansahu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex size-12 items-center justify-center rounded-full bg-white/30 backdrop-blur-sm transition-all hover:bg-white/50"
                      title="Medium"
                    >
                      <FontAwesomeIcon icon={faMedium} style={{ fontSize: '20px' }} className="text-white" />
                    </a>
                  </div>
                </div>
              </div>

              {/* White Bottom Section - Content Area */}
              <div className="flex-1 overflow-y-auto px-8 py-8">
                <AnimatePresence mode="wait">
                  {!showForm ? (
                    /* Contact Info View */
                    <motion.div
                      key="contact"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {/* Bio Text */}
                      <div className="text-center">
                        <p className="text-sm leading-relaxed text-ink/60 font-medium">
                          {contactInfo.bio}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="my-6 h-px bg-gradient-to-r from-transparent via-ink/20 to-transparent" />

                      {/* Email */}
                      <motion.a
                        href={`mailto:${contactInfo.email}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="group flex items-center gap-4 rounded-lg bg-brand/5 px-5 py-4 transition-all hover:bg-brand/10"
                      >
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/10 transition-all group-hover:bg-brand/20">
                          <FontAwesomeIcon
                            icon={faEnvelope}
                            className="size-5 text-brand"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-ink/60">Email</p>
                          <p className="truncate text-sm font-semibold text-ink">
                            {contactInfo.email}
                          </p>
                        </div>
                      </motion.a>

                      {/* Phone */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        className="group relative"
                        title={!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Can't make a call from desktop" : ""}
                      >
                        {!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? (
                          <div className="flex items-center gap-4 rounded-lg bg-brand/5 px-5 py-4 transition-all hover:bg-brand/10 cursor-not-allowed">
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/10 transition-all group-hover:bg-brand/20">
                              <FontAwesomeIcon
                                icon={faPhone}
                                className="size-5 text-brand/50"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-ink/60">Phone</p>
                              <p className="truncate text-sm font-semibold text-ink/50">
                                {contactInfo.phone}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <a
                            href={`tel:${contactInfo.phone}`}
                            className="flex items-center gap-4 rounded-lg bg-brand/5 px-5 py-4 transition-all hover:bg-brand/10"
                          >
                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/10 transition-all group-hover:bg-brand/20">
                              <FontAwesomeIcon
                                icon={faPhone}
                                className="size-5 text-brand"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-medium text-ink/60">Phone</p>
                              <p className="truncate text-sm font-semibold text-ink">
                                {contactInfo.phone}
                              </p>
                            </div>
                          </a>
                        )}
                        {!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-ink text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            Can't make a call from desktop
                          </div>
                        )}
                      </motion.div>

                      {/* WhatsApp */}
                      <motion.a
                        href="https://wa.me/9399274668"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="group flex items-center gap-4 rounded-lg bg-brand/5 px-5 py-4 transition-all hover:bg-brand/10"
                      >
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/10 transition-all group-hover:bg-brand/20">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="size-5 text-brand fill-current">
                            <path d="M380.9 97.1c-41.9-42-97.7-65.1-157-65.1-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480 117.7 449.1c32.4 17.7 68.9 27 106.1 27l.1 0c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3 18.6-68.1-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1s56.2 81.2 56.1 130.5c0 101.8-84.9 184.6-186.6 184.6zM325.1 300.5c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8s-14.3 18-17.6 21.8c-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7s-12.5-30.1-17.1-41.2c-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2s-9.7 1.4-14.8 6.9c-5.1 5.6-19.4 19-19.4 46.3s19.9 53.7 22.6 57.4c2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4s4.6-24.1 3.2-26.4c-1.3-2.5-5-3.9-10.5-6.6z"/>
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-ink/60">WhatsApp</p>
                          <p className="truncate text-sm font-semibold text-ink">
                            Start a chat
                          </p>
                        </div>
                      </motion.a>

                      {/* Drop a Message Button */}
                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        onClick={() => setShowForm(true)}
                        className="group w-full flex items-center gap-4 rounded-lg bg-brand/5 px-5 py-4 transition-all hover:bg-brand/10"
                      >
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/10 transition-all group-hover:bg-brand/20">
                          <FontAwesomeIcon
                            icon={faPaperPlane}
                            className="size-5 text-brand"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-xs font-medium text-ink/60">Message me</p>
                          <p className="truncate text-sm font-semibold text-ink">Write here</p>
                        </div>
                      </motion.button>
                    </motion.div>
                  ) : (
                    /* Lead Form View */
                    <motion.form
                      key="form"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      onSubmit={handleFormSubmit}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder-ink/40 transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">
                          Your Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder-ink/40 transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                          placeholder="you@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">
                          Your Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          className="w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder-ink/40 transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                          placeholder="+91-XXXXXXXXXX"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-ink mb-2">
                          Your Message *
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          className="w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder-ink/40 resize-none transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                          placeholder="Tell me about your project..."
                        />
                      </div>

                      <div className="flex flex-col gap-3 pt-4">
                        <button
                          type="submit"
                          className="w-full bg-brand px-6 py-4 font-semibold text-white transition-all hover:bg-brand-600 hover:shadow-lg"
                        >
                          Send Message
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-ink transition-all hover:text-brand"
                        >
                          <ArrowForward className="size-4 text-ink rotate-180 transition-all hover:text-brand" />
                          Back
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
