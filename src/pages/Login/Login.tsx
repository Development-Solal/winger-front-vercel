import * as z from "zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { ForgotPasswordService, loginService } from "@/services/AuthService";

import Logo from "../../assets/Logo/logo-rouge.png";
import Background from "../../assets/Login/login-background.png";
import { LoginModel } from "@/models/AuthModel";
import { useUser } from "@/context/AuthContext";
import { Spinner } from "@/components/ui/spinner";
import { useFormContext } from "@/context/FormContext";
import { t } from "i18next";
import { useRecherche } from "@/context/RechercheContext";

const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  password: z.string().min(6, {
    message: "Le mot de passe doit contenir au moins 6 caractères",
  }),
});

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const { setPaginationPage } = useRecherche();
  const { formDataAide } = useFormContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setStep(formDataAide.step);
  }, [formDataAide, formDataAide.step]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data: LoginModel = {
      email: values.email.trim().toLowerCase(),
      password: values.password,
    };

    loginService(data)
      .then((res) => {
        const {
          id,
          roleId,
          first_name,
          last_name,
          email,
          credits,
          is_email_verified,
          profile_type,
          ProfileAidant,
          aideCount,
        } = res.user;
        setUser({ id, roleId, first_name, last_name, email, credits, is_email_verified, profile_type, ProfileAidant });
        localStorage.setItem("user_id", id.toString());

        setErrorMsg("");

        if (!is_email_verified) {
          navigate("/verify-email");
        } else if (roleId === 1) {
          navigate("/admin");
        } else {
          if (step == "2" || aideCount == 0) {
            navigate("/recherche");
          } else if (step == "3") {
            navigate("/recherche");
          } else {
            navigate("/recherche");
            setPaginationPage(1);
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMsg(err?.response?.data?.message);
      });
  }

  const resetPassword = () => {
    const email = form.getValues("email");
    form.clearErrors();

    const data = {
      email: email,
    };

    if (email) {
      setIsLoading(true);

      ForgotPasswordService(data)
        .then((res) => {
          setErrorMsg(res.message);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoading(false);
          setErrorMsg(err?.response?.data?.message);
        });
      setErrorMsg("");
    } else {
      setErrorMsg(t("login.resetPassword"));
    }
  };

  const onError = (errors: unknown) => {
    setErrorMsg("");

    console.log("Form errors:", errors);
  };

  return (
    <div
      className="font-quicksand_regular mx-5 "
      style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <div className="relative mx-auto max-w-lg pt-0.5 pb-10 m-20">
        {/* Background red  */}
        <div className="absolute left-1/2 -translate-x-1/2 w-5/6 h-full bg-dark-pink -z-10"></div>

        {/* <img src={Image2} className="hidden 2xl:block absolute -left-3/4 -translate-x-1/2 w-96 scale-[2.2] -z-10" />
        <img src={Image1} className="hidden 2xl:block absolute left-3/4 translate-x-1/2 w-96 scale-[2.1] -z-10" /> */}

        {/* Form Card */}
        <div className="rounded-3xl bg-white p-8 mt-10 border-2 border-gray-500 shadow-xl">
          <img src={Logo} alt="Logo" className="flex w-50 h-56 mx-auto -mt-36 z-0" />
          <h2 className="mb-6 text-center text-3xl font-quicksand text-dark-pink -mt-6"> {t("login.title")}</h2>

          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Form submission triggered!");

                form.handleSubmit(onSubmit, onError)(e);
              }}
              className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <Mail
                          className="absolute left-3 top-1/2 transform -translate-y-1/2  text-dark-pink"
                          size={20}
                        />
                        <Input
                          {...field}
                          placeholder={t("login.email")}
                          className="pl-10"
                          autoCapitalize="none"
                          autoComplete="email"
                          inputMode="email"
                        />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <LockKeyhole
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                          size={20}
                        />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder={t("login.password")}
                          className="pl-10"
                        />
                        <div
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                          onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <Eye className="text-dark-pink" size={20} />
                          ) : (
                            <EyeOff className="text-dark-pink" size={20} />
                          )}
                        </div>
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              {/* Error Msg */}
              {errorMsg && <div className="flex justify-center text-logo-red font-bold xl:text-md">{errorMsg}</div>}

              {/* submit button */}
              <div className="flex w-full flex-col gap-5  justify-center items-center ">
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    resetPassword();
                  }}
                  className="italic text-mid-pink bg-white border-none shadow-none">
                  {t("login.forgetPassword")}
                </Button>

                {!isLoading ? (
                  <Button className="w-min md:w-1/3 h-12 items-center justify-center rounded-md bg-logo-red text-white md:text-lg font-quicksand">
                    {t("login.connect")}
                  </Button>
                ) : (
                  <Spinner />
                )}

                <Link to={"/register"} className="text-light-blue font-quicksand_regular text-lg">
                  {t("login.register")}
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
