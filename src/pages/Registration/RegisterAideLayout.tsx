import {FormProvider} from "@/context/FormContext";
import {Outlet} from "react-router-dom";

const RegisterAideLayout = () => {
  return (
    <FormProvider>
      <Outlet />
    </FormProvider>
  );
};

export default RegisterAideLayout;
