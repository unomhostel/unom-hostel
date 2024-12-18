import { motion } from "motion/react";

const AnimatedDiv = ({ children, delay = 0, ...props }) => {
    return (
        <motion.div
            initial={{ opacity: 0, translateY: -20 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.2, delay }}
            viewport={{ once: true, amount: "some" }}
            {...props}
        >
            {children}
        </motion.div>
    );
};

const AnimatedP = ({ children, delay = 0, ...props }) => {
    return (
        <motion.p
            initial={{ opacity: 0, translateY: -20 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.2, delay }}
            viewport={{ once: true, amount: "some" }}
            {...props}
        >
            {children}
        </motion.p>
    );
};

const AnimatedH1 = ({ children, delay = 0, ...props }) => {
    return (
        <motion.h1
            initial={{ opacity: 0, translateY: -20 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            transition={{ duration: 0.2, delay }}
            viewport={{ once: true, amount: "some" }}
            {...props}
        >
            {children}
        </motion.h1>
    );
};

export { AnimatedDiv, AnimatedP, AnimatedH1 };
