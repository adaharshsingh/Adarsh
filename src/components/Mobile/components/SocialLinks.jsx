import { memo } from "react";
import { motion } from "framer-motion";
import { FaXTwitter, FaLinkedin, FaGithub } from "react-icons/fa6";

const socials = [
  {
    Icon: FaXTwitter,
    label: "Twitter",
    href: "https://adarsh-plum.vercel.app/"
  },
  {
    Icon: FaLinkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/adarsh-kumar-singh-226228239/"
  },
  {
    Icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/adaharshsingh"
  }
];

const glowVariants = {
  initial: { scale: 1, y: 0 },
  hover: { scale: 1.2, y: -3, transition: { type: "spring", stiffness: 300, damping: 15 } },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.15 } }
};

const SocialLinks = memo(() => {
  return (
    <div className="mt-10 flex gap-5 text-2xl md:text-3xl justify-center lg:justify-start">
      {socials.map(({ Icon: IconComponent, label, href }) => (
        <motion.a
          href={href}
          key={label}
          target="_blank"
          aria-label={label}
          rel="noopener noreferrer"
          variants={glowVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className="text-gray-300"
        >
          <IconComponent />
        </motion.a>
      ))}
    </div>
  );
});

SocialLinks.displayName = 'SocialLinks';

export default SocialLinks;
