import {useEffect, useRef, useState} from "react";

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ArrowUp, Briefcase, Mail, MapPin, UserRound, UserRoundPlus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Form, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {CustomAsyncSelect} from "@/components/ui/custom-async-select";
import {loadOptionsTowns} from "@/services/ListService";
import Background1 from "../../assets/Register/background-1.png";
import {GetAidantProByUserService} from "@/services/UserService";
import {AidantProModel} from "@/models/AidantModel";
import {BASE_URL} from "@/utils/api";
import {UpdateAidantProService} from "@/services/AidantService";
import {Textarea} from "@/components/ui/textarea";
import toast from "react-hot-toast";
import {Spinner} from "@/components/ui/spinner";
import CropModal from "@/components/modals/CropModal";
import {useTranslation} from "react-i18next";
import {getFormSchemaEditAidantPro} from "@/schemas/compteSchema";
import AdminNav from "./AdminNav";
import {useParams} from "react-router-dom";
import {useMobile} from "@/hooks/use-mobile";

const EditAdminAidantPro = () => {
  const {user} = useParams();
  const {t} = useTranslation();
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
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

  const [preview, setPreview] = useState<string | null>(null); // State for the image preview
  const [tempImage, setTempImage] = useState<string | null>(null); // State for the crop preview

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [aidantData, setAidantData] = useState<AidantProModel>();
  const [selectedTown, setSelectedTown] = useState<string>();

  useEffect(() => {
    if (ref.current && isMobile) {
      ref.current.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, [isMobile]);

  useEffect(() => {
    if (user) {
      GetAidantProByUserService(user)
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
      // Set the form values based on the fetched aidant data
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
          formData.append(key, (value as string)?.trim().toLowerCase());
      } else {
        formData.append(key, value as string);
      }
    });

    if (user) {
      UpdateAidantProService(user, formData)
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

  return (
    <div ref={topRef} className="border border-dark-pink mb-10 container mx-auto ">
      <div className="bg-gradient-to-r from-mid-pink to-dark-pink px-4 py-6 text-white font-quicksand_book">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold font-quicksand">WINGer Administrateur</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[300px,1fr]">
          <AdminNav />
          <div ref={ref} className="space-y-6 p-6">
            <div
              className="py-10 px-4 sm:px-6 md:px-8 font-quicksand_regular w-full"
              style={{backgroundImage: `url(${Background1})`}}>
              <div className="rounded-md bg-white p-6 sm:p-8 shadow-lg mt-8 w-full max-w-full">
                <h2 className="mb-6 text-center text-xl font-bold text-dark-blue">#{aidantData?.profile_number}</h2>
                <h2 className="mb-6 text-center text-2xl font-bold text-dark-blue">
                  Profil de {aidantData?.first_name}
                </h2>

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

                    {/* Error Msg */}
                    {errorMsg && <div className="flex justify-center text-light-blue">{errorMsg}</div>}

                    {/* Submit Button */}
                    <div className="flex justify-end pt-4 gap-x-5">
                      {!isLoading ? (
                        <Button
                          type="submit"
                          className=" rounded-md text-white font-quicksand bg-dark-pink shadow-lg w-full sm:w-auto">
                          {t("buttons.submit")}
                        </Button>
                      ) : (
                        <Spinner />
                      )}
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default EditAdminAidantPro;
