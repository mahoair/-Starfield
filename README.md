# Starfield

**Canlı demo:** https://mahoair.github.io/-Starfield/

p5.js ile yazılmış, tarayıcıda çalışan etkileşimli bir yıldız alanı animasyonu.
Yıldızlar size doğru uçar; hızlandıkça izleri uzar ve en yüksek hızda "hiper uzay" mavisine döner.

## Çalıştırma

Derleme adımı yok. `index.html` dosyasını tarayıcıda açın ya da klasörü herhangi bir statik sunucuyla sunun:

```sh
npx http-server .
```

`master` dalına yapılan her push, GitHub Pages üzerinden otomatik olarak yayınlanır.

## Kontroller

| Kontrol | İşlev |
|---|---|
| Fare / parmak (yatay) | Hız: sol = dur, sağ = en hızlı |
| `↑` / `↓` | Hızı artır / azalt |
| `W` | Warp: en yüksek hız ↔ seyir hızı |
| `Boşluk` | Duraklat / devam et |
| `C` | Renkli / beyaz yıldızlar |
| `F` | Tam ekran |
| `H` | Yardım panelini aç / kapat |

## Özellikler

- Tam ekran ve pencere boyutuna uyumlu; yıldız sayısı ekran alanına göre ayarlanır.
- Hız değişimleri yumuşak geçişlidir.
- Yıldızlar uzaktan sönük belirir, yaklaştıkça büyür ve parlar; yavaşken hafifçe parıldar.
- Mobilde dokunmatik kontrol, sayfa kaymadan çalışır.
- Retina ekranlarda net görüntü (piksel yoğunluğu performans için en fazla 2x).
- İşletim sisteminde "hareketi azalt" açıksa yavaş başlar.

## Dosyalar

- `index.html`: sayfa, stil ve yardım paneli
- `sketch.js`: kurulum, çizim döngüsü ve kontroller
- `Star.js`: tek bir yıldızın hareketi ve çizimi

## Kaynak

[The Coding Train](https://thecodingtrain.com/) kanalından Daniel Shiffman'ın
[Coding Challenge #1: Starfield](https://youtu.be/17WoOqgXsRM) videosundaki örnekten geliştirilmiştir.
