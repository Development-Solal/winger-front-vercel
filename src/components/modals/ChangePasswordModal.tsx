import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useMemo, useState} from "react";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {Eye, EyeOff} from "lucide-react";

interface ChangePasswordModalProps {
    isOpen: boolean;
    requireOldPassword: boolean;
    onClose: () => void;
    onConfirm: (data: { oldPassword?: string; newPassword: string; confirmPassword: string }) => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({isOpen, requireOldPassword, onClose, onConfirm}) => {
    const formSchema = useMemo(
        () =>
            z
                .object({
                    oldPassword: requireOldPassword
                        ? z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères")
                        : z.string().optional(),
                    newPassword: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
                    confirmPassword: z.string().min(6, "Veuillez confirmer votre mot de passe"),
                })
                .refine(data => data.newPassword === data.confirmPassword, {
                    message: "Les mots de passe ne correspondent pas",
                    path: ["confirmPassword"],
                }),
        [requireOldPassword]
    );

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const submitHandler = (data: z.infer<typeof formSchema>) => {
        onConfirm(data);
        reset();
    };

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Changer le mot de passe</AlertDialogTitle>
                        <AlertDialogDescription>
                            {requireOldPassword
                                ? "Veuillez entrer votre ancien et nouveau mot de passe."
                                : "Veuillez entrer le nouveau mot de passe."}
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    {requireOldPassword && (
                        <div className="relative w-full">
                            <input
                                type={showPassword1 ? "text" : "password"}
                                placeholder="Ancien mot de passe"
                                {...register("oldPassword")}
                                className="w-full border px-3 py-2 pr-10 rounded-md"
                            />
                            <div
                                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                onClick={() => setShowPassword1(!showPassword1)}>
                                {showPassword1 ? (
                                    <Eye className="text-dark-pink" size={20}/>
                                ) : (
                                    <EyeOff className="text-dark-pink" size={20}/>
                                )}
                            </div>
                            {errors.oldPassword &&
                                <p className="text-sm text-red-600 mt-1">{errors.oldPassword.message}</p>}
                        </div>
                    )}

                    <div className="relative w-full">
                        <input
                            type={showPassword2 ? "text" : "password"}
                            placeholder="Nouveau mot de passe"
                            {...register("newPassword")}
                            className="w-full border px-3 py-2 pr-10 rounded-md"
                        />
                        <div
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={() => setShowPassword2(!showPassword2)}>
                            {showPassword2 ? (
                                <Eye className="text-dark-pink" size={20}/>
                            ) : (
                                <EyeOff className="text-dark-pink" size={20}/>
                            )}
                        </div>
                        {errors.newPassword &&
                            <p className="text-sm text-red-600 mt-1">{errors.newPassword.message}</p>}
                    </div>

                    <div className="relative w-full">
                        <input
                            type={showPassword3 ? "text" : "password"}
                            placeholder="Confirmer mot de passe"
                            {...register("confirmPassword")}
                            className="w-full border px-3 py-2 pr-10 rounded-md"
                        />
                        <div
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                            onClick={() => setShowPassword3(!showPassword3)}>
                            {showPassword3 ? (
                                <Eye className="text-dark-pink" size={20}/>
                            ) : (
                                <EyeOff className="text-dark-pink" size={20}/>
                            )}
                        </div>
                        {errors.confirmPassword &&
                            <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>}
                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel type="button" onClick={onClose}>
                            Annuler
                        </AlertDialogCancel>
                        <button type="submit"
                                className="bg-dark-pink text-sm font-quicksand text-white px-4 py-2 rounded-md">
                            Confirmer
                        </button>
                    </AlertDialogFooter>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ChangePasswordModal;