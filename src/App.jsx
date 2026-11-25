import { MotionConfig } from "framer-motion";
import Home from "./pages/Home.jsx";
import usePointerEffects from "./hooks/usePointerEffects.js";

// reducedMotion="user" makes Framer Motion honour the OS "reduce motion" setting.
export default function App() {
  usePointerEffects();
  return (
    <MotionConfig reducedMotion="user">
      <Home />
    </MotionConfig>
  );
}
