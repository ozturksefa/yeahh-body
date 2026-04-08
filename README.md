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
