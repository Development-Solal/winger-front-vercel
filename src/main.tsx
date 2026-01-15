import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {BrowserRouter} from "react-router";
import {UserProvider} from "./context/AuthContext.tsx";
import {FormProvider} from "./context/FormContext.tsx";
import {I18nextProvider} from "react-i18next";
import i18n from "./i18n.js";
import {TooltipProvider} from "./components/ui/tooltip.tsx";
import {HelmetProvider} from "react-helmet-async";
import {RechercheProvider} from "./context/RechercheContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <UserProvider>
          <RechercheProvider>
            <TooltipProvider>
              <FormProvider>
                <HelmetProvider>
                  <App />
                </HelmetProvider>
              </FormProvider>
            </TooltipProvider>
          </RechercheProvider>
        </UserProvider>
      </BrowserRouter>
    </I18nextProvider>
  </StrictMode>
);
