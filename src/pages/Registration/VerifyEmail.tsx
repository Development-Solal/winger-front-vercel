import {useUser} from "@/context/AuthContext";
import {verifyEmailService} from "@/services/AuthService";
import {useEffect, useRef, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";
import {t} from "i18next";
import {GetAidantProByUserService} from "@/services/UserService.ts";
import {sendAidantProVerifiedEmailToAdmin} from "@/services/EmailService.ts";


const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const {user, setUser} = useUser();
    const navigate = useNavigate();

    const [status, setStatus] = useState(t("verifyEmail.verifying"));
    const [status2, setStatus2] = useState<string>("");
    const hasVerified = useRef(false);



    useEffect(() => {
        const token = searchParams.get("token");

        // If user is still loading (undefined), do nothing yet
        if (user === undefined) return;

        if (user) {
            if (!user.is_email_verified && token && !hasVerified.current) {
                hasVerified.current = true; // Mark as executed
                verifyEmailService(token)
                    .then(res => {
                        setStatus(res.message || t("verifyEmail.verified"));
                        setStatus2("");
                        setUser(prevUser => (prevUser ? {...prevUser, is_email_verified: true} : prevUser));
                        if (user.ProfileAidant.profile_type_id===2) {
                            return GetAidantProByUserService(user.id)
                                .then(aidantProRes => {
                                    return sendAidantProVerifiedEmailToAdmin(aidantProRes);
                                })
                                .then(emailRes => {
                                    console.log("Email sent:", emailRes);
                                });
                        }
                        return Promise.resolve();
                    })
                    .then(() => {
                        navigate("/email-verified");
                    })
                    .catch(err => {
                        hasVerified.current = false; // Reset on error to allow retry
                        setStatus(err.response?.data?.message || t("verifyEmail.failed"));
                        setStatus2("");
                    });
            } else if (user.is_email_verified) {
                setStatus(t("verifyEmail.already_verified"));
                setStatus2("");
                navigate("/email-verified");
            } else if (!token) {
                setStatus(t("verifyEmail.verify2"));
                setStatus2(t("verifyEmail.verify1"));
            }
        } else if (!user && token) {
            setStatus(t("verifyEmail.connect"));
            setStatus2("");
        }
    }, [user, searchParams, navigate, setUser]);

    // Show loading state until user is determined (prevents false redirects)
    if (user === undefined) {
        return (
            <div className="flex items-center justify-center min-h-screen -my-40">
                <div className="p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-gray-800">{t("verifyEmail.loading")}</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen -my-40">
            <div className="p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 text-center">
                    {status2.length > 0 ? (
                        <>
                            {status2}
                            <br/>
                            <br/>
                            {status}
                            <br/>
                            (Pensez à vérifier vos spams si vous ne recevez rien.)
                        </>
                    ) : (
                        status
                    )}
                </h1>
            </div>
        </div>
    );
};

export default VerifyEmail;
