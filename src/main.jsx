import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LazyMotion, domAnimation, MotionConfig } from "framer-motion";
import { SiteProvider } from "./context.jsx";
import { Layout } from "./layout.jsx";
import Home from "./home.jsx";
import { Legal, NotFound } from "./pages.jsx";
import "./styles.css";

const el = document.getElementById("root");
const page = el.getAttribute("data-page") || "home";

function Page() {
  if (page === "home") return <Home />;
  if (page === "404") return <NotFound />;
  return <Legal kind={page} />;
}

createRoot(el).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <SiteProvider>
          <Layout page={page}>
            <Page />
          </Layout>
        </SiteProvider>
      </LazyMotion>
    </MotionConfig>
  </StrictMode>
);
