import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faPaperPlane,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

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

export default function Contact() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const handleBack = () => {
    window.history.back();
  };

  const contactInfo = {
    name: "Suman S.",
    title: "Product Designer",
    email: "your.email@example.com",
    phone: "+1 (555) 123-4567",
    whatsapp: "+1 (555) 123-4567",
    bio: "Building intuitive experiences with AI",
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-canvas">
      {/* ambient blobs */}
      <div className="pointer-events-none absolute -left-32 top-4 size-[620px] rounded-full bg-[#fffcf4] blur-[110px]" />
      <div className="pointer-events-none absolute -left-24 -top-28 size-[440px] rounded-full bg-lime opacity-20 blur-[70px]" />

      <div className="relative z-10 flex min-h-screen w-full">
        {/* ---- Left Sidebar Navigation ---- */}
        <div className="w-full px-8 py-12 lg:max-w-[32%] lg:px-16 lg:py-20">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              aria-label="Go back"
              className="group flex size-12 shrink-0 items-center justify-center rounded-full bg-lilac-100 text-brand transition-colors hover:bg-brand-600 hover:text-white"
            >
              <ArrowForward className="size-5 rotate-180 transition-transform duration-300 group-hover:rotate-135" />
            </button>
            <span className="text-sm font-medium text-ink/60">Let's Connect</span>
          </div>

          {/* Sidebar Content */}
          <div className="mt-20 flex flex-col gap-12">
            <div>
              <span className="text-[22px] font-semibold leading-none text-ink/50">
                Reach out
              </span>
              <span className="mt-3 block text-[clamp(34px,3.4vw,48px)] font-semibold leading-none text-ink">
                and let's create
              </span>
            </div>

            {/* Quick CTA */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="group flex items-center gap-3 rounded-lg px-4 py-3 transition-all hover:bg-lilac-100"
            >
              <span className="text-sm font-medium text-ink/60 group-hover:text-brand">
                Open contact drawer
              </span>
              <FontAwesomeIcon
                icon={faArrowRight}
                className="size-4 text-ink/30 transition-all group-hover:translate-x-1 group-hover:text-brand"
              />
            </button>
          </div>
        </div>

        {/* ---- Right Side Drawer ---- */}
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
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: 400, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 400, opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="fixed right-0 top-0 z-50 h-screen w-full max-w-[420px] overflow-y-auto bg-gradient-to-br from-brand via-brand-600 to-brand-900 shadow-2xl lg:relative lg:max-h-screen lg:w-auto lg:max-w-none"
              >
                {/* Close Button - Mobile Only */}
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  aria-label="Close drawer"
                  className="absolute right-6 top-6 flex size-12 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/30 lg:hidden"
                >
                  <FontAwesomeIcon icon={faArrowRight} className="size-5" />
                </button>

                {/* Drawer Content */}
                <div className="px-8 py-12 lg:min-h-screen lg:flex lg:flex-col lg:justify-center lg:px-12">
                  {/* Profile Card */}
                  <div className="mb-12 pt-4 lg:pt-0">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mb-8 flex size-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm"
                    >
                      <span className="text-4xl font-bold text-white">SS</span>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h3 className="text-2xl font-semibold text-white">
                        {contactInfo.name}
                      </h3>
                      <p className="mt-2 text-sm text-white/70">{contactInfo.title}</p>
                      <p className="mt-4 leading-relaxed text-white/80">
                        {contactInfo.bio}
                      </p>
                    </motion.div>
                  </div>

                  {/* Divider */}
                  <div className="mb-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  {/* Contact Methods */}
                  <motion.div
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, staggerChildren: 0.1 }}
                  >
                    {/* Email */}
                    <motion.a
                      href={`mailto:${contactInfo.email}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="group flex items-center gap-4 rounded-lg bg-white/10 px-5 py-4 backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20 transition-all group-hover:bg-white/30">
                        <FontAwesomeIcon
                          icon={faEnvelope}
                          className="size-5 text-white"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white/70">Email</p>
                        <p className="truncate text-sm font-semibold text-white">
                          {contactInfo.email}
                        </p>
                      </div>
                    </motion.a>

                    {/* Phone */}
                    <motion.a
                      href={`tel:${contactInfo.phone}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="group flex items-center gap-4 rounded-lg bg-white/10 px-5 py-4 backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20 transition-all group-hover:bg-white/30">
                        <FontAwesomeIcon
                          icon={faPhone}
                          className="size-5 text-white"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white/70">Phone</p>
                        <p className="truncate text-sm font-semibold text-white">
                          {contactInfo.phone}
                        </p>
                      </div>
                    </motion.a>

                    {/* WhatsApp */}
                    <motion.a
                      href={`https://wa.me/${contactInfo.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="group flex items-center gap-4 rounded-lg bg-white/10 px-5 py-4 backdrop-blur-sm transition-all hover:bg-white/20"
                    >
                      <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white/20 transition-all group-hover:bg-white/30">
                        <FontAwesomeIcon
                          icon={faWhatsapp}
                          className="size-5 text-white"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-white/70">WhatsApp</p>
                        <p className="truncate text-sm font-semibold text-white">
                          {contactInfo.whatsapp}
                        </p>
                      </div>
                    </motion.a>
                  </motion.div>

                  {/* Divider */}
                  <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    onClick={() =>
                      window.open(`mailto:${contactInfo.email}`, "_blank")
                    }
                    className="w-full rounded-lg bg-white px-6 py-4 font-semibold text-brand transition-all hover:bg-white/90 hover:shadow-lg"
                  >
                    Start a Conversation
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
