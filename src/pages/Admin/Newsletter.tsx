import AdminNav from "./AdminNav";
import { useEffect, useRef, useState } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { ArrowUp, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { ExportNewsletterToExcel } from "@/services/GdprService";
import toast from "react-hot-toast";

const Newsletter = () => {
  const isMobile = useMobile();
  const ref = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    if (ref.current && isMobile) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isMobile]);

  const handleExportNewsletter = async () => {
    try {
      setIsExporting(true);
      const result = await ExportNewsletterToExcel();
      toast.success(` ${result.count} abonnés exportés avec succès!`);
    } catch (error: any) {
      console.error('Export failed:', error);
      toast.error(error.response?.data?.message || " Erreur lors de l'export");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div ref={topRef} className="border border-dark-pink mb-10 container mx-auto">
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
            <h2 className="text-2xl font-quicksand">Gestion Newsletter</h2>
            
            <div className="space-y-4">
              <p className="text-gray-700 font-quicksand_regular">
                Exportez la liste de tous les utilisateurs ayant accepté de recevoir la newsletter.
              </p>

              <Button 
                onClick={handleExportNewsletter}
                disabled={isExporting}
                className="bg-green-600 hover:bg-green-700 text-white font-quicksand"
              >
                {isExporting ? (
                  <>
                    <Spinner className="mr-2 h-4 w-4" />
                    Export en cours...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Exporter la liste Newsletter
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isMobile && (
        <button
          onClick={() => {
            topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="fixed bottom-4 right-4 p-3 rounded-full bg-dark-pink text-white shadow-md hover:bg-pink-800 transition"
          aria-label="Retour en haut"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};

export default Newsletter;