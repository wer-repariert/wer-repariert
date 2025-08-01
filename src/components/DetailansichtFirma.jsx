import React from "react";

const firma = {
  name: "Reparatur Müller",
  adresse: "Hauptstraße 12, 10115 Berlin",
  telefon: "030 12345678",
  email: "info@reparatur-mueller.de",
  web: "www.reparatur-mueller.de",
  geo: "[Hier wird eine Karte eingeblendet]",
  oeffnungszeiten: "Mo–Fr 09:00 – 18:00 Uhr",
  offen: true,
  spezialisiert: [
    "Smartphones: Apple, Samsung, Xiaomi",
    "Tablets: Apple, Huawei",
    "Laptops: Lenovo, Dell, HP",
    "Konsolen: Nintendo Switch, PlayStation"
  ],
  ueberUns: "Reparatur Müller ist seit über 15 Jahren Ihr zuverlässiger Partner für Handy- und Smartphone-Reparaturen in Berlin. Wir bieten schnelle Hilfe bei Displayschäden, Akkuproblemen und vielem mehr – persönlich, lokal und nachhaltig.",
  social: {
    facebook: "https://facebook.com/reparaturmueller",
    instagram: "https://instagram.com/reparaturmueller",
    linkedin: "https://linkedin.com/company/reparaturmueller",
    pinterest: "https://pinterest.com/reparaturmueller",
    tiktok: "https://tiktok.com/@reparaturmueller"
  }
};

export default function Firmenprofil() {
  return (
    <div className="min-h-screen bg-green-50 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 w-full bg-green-800 text-white shadow-md z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <img src="/Logo.png" alt="Wer repariert Logo" className="h-10 w-auto filter brightness-0 invert" />
          <div className="flex items-center gap-4">
            <button className="bg-white text-green-800 font-bold rounded-lg px-6 py-3 shadow hover:shadow-md transition">Firma eintragen</button>
            <button className="border-2 border-white text-white font-bold rounded-lg px-6 py-3 hover:bg-white hover:text-green-800 transition">Login</button>
          </div>
        </div>
      </header>

      {/* Hauptinhalt */}
      <main className="flex-1 py-10 px-4 md:px-8">
        <div className="max-w-4xl mx-auto space-y-10">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <p>Gesuchte Reparatur: <strong>Smartphone</strong> – <strong>Samsung</strong> in <strong>10115</strong></p>
            <a href="/" className="text-green-700 hover:underline font-medium">← Zur Übersicht</a>
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:items-start">
            <div className="flex-1 space-y-2">
              <h1 className="text-4xl font-extrabold text-green-900">{firma.name}</h1>
              <p className="text-gray-600 text-lg">{firma.adresse}</p>
              <p className="text-gray-500">
                📞 {firma.telefon}<br />
                ✉️ {firma.email}<br />
                🌐 {firma.web}
              </p>
              <a href="/formular">
                <div className="mt-10">
                  <button className="bg-green-700 hover:bg-green-800 text-white font-bold rounded-lg px-6 py-3 shadow hover:shadow-md transition">
                    Reparatur anfragen
                  </button>
                </div>
              </a>
            </div>

            <div className="w-full md:w-72 bg-white border border-gray-200 rounded-xl p-4 shadow text-sm self-start">
              <h2 className="text-lg font-bold text-green-800 mb-2">Öffnungszeiten</h2>
              <ul className="text-gray-700 space-y-1">
                <li>Montag: 09:00 – 18:00 Uhr</li>
                <li>Dienstag: 09:00 – 18:00 Uhr</li>
                <li>Mittwoch: 09:00 – 18:00 Uhr</li>
                <li>Donnerstag: 09:00 – 18:00 Uhr</li>
                <li>Freitag: 09:00 – 18:00 Uhr</li>
                <li>Samstag: Geschlossen</li>
                <li>Sonntag: Geschlossen</li>
              </ul>
              <p className="mt-2 text-green-600 font-semibold">✅ Jetzt geöffnet</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-4">Galerie</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <img src="/galerie-1.jpg" alt="Galeriebild 1" className="w-full h-40 object-cover rounded-lg" />
              <img src="/galerie-2.jpg" alt="Galeriebild 2" className="w-full h-40 object-cover rounded-lg" />
              <img src="/galerie-3.jpg" alt="Galeriebild 3" className="w-full h-40 object-cover rounded-lg" />
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow p-6 space-y-4">
            <h2 className="text-2xl font-bold text-green-800">Über uns</h2>
            
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow p-6 space-y-4">
            <h2 className="text-2xl font-bold text-green-800">Social Media</h2>
            <div className="flex gap-4 text-sm">
              {firma.social.facebook && <a href={firma.social.facebook} className="hover:underline text-blue-700">🔗 Facebook</a>}
              {firma.social.instagram && <a href={firma.social.instagram} className="hover:underline text-pink-700">📸 Instagram</a>}
              {firma.social.linkedin && <a href={firma.social.linkedin} className="hover:underline text-blue-600">🔗 LinkedIn</a>}
              {firma.social.pinterest && <a href={firma.social.pinterest} className="hover:underline text-red-600">📌 Pinterest</a>}
              {firma.social.tiktok && <a href={firma.social.tiktok} className="hover:underline text-black">🎵 TikTok</a>}
            </div>
            <p className="text-gray-700">{firma.ueberUns}</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow p-6 space-y-4">
            <h2 className="text-2xl font-bold text-green-800">Spezialisiert auf</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {firma.spezialisiert.map((eintrag, i) => (
                <li key={i}>{eintrag}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow p-6 space-y-4">
            <h2 className="text-2xl font-bold text-green-800">Karte & Anfahrt</h2>
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-xl">
              <span className="text-gray-500">{firma.geo}</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t mt-auto py-6">
        <div className="max-w-4xl mx-auto px-6 text-sm flex flex-col md:flex-row justify-center items-center gap-4 text-gray-600">
          <a href="/impressum" className="hover:underline">Impressum</a>
          <a href="/datenschutz" className="hover:underline">Datenschutz</a>
          <a href="/agb" className="hover:underline">AGB</a>
          <a href="/nutzungsbedingungen" className="hover:underline">Nutzungsbedingungen</a>
        </div>
      </footer>
    </div>
  );
}
