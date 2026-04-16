# Yeahh Body

Kişiselleştirilmiş antrenman ve takip uygulaması. Uygulama artık hibrit bir omurga kullanır:
- aynı haftalık sistem
- `Ev` ve `Macfit` için eşdeğer varyasyonlar
- skill, beslenme, durum ve ilerleme takibi

## Geliştirme

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
npm run preview
```

## Ortam Değişkenleri

`.env.example` dosyasını referans al:

```bash
cp .env.example .env.local
```

Tanımlanabilen değişkenler:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Not: Bu değişkenler tanımlanmazsa uygulama mevcut public fallback Supabase config ile çalışmaya devam eder. Production deploy için env üzerinden tanımlaman önerilir.

## Production Notları

- Build artık lazy-loading ve code-splitting kullanır.
- Hibrit ekran bugünün gününü yerel tarihe göre otomatik açar.
- Workout tracker, beslenme, dashboard ve hibrit görünüm aynı yerel takvim mantığını paylaşır.
- Service worker ve cache temizleme için agresif development davranışı kaldırılmıştır.

## Önerilen Deploy Kontrol Listesi

- `VITE_SUPABASE_URL` ve `VITE_SUPABASE_ANON_KEY` tanımlı olsun
- `npm run build` temiz geçsin
- Giriş / kayıt / seans tamamlama akışları canlı ortamda test edilsin
- Supabase RLS ve auth redirect ayarları deploy domainine göre doğrulansın

## Push Notification Kurulumu (opsiyonel)

Günlük antrenman bildirimleri için bir defaya mahsus kurulum gerekir:

### 1. VAPID anahtarlarını üret
```bash
npx web-push generate-vapid-keys
```
İki base64 string verir: `publicKey` ve `privateKey`.

### 2. Supabase tablosunu oluştur
`supabase/push_subscriptions.sql` içeriğini Supabase Dashboard → SQL Editor'de çalıştır. RLS policies dahil her şey tek seferde kurulur.

### 3. Netlify env vars (Site settings → Environment variables)
```
VITE_VAPID_PUBLIC_KEY     = <public key — client tarafı ve build'de kullanılır>
VAPID_PUBLIC_KEY          = <aynı public key — function tarafı>
VAPID_PRIVATE_KEY         = <private key, ASLA client'a sızmaz>
VAPID_SUBJECT             = mailto:admin@yeahh.body
SUPABASE_SERVICE_ROLE_KEY = <Supabase Dashboard → Settings → API → service_role>
SUPABASE_URL              = <aynı proje URL'i — function tarafı için>
```

### 4. Scheduled Function
`netlify/functions/push-send-daily.js` zaten `schedule: "0 7 * * *"` ile tanımlı (07:00 UTC = 10:00 İstanbul). Netlify otomatik algılar; farklı saat istersen cron string'ini değiştir.

**Manuel test:** Netlify Dashboard → Logs → Functions → `push-send-daily` → **"Test"** veya **"Invoke function"** butonu. Scheduled fonksiyonlar HTTP path'i ile çağrılamaz; Netlify cron dispatcher üzerinden çalışır.

### 5. Kullanıcı tarafı
"Yardımcı Alan" paneline tıklayınca 🔔 "Günlük antrenman hatırlatması" kartı çıkar. Kullanıcı tek tap ile açar/kapar.
