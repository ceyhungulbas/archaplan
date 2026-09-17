# Archaplan

**Archaplan Design & Build** kurumsal tanıtım sitesi — İzmir merkezli mimari tasarım, iç mimari uygulama ve anahtar teslim inşaat hizmetleri sunan yapı firmasının tek sayfalık (single-page) web sitesi.

React 19 + Vite 8 + Tailwind CSS v4 ile geliştirilmiş, koyu temalı, animasyonlu ve SEO'ya hazır bir landing page.

🔗 https://www.archaplan.com.tr/

---

## İçindekiler

- [Teknoloji yığını](#teknoloji-yığını)
- [Hızlı başlangıç](#hızlı-başlangıç)
- [Komutlar](#komutlar)
- [Proje yapısı](#proje-yapısı)
- [Sayfa bölümleri](#sayfa-bölümleri)
- [Tasarım sistemi](#tasarım-sistemi)
- [SEO ve meta bilgileri](#seo-ve-meta-bilgileri)
- [İletişim bilgilerini güncelleme](#i̇letişim-bilgilerini-güncelleme)
- [Bilinen eksikler](#bilinen-eksikler)
- [Yayına alma](#yayına-alma)

---

## Teknoloji yığını

| Katman | Teknoloji | Sürüm |
|---|---|---|
| UI kütüphanesi | [React](https://react.dev/) | 19.2 |
| Build aracı | [Vite](https://vite.dev/) (Rolldown tabanlı) | 8.1 |
| Stil | [Tailwind CSS](https://tailwindcss.com/) | 4.3 |
| Animasyon | [Framer Motion](https://motion.dev/) | 12.42 |
| Scroll tetikli animasyon | [react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) | 10.0 |
| Yumuşak kaydırma | [react-scroll](https://github.com/fisshy/react-scroll) | 1.9 |
| İkonlar | [react-icons](https://react-icons.github.io/react-icons/) | 5.7 |
| Lint | [ESLint](https://eslint.org/) (flat config) | 9.39 |
| Paket yöneticisi | [pnpm](https://pnpm.io/) | 11.9 |

Proje **JavaScript + JSX** kullanır (TypeScript yok). Tailwind, PostCSS yerine resmi [`@tailwindcss/vite`](https://tailwindcss.com/docs/installation/using-vite) eklentisiyle entegre edilmiştir — ayrı `tailwind.config.js` dosyası **yoktur**, tema doğrudan CSS içinde `@theme` bloğuyla tanımlanır.

---

## Hızlı başlangıç

### Gereksinimler

- **Node.js** `^20.19.0` veya `>=22.12.0` (Vite 8'in şartı — geliştirme `v24.11.0` ile yapıldı)
- **pnpm** 11+

### Kurulum

```bash
git clone git@github.com:ceyhungulbas/archaplan.git
cd archaplan
pnpm install
pnpm dev
```

Dev sunucusu varsayılan olarak **http://localhost:5173/** adresinde açılır. Hot Module Replacement aktiftir; `src/` altındaki değişiklikler sayfayı yenilemeden yansır.

> [!IMPORTANT]
> Bu projede **sadece pnpm** kullanın. `npm install` çalıştırmak, pnpm'in `node_modules/.pnpm` yapısıyla çakışıp kurulumu bozar (pnpm bunu fark etmez ve "Already up to date" der). Böyle bir durumda çözüm:
> ```bash
> rm -rf node_modules && pnpm install
> ```
> Bu yüzden repoda `package-lock.json` bilerek tutulmaz; tek geçerli kilit dosyası `pnpm-lock.yaml`'dır.

---

## Komutlar

| Komut | Açıklama |
|---|---|
| `pnpm dev` | Geliştirme sunucusunu HMR ile başlatır (`localhost:5173`) |
| `pnpm build` | Üretim derlemesi üretir → `dist/` |
| `pnpm preview` | `dist/` çıktısını lokalde sunar, canlıya çok yakın önizleme |
| `pnpm lint` | ESLint ile tüm projeyi denetler |

---

## Proje yapısı

```
archaplan/
├── index.html              # Giriş noktası — tüm SEO meta etiketleri ve JSON-LD burada
├── vite.config.js          # Vite + React + Tailwind eklentileri
├── eslint.config.js        # ESLint flat config (react-hooks, react-refresh)
├── pnpm-lock.yaml          # Tek geçerli kilit dosyası
├── public/                 # Olduğu gibi kopyalanan statik dosyalar
│   ├── favicon.svg
│   ├── icons.svg
│   ├── robots.txt
│   └── sitemap.xml
└── src/
    ├── main.jsx            # React kökü (createRoot)
    ├── App.jsx             # Bölümleri sırayla dizer
    ├── index.css           # Tailwind import + @theme tokenları + özel sınıflar
    ├── assets/             # Logo ve proje görselleri (Vite tarafından işlenir)
    └── components/         # Her biri bir sayfa bölümü
```

**`public/` vs `src/assets/` farkı:** `public/` içindekiler işlenmeden, adı değişmeden kopyalanır (favicon, robots.txt gibi sabit URL gerektirenler). `src/assets/` içindekiler Vite tarafından optimize edilir ve hash'li isimler alır — görseller için bunu kullanın.

---

## Sayfa bölümleri

Site tek sayfadır; `App.jsx` bölümleri şu sırayla dizer. Navigasyon, bölüm `id`'lerine yumuşak kaydırma yapar.

| Sıra | Bileşen | `id` | İçerik |
|---|---|---|---|
| — | `Navbar.jsx` | — | Üst menü, bölümlere smooth scroll |
| 1 | `Hero.jsx` | `hero` | Açılış ekranı, ana başlık ve çağrı butonu |
| 2 | `Services.jsx` | `services` | Üç hizmet kategorisi (aşağıda) |
| 3 | `Projects.jsx` | `projects` | Tamamlanmış proje galerisi |
| 4 | `BeforeAfter.jsx` | `transformations` | Öncesi/sonrası karşılaştırma (en büyük bileşen, 314 satır) |
| 5 | `Stats.jsx` | — | Sayısal başarı göstergeleri |
| 6 | `About.jsx` | `about` | Firma tanıtımı |
| 7 | `Contact.jsx` | `contact` | İletişim kanalları ve form |
| — | `Footer.jsx` | — | Alt bilgi, sosyal bağlantılar |

### Hizmet kategorileri

`Services.jsx` içinde tanımlı üç ana başlık:

1. **Anahtar Teslim İnşaat** — Konut Projeleri, Ticari Yapılar, Endüstriyel Tesisler
2. **İç Mimari Tasarım & Uygulama** — Konsept Tasarım, 3D Görselleştirme, Mobilya Seçimi
3. **Çelik Yapılar** — Çelik Konstrüksiyon, Prefabrik Yapılar, Depo & Hangar

> Hizmet listesi `index.html` içindeki JSON-LD `hasOfferCatalog` alanında da tekrarlanır. Birini değiştirirken diğerini de güncelleyin.

---

## Tasarım sistemi

Tema tokenları `src/index.css` içinde Tailwind v4'ün `@theme` bloğunda tanımlıdır. Burada tanımlanan her token otomatik olarak Tailwind sınıfı üretir (`--color-primary` → `bg-primary`, `text-primary`, `border-primary` …).

### Renk paleti

| Token | Değer | Kullanım |
|---|---|---|
| `--color-primary` | `#1a5fff` | Ana vurgu rengi, butonlar, bağlantılar |
| `--color-primary-dark` | `#0d47d4` | Hover / basılı durum |
| `--color-primary-light` | `#4a7fff` | Açık vurgu |
| `--color-dark` | `#0a0f1e` | Sayfa arka planı |
| `--color-dark-lighter` | `#121a2f` | Dönüşümlü bölüm arka planı |
| `--color-dark-card` | `#151d33` | Kart yüzeyi |
| `--color-silver` | `#c0c8d8` | Gövde metni |
| `--color-silver-light` | `#e8ecf2` | Vurgulu metin |

Site **yalnızca koyu temadır** — açık tema varyantı yoktur.

### Tipografi

| Token | Font | Kullanım |
|---|---|---|
| `--font-sans` | Inter | Gövde metni (`font-sans`) |
| `--font-display` | Playfair Display | Başlıklar (`font-display`) |

Fontlar `index.html` içinden Google Fonts ile `preconnect` kullanılarak yüklenir.

### Özel yardımcı sınıflar

`index.css` içinde tanımlı, bileşenlerde sık kullanılan sınıflar:

| Sınıf | Etkisi |
|---|---|
| `.text-gradient` | Metne mavi → gümüş degrade uygular |
| `.glass-card` | Yarı saydam, `backdrop-blur`'lu kart yüzeyi |
| `.hero-gradient` | Hero bölümü için radyal ışıma arka planı |
| `.line-glow` | Bölüm ayıracı olarak kullanılan 1px parlayan çizgi |
| `.animate-float` | 6 sn'lik yumuşak yukarı-aşağı süzülme |
| `.animate-pulse-glow` | 3 sn'lik nabız gibi gölge parlaması |

Ayrıca `html { scroll-behavior: smooth }` ve marka rengine boyanmış özel scrollbar tanımlıdır.

---

## SEO ve meta bilgileri

Tüm SEO yapılandırması **`index.html`'in `<head>` bölümünde** toplanmıştır — React tarafında (react-helmet vb.) meta yönetimi yoktur. Sitenin tek sayfa olması bunu yeterli kılar.

### Neler tanımlı

- **Temel meta:** `title`, `description`, `keywords`, `author`, `robots: index, follow`
- **Canonical:** `https://www.archaplan.com.tr/`
- **Dil:** `<html lang="tr">`, `og:locale = tr_TR`
- **Open Graph:** Facebook, WhatsApp ve LinkedIn paylaşımları için `og:type`, `og:url`, `og:title`, `og:description`, `og:image`, `og:site_name`
- **Twitter Card:** `summary_large_image` formatında başlık, açıklama ve görsel
- **Tema rengi:** `<meta name="theme-color" content="#c9a96e">`
- **Yapısal veri (JSON-LD):** `schema.org/LocalBusiness` tipinde — firma adı, açıklama, telefon, e-posta, İzmir adresi, koordinatlar (`38.4192, 27.1287`), hizmet bölgesi, sosyal hesaplar ve üç hizmetlik `hasOfferCatalog`
- **`robots.txt`:** Tüm botlara izin verir, sitemap'i işaret eder
- **`sitemap.xml`:** Ana sayfa ve dört bölüm çapası (`#about`, `#services`, `#projects`, `#contact`) öncelik değerleriyle listelenir

### Güncellerken dikkat

- İçerikte bölüm eklediğinizde/çıkardığınızda `public/sitemap.xml` içindeki `<url>` girdilerini ve `<lastmod>` tarihlerini de güncelleyin.
- `theme-color` (`#c9a96e`, altın tonu) tasarımdaki `--color-primary` (`#1a5fff`, mavi) ile uyuşmuyor. Tarayıcı arayüz rengi olarak altın ton bilinçli bir tercihse sorun yok; değilse mavi ile eşitlemek gerekir.

---

## İletişim bilgilerini güncelleme

Aynı iletişim bilgileri **üç ayrı dosyada** tekrar eder. Telefon, e-posta veya sosyal hesap değişirse üçünü birden güncelleyin:

| Bilgi | Değer | Geçtiği yerler |
|---|---|---|
| Telefon | `+90 545 640 04 97` | `index.html` (JSON-LD), `Contact.jsx`, `Footer.jsx` |
| E-posta | `archaplan35@gmail.com` | `index.html` (JSON-LD), `Contact.jsx`, `Footer.jsx` |
| WhatsApp | `wa.me/905456400497` | `index.html` (JSON-LD `sameAs`), `Contact.jsx`, `Footer.jsx` |
| Instagram | `@archaplandesign` | `index.html` (JSON-LD `sameAs`), `Contact.jsx`, `Footer.jsx` |

Hepsini tek seferde bulmak için:

```bash
grep -rn "905456400497\|archaplan35@gmail.com\|archaplandesign" index.html src/
```

---

## Bilinen eksikler

`index.html` içinde referans verilen ancak `public/` altında **bulunmayan** iki dosya var — bunlar şu an 404 dönüyor:

| Dosya | Referans | Etkisi |
|---|---|---|
| `og-image.jpg` | `og:image`, `twitter:image`, JSON-LD `image` | WhatsApp / Facebook / LinkedIn / X paylaşımlarında önizleme görseli çıkmaz |
| `apple-touch-icon.png` | `<link rel="apple-touch-icon">` | iOS ana ekrana eklendiğinde ikon bozuk görünür |

Önerilen boyutlar: `og-image.jpg` için **1200×630 px**, `apple-touch-icon.png` için **180×180 px**. İkisini de `public/` altına koymak yeterlidir; ek yapılandırma gerekmez.

---

## Yayına alma

```bash
pnpm build     # dist/ klasörünü üretir
pnpm preview   # canlıya göndermeden önce dist/ çıktısını lokalde doğrula
```

`dist/` klasörü statik dosyalardan oluşur; Netlify, Vercel, Cloudflare Pages veya klasik bir web sunucusuna olduğu gibi yüklenebilir. Sunucu tarafı gereksinimi yoktur.

> `dist/` ve `node_modules/` `.gitignore` içindedir; repoya girmezler.

Yayın sonrası kontrol listesi:

- [ ] `og-image.jpg` ve `apple-touch-icon.png` eklendi mi?
- [ ] `sitemap.xml` içindeki `<lastmod>` tarihleri güncel mi?
- [ ] Paylaşım önizlemesi doğrulandı mı? ([OpenGraph.xyz](https://www.opengraph.xyz/))
- [ ] Yapısal veri hatasız mı? ([Rich Results Test](https://search.google.com/test/rich-results))
