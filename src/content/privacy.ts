import type { Lang } from './types'

export interface PrivacyContent {
  meta: { title: string; description: string }
  title: string
  updated: string
  back: string
  blocks: { title: string; body: string[] }[]
}

// Robocza wersja: administrator i lista usług wymagają potwierdzenia przez właściciela projektu.
export const privacy: Record<Lang, PrivacyContent> = {
  pl: {
    meta: {
      title: 'Polityka prywatności | Matma Online',
      description: 'Jakie dane zbiera strona Matma Online, po co i jak długo są przechowywane.',
    },
    title: 'Polityka prywatności',
    updated: 'Aktualizacja: 13 października 2026',
    back: 'Wróć na stronę główną',
    blocks: [
      {
        title: 'Kto odpowiada za dane',
        body: [
          'Za dane przesłane przez tę stronę odpowiada Stasia Kulik, która prowadzi zajęcia Matma Online. W sprawach dotyczących danych zadzwoń pod numer +48 690 376 681.',
        ],
      },
      {
        title: 'Jakie dane zbieram',
        body: [
          'Formularz zapytania zawiera: kontakt (telefon lub e-mail), klasę dziecka oraz — jeśli je podasz — Twoje imię i krótki opis tego, z czym dziecko potrzebuje pomocy.',
          'Nie proszę o imię i nazwisko dziecka, nazwę szkoły ani oceny. Nie wpisuj ich w wiadomości.',
        ],
      },
      {
        title: 'Po co i na jakiej podstawie',
        body: [
          'Dane służą wyłącznie do odpowiedzi na zapytanie i ustalenia terminu zajęć. Podstawą jest podjęcie działań na Twoją prośbę przed zawarciem umowy (art. 6 ust. 1 lit. b RODO).',
          'Nie wysyłam reklam ani newslettera.',
        ],
      },
      {
        title: 'Jak długo',
        body: [
          'Zapytanie przechowuję przez czas potrzebny do odpowiedzi i ustalenia zajęć. Jeśli zajęcia się rozpoczną — przez czas współpracy. W każdej chwili możesz poprosić o usunięcie danych.',
        ],
      },
      {
        title: 'Hosting, pliki cookie i statystyki',
        body: [
          'Strona jest udostępniana przez GitHub Pages. Dostawca hostingu może zapisywać w dziennikach serwera adres IP odwiedzającego.',
          'Strona nie używa plików cookie, narzędzi statystycznych ani reklamowych. Czcionki są wczytywane z tego samego serwera.',
        ],
      },
      {
        title: 'Twoje prawa',
        body: [
          'Możesz poprosić o dostęp do danych, ich poprawienie, usunięcie lub ograniczenie przetwarzania. Masz też prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych.',
        ],
      },
    ],
  },
  ru: {
    meta: {
      title: 'Политика конфиденциальности | Matma Online',
      description: 'Какие данные собирает сайт Matma Online, зачем и как долго они хранятся.',
    },
    title: 'Политика конфиденциальности',
    updated: 'Обновлено: 13 октября 2026 года',
    back: 'Вернуться на главную',
    blocks: [
      {
        title: 'Кто отвечает за данные',
        body: [
          'За данные, отправленные через этот сайт, отвечает Stasia Kulik, которая ведёт занятия Matma Online. По вопросам о данных звоните: +48 690 376 681.',
        ],
      },
      {
        title: 'Какие данные я собираю',
        body: [
          'В форме заявки: контакт (телефон или e-mail), класс ребёнка, выбранный язык объяснений и — если вы их укажете — ваше имя и короткое описание того, с чем ребёнку нужна помощь.',
          'Имя и фамилию ребёнка, название школы и оценки я не прошу. Не указывайте их в сообщении.',
        ],
      },
      {
        title: 'Зачем и на каком основании',
        body: [
          'Данные нужны только для ответа на заявку и согласования времени занятий. Основание — действия по вашей просьбе до заключения договора (ст. 6 п. 1 лит. b GDPR).',
          'Рекламу и рассылки я не отправляю.',
        ],
      },
      {
        title: 'Как долго',
        body: [
          'Заявка хранится столько, сколько нужно для ответа и согласования занятий. Если занятия начнутся — на время работы. Вы в любой момент можете попросить удалить данные.',
        ],
      },
      {
        title: 'Хостинг, cookie и статистика',
        body: [
          'Сайт размещён на GitHub Pages. Хостинг-провайдер может сохранять IP-адрес посетителя в журналах сервера.',
          'Сайт не использует cookie, счётчики статистики и рекламные инструменты. Шрифты загружаются с того же сервера.',
        ],
      },
      {
        title: 'Ваши права',
        body: [
          'Вы можете запросить доступ к данным, их исправление, удаление или ограничение обработки. Вы также вправе подать жалобу в польский надзорный орган — Prezes Urzędu Ochrony Danych Osobowych.',
        ],
      },
    ],
  },
}
