import { motion } from "framer-motion";
import { CreditCard, DollarSign } from "lucide-react";

import s from "./LoaderDashboard.module.css";

const LoaderDashboard = () => {
  return (
    <div className={s.spinnerContainer}>
      <motion.div
        className={s.iconWrapper}
        animate={{
          rotateY: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flex items-center justify-center">
          <CreditCard size={44} className="mr-2 text-blue-500" />
          <DollarSign size={44} className="text-green-500" />
        </div>
      </motion.div>
    </div>
  );
};

export default LoaderDashboard;
