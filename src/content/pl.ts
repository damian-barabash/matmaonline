import type { Content } from './types'

// Teksty z briefu „Matma Online — brief strony i teksty PL / RU”, wersja 1.2 (rozdział 6).
export const pl: Content = {
  lang: 'pl',
  meta: {
    title: 'Korepetycje z matematyki online, klasy 1–6 | Matma Online',
    description:
      'Indywidualne korepetycje z matematyki online dla klas 1–6. Zrozumiałe wyjaśnienia, ciekawe zadania i informacja o postępach. Zapytaj o termin.',
  },
  nav: [
    { label: 'Jak uczę', href: '#jak-ucze' },
    { label: 'Dla kogo', href: '#dla-kogo' },
    { label: 'O mnie', href: '#o-mnie' },
    { label: 'Cena', href: '#cena' },
    { label: 'Pytania', href: '#pytania' },
  ],
  ui: {
    skip: 'Przejdź do treści',
    menu: 'Menu',
    callShort: 'WhatsApp: 690 376 681',
    callCta: 'Napisz na WhatsApp',
    langSwitch: 'Wersja językowa',
    priceTag: '80 zł / 60 min',
    footerNote: 'Indywidualne korepetycje z matematyki online dla uczniów klas 1–6 szkoły podstawowej.',
    privacy: 'Polityka prywatności',
    photoCredit: 'Zdjęcia ilustracyjne: Unsplash',
    hello: 'Cześć, jestem Stasia',
  },
  hero: {
    eyebrow: ['Korepetycje z matematyki online', 'Klasy 1–6 szkoły podstawowej'],
    h1: ['Nauczę Twoje dziecko ', 'rozumieć matematykę', '.'],
    sub: 'Wyjaśniam krok po kroku, wracam do tego, co sprawia trudność, i daję dziecku czas na własne rozwiązania. Na indywidualnych zajęciach online ćwiczymy matematykę tak, by dziecko coraz pewniej radziło sobie w szkole.',
    points: ['Zajęcia 1:1', 'Tempo dopasowane do dziecka', 'Informacja o postępach dla rodzica'],
    callNote: 'Napisz na WhatsApp, aby omówić potrzeby dziecka i ustalić termin zajęć.',
    formLink: 'Napisz przez formularz',
    demoLink: 'Zobacz, jak tłumaczę',
    name: 'Stasia Kulik',
    role: 'Indywidualne zajęcia dla dzieci',
    photoAlt: 'Stasia Kulik, prowadząca zajęcia Matma Online',
  },
  sections: [
    {
      kind: 'situations',
      title: 'Kiedy matematyka sprawia trudność, zaczynamy od znalezienia przyczyny',
      lead: 'Dziecko może dobrze liczyć, a gubić się w zadaniach z treścią. Może rozumieć przykład na lekcji, a później nie wiedzieć, od czego zacząć samodzielnie. Na początku sprawdzam, co już potrafi i przy którym kroku potrzebuje wsparcia.',
      cards: [
        {
          title: '„Nie wiem, od czego zacząć”.',
          text: 'Rozkładamy zadanie na małe kroki i uczymy się wybierać właściwe działanie.',
        },
        {
          title: '„Znowu pomyliłem wynik”.',
          text: 'Przyglądamy się sposobowi liczenia i ćwiczymy to, co jeszcze wymaga utrwalenia.',
        },
        {
          title: '„Boję się sprawdzianu”.',
          text: 'Porządkujemy materiał i sprawdzamy, z czym dziecko radzi sobie już samodzielnie.',
        },
      ],
    },
    {
      kind: 'about',
      id: 'o-mnie',
      title: 'Poznaj osobę, która będzie uczyć Twoje dziecko',
      paragraphs: [
        'Nazywam się Stasia Kulik. Prowadzę zajęcia z lepienia w glinie dla dzieci w pracowni ceramicznej. Matma Online to mój nowy projekt: indywidualne zajęcia z matematyki dla uczniów klas 1–6.',
        'Do pracy z matematyką wnoszę doświadczenie w prowadzeniu zajęć dla dzieci. Zależy mi na tym, żeby dziecko rozumiało, skąd bierze się rozwiązanie, i mogło swobodnie powiedzieć: „Jeszcze tego nie rozumiem”.',
        'Na zajęciach proszę dziecko, żeby pokazało swój sposób myślenia. Dzięki temu mogę dobrać wyjaśnienie do tego, czego właśnie potrzebuje.',
      ],
      photoAlt: 'Stasia Kulik na górskiej łące',
      photoCaption: 'Stasia Kulik',
      facts: ['Klasy 1–6', 'Online, 1:1', '60 minut'],
    },
    {
      kind: 'demo',
      id: 'przyklad',
      title: 'Zobacz, jak pomagam zrozumieć zadanie',
      taskLabel: 'Zadanie',
      task: 'Zosia ma 12 naklejek. Oddała bratu jedną trzecią. Ile naklejek oddała?',
      steps: [
        {
          title: 'Najpierw pokazujemy, co oznacza „jedna trzecia”',
          text: 'Rysujemy 12 naklejek i dzielimy je na 3 równe grupy. Dziecko wskazuje jedną grupę i liczy, ile naklejek się w niej znajduje.',
          art: { type: 'groups', total: 12, groups: 3, item: 'sticker' },
        },
        {
          title: 'Potem zapisujemy działanie',
          text: '12 : 3 = 4. Łączymy zapis z rysunkiem i układamy odpowiedź: Zosia oddała 4 naklejki.',
          art: { type: 'equation', text: '12 : 3 = 4', answer: 'Zosia oddała 4 naklejki.' },
        },
        {
          title: 'Na koniec dziecko próbuje samodzielnie',
          text: 'Zmieniamy przykład: 10 naklejek i połowa. Dziecko pokazuje rozwiązanie i wyjaśnia, dlaczego wybrało takie działanie.',
          art: { type: 'groups', total: 10, groups: 2, item: 'sticker', equation: '10 : 2 = ?' },
        },
      ],
      note: 'Przykład sposobu pracy na lekcji. Zadania dobieram do klasy i aktualnych umiejętności dziecka.',
    },
    {
      kind: 'steps',
      id: 'jak-ucze',
      title: 'Jak wyglądają korepetycje online?',
      steps: [
        {
          title: 'Ustalamy, czego potrzebuje dziecko',
          text: 'Pytam o klasę, bieżący materiał i to, co sprawia trudność. Możesz pokazać temat z zeszytu lub podręcznika.',
        },
        {
          title: 'Na pierwszej lekcji poznaję sposób myślenia dziecka',
          text: 'Zaczynamy od kilku zadań. Sprawdzam, co dziecko rozumie, gdzie się zatrzymuje i jakiego wyjaśnienia potrzebuje.',
        },
        {
          title: 'Pracujemy nad konkretnym celem',
          text: 'Wybieramy najbliższy krok: na przykład rozumienie poleceń, sprawniejsze liczenie albo samodzielne rozwiązanie zadania z ułamkami. Wracamy do potrzebnych podstaw i ćwiczymy nową umiejętność.',
        },
        {
          title: 'Sprawdzamy, co dziecko potrafi już zrobić samo',
          text: 'Pod koniec zajęć dziecko dostaje krótkie zadanie do samodzielnej próby. Na tej podstawie planuję kolejne ćwiczenia.',
        },
      ],
    },
    {
      kind: 'classes',
      id: 'dla-kogo',
      title: 'Matematyka online dla klas 1–6',
      cards: [
        {
          badge: '1–3',
          title: 'Klasy 1–3: pewne podstawy i ciekawość',
          text: 'Ćwiczymy rozumienie liczb, działania i zadania z treścią na poziomie dziecka. Korzystamy z rysunków, prostych przedmiotów i krótkich zagadek. Dziecko liczy, porównuje, wskazuje i tłumaczy swoje pomysły.',
          photo: 'young',
          alt: 'Dziecko zapisuje rozwiązanie w zeszycie ćwiczeń',
        },
        {
          badge: '4–6',
          title: 'Klasy 4–6: zrozumienie tematów i większa samodzielność',
          text: 'Pracujemy z materiałem ze szkoły: działaniami, ułamkami, jednostkami, geometrią i zadaniami tekstowymi — zależnie od aktualnego tematu. Porządkujemy zaległości i przygotowujemy się do sprawdzianów, ćwicząc samodzielne rozwiązywanie zadań.',
          photo: 'older',
          alt: 'Uczennica rozwiązuje zadania z geometrii na karcie pracy',
        },
      ],
    },
    {
      kind: 'features',
      title: 'Dziecko aktywnie uczestniczy w lekcji',
      paragraphs: [
        'Na zajęciach jest miejsce na pytania, rysowanie, wybór rozwiązania i krótkie zagadki. Zmieniam sposób pracy, kiedy widzę, że dziecko potrzebuje innego przykładu albo chwili na uporządkowanie myśli. Każda aktywność prowadzi do konkretnej umiejętności matematycznej.',
      ],
      cards: [
        {
          title: 'Przykłady, które można sobie wyobrazić.',
          text: 'Naklejki, zakupy, klocki i inne sytuacje bliskie dziecku.',
        },
        { title: 'Małe kroki.', text: 'Jedno zrozumiałe zadanie otwiera drogę do kolejnego.' },
        {
          title: 'Miejsce na własny pomysł.',
          text: 'Dziecko opowiada, jak doszło do odpowiedzi, i może zapytać o każdy krok.',
        },
      ],
      photos: [
        { key: 'online', alt: 'Dziewczynka w słuchawkach podczas lekcji online przy laptopie' },
        { key: 'pencils', alt: 'Kolorowe kredki ułożone na biurku' },
      ],
    },
    {
      kind: 'progress',
      title: 'Wiesz, nad czym pracujemy i co już się udaje',
      text: 'Po pierwszych zajęciach otrzymasz krótką informację o punkcie wyjścia i proponowanym kierunku pracy. Po każdych czterech zajęciach podsumuję, co dziecko wykonuje samodzielnie, przy czym potrzebuje pomocy i jaki jest kolejny cel.',
      moments: ['Po pierwszych zajęciach', 'Po każdych czterech zajęciach'],
      exampleLabel: 'Przykład formatu wiadomości',
      example:
        '„Ćwiczyliśmy odczytywanie zadań z treścią. Dziecko samodzielnie wskazuje dane i pytanie. Przy wyborze działania nadal pomaga rysunek. Na kolejnych zajęciach sprawdzimy, czy potrafi wybrać działanie w nowym przykładzie”.',
    },
    {
      kind: 'price',
      id: 'cena',
      title: 'Cena indywidualnych zajęć online',
      amount: '80 zł',
      per: '60 min',
      text: 'Indywidualna lekcja ze Stasią Kulik trwa 60 minut. Pierwsze i kolejne zajęcia kosztują 80 zł. Przed rozpoczęciem ustalimy cel pracy i dogodny termin.',
      includedLabel: 'W cenie',
      included: ['przygotowanie zadań dopasowanych do dziecka', 'indywidualna lekcja', 'ustalona informacja o postępach'],
    },
    {
      kind: 'faq',
      id: 'pytania',
      title: 'Pytania rodziców',
      items: [
        {
          q: 'Czy zajęcia online sprawdzą się u dziecka z klas 1–3?',
          a: 'Spotkanie trwa 60 minut. W młodszych klasach dzielę je na krótsze aktywności: rysowanie, liczenie, rozmowę i zadania. W razie potrzeby włączam krótką przerwę ruchową w ramach tej godziny. Na pierwszym spotkaniu sprawdzimy, jak dziecko odnajduje się w takim formacie.',
        },
        {
          q: 'Czy rodzic musi być obecny przez całą lekcję?',
          a: 'Na początku może być potrzebna pomoc w połączeniu i przygotowaniu materiałów. Zakres dalszej pomocy ustalimy po pierwszych zajęciach, zależnie od wieku i samodzielności dziecka.',
        },
        {
          q: 'Czy można pracować z podręcznikiem dziecka?',
          a: 'Tak. Możemy korzystać z bieżących tematów, zeszytu i zadań ze szkoły. Jeśli potrzebne są wcześniejsze podstawy, wrócimy do nich i połączymy je z aktualnym materiałem.',
        },
        {
          q: 'Czy dziecko może przygotować się do sprawdzianu?',
          a: 'Tak. Warto wcześniej przesłać zakres materiału i termin sprawdzianu. Sprawdzimy, co dziecko już rozumie, a następnie ustalimy, co wymaga ćwiczeń.',
        },
        {
          q: 'Jak szybko zobaczę postępy?',
          a: 'To zależy od punktu wyjścia, regularności i zakresu trudności. Na początku określimy konkretny cel i będziemy sprawdzać go na samodzielnie rozwiązywanych zadaniach. Otrzymasz informację o tym, co się zmieniło i nad czym dalej pracujemy.',
        },
        {
          q: 'Co trzeba przygotować do lekcji?',
          // Brief: „…instrukcję połączenia przez [PLATFORMA]” — platforma nie jest jeszcze ustalona.
          a: 'Komputer lub tablet z odpowiednim ekranem, stabilne połączenie z internetem, zeszyt i przybory do pisania. Przed pierwszym spotkaniem otrzymasz instrukcję połączenia.',
        },
      ],
    },
  ],
  contact: {
    title: 'Ustalmy pierwszy krok w nauce Twojego dziecka',
    text: 'Zadzwoń pod numer +48 690 376 681 i powiedz, do której klasy chodzi dziecko oraz z czym potrzebuje pomocy. Ustalimy, od czego zacząć, i sprawdzimy dostępne terminy. Możesz też zostawić wiadomość przez formularz.',
    formNote: 'Po otrzymaniu wiadomości skontaktuję się z Tobą, aby omówić zajęcia i potwierdzić termin.',
    submit: 'Wyślij zapytanie o zajęcia',
    sending: 'Wysyłam…',
    fields: {
      name: 'Imię rodzica lub opiekuna',
      contact: 'Telefon lub e-mail do kontaktu',
      grade: 'Klasa dziecka',
      gradePlaceholder: 'Wybierz klasę',
      gradeOption: (n) => `Klasa ${n}`,
      language: 'Język zajęć',
      // wersja polska nie pyta o język zajęć
      languages: [],
      message: 'Z czym dziecko potrzebuje pomocy?',
      messageHint: 'Możesz podać temat lub opisać trudność jednym zdaniem',
      optional: 'opcjonalnie',
    },
    errors: {
      contact: 'Podaj poprawny numer telefonu lub adres e-mail',
      grade: 'Wybierz klasę dziecka',
      send: 'Nie udało się wysłać wiadomości. Spróbuj ponownie lub napisz na WhatsApp:',
    },
    success:
      'Dziękuję! Twoje zapytanie zostało wysłane. Skontaktuję się z Tobą, aby omówić zajęcia i potwierdzić termin.',
    consent: 'Podany kontakt wykorzystam tylko po to, żeby odpowiedzieć na Twoje zapytanie.',
    consentLink: 'Polityka prywatności',
  },
}
