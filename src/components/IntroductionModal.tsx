import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface IntroductionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IntroductionModal({
  isOpen,
  onClose,
}: IntroductionModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-ink/10 transition-colors text-ink"
            >
              <FontAwesomeIcon icon={faXmark} className="size-5" />
            </button>

            {/* Modal Body */}
            <div className="p-8 md:p-12 space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-semibold text-ink">
                  Hey, I'm <span className="text-brand">Suman</span>
                </h2>
                <p className="text-lg text-ink/70 leading-relaxed">
                  I'm a product designer passionate about creating intelligent experiences at the intersection of human and AI collaboration. I believe great design is about understanding user needs deeply and translating them into intuitive, adaptive solutions.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-ink">What I Do</h3>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-ink/70">
                    <span className="text-brand font-bold text-lg">→</span>
                    <span>
                      <strong className="text-ink">Product Strategy & Design:</strong> I help teams define product vision and create compelling user experiences from concept to launch.
                    </span>
                  </li>
                  <li className="flex gap-3 text-ink/70">
                    <span className="text-brand font-bold text-lg">→</span>
                    <span>
                      <strong className="text-ink">Research & Insights:</strong> I conduct user research, usability testing, and data analysis to inform design decisions.
                    </span>
                  </li>
                  <li className="flex gap-3 text-ink/70">
                    <span className="text-brand font-bold text-lg">→</span>
                    <span>
                      <strong className="text-ink">Design Systems:</strong> I build scalable design systems and comprehensive design documentation for teams.
                    </span>
                  </li>
                  <li className="flex gap-3 text-ink/70">
                    <span className="text-brand font-bold text-lg">→</span>
                    <span>
                      <strong className="text-ink">AI & Product Innovation:</strong> I explore emerging technologies and their potential to enhance user experiences.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-ink">My Approach</h3>
                <p className="text-ink/70 leading-relaxed">
                  I believe in a human-centered design process that combines empathy, creativity, and data. By deeply understanding the problem space, I craft solutions that not only meet user needs but delight them with thoughtful interactions.
                </p>
              </div>

              {/* Close Button at Bottom */}
              <div className="pt-6">
                <button
                  onClick={onClose}
                  className="w-full px-6 py-3 bg-brand text-white font-semibold rounded-lg hover:bg-brand-600 transition-colors"
                >
                  Let's Explore
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
