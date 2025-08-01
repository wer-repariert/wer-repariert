import React, { useState } from "react";

// Such-Funktion für nächste Seite
export async function handleSearch({ deviceType, manufacturer, plz }) {
  if (!deviceType || !manufacturer || !/^\d{5}$/.test(plz)) {
    throw new Error('Bitte wähle Gerätetyp, Hersteller und gib eine 5-stellige PLZ ein.');
  }
  const response = await fetch(
    `/api/repair-partners?device=${encodeURIComponent(deviceType)}&manufacturer=${encodeURIComponent(manufacturer)}&plz=${plz}`
  );
  if (!response.ok) throw new Error('Fehler beim Laden der Reparaturpartner.');
  const data = await response.json();
  return data.partners;
}

// Grafik-Komponente für Ergebnisseiten-Header
export function ResultsHeaderGraphic() {
  return (
    <div className="w-full h-48 bg-green-100 rounded-xl flex items-center justify-center mb-8">
      <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
        <circle cx="60" cy="60" r="50" fill="#A7F3D0" />
        <path d="M40 70 L60 90 L80 50" stroke="#065F46" strokeWidth="8" fill="none" />
      </svg>
    </div>
  );
}

// Hauptkomponente Startseite mit Suchformular
export default function Startseite() {
  const [deviceType, setDeviceType] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [plz, setPlz] = useState("");

  const manufacturersByDevice = {
    Smartphone: ["Apple","Samsung","Google","Huawei","Xiaomi","OnePlus","Motorola","Sony","Nokia","Fairphone","Gigaset","Shift","Oppo","Vivo","Realme","Honor","HTC","Asus"],
    Laptop: ["HP","Lenovo","Dell","Apple","Asus","Acer","Fujitsu","MSI","Medion","Toshiba","Xiaomi","Huawei","Samsung","Razer","Clevo","Gigabyte","Microsoft"],
    Computer: ["HP","Lenovo","Dell","Apple","Asus","Acer","Fujitsu","Hyrican","Captiva","Medion","Wortmann (Terra)","Gigabyte","MSI","Intel NUC","Clevo"],
    Drucker: ["Brother","Canon","Epson","HP","Lexmark","Kyocera","Konica Minolta","Ricoh","Xerox","OKI"],
    Fernseher: ["Samsung","LG","Sony","Philips","Panasonic","Hisense","TCL","Grundig","Telefunken","Loewe"],
    Spielekonsole: ["Sony","Microsoft","Nintendo","Sega","Atari","Valve","NVIDIA","SNK"],
    Smartwatch: ["Apple","Samsung","Garmin","Fitbit","Huawei","Fossil","Michael Kors","Amazfit"],
    Kamera: ["Canon","Nikon","Sony","Fujifilm","Panasonic","Olympus/OM System","Leica","Pentax","GoPro","Hasselblad"],
    Kopfhörer: ["Apple (AirPods/Beats)","Samsung","Sony","Bose","JBL","Sennheiser","Beyerdynamic","Jabra","Bang & Olufsen","Teufel"]
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 w-full bg-green-800 text-white shadow-lg z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex flex-wrap gap-y-4 justify-between items-center">
          <img src="/Logo.png" alt="Wer repariert Logo" className="h-10 w-auto filter brightness-0 invert" />
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <button className="bg-white text-green-800 font-bold rounded-xl px-6 py-3 shadow hover:shadow-md transition">Firma eintragen</button>
            <button className="border-2 border-white text-white font-bold rounded-xl px-6 py-3 hover:bg-white hover:text-green-800 transition">Login</button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-col flex-1 pt-20 pb-12">
        <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center gap-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-black leading-snug">
            Finde Deinen Reparaturpartner<br />schnell, einfach & lokal
          </h1>

          {/* Search Card */}
          <div className="w-full bg-white shadow-lg rounded-xl p-4 flex flex-col gap-4 md:flex-row md:items-center md:gap-4 hover:shadow-2xl transition-shadow">
            <div className="w-full md:flex-1">
              <select value={deviceType} onChange={e => { setDeviceType(e.target.value); setManufacturer(""); }} className="w-full h-12 px-4 bg-gray-100 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 transition">
                <option value="" disabled hidden className="text-gray-500">Gerätetyp</option>
                {Object.keys(manufacturersByDevice).map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div className="w-full md:flex-1">
              <select value={manufacturer} onChange={e => setManufacturer(e.target.value)} disabled={!deviceType} className={`w-full h-12 px-4 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 transition ${deviceType ? 'text-black' : 'text-gray-500'}`}>
                <option value="" disabled hidden className="text-gray-500">Hersteller</option>
                {deviceType && manufacturersByDevice[deviceType].map(maker => <option key={maker} value={maker}>{maker}</option>)}
              </select>
            </div>
            <div className="w-full md:flex-1">
              <input type="text" placeholder="PLZ oder Ort" maxLength={5} inputMode="numeric" pattern="[0-9]{5}" title="Bitte 5-stellige PLZ eingeben" className="w-full h-12 px-4 bg-gray-100 text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 transition" />
            </div>
            <button className="w-full md:w-auto bg-green-800 hover:bg-green-900 text-white font-bold rounded-xl px-8 h-12 shadow-lg hover:shadow-xl transition">Finden</button>
          </div>

          {/* Map */}
          <div className="w-full bg-gray-200 rounded-xl shadow-inner h-80 flex items-center justify-center">
            <p className="text-gray-600 text-lg">[Interaktive Deutschland-Karte erscheint hier]</p>
          </div>

          {/* Content Boxes */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-inner p-6 md:aspect-square flex flex-col items-center text-center">
              <span className="text-4xl mb-4">✅</span>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Recht auf Reparatur</h3>
              <p className="text-gray-600">Elektronische Geräte müssen nicht sofort ersetzt werden. Mit dem gesetzlich verankerten „Recht auf Reparatur“ kannst du defekte Geräte reparieren lassen – kostengünstig und ressourcenschonend. Finde hier zertifizierte Reparaturbetriebe in deiner Nähe.</p>
            </div>
            <div className="bg-white rounded-xl shadow-inner p-6 md:aspect-square flex flex-col items-center text-center">
              <span className="text-4xl mb-4">🌱</span>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Nachhaltigkeit</h3>
              <p className="text-gray-600">Reparaturen verlängern die Lebensdauer deiner Geräte und sparen wertvolle Ressourcen. Unterstütze die Kreislaufwirtschaft und trage aktiv zum Umweltschutz bei – mit einer nachhaltigen Reparaturlösung direkt in deiner Region.</p>
            </div>
            <div className="bg-white rounded-xl shadow-inner p-6 md:aspect-square flex flex-col items-center text-center">
              <span className="text-4xl mb-4">🏪</span>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Lokale Wirtschaft stärken</h3>
              <p className="text-gray-600">Indem du deine Geräte vor Ort reparieren lässt, stärkst du kleine und mittelständische Betriebe. Du förderst Handwerksqualität, hältst die Wertschöpfung in deiner Region und hilfst, Arbeitsplätze zu sichern.</p>
            </div>
            <div className="bg-white rounded-xl shadow-inner p-6 md:aspect-square flex flex-col items-center text-center">
              <span className="text-4xl mb-4">📍</span>
              <h3 className="text-xl font-semibold text-green-800 mb-2">Vorteile vor Ort</h3>
              <p className="text-gray-600">Lange Wartezeiten und teure Versandkosten vermeiden? Kein Problem! Bring dein defektes Gerät einfach direkt in eine nahegelegene Werkstatt – für eine unkomplizierte und persönliche Lösung vor Ort.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t mt-auto py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-col gap-2 md:flex-row md:justify-center md:items-center md:gap-6 text-gray-600 text-sm">
          <a href="/impressum" className="hover:underline">Impressum</a>
          <a href="/datenschutz" className="hover:underline">Datenschutz</a>
          <a href="/agb" className="hover:underline">AGB</a>
          <a href="/nutzungsbedingungen" className="hover:underline">Nutzungsbedingungen</a>
        </div>
      </footer>
    </div>
  );
}
