# 📸 صور الموقع — أماكن الرفع والأسماء

ارفع الصور بنفس الأسماء بالضبط (يفضّل صيغة `.jpg`، ولو `.png` خبّرني).
لو نقص أي صورة، عادي — بنحط Placeholder مؤقت مكانها.

---

## 1) صورة عوض (الهيرو)
```
public/images/hero/awadh.png
```
- **PNG بخلفية شفافة** (مقصوصة، بدون خلفية) — بتكبر تاخذ مساحة الهيرو كاملة.
- يفضّل دقة عالية وبورتريه (طول) عشان تطلع واضحة بالحجم الكبير.
- الموقع بيحوّلها **أبيض وأسود** تلقائياً لتناسق الطابع الرمادي — فمو لازم تعدّلها أنت.

---

## 2) صور المشاريع
كل مشروع له: صورة غلاف `cover` + صور تفاصيل مرقّمة تظهر داخل النافذة المنبثقة (Pop-up).

> لا يوجد صورة غلاف (cover) — الكارد نظيف: لوقو دائري صغير فوق + اسم + تعريف.
> ألوان الكارد والنافذة تُستخرج تلقائياً من **صور المشروع** (الصور المرقّمة).

### المشروع 1 — هيئة الاتصالات والفضاء والتقنية (CST)
```
public/images/projects/cst/logo.png     ← لوقو الجهة (شفاف PNG أو SVG)
public/images/projects/cst/1.jpg
public/images/projects/cst/2.jpg
public/images/projects/cst/3.jpg
public/images/projects/cst/4.jpg
```

### المشروع 2 — شركة الديرة للتطوير / جولة إرثنا
```
public/images/projects/irathna/logo.png
public/images/projects/irathna/1.jpg
public/images/projects/irathna/2.jpg
public/images/projects/irathna/3.jpg
public/images/projects/irathna/4.jpg
```

### المشروع 3 — هيئة تطوير محمية الإمام عبدالعزيز بن محمد الملكية
```
public/images/projects/royal-reserve/logo.png
public/images/projects/royal-reserve/1.jpg
public/images/projects/royal-reserve/2.jpg
public/images/projects/royal-reserve/3.jpg
public/images/projects/royal-reserve/4.jpg
```

---

### ملاحظات
- `logo.png` = شعار الجهة، يظهر **دائري صغير في زاوية الكارد** + داخل النافذة (يفضّل خلفية شفافة).
- `1.jpg` … `4.jpg` = صور المشروع، تظهر داخل الـ Pop-up (تقدر تنقص أو تزيد، بس خلّها مرقّمة بالترتيب).
- عدد الصور لكل مشروع مرن — لو عندك صورتين بس، ارفع `1.jpg` و `2.jpg` وكفى.
- **ألوان الكارد والنافذة تُستخرج تلقائياً من ألوان صور المشروع** — مثلاً المحمية ألوانها صحراوية/طبيعية فالكارد ياخذ نفس الطابع، بدون قوالب جامدة.
