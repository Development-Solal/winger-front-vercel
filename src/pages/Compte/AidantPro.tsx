import React, {useEffect, useRef, useState} from "react";
import {useUser} from "@/context/AuthContext";
import DashboardNav from "./DashboardNav";
import UserHeader from "./UserHeader";

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ArrowUp, Briefcase, Info, Mail, MapPin, UserRound, UserRoundPlus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Form, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {CustomAsyncSelect} from "@/components/ui/custom-async-select";
import {loadOptionsTowns} from "@/services/ListService";
import Background1 from "../../assets/Register/background-1.png";
import {GetAidantProByUserService} from "@/services/UserService";
import {AidantProModel} from "@/models/AidantModel";
import {BASE_URL} from "@/utils/api";
import {DeactivateAidantService, UpdateAidantProService} from "@/services/AidantService";
import {Textarea} from "@/components/ui/textarea";
import toast from "react-hot-toast";
import {Spinner} from "@/components/ui/spinner";
import {useNavigate} from "react-router-dom";
import CropModal from "@/components/modals/CropModal";
import {useTranslation} from "react-i18next";
import {getFormSchemaEditAidantPro} from "@/schemas/compteSchema";
import ChangePasswordModal from "@/components/modals/ChangePasswordModal";
import {ChangePasswordService} from "@/services/AuthService";
import {useMobile} from "@/hooks/use-mobile";

