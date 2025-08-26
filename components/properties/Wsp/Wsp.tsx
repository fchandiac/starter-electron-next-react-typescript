import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const Wsp: React.FC = () => (
  <button
    className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg flex items-center justify-center text-white text-3xl transition-colors"
    aria-label="Contactar por WhatsApp"
    data-test-id="wsp-button"
    onClick={() => window.open('https://wa.me/56912345678', '_blank')}
  >
    <FontAwesomeIcon icon={faWhatsapp} />
  </button>
);

export default Wsp;
