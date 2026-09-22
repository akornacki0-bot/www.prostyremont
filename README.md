# Prosty Remont — strona internetowa

Statyczna, responsywna strona HTML/CSS/JS. Bez procesu budowania, bibliotek zewnętrznych, formularza i analityki. `index.html` można otworzyć lokalnie lub obsłużyć dowolnym serwerem statycznym.

## Treści i materiały

- Właściciel potwierdził 22.09.2026: Warszawa i okolice, ponad 200 realizacji, próby szczelności jako odrębna usługa dodatkowa.
- Ceny odbiorów i nadzoru odczytano z aktualnych stron `/oferta/` i `/koordynacja/` 22.09.2026. Zachowano kwoty netto i określenie „do”, dodano przeliczenie brutto z 23% VAT.
- Zdjęcia i logo pochodzą z materiałów właściciela. `assets/web` to zoptymalizowane pliki WebP, fotografia kuchni wyodrębniona z „PROSTA OFERTA.pdf”. Bez generowania nowych realizacji.
- Stare slajdy pozostają w repozytorium, ale nowa strona ich nie pobiera. Dokumentów strategicznych i prywatnych materiałów nie publikowano.

Galeria przed/po została usunięta na prośbę właściciela. Powróci po dostarczeniu nowych zdjęć. Pojedyncze zdjęcie kuchni w sekcji koordynacji pozostaje ilustracją usługi.

## Publikacja

Strona została opublikowana 22.09.2026 pod https://prostyremont.com/ na dotychczasowym hostingu home.pl. Pliki strony znajdują się w osobnym katalogu `/public_html/prostyremont-20260922`; domena wskazuje `/prostyremont-20260922` w trybie podkatalogu bez separacji serwisu. Aktualizacja GitHuba nie wdraża automatycznie zmian na home.pl.

Publikowane pliki: `index.html`, `css/style.css`, `js/main.js`, `assets/favicon.svg`, `assets/web/*.webp`, `robots.txt`, `sitemap.xml` i `.htaccess`. Nie przesyłać materiałów źródłowych, README ani CNAME na hosting.

Zweryfikowano przekierowania `/oferta/` → `/#odbiory`, `/koordynacja/` → `/#remonty`, `/kontakt/` → `/#kontakt` oraz HTTP/www → https://prostyremont.com/. HTTPS działa. Mapa strony i robots.txt są przygotowane do indeksowania; obecność w wynikach wyszukiwarki zależy od jej ponownego odwiedzenia strony.

Dotychczasowy WordPress i baza danych pozostały nienaruszone. Powrót do poprzedniej strony: w panelu home.pl przywrócić lokalizację WWW domeny do `/autoinstalator/wordpress1`. Na hostingu są automatyczne kopie plików i bazy; dodatkowo rozpoczęto kopiowanie starego katalogu do `/prostyremont-kopia-20260922`, ale pełnego zakończenia tej dodatkowej kopii nie potwierdzono po błędzie połączenia. Nie traktować jej jako zweryfikowanej kopii.

Podczas wdrożenia wyłączono opcjonalny HTTP/3 + QUIC po błędach `ERR_QUIC_PROTOCOL_ERROR` w WebFTP. HTTPS pozostał aktywny. Nie zmieniano DNS ani obsługi poczty.

## Sprawdzanie

Sprawdzić szerokości 320, 390, 768 i 1440 px: brak przewijania poziomego, czytelny cennik, obrazy i nawigację klawiaturą. Menu mobilne obsługuje Escape i przenosi fokus do wybranej sekcji. Sekcje ofertowe i FAQ używają natywnego details/summary; bez JS wszystkie treści i menu pozostają dostępne. Kontakt realizują zwykłe odnośniki tel, mailto, WhatsApp i Instagram.
