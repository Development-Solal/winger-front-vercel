import React, {useEffect, useRef} from "react";

import {ArrowRight} from "lucide-react";
import {useForm, SubmitHandler} from "react-hook-form";
import {Form, FormField, FormItem, FormControl, FormMessage} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useNavigate} from "react-router-dom";

import Logo from "../../assets/Logo/logo-blanc.png";
import ProgressBar0 from "../../assets/Register/progress-bar-0.png";
import Background0 from "../../assets/Register/background-0.png";
import {Button} from "@/components/ui/button";
import {useUser} from "@/context/AuthContext";
import {t} from "i18next";

const profileSchema = z.object({
  profileType: z.enum(["particulier", "professionnel"], {
    required_error: "Veuillez sélectionner un type de profil.",
  }),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const user = useUser();

  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user.user) {
      navigate("email-verified");
    }
  }, [navigate, user]);

  useEffect(() => {
    if (logoRef.current) {
      logoRef.current.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, []);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {profileType: "particulier"},
  });

  const handleSubmit: SubmitHandler<ProfileFormValues> = data => {
    const selectedProfile = data.profileType;

    if (selectedProfile === "particulier") {
      navigate("/register/particulier/1");
    } else if (selectedProfile === "professionnel") {
      navigate("/register/pro");
    }
  };

  return (
    <div className="min-h-screen px-8 py-4" style={{backgroundImage: `url(${Background0})`}}>
      {/* Logo and title */}
      <div className="flex flex-col items-center space-y-2">
        <img src={Logo} alt="Logo" className="flex w-50 h-56" />
        <p ref={logoRef} className="text-center text-4xl md:text-5xl font-freestyle  text-white">
          {t("registration.title")}
        </p>
      </div>

      {/* Progress indicator */}
      <div className="relative mx-auto flex max-w-xl items-center justify-between">
        <img src={ProgressBar0} alt="Progress0" className="flex" />
      </div>

      {/* Main content card */}
      <div className="mx-auto mt- max-w-2xl rounded-xl bg-white p-12 shadow-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="flex flex-col items-center justify-center space-y-6">
              <h2 className="text-xl md:text-3xl font-quicksand py-4 text-dark-pink">
                {t("registration.profil_type")}
              </h2>
              <p className="text-lg md:text-xl font-quicksand_book pb-8 text-dark-pink">
                {t("registration.profil_subtitle")}
              </p>
              <div className="flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
                <FormField
                  control={form.control}
                  name="profileType"
                  render={({field}) => (
                    <>
                      <FormItem className="w-full sm:w-auto">
                        <FormControl>
                          <label className="cursor-pointer w-full">
                            <input
                              type="radio"
                              {...field}
                              value="particulier"
                              checked={field.value === "particulier"}
                              className="hidden peer"
                            />
                            <span className="w-full block text-center peer-checked:bg-dark-pink peer-checked:text-white rounded-md px-10 py-3 text-lg font-semibold text-dark-pink transition-colors cursor-pointer hover:bg-pink-50 border-dark-pink border-2 sm:w-auto">
                              {t("registration.particulier")}
                            </span>
                          </label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>

                      <FormItem className="w-full sm:w-auto">
                        <FormControl>
                          <label className="cursor-pointer w-full">
                            <input
                              type="radio"
                              {...field}
                              value="professionnel"
                              checked={field.value === "professionnel"}
                              className="hidden peer"
                            />
                            <span className="w-full block text-center peer-checked:bg-dark-pink peer-checked:text-white rounded-md px-10 py-3 text-lg font-semibold text-dark-pink transition-colors cursor-pointer hover:bg-pink-50 border-dark-pink border-2 sm:w-auto">
                              {t("registration.professionnel")}
                            </span>
                          </label>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    </>
                  )}
                />
              </div>
            </div>

            {/* Next button */}
            <div className="mt-8 flex items-center justify-end gap-4">
              <span className="hidden xl:block text-lg font-medium text-dark-pink">{t("buttons.next")}</span>
              <Button
                type="submit"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-dark-pink shadow-lg">
                <ArrowRight className="text-white" strokeWidth={4} size={28} />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Register;
