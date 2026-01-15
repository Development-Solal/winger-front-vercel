import * as z from "zod";
import {useSearchParams, useNavigate, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LockKeyhole} from "lucide-react";
import {ResetPasswordService} from "@/services/AuthService";

import {Button} from "@/components/ui/button";
import {Form, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {t} from "i18next";

const formSchema = z
  .object({
    newPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
    confirmPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    // If the token is missing, redirect to login or show an error
    const token = searchParams.get("token");

    if (!token) {
      setErrorMsg("Token invalide ou manquant.");
      navigate("/error");
    } else {
      setToken(token);
    }
  }, [searchParams, navigate]);

  const onSubmit = async (data: {newPassword: string}) => {
    ResetPasswordService(token, data.newPassword)
      .then(res => {
        console.log(res);
        setErrorMsg("");
        navigate("/login");
      })
      .catch(err => {
        console.error(err);
        setErrorMsg(err?.response?.data?.message);
      });
  };

  const onError = (errors: unknown) => {
    setErrorMsg("");

    console.log("Form errors:", errors);
  };

  return (
    <div className="font-quicksand_regular">
      <div className="relative mx-auto max-w-lg pt-0.5 pb-10 m-20">
        {/* Form Card */}
        <div className="rounded-3xl bg-white p-8 mt-10 border-2 border-gray-500 shadow-xl">
          <h2 className="mb-6 text-center text-3xl font-quicksand text-dark-pink">{t("resetPassword.title")}</h2>

          <Form {...form}>
            <form
              onSubmit={e => {
                e.preventDefault();
                console.log("Form submission triggered!");

                form.handleSubmit(onSubmit, onError)(e);
              }}
              className="space-y-6">
              <FormField
                control={form.control}
                name="newPassword"
                render={({field}) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <LockKeyhole
                          className="absolute left-3 top-1/2 transform -translate-y-1/2  text-dark-pink"
                          size={20}
                        />
                        <Input {...field} placeholder={t("resetPassword.newPass")} className="pl-10" />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({field}) => (
                  <FormItem>
                    <div className="flex items-center">
                      <div className="relative flex-1">
                        <LockKeyhole
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                          size={20}
                        />
                        <Input {...field} placeholder={t("resetPassword.confirmPass")} className="pl-10" />
                      </div>
                    </div>
                    <FormMessage className="text-logo-red font-bold xl:text-md" />
                  </FormItem>
                )}
              />

              {/* Error Msg */}
              {errorMsg && <div className="flex justify-center text-light-blue">{errorMsg}</div>}

              {/* submit button */}
              <div className="flex w-full flex-col gap-5  justify-center items-center ">
                <Button className="w-min md:w-1/2 h-12 items-center justify-center rounded-md bg-logo-red text-white md:text-lg font-quicksand">
                  {t("resetPassword.reset")}
                </Button>
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

export default ResetPassword;
