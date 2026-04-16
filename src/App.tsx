import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { setActiveTab } from "./store/appSlice";
import { Navbar, Home, ResumeScore, About, Contact, Footer } from "./components/AppUI";

export default function App() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.app.activeTab);
  const isDark = useSelector((state: RootState) => state.app.isDark);

  // Handle dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <Home onStart={() => dispatch(setActiveTab("score"))} />;
      case "score":
        return <ResumeScore />;
      case "about":
        return <About />;
      case "contact":
        return <Contact />;
      default:
        return <Home onStart={() => dispatch(setActiveTab("score"))} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-primary/30">
      <Navbar />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
