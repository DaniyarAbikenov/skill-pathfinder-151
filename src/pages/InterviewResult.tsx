import { useTranslation } from "react-i18next";
import { useInterviewStore } from "@/store/useInterviewStore";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {MainLayout} from "@/components/layout/MainLayout.tsx";

export default function InterviewResult() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { reset } = useInterviewStore();

    return (
        <MainLayout>
            <div className="p-8 max-w-xl mx-auto text-center space-y-4">
                <h1 className="text-2xl font-bold">{t("interview.result.title")}</h1>

                <p className="text-lg">{t("interview.result.completed")}</p>

                <Button
                    className="w-full"
                    onClick={() => {
                        reset();
                        navigate("/interview/start");
                    }}
                >
                    {t("interview.result.restart")}
                </Button>
            </div>
        </MainLayout>
    );
}
