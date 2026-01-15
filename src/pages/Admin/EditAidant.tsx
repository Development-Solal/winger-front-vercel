import {useEffect, useRef, useState} from "react";

import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ArrowUp, Cake, Mail, MapPin, UserRound, UserRoundPlus} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Label} from "@/components/ui/label";
import {ListModel} from "@/models/ListModel";
import {CustomAsyncSelect} from "@/components/ui/custom-async-select";
import {getAllLists, loadOptionsCommunes, loadOptionsTowns} from "@/services/ListService";
import Background1 from "../../assets/Register/background-1.png";
import {GetAidantByUserService} from "@/services/UserService";
import {AidantModel} from "@/models/AidantModel";
import {BASE_URL} from "@/utils/api";
import {UpdateAidantService} from "@/services/AidantService";
import {Spinner} from "@/components/ui/spinner";
import toast from "react-hot-toast";
import CropModal from "@/components/modals/CropModal";
import {useTranslation} from "react-i18next";
import {getFormSchemaEditAidant} from "@/schemas/compteSchema";
import AdminNav from "./AdminNav";
import {useParams} from "react-router-dom";
import {useMobile} from "@/hooks/use-mobile";

const EditAdminAidant = () => {
  const {user} = useParams();
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const {t} = useTranslation();
  const formSchema = getFormSchemaEditAidant(t);

  const [preview, setPreview] = useState<string | null>(null); // State for the image preview
  const [tempImage, setTempImage] = useState<string | null>(null); // State for the crop preview

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [aidantData, setAidantData] = useState<AidantModel>();
  const [ageList, setAgeList] = useState([]);
  const [selectedCommune, setSelectedCommune] = useState<string>();
  const [selectedTown, setSelectedTown] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profile_type: "Particulier",
      first_name: "",
      age: aidantData?.age_id ? aidantData.age_id.toString() : "",
      last_name: "",
      email: "",
      closest_town: "",
      commune: "",
      // aidant_is_aide: "oui",
    },
  });

  useEffect(() => {
    if (ref.current && isMobile) {
      ref.current.scrollIntoView({behavior: "smooth", block: "start"});
    }
  }, [isMobile]);

  useEffect(() => {
    getAllLists()
      .then(res => {
        setAgeList(res.ageList);
      })
      .catch(err => {
        console.log(err);
      });

    if (user) {
      GetAidantByUserService(user)
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
    if (aidantData && ageList.length > 0) {
      // Set the form values based on the fetched aidant data
      form.setValue("first_name", aidantData.first_name || "");
      form.setValue("last_name", aidantData.last_name || "");
      form.setValue("email", aidantData.email || "");
      form.setValue("closest_town", aidantData.town_id || "");
      form.setValue("commune", aidantData.commune_id || "");

      form.setValue("age", aidantData.age_id ? String(aidantData.age_id) : "");
      // form.setValue("aidant_is_aide", aidantData.aidant_is_aide);

      setSelectedTown(aidantData.town?.town);
      setSelectedCommune(aidantData.commune?.name);
    }
  }, [ageList.length, aidantData, form, setSelectedTown]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (key === "profile_pic" && value instanceof File) {
        formData.append(key, value);
      }  else if (key === "email") {
          formData.append(key, (value as string)?.trim().toLowerCase());
      } else {
        formData.append(key, value as string);
      }
    });

    if (user) {
      UpdateAidantService(user, formData)
        .then(res => {
          console.log(res);
          setErrorMsg("");
          setIsLoading(false);
          toast.success(t("compte.edit_aidant_success"));
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
            {/* <h2 className="text-2xl font-quicksand">Gérer les utilisateurs</h2> */}
            <div
              className="py-10 px-4 sm:px-6 md:px-8 font-quicksand_regular w-full scroll-mt-24"
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
                                  {/* <span className="text-slate-500">Insérer une image*</span> */}
                                  <div className="relative mx-auto my-2 h-24 w-24 rounded-full bg-dark-pink p-1">
                                    <label
                                        htmlFor="profileImageInput"
                                        className="cursor-pointer flex items-center justify-center h-full w-full rounded-full overflow-hidden">
                                      {preview ? (
                                          <img src={preview} alt="Preview" className="h-full w-full object-cover"/>
                                      ) : (
                                          <UserRoundPlus className="h-12 w-12 text-white"/>
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
                                <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                              <FormMessage className="text-logo-red font-bold xl:text-md"/>
                            </FormItem>
                        )}
                    />

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
                              <FormMessage className="text-logo-red font-bold xl:text-md"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="age"
                        render={({field}) => (
                            <FormItem>
                              <div className="flex items-center">
                                <div className="relative flex-1">
                                  <Select onValueChange={field.onChange} value={field.value || ""}>
                                    <FormControl>
                                      <SelectTrigger
                                          title={t("forms.age_aidant")}
                                          className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none">
                                        <Cake
                                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-pink"
                                            size={20}
                                        />
                                        <SelectValue placeholder={t("forms.age_aidant") + "*"}/>
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {ageList.map((age: ListModel) => (
                                          <SelectItem key={age.id} value={String(age.id)}>
                                            {age.title} ans
                                          </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              <FormMessage className="text-logo-red font-bold xl:text-md"/>
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
                                      icon={<MapPin size={18} className="text-dark-pink"/>}
                                  />
                                </div>
                              </div>
                              <FormMessage className="text-logo-red font-bold xl:text-md"/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="commune"
                        render={({field}) => (
                            <FormItem>
                              <div className="flex items-center">
                                <div className="relative flex-1">
                                  <CustomAsyncSelect
                                      value={
                                        field.value
                                            ? {
                                              value: String(field.value),
                                              label: String(selectedCommune || field.value)
                                            }
                                            : null
                                      }
                                      loadOptions={loadOptionsCommunes}
                                      onChange={selected => {
                                        field.onChange(selected?.value || "");
                                        setSelectedCommune(selected?.label || "");
                                      }}
                                      placeholder={t("forms.commune_aidant") + "*"}
                                      page={1}
                                      icon={<MapPin size={18} className="text-dark-pink"/>}
                                  />
                                </div>
                              </div>
                              <FormMessage className="text-logo-red font-bold xl:text-md"/>
                            </FormItem>
                        )}
                    />
                    <p className="text-light-blue text-xs">{t("forms.private_field")}</p>

                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                              <div className="flex items-center">
                                <div className="relative flex-1">
                                  <Mail
                                      className="absolute left-3 top-1/2 transform -translate-y-1/2  text-dark-pink"
                                      size={20}
                                  />
                                  <Input
                                      {...field}
                                      title={t("forms.email_aidant")}
                                      placeholder={t("forms.email_aidant")}
                                      className="rounded-none border-0 border-b border-light-pink pl-10  focus:border-b-dark-pink focus-visible:ring-0 shadow-none"
                                  />
                                </div>
                              </div>
                              <FormMessage className="text-logo-red font-bold xl:text-md"/>
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4">
                      {!isLoading ? (
                          <Button
                              type="submit"
                              className=" rounded-md text-white font-quicksand bg-dark-pink shadow-lg w-full sm:w-auto">
                            {t("buttons.edit")}
                          </Button>
                      ) : (
                          <Spinner/>
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

export default EditAdminAidant;
