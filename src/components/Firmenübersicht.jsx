import React, { useState, useMemo } from "react";

export default function ErgebnisseiteVorschau() {
  const [deviceType, setDeviceType] = useState("Smartphone");
  const [manufacturer, setManufacturer] = useState("Samsung");
  const [plz, setPlz] = useState("10115");

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
  const heute = new Date().toLocaleDateString("de-DE", { weekday: "long" });

  const firmen = useMemo(() => {
    const allFirmen = [
      {
        name: "Reparatur Müller",
        zeiten: { von: "09:00", bis: "18:00" },
        plz: "10115",
        premium: true,
        adresse: "Hauptstraße 12, 10115 Berlin"
      },
      {
        name: "FixIT Hamburg",
        zeiten: { von: "10:00", bis: "17:00" },
        plz: "20359",
        premium: false,
        adresse: "Reeperbahn 22, 20359 Hamburg"
      },
      {
        name: "TechDoc Leipzig",
        zeiten: { von: "08:00", bis: "14:00" },
        plz: "04109",
        premium: false,
        adresse: "Markt 1, 04109 Leipzig"
      },
      {
        name: "PhoneRepair Berlin",
        zeiten: { von: "11:00", bis: "19:00" },
        plz: "10117",
        premium: true,
        adresse: "Alexanderplatz 5, 10117 Berlin"
      },
      {
        name: "Repair Express München",
        zeiten: { von: "09:30", bis: "18:30" },
        plz: "80331",
        premium: false,
        adresse: "Sendlinger Str. 10, 80331 München"
      },
      {
        name: "DisplayPro Stuttgart",
        zeiten: { von: "08:30", bis: "17:00" },
        plz: "70173",
        premium: false,
        adresse: "Königstraße 1, 70173 Stuttgart"
      },
      {
        name: "Tablet Klinik Köln",
        zeiten: { von: "10:00", bis: "16:00" },
        plz: "50667",
        premium: false,
        adresse: "Domstraße 3, 50667 Köln"
      },
      {
        name: "Notebook Retter Frankfurt",
        zeiten: { von: "08:00", bis: "18:00" },
        plz: "60311",
        premium: false,
        adresse: "Zeil 110, 60311 Frankfurt"
      },
      {
        name: "MobileFix Dortmund",
        zeiten: { von: "09:00", bis: "18:00" },
        plz: "44135",
        premium: false,
        adresse: "Ostwall 7, 44135 Dortmund"
      },
      {
        name: "Smart Repair Hannover",
        zeiten: { von: "10:00", bis: "17:30" },
        plz: "30159",
        premium: false,
        adresse: "Bahnhofstraße 12, 30159 Hannover"
      },
      {
        name: "iRepair Dresden",
        zeiten: { von: "08:00", bis: "15:30" },
        plz: "01067",
        premium: false,
        adresse: "Prager Straße 2, 01067 Dresden"
      },
      {
        name: "Reparaturheld Bremen",
        zeiten: { von: "09:00", bis: "16:00" },
        adresse: "Am Wall 120, 28195 Bremen",
        plz: "28195",
        premium: false
      }
    ];

    return allFirmen.sort((a, b) => {
      const plzNum = parseInt(plz);
      const aDist = Math.abs(parseInt(a.plz) - plzNum);
      const bDist = Math.abs(parseInt(b.plz) - plzNum);

      const aIsPremiumNear = a.premium && aDist <= 20;
      const bIsPremiumNear = b.premium && bDist <= 20;

      if (aIsPremiumNear && !bIsPremiumNear) return -1;
      if (!aIsPremiumNear && bIsPremiumNear) return 1;

      return aDist - bDist;
    });
  }, [plz]);

  const istJetztGeoeffnet = (von, bis) => {
    const jetzt = new Date();
    const [vonH, vonM] = von.split(":").map(Number);
    const [bisH, bisM] = bis.split(":").map(Number);
    const start = new Date(jetzt);
    start.setHours(vonH, vonM, 0);
    const ende = new Date(jetzt);
    ende.setHours(bisH, bisM, 0);
    return jetzt >= start && jetzt <= ende;
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-900 flex flex-col">
      {/* Sticky Header */}
      <header className="sticky top-0 w-full bg-green-800 text-white shadow-xl z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <img src="/Logo.png" alt="Wer repariert Logo" className="h-10 w-auto filter brightness-0 invert" />
          <div className="flex items-center gap-4">
            <button className="bg-white text-green-800 font-bold rounded-xl px-6 py-3 shadow hover:shadow-lg transition">Firma eintragen</button>
            <button className="border-2 border-white text-white font-bold rounded-lg px-6 py-3 hover:bg-white hover:text-green-800 transition">Login</button>
          </div>
        </div>
      </header>

      <main className="flex flex-col flex-1 pt-20 pb-12">
        <div className="w-full max-w-4xl mx-auto px-6 flex flex-col items-center gap-12">
          {/* Search Card */}
          <div className="w-full bg-white shadow-lg rounded-xl p-4 flex items-center justify-between gap-4 hover:shadow-2xl transition-shadow">
            <div className="flex flex-1 items-center gap-3">
              <select value={deviceType} onChange={e => { setDeviceType(e.target.value); setManufacturer(""); }} className="w-full h-12 pl-4 pr-8 bg-gray-100 text-black rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-green-200 transition">
  <option value="" disabled hidden>Gerätetyp</option>
  {Object.keys(manufacturersByDevice).map(type => (
    <option key={type} value={type}>{type}</option>
  ))}
</select>

              <select value={manufacturer} onChange={e => setManufacturer(e.target.value)} disabled={!deviceType} className={`w-full h-12 pl-4 pr-8 bg-gray-100 rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-green-200 transition ${deviceType ? 'text-black' : 'text-gray-500'}`}>
  <option value="" disabled hidden>Hersteller</option>
  {deviceType && manufacturersByDevice[deviceType].map(maker => (
    <option key={maker} value={maker}>{maker}</option>
  ))}
</select>

              <input type="text" value={plz} onChange={e => setPlz(e.target.value)} placeholder="PLZ oder Ort" className="flex-1 h-12 pl-4 bg-gray-100 text-black rounded-xl border border-transparent focus:outline-none focus:ring-2 focus:ring-green-200 transition" />
            </div>

            <button className="bg-green-800 hover:bg-green-900 text-white font-bold rounded-xl px-8 h-12 shadow-lg hover:shadow-xl transition">Finden</button>
          </div>

          <div className="mt-2 px-6 py-3 bg-white border border-gray-200 rounded-xl shadow text-sm text-gray-700 text-center">
  <span className="text-green-800 font-semibold">wer-repariert:</span>
  <span className="text-black font-medium"> {deviceType} – {manufacturer} in {plz}</span>
</div>

          <div className="w-full space-y-6">
            {firmen.map((firma, index) => {
              const istGeoeffnet = istJetztGeoeffnet(firma.zeiten.von, firma.zeiten.bis);
              const istPremium = firma.premium;

              return (
                <div
                  key={firma.name}
                  className={istPremium ? 'border-l-8 border-yellow-500 bg-gradient-to-r from-yellow-50 to-white rounded-xl shadow-xl p-8 ring-2 ring-yellow-300' : 'bg-white rounded-xl border border-gray-300 shadow-md p-6 ring-1 ring-gray-200'}
                >
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className={istPremium ? 'space-y-4' : 'space-y-2'}>
                      <h2 className={istPremium ? 'text-3xl font-extrabold text-green-900' : 'text-2xl font-semibold text-green-900'}>{firma.name}</h2>
                      <p className="text-gray-700">
                        <span className="block font-medium text-gray-800">{firma.adresse}</span>
                        <span className="inline-block text-xs text-white bg-green-700 rounded-full px-3 py-1 mt-1">~{Math.abs(parseInt(firma.plz) - parseInt(plz))} km entfernt</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        {index === 0
                          ? '📞 030 12345678 · ✉️ info@reparatur-mueller.de'
                          : index === 1
                          ? '📞 040 9876543 · ✉️ kontakt@fixit-hamburg.de'
                          : '📞 0341 7654321 · ✉️ service@techdoc-leipzig.de'}
                      </p>
                      <a href="#" className="inline-flex items-center gap-1 text-green-700 hover:text-green-900 text-sm font-medium transition">👉 Zum Firmenprofil</a>
                    </div>
                    <div className="text-sm text-right text-green-900 space-y-1 whitespace-nowrap">
                      <p className="font-semibold">Öffnungszeiten heute</p>
                      <p>{firma.zeiten.von} – {firma.zeiten.bis} Uhr</p>
                      <p className={istGeoeffnet ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                        {istGeoeffnet ? 'Jetzt geöffnet' : 'Geschlossen'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <footer className="w-full bg-white border-t mt-auto py-6">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row justify-center items-center gap-6 text-gray-600">
          <a href="/impressum" className="hover:underline">Impressum</a>
          <a href="/datenschutz" className="hover:underline">Datenschutz</a>
          <a href="/agb" className="hover:underline">AGB</a>
          <a href="/nutzungsbedingungen" className="hover:underline">Nutzungsbedingungen</a>
        </div>
      </footer>
    </div>
  );
}
