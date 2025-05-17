import { useState, useEffect } from 'react';
import { FiFileText } from 'react-icons/fi';

import samplepdf from "../assets/sample.pdf"

export default function LeavePolicy() {
    const [pdfError, setPdfError] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    const pdfFile = samplepdf;

    useEffect(() => {
        // Detect if on mobile
        setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

        // Check if PDF is accessible
        fetch(pdfFile)
            .then((response) => {
                if (!response.ok) throw new Error('PDF not found');
                setPdfError(null);
            })
            .catch((error) => {
                console.error('PDF load error:', error.message);
                setPdfError('Failed to load PDF. Please try downloading the file or contact support.');
            });
    }, [pdfFile]);

    return (
        <div className="h-screen flex flex-col px-3 sm:px-4 py-4 sm:py-6">
            <div className="w-full max-w-6xl mx-auto flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-4 sm:mb-5">
                    <FiFileText className="text-gray-700 w-5 h-5 sm:w-6 sm:h-6" />
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 relative">
                        Leave Policy
                        <span className="absolute -bottom-1 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
                    </h2>
                </div>
                <div className="bg-white/20 backdrop-blur-[16px] rounded-xl shadow-md p-4 sm:p-5 transition-all duration-300 flex-1 overflow-hidden">
                    <div className="bg-white/10 rounded-lg p-3 sm:p-4 h-full flex flex-col">
                        {pdfError ? (
                            <div className="flex flex-col items-center justify-center h-full text-gray-700 text-sm sm:text-base">
                                <p>{pdfError}</p>
                                <a
                                    href={pdfFile}
                                    download="leave-policy.pdf"
                                    target="_blank"
                                    className="mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-sm sm:text-base font-semibold shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200"
                                >
                                    Download PDF
                                </a>
                            </div>
                        ) : (
                            <>
                                <div className="max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] flex-1 overflow-auto">
                                    {!isMobile ? (
                                        <iframe
                                            src={pdfFile}
                                            title="Leave Policy PDF"
                                            className="w-full h-full border-none"
                                            onError={() => {
                                                console.error('Iframe load error: Failed to load PDF');
                                                setPdfError('Failed to load PDF. Please try downloading the file.');
                                            }}
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center text-gray-700 text-sm sm:text-base h-full">
                                            <p>Inline PDF viewing is not supported on your device.</p>
                                            <a
                                                href={pdfFile}
                                                download="leave-policy.pdf"
                                                target="_blank"
                                                className="mt-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-sm sm:text-base font-semibold shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200"
                                            >
                                                Download PDF
                                            </a>
                                        </div>
                                    )}
                                </div>
                                <div className="flex items-center justify-center mt-2 sm:mt-3">
                                    <a
                                        href={pdfFile}
                                        download="leave-policy.pdf"
                                        target="_blank"
                                        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-lg text-sm sm:text-base font-semibold shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200"
                                    >
                                        Download PDF
                                    </a>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
