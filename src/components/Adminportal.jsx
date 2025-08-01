import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail, Phone, Globe, Landmark } from "lucide-react";

const zeiten = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"];
const wochentage = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
const geraetetypen = ["Smartphone", "Laptop", "Tablet", "Drucker"];
const herstellerNachTyp = {
  Smartphone: ["Apple", "Samsung", "Huawei"],
  Laptop: ["HP", "Lenovo", "Dell"],
  Tablet: ["Samsung", "Apple", "Microsoft"],
  Drucker: ["Canon", "Brother", "Epson"]
};

export default function FirmenkundenPrototyp() {
  const [oeffnungszeiten, setOeffnungszeiten] = useState({});
  const [auswahl, setAuswahl] = useState({ geraetetyp: [], hersteller: {}, aktiv: null });
  const [premium, setPremium] = useState(false);
  const [iban, setIban] = useState("");
  const [sepaEinverstanden, setSepaEinverstanden] = useState(false);
  const [zahlungErfolgreich, setZahlungErfolgreich] = useState(false);
  const [firmendaten, setFirmendaten] = useState({
    firmenname: "",
    strasse: "",
    plz: "",
    ort: "",
    telefon: "",
    email: "",
    website: "",
    beschreibung: "",
    logo: null,
    mapslink: "",
    social: "",
    video: "",
    galerie: []
  });

  const kopiereVonTag = (quelle) => {
    const quelleDaten = oeffnungszeiten[quelle];
    if (!quelleDaten) return;
    const neueDaten = {};
    const zuKopieren = wochentage.filter(tag => tag !== quelle && ausgewählt[tag]);
    zuKopieren.forEach(tag => {
      neueDaten[tag] = { ...quelleDaten };
    });
    setOeffnungszeiten(prev => ({ ...prev, ...neueDaten }));
  };

  const [ausgewählt, setAusgewählt] = useState(wochentage.reduce((acc, tag) => ({ ...acc, [tag]: true }), {}));

  const renderZeitwahl = (tag) => (
    <div key={tag} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 items-center gap-2">
      <Label className="font-medium text-sm col-span-1 sm:col-span-3 md:col-span-1">{tag}</Label>
      <Select onValueChange={(value) => setOeffnungszeiten(prev => ({ ...prev, [tag]: { ...(prev[tag] || {}), von1: value } }))}>
        <SelectTrigger className="w-full">{oeffnungszeiten[tag]?.von1 || "von"}</SelectTrigger>
        <SelectContent>{zeiten.map(z => <SelectItem key={z} value={z}>{z}</SelectItem>)}</SelectContent>
      </Select>
      <Select onValueChange={(value) => setOeffnungszeiten(prev => ({ ...prev, [tag]: { ...(prev[tag] || {}), bis1: value } }))}>
        <SelectTrigger className="w-full">{oeffnungszeiten[tag]?.bis1 || "bis"}</SelectTrigger>
        <SelectContent>{zeiten.map(z => <SelectItem key={z} value={z}>{z}</SelectItem>)}</SelectContent>
      </Select>
      <Select onValueChange={(value) => setOeffnungszeiten(prev => ({ ...prev, [tag]: { ...(prev[tag] || {}), von2: value } }))}>
        <SelectTrigger className="w-full">{oeffnungszeiten[tag]?.von2 || "von"}</SelectTrigger>
        <SelectContent>{zeiten.map(z => <SelectItem key={z} value={z}>{z}</SelectItem>)}</SelectContent>
      </Select>
      <Select onValueChange={(value) => setOeffnungszeiten(prev => ({ ...prev, [tag]: { ...(prev[tag] || {}), bis2: value } }))}>
        <SelectTrigger className="w-full">{oeffnungszeiten[tag]?.bis2 || "bis"}</SelectTrigger>
        <SelectContent>{zeiten.map(z => <SelectItem key={z} value={z}>{z}</SelectItem>)}</SelectContent>
      </Select>
      <Button size="sm" variant="outline" className="w-full md:w-auto" onClick={() => kopiereVonTag(tag)}>auf ausgewählte</Button>
      <input type="checkbox" className="accent-black mx-auto md:mx-0" checked={ausgewählt[tag]} onChange={() => setAusgewählt(prev => ({ ...prev, [tag]: !prev[tag] }))} />
    </div>
  );

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <Landmark className="w-6 h-6 text-emerald-600" />
        <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">Firmenkunden Portal</h1>
      </div>

      <Accordion type="multiple" defaultValue={["firma", "zeiten", "geraete", "premium"]} className="space-y-0">
        
      <AccordionItem value="firma">
  <AccordionTrigger className="sr-only">Firmendaten</AccordionTrigger>
  <AccordionContent>
<fieldset className="border border-emerald-300 bg-emerald-50/30 p-6 rounded-2xl space-y-6 shadow-sm">
          <legend className="text-sm font-semibold text-emerald-900 bg-emerald-100 rounded px-3 py-1">Firmendaten</legend>
        
        <Input placeholder="Firmenname" value={firmendaten.firmenname} onChange={e => setFirmendaten({ ...firmendaten, firmenname: e.target.value })} />
        <Input placeholder="Straße" value={firmendaten.strasse} onChange={e => {
  const strasse = e.target.value;
  const plz = firmendaten.plz;
  const ort = firmendaten.ort;
  const mapslink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(strasse + ' ' + plz + ' ' + ort)}`;
  setFirmendaten({ ...firmendaten, strasse, mapslink });
}} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input placeholder="PLZ" value={firmendaten.plz} onChange={e => {
  const plz = e.target.value;
  const strasse = firmendaten.strasse;
  const ort = firmendaten.ort;
  const mapslink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(strasse + ' ' + plz + ' ' + ort)}`;
  setFirmendaten({ ...firmendaten, plz, mapslink });
}} />
          <Input placeholder="Ort" value={firmendaten.ort} onChange={e => {
  const ort = e.target.value;
  const strasse = firmendaten.strasse;
  const plz = firmendaten.plz;
  const mapslink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(strasse + ' ' + plz + ' ' + ort)}`;
  setFirmendaten({ ...firmendaten, ort, mapslink });
}} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input icon={<Phone className="w-4 h-4" />} placeholder="Telefon" value={firmendaten.telefon} onChange={e => setFirmendaten({ ...firmendaten, telefon: e.target.value })} />
          <Input icon={<Mail className="w-4 h-4" />} placeholder="E-Mail" value={firmendaten.email} onChange={e => setFirmendaten({ ...firmendaten, email: e.target.value })} />
        </div>
        <Input icon={<Globe className="w-4 h-4" />} placeholder="Webseite" value={firmendaten.website} onChange={e => setFirmendaten({ ...firmendaten, website: e.target.value })} />
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
  <Input placeholder="Google Maps Link" value={firmendaten.mapslink} readOnly className="flex-1" />
  <Button variant="outline" onClick={() => window.open(firmendaten.mapslink, '_blank')}>Karte anzeigen</Button>
</div>
          <div>
  <Label className="font-medium">Firmenlogo</Label>
  <Input type="file" accept="image/*" onChange={e => setFirmendaten({ ...firmendaten, logo: e.target.files?.[0] })} />
</div>

  <Label className="text-sm font-semibold text-emerald-900">Über uns</Label>
  <Textarea placeholder="Über uns, Leistungen, Spezialisierungen..." value={firmendaten.beschreibung} onChange={e => setFirmendaten({ ...firmendaten, beschreibung: e.target.value })} />

  <Label className="text-sm font-semibold text-emerald-900">Galerie / Dateien</Label>
<div className="space-y-4">
  <Input placeholder="Social Media Profil" value={firmendaten.social} onChange={e => setFirmendaten({ ...firmendaten, social: e.target.value })} />
  <Input placeholder="Video-Link" value={firmendaten.video} onChange={e => setFirmendaten({ ...firmendaten, video: e.target.value })} />
  <Input type="file" multiple onChange={e => setFirmendaten({ ...firmendaten, galerie: Array.from(e.target.files || []) })} />
</div>

          
        
</fieldset>
</AccordionContent>
</AccordionItem>

<AccordionItem value="zeiten">
  <AccordionTrigger className="sr-only">Öffnungszeiten</AccordionTrigger>
  <AccordionContent>
    <fieldset className="border border-emerald-300 bg-emerald-50/30 p-6 rounded-2xl space-y-4 shadow-sm">
      <legend className="text-sm font-semibold text-emerald-900 bg-emerald-100 rounded px-3 py-1">Öffnungszeiten</legend>
      {wochentage.map(renderZeitwahl)}
    </fieldset>
  </AccordionContent>
</AccordionItem>

<AccordionItem value="geraete">
  <AccordionTrigger className="sr-only">Geräte & Hersteller</AccordionTrigger>
  <AccordionContent>
    <fieldset className="border border-emerald-300 bg-emerald-50/30 p-6 rounded-2xl space-y-4 shadow-sm">
      <legend className="text-sm font-semibold text-emerald-900 bg-emerald-100 rounded px-3 py-1">Geräte & Hersteller</legend>
      <Label className="font-semibold">Gerätetyp</Label>
      <div className="flex flex-wrap gap-2">
        {geraetetypen.map(typ => (
          <Button key={typ} variant={auswahl.geraetetyp.includes(typ) ? "default" : "outline"} onClick={() => {
            const current = new Set(auswahl.geraetetyp);
            if (current.has(typ)) {
              current.delete(typ);
            } else {
              if (!premium && current.size >= 2) return;
              current.add(typ);
            }
            setAuswahl(prev => ({
              ...prev,
              geraetetyp: Array.from(current),
              aktiv: typ,
              hersteller: {
                ...prev.hersteller,
                [typ]: prev.hersteller[typ] || []
              }
            }));
          }}>{typ}</Button>
        ))}
      </div>
      {!premium && auswahl.geraetetyp.length >= 2 && (
        <p className="text-sm text-muted-foreground">Maximal 2 Gerätetypen im Standardeintrag.</p>
      )}
      {auswahl.aktiv && (
        <div>
          <Label className="font-semibold">Hersteller für {auswahl.aktiv}</Label>
          <div className="flex flex-wrap gap-2">
            {herstellerNachTyp[auswahl.aktiv]?.map(h => (
              <Button key={h} variant={auswahl.hersteller[auswahl.aktiv]?.includes(h) ? "default" : "outline"} onClick={() => {
                const selected = new Set(auswahl.hersteller[auswahl.aktiv] || []);
                if (selected.has(h)) selected.delete(h);
                else selected.add(h);
                setAuswahl(prev => ({
                  ...prev,
                  hersteller: {
                    ...prev.hersteller,
                    [auswahl.aktiv]: Array.from(selected)
                  }
                }));
              }}>{h}</Button>
            ))}
          </div>
        </div>
      )}
    </fieldset>
  </AccordionContent>
</AccordionItem>

<AccordionItem value="premium">
  <AccordionTrigger className="sr-only">Premiumeintrag</AccordionTrigger>
  <AccordionContent>
    <fieldset className="border border-emerald-300 bg-emerald-50/30 p-6 rounded-2xl space-y-4 shadow-sm">
      <legend className="text-sm font-semibold text-emerald-900 bg-emerald-100 rounded px-3 py-1">Premiumeintrag</legend>
      <div className="flex items-center gap-4">
        <Switch checked={premium} onCheckedChange={setPremium} />
        <span>{premium ? "Premium aktiviert – alle Funktionen freigeschaltet." : "Standard – eingeschränkter Funktionsumfang."}</span>
      </div>
      {premium && (
        <div className="space-y-2">
          <Input placeholder="IBAN" value={iban} onChange={e => setIban(e.target.value)} />
          <label className="text-sm flex items-center gap-2">
            <input type="checkbox" checked={sepaEinverstanden} onChange={e => setSepaEinverstanden(e.target.checked)} className="accent-black" /> Ich ermächtige den Anbieter zum SEPA-Lastschrifteinzug.
          </label>
          <Button onClick={() => setZahlungErfolgreich(true)} disabled={!iban || !sepaEinverstanden}>Zahlung jetzt durchführen</Button>
          {zahlungErfolgreich && <p className="text-green-600 font-medium">Zahlung erfolgreich abgeschlossen.</p>}
        </div>
      )}
    </fieldset>
  </AccordionContent>
</AccordionItem>
</Accordion>

      <div className="sticky bottom-0 z-10 bg-white/90 border-t py-4 backdrop-blur flex justify-end px-4 sm:px-6">
        <Button className="px-6 py-2 text-base rounded-md bg-emerald-600 hover:bg-emerald-700 text-white">
          Firmeneintrag speichern
        </Button>
      </div>
    </div>
  );
}
