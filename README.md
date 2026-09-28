# GRÅZON reklambyrå

En satirisk, fiktiv reklambyrå byggd med React, TypeScript och Vite. Revision 2 följer AGENTS.md: grå FrontPage-estetik, sex obegripliga tjänster, RGB-knappar och aggressiv internreklam.

## AI-genererat projekt

**All kod som tas fram för GRÅZON är och kommer att vara AI-genererad. Detsamma gäller projektets bilder och ljudklipp, inklusive röster och framtida telefonmeddelanden.**

Projektet är ett experiment i AI-driven utveckling och berättande för ett satiriskt ARG. Människor står för idéer, instruktioner, urval och granskning; AI används för att generera kod och medieinnehåll. Befintliga ramverk och tredjepartsbibliotek har sina respektive upphovspersoner och licenser.

Telefonens AI-genererade och redigerade ljudklipp finns lokalt i public/audio/.

Projektets repository: [VibeARG/Greyzone](https://github.com/VibeARG/Greyzone).

## Kör lokalt

```sh
npm install
npm run dev
```

På Windows kan `npm.cmd` användas om PowerShell-versionen av npm inte fungerar.

## Kontroller

```sh
npm run build
npm run lint
npm run preview
```

## Beteende

- Sex tjänster, satiriska kundcitat och lokalt offertformulär. Inga formulärdata skickas eller sparas.
- Annonser öppnas efter 1,8 sekunder och därefter var 8,5 sekund. Länkar och formulär kan också trigga annonser; vissa annonsknappar öppnar nästa erbjudande.
- Upp till fyra flytande fönster på stor skärm, ett på mobil. Fem placeringar inkluderar överlappning och en delvis utanför skärmen. Alla stängknappar fungerar.
- DÖDA ANNONSER i den fasta statusraden döljer annonserna direkt. De återkommer efter slumpmässigt 5–20 sekunder. Escape stänger senaste popupen.
- Annonsfönster stjäl inte fokus. Telefonen använder en riktig HTML-dialog med fokus, Escape-stöd och texten Samtal lyckat. Rätt nummer spelar calling.mp3 följt av voicemail.mp3 när ringsignalen slutar. Fel nummer spelar wrong-number.mp3. Ljudet stoppas vid stängning, Escape eller avmontering; telefonkomponenten finns i src/Revision.tsx.
- RGB-knappar ändrar rubrik, räknar synergi och startar en avbrytbar laddning till 97 %. Effekter respekterar prefers-reduced-motion och pausas vid fokus/hovring.
- Portfolio, Radical PI och projektannonser länkar tills vidare till https://github.com/Augustvilliam. Adresserna finns samlade i projectLinks i src/Revision.tsx.
- Den genererade fiktiva stockbilden ligger lokalt i public/agency-stock.png. Ingen extern bildtjänst används vid sidvisning.
- Timers och tangentbordslyssnare städas vid avmontering. Automatisk annonsgenerering hoppas över när dokumentet är dolt.

## Manuell verifiering

Verifierat i in-app-webbläsaren: desktop 1366×900 och mobil 390×844, laddade bilder utan horisontell overflow på mobil, telefonmodalens öppning/stängning via tangentbord, annonsstopp/återkomst och formulärets lokala bekräftelse. Telefonmodalen visas i phone-preview.png.

## ARG-växel
Telefonknappen öppnar nu en tom manuell knappsats. Besökaren skriver numret eller använder sifferknapparna och trycker Ring. Sidans fiktiva växelnummer (000–00 00 42) öppnar Samtal lyckat; andra nummer ger en ledtråd. Mellanslag, bindestreck och parenteser accepteras. Inmatningen återställs vid nästa öppning och sparas inte. Verifierat i webbläsaren med fel nummer och det formaterade korrekta numret. Ny bild: dial-preview.png.

Ljudflödet är verifierat i webbläsaren: fel nummer spelar wrong-number.mp3; rätt nummer spelar calling.mp3 och växlar automatiskt till voicemail.mp3. Lägg på stoppar spelaren och tar bort ljudkällan.
