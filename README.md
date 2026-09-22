# Prosty Remont — wersja robocza strony

Statyczna, responsywna strona HTML/CSS/JS. Bez procesu budowania, bibliotek zewnętrznych, formularza i analityki. `index.html` można otworzyć lokalnie lub obsłużyć dowolnym serwerem statycznym.

## Treści i materiały

- Właściciel potwierdził 22.09.2026: Warszawa i okolice, ponad 200 realizacji, próby szczelności jako odrębna usługa dodatkowa.
- Ceny odbiorów i nadzoru odczytano z aktualnych stron `/oferta/` i `/koordynacja/` 22.09.2026. Zachowano kwoty netto i określenie „do”, dodano przeliczenie brutto z 23% VAT.
- Zdjęcia i logo pochodzą z materiałów właściciela. `assets/web` to zoptymalizowane pliki WebP, fotografia kuchni wyodrębniona z „PROSTA OFERTA.pdf”. Bez generowania nowych realizacji.
- Stare slajdy pozostają w repozytorium, ale nowa strona ich nie pobiera. Dokumentów strategicznych i prywatnych materiałów nie publikowano.

Galeria przed/po została usunięta na prośbę właściciela. Powróci po dostarczeniu nowych zdjęć. Pojedyncze zdjęcie kuchni w sekcji koordynacji pozostaje ilustracją usługi.

## Przed wdrożeniem

To osobna wersja robocza, nie publikacja pod domeną. Aktualna domena obsługuje WordPress na home.pl; GitHub Pages wskazuje main i domenę niestandardową, ale zgłasza problem konfiguracji domeny/HTTPS. Samo scalenie tej zmiany nie potwierdza wdrożenia na home.pl.

Przed publikacją należy ustalić miejsce hostowania, wykonać kopię obecnej strony i skonfigurować przekierowania dotychczasowych adresów (co najmniej `/oferta/`, `/koordynacja/`, `/kontakt/`) na odpowiednie sekcje. Zweryfikować DNS, certyfikat HTTPS i indeksowanie już po wdrożeniu. Nie usuwać obecnego WordPressa ani jego danych w ramach przeglądu projektu.

## Sprawdzanie

Sprawdzić szerokości 320, 390, 768 i 1440 px: brak przewijania poziomego, czytelny cennik, obrazy i nawigację klawiaturą. Menu mobilne obsługuje Escape i przenosi fokus do wybranej sekcji. Sekcje ofertowe i FAQ używają natywnego details/summary; bez JS wszystkie treści i menu pozostają dostępne. Kontakt realizują zwykłe odnośniki tel, mailto, WhatsApp i Instagram.