const AidantPro = () => {
  const {user, logout} = useUser();
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const {t} = useTranslation();
  const formSchema = getFormSchemaEditAidantPro(t);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profile_type: "Professionnel",
      first_name: "",
      last_name: "",
      email: "",
      closest_town: "",
      company_name: "",
      company_id: "",
      company_description: "",
    },
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [tempImage, setTempImage] = useState<string | null>(null);

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);

  const [aidantData, setAidantData] = useState<AidantProModel>();
  const [selectedTown, setSelectedTown] = useState<string>();

  useEffect(() => {
    if (ref.current && isMobile) {
      ref.current.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, [isMobile]);

  useEffect(() => {
    if (user) {
      GetAidantProByUserService(user.id)
        .then(res => {
          setAidantData(res);
          setPreview(BASE_URL + "assets/" + res.profile_pic);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (aidantData) {
      form.setValue("first_name", aidantData.first_name || "");
      form.setValue("last_name", aidantData.last_name || "");
      form.setValue("email", aidantData.email || "");
      form.setValue("closest_town", aidantData.town_id || "");
      form.setValue("company_id", aidantData.ProfileAidantPro?.company_id || "");
      form.setValue("company_name", aidantData.ProfileAidantPro?.company_name || "");
      form.setValue("company_description", aidantData.ProfileAidantPro?.company_description || "");

      setSelectedTown(aidantData.town?.town);
    }
  }, [aidantData, form, setSelectedTown]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "profile_pic" && value instanceof File) {
        formData.append(key, value);
      } else if (key === 'email') {
        formData.append(key, (value as string).trim().toLowerCase());
      } else {
        formData.append(key, value as string);
      }
    });

    if (user) {
      UpdateAidantProService(user?.id, formData)
        .then(res => {
          console.log(res);
          setErrorMsg("");
          setIsLoading(false);
          toast.success("Aidant pro modifier avec succès.");
        })
        .catch(err => {
          console.error(err);
          setErrorMsg(err?.response?.data?.message);
          setIsLoading(false);
        });
    }
  }

  const onError = (errors: unknown) => {
    console.log("Form errors:", errors);
  };

  const handleDeleteConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDeleteDialogOpen(true);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalPasswordOpen(true);
  };

  const deleteAccount = () => {
    setIsLoading(true);
    setIsDeleteDialogOpen(false);

    if (user) {
      DeactivateAidantService(user?.id)
        .then(res => {
          logout();
          console.log(res);
          setErrorMsg("");
          setIsLoading(false);
          toast.success("Votre compte a été supprimé avec succès.");
          navigate("/login");
        })
        .catch(err => {
          console.error(err);
          setErrorMsg(err?.response?.data?.message);
          setIsLoading(false);
        });
    }
  };

  const changePass = (data: any) => {
    setIsLoading(true);
    setIsModalPasswordOpen(false);
    if (user) {
      const form = {
        userId: user?.id,
        oldPassword: data?.oldPassword,
        newPassword: data?.newPassword,
        requiresOldPassword:true
      };
      ChangePasswordService(form)
        .then(res => {
          console.log(res);
          setErrorMsg("");
          setIsLoading(false);
          toast.success(t("compte.change_password"));
        })
        .catch(err => {
          console.error(err);
          setErrorMsg(err?.response?.data?.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <div ref={topRef} className="border border-dark-pink mb-10 mx-auto w-full max-w-screen-xl">
      <UserHeader
        name={user?.first_name + " " + user?.last_name}
        email={user?.email}
        credits={user?.credits}
        image={user?.ProfileAidant?.profile_pic}
        subscription={user?.ProfileAidant?.subscription}
      />
      <div className="px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8">
          <DashboardNav />
          <div
            ref={ref}
            className="py-10 px-4 sm:px-6 md:px-8 font-quicksand_regular w-full scroll-mt-24"
            style={{backgroundImage: `url(${Background1})`}}>
            <div className="rounded-md bg-white p-6 sm:p-8 shadow-lg mt-8 w-full max-w-full">
              <h2 className="mb-6 text-center text-xl font-bold text-dark-blue">#{aidantData?.profile_number}</h2>
              <h2 className="mb-6 text-center text-2xl font-bold text-dark-blue">Profil de {user?.first_name}</h2>

              <Form {...form}>
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    console.log("Form submission triggered!");
                    form.handleSubmit(onSubmit, onError)(e);
                  }}
                  className="space-y-6">
                  {/* Profile Image Upload */}
                  <FormField
                    control={form.control}
                    name="profile_pic"
                    render={() => {
                      return (
                        <FormItem>
                          <div className="text-center">
                            <div className="relative mx-auto my-2 h-24 w-24 rounded-full bg-dark-pink p-1">
                              <label
                                htmlFor="profileImageInput"
                                className="cursor-pointer flex items-center justify-center h-full w-full rounded-full overflow-hidden">
                                {preview ? (
                                  <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                                ) : (
                                  <UserRoundPlus className="h-12 w-12 text-white" />
                                )}
                              </label>
                              <input
                                id="profileImageInput"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={e => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    const imageUrl = URL.createObjectURL(file);
                                    setTempImage(imageUrl);
                                    e.target.value = "";
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <FormMessage className="text-logo-red font-bold xl:text-md" />
                        </FormItem>
                      );
                    }}
                  />

                  {tempImage && (
                    <CropModal
                      imageSrc={tempImage}
                      onClose={() => setTempImage(null)}
                      onCropComplete={(croppedFile, croppedPreview) => {
                        form.setValue("profile_pic", croppedFile);
                        setPreview(croppedPreview);
                        setTempImage(null);
                      }}
                    />
                  )}

                  {/* Form Fields */}
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({field}) => (
                      <FormItem>
                        <div className="flex items-center">
                          <div className="relative flex-1">
                            <UserRound
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                              size={20}
                            />
                            <Input
                              {...field}
                              title={t("forms.last_name_aidant")}
                              placeholder={t("forms.last_name_aidant") + "*"}
                              className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                            />
                          </div>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({field}) => (
                      <FormItem>
                        <div className="flex items-center">
                          <div className="relative flex-1">
                            <UserRound
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                              size={20}
                            />
                            <Input
                              {...field}
                              title={t("forms.first_name_aidant")}
                              placeholder={t("forms.first_name_aidant") + "*"}
                              className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                            />
                          </div>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company_name"
                    render={({field}) => (
                      <FormItem>
                        <div className="flex items-center">
                          <div className="relative flex-1">
                            <Briefcase
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                              size={20}
                            />
                            <Input
                              {...field}
                              title={t("forms.company_name")}
                              placeholder={t("forms.company_name") + "*"}
                              className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                            />
                          </div>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="closest_town"
                    render={({field}) => (
                      <FormItem>
                        <div className="flex items-center">
                          <div className="relative flex-1">
                            <CustomAsyncSelect
                              value={
                                field.value
                                  ? {value: String(field.value), label: String(selectedTown || field.value)}
                                  : null
                              }
                              loadOptions={loadOptionsTowns}
                              onChange={selected => {
                                field.onChange(selected?.value || "");
                                setSelectedTown(selected?.label || "");
                              }}
                              placeholder={t("forms.closest_town_aidant") + "*"}
                              page={1}
                              icon={<MapPin size={18} className="text-dark-pink" />}
                            />
                          </div>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company_id"
                    render={({field}) => (
                      <FormItem>
                        <div className="flex items-center">
                          <div className="relative flex-1">
                            <Briefcase
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                              size={20}
                            />
                            <Input
                              {...field}
                              title={t("forms.company_id")}
                              placeholder={t("forms.company_id") + "*"}
                              className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                            />
                          </div>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company_description"
                    render={({field}) => (
                      <FormItem>
                        <div className="flex items-center">
                          <div className="relative flex-1">
                            <Textarea
                              title={t("forms.company_description")}
                              placeholder={t("forms.company_description")}
                              className="resize-y"
                              {...field}
                            />
                          </div>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                      <FormItem>
                        <div className="flex items-center">
                          <div className="relative flex-1">
                            <Mail
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                              size={20}
                            />
                            <Input
                              {...field}
                              title={t("forms.email_aidant")}
                              placeholder={t("forms.email_aidant") + "*"}
                              className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                            />
                          </div>
                        </div>
                        <FormMessage className="text-logo-red font-bold xl:text-md" />
                      </FormItem>
                    )}
                  />

                  {errorMsg && <div className="flex justify-center text-light-blue">{errorMsg}</div>}

                  {/* Buttons with Tooltip */}
                  <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                    <Button
                      className="rounded-md text-white font-quicksand bg-logo-red shadow-lg w-full sm:w-auto"
                      onClick={e => handleChangePassword(e)}>
                      {t("buttons.change_password")}
                    </Button>
                    
                    {/* Delete Button + Info Icon */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {/* DESKTOP: Button with icon inside + hover tooltip */}
                      <TooltipProvider>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            {!isLoading ? (
                              <Button
                                className="hidden sm:flex rounded-md text-white font-quicksand bg-mid-blue shadow-lg items-center justify-center gap-2"
                                onClick={e => handleDeleteConfirm(e)}>
                                Supprimer mon compte
                                <Info size={16} />
                              </Button>
                            ) : (
                              <Spinner className="hidden sm:block" />
                            )}
                          </TooltipTrigger>
                          <TooltipContent 
                            side="top"
                            align="center"
                            className="max-w-md p-4 bg-white border-2 border-mid-blue text-sm text-gray-700 shadow-xl z-[100]">
                            <p className="font-semibold mb-2 text-logo-red">Attention :</p>
                            <ul className="space-y-1.5 list-disc list-inside text-left leading-relaxed">
                              <li>Votre compte sera supprimé et vous ne pourrez plus vous connecter sur WINGer</li>
                              <li>Vous devrez recréer un nouveau compte <span className="font-bold"> avec une nouvelle adresse email </span></li>
                              <li>Vos données seront conservées par WINGer le temps nécessaire</li>
                              <li>Vos crédits seront perdus et ne seront pas remboursés</li>
                              <li>Si vous avez un abonnement en cours, il ne sera pas remboursé</li>
                              <li>Vous devrez supprimer votre paiement automatique dans votre compte PayPal sous le nom "WINGer"</li>
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      
                      {/* MOBILE: Button without icon */}
                      {!isLoading ? (
                        <Button
                          className="flex sm:hidden rounded-md text-white font-quicksand bg-mid-blue shadow-lg flex-1"
                          onClick={e => handleDeleteConfirm(e)}>
                          Supprimer mon compte
                        </Button>
                      ) : (
                        <Spinner className="flex sm:hidden" />
                      )}
                      
                      {/* MOBILE: Separate info icon with tooltip */}
                      <TooltipProvider>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <button
                              type="button"
                              className="flex sm:hidden flex-shrink-0 w-10 h-10 rounded-full bg-mid-blue text-white items-center justify-center hover:bg-blue-600 transition-colors"
                              onClick={(e) => e.preventDefault()}>
                              <Info size={20} />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent 
                            side="top"
                            align="end"
                            sideOffset={8}
                            className="max-w-[calc(100vw-3rem)] p-4 bg-white border-2 border-mid-blue text-xs text-gray-700 shadow-xl z-[100]">
                            <p className="font-semibold mb-2 text-logo-red">Attention :</p>
                            <ul className="space-y-1.5 list-disc list-inside text-left leading-relaxed">
                              <li>Votre compte sera supprimé et vous ne pourrez plus vous connecter sur WINGer</li>
                              <li>Vous devrez recréer un nouveau compte</li>
                              <li>Vos données seront conservées par WINGer le temps nécessaire</li>
                              <li>Vos crédits seront perdus et ne seront pas remboursés</li>
                              <li>Si vous avez un abonnement en cours, il ne sera pas remboursé</li>
                              <li>Vous devrez supprimer votre paiement automatique dans votre compte PayPal sous le nom "WINGer"</li>
                            </ul>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>

                    {!isLoading ? (
                      <Button
                        type="submit"
                        className=" rounded-md text-white font-quicksand bg-dark-pink shadow-lg w-full sm:w-auto">
                        {t("buttons.edit")}
                      </Button>
                    ) : (
                      <Spinner />
                    )}
                  </div>

                  {/* Footer text for permanent deletion */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      * Si vous désirez supprimer définitivement votre compte, merci d'envoyer un email à{" "}
                      <a 
                        href="mailto:contact@winger.fr" 
                        className="text-dark-pink underline hover:text-mid-blue">
                        contact@winger.fr
                      </a>
                      {" "}en précisant votre nom, prénom et numéro de profil ({aidantData?.profile_number || "N/A"}). 
                      Vous êtes informé que WINGer se réserve le droit de vérifier l'identité du demandeur. 
                      Merci de consulter la{" "}
                      <a 
                        href="/politique-de-confidentialite" 
                        target="_blank"
                        className="text-dark-pink underline hover:text-mid-blue">
                        Politique de Confidentialité
                      </a>
                      {" "}pour le détail de la conservation de vos données.
                    </p>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-dark-blue">Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Êtes-vous sûr(e) de vouloir supprimer votre compte ?
              <br />
              <br />
              <span className="text-logo-red font-semibold">
                Cette action désactivera votre compte et vous ne pourrez plus vous connecter.
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction 
              onClick={deleteAccount}
              className="bg-logo-red hover:bg-red-700">
              Confirmer la suppression
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <ChangePasswordModal
        isOpen={isModalPasswordOpen}
        onClose={() => setIsModalPasswordOpen(false)}
        onConfirm={changePass}
        requireOldPassword={true}
      />
      
      {isMobile && (
        <button
          onClick={() => {
            topRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
          }}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-dark-pink text-white shadow-md hover:bg-pink-800 transition"
          aria-label="Retour en haut">
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default AidantPro;