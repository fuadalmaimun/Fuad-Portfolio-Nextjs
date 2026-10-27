"use client";

import { useState, useEffect } from "react";
import { X, Download, FileText } from "lucide-react";
import { TbFileCvFilled } from "react-icons/tb";

export default function CVPreview() {
  const [isOpen, setIsOpen] = useState(false);

  const cvUrl = "/Fuad%20Resume.pdf";

  // Lock background scrolling while modal is open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, [isOpen]);

  return (
    <>
      {/* View CV Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-purple-500/30 bg-purple-950/30 px-6 py-3.5 text-sm font-medium text-purple-200 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400/60 hover:bg-purple-600/20 hover:text-white sm:text-base"
      >
        CV
        <TbFileCvFilled size={19} />
      </button>

      {/* CV Preview Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 p-2 backdrop-blur-md sm:p-6">
          {/* Centered Modal */}
          <div
            role="dialog"
            aria-modal="true"
            aria-label="CV Preview"
            className="relative mx-auto flex h-[90dvh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111114] shadow-[0_0_80px_rgba(139,92,246,0.15)]"
          >
            {/* Modal Header */}
            <div className="relative z-20 flex shrink-0 items-center justify-between gap-2 border-b border-white/10 bg-[#17171c] px-3 py-3 sm:gap-3 sm:px-5">
            

              <div className="flex shrink-0 mt-10 items-center gap-9">
                {/* Download Button */}
                <a
                  href={cvUrl}
                  download="Fuad_Al_Maimun_CV.pdf"
                  className="inline-flex items-center gap-1.5 rounded-full bg-purple-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-purple-500 sm:gap-2 sm:px-4 sm:text-sm"
                >
                  <Download size={15} />
                  <span>Download</span>
                </a>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close CV preview"
                  className="relative z-50 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-red-600 text-white transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <X size={24} strokeWidth={3} />
                </button>
              </div>
            </div>

            {/* PDF Preview */}
            <div className="min-h-0 flex-1 overflow-hidden bg-[#25252b] p-1 sm:p-3">
              <iframe
                src={`${cvUrl}#toolbar=1&navpanes=0&view=FitH`}
                title="Fuad Al Maimun CV Preview"
                className="block h-full w-full rounded-lg border-0 bg-white"
              />
            </div>

            {/* Footer */}
            <div className="relative z-10 flex shrink-0 items-center justify-center border-t border-white/10 bg-[#17171c] px-4 py-2">
          
            </div>
          </div>
        </div>
      )}
    </>
  );
}
