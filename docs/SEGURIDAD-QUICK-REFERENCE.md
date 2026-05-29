# ⚡ SEGURIDAD - Quick Reference

**ESTADO:** 🔴 CRÍTICO  
**TIEMPO TOTAL:** 45 minutos  
**COMENZAR AHORA**

---

## 📋 RESUMEN VISUAL

```
┌─────────────────────────────────────────────────────────────┐
│ PASO 1: Supabase (5 min)                                    │
├─────────────────────────────────────────────────────────────┤
│ 1. https://app.supabase.com/project/*/settings/api         │
│ 2. Click [Rotate] en "Public API key (anon)"               │
│ 3. Copiar nueva key                                         │
│ ✅ GUARDADO EN: Nota temporal                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PASO 2: Gmail Password (5 min)                              │
├─────────────────────────────────────────────────────────────┤
│ 1. https://myaccount.google.com/security                    │
│ 2. Click [Change password]                                  │
│ 3. Nueva password (12+ caracteres, MAYÚS/números/símbolos)│
│ ✅ GUARDADO EN: Password manager                            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PASO 3: Gmail App Password (5 min)                          │
├─────────────────────────────────────────────────────────────┤
│ 1. https://myaccount.google.com/security                    │
│ 2. App: Mail | Device: Windows Computer                     │
│ 3. Click [Generate]                                         │
│ 4. Copiar password de 16 caracteres                         │
│ ✅ GUARDADO EN: Nota temporal                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PASO 4: SerpAPI (5 min)                                     │
├─────────────────────────────────────────────────────────────┤
│ 1. https://serpapi.com/dashboard                            │
│ 2. Click [Regenerate API Key]                               │
│ 3. Copiar nueva key                                         │
│ ✅ GUARDADO EN: Nota temporal                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PASO 5: Actualizar E:\master.env (5 min)                    │
├─────────────────────────────────────────────────────────────┤
│ 1. Abre: E:\master.env                                      │
│ 2. Reemplaza SUPABASE_KEY (nueva de Paso 1)                │
│ 3. Reemplaza SMTP_PASS (nueva de Paso 3)                   │
│ 4. Reemplaza SERP_API_KEY (nueva de Paso 4)                │
│ 5. Ctrl+S (guardar)                                         │
│ ✅ GUARDADO EN: E:\master.env                               │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PASO 6: Git - Limpiar History (15 min) ⚠️                   │
├─────────────────────────────────────────────────────────────┤
│ 1. PowerShell (Admin) → cd E:\git                           │
│ 2. Ejecutar:                                                │
│    git filter-branch --force --index-filter               │
│    "git rm --cached --ignore-unmatch .env" --prune-empty │
│    --tag-name-filter cat -- --all                         │
│ 3. Esperar 1-2 minutos                                      │
│ 4. Ejecutar:                                                │
│    git push origin --force --all                           │
│    git push origin --force --tags                          │
│ ✅ GUARDADO EN: Git remote                                  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ PASO 7: Verificación Final (5 min)                          │
├─────────────────────────────────────────────────────────────┤
│ 1. PowerShell: git log --all --full-history -- .env        │
│    (NO debe devolver resultados)                            │
│ 2. PowerShell: git ls-files | findstr .env                 │
│    (NO debe devolver resultados)                            │
│ ✅ VERIFICADO: .env no está en git                          │
└─────────────────────────────────────────────────────────────┘
```

---

## ⏱️ TIMER

```
Inicio:  ________________
Meta:    + 45 minutos
Fin:     ________________
```

---

## 🚀 COMIENZA AHORA

### 1️⃣ Abre 3 pestañas de navegador:

```
Pestaña 1: https://app.supabase.com/project/*/settings/api
Pestaña 2: https://myaccount.google.com/security
Pestaña 3: https://serpapi.com/dashboard
```

### 2️⃣ Abre Notepad para guardar credenciales temporales:

```
Notepad → Escribe:

SUPABASE_KEY_NUEVA: ________________

GMAIL_PASSWORD_NUEVA: ________________

GMAIL_APP_PASSWORD_NUEVA: ________________

SERP_API_KEY_NUEVA: ________________
```

### 3️⃣ Comienza con PASO 1 (Supabase)

```
Sigue el documento detallado en:
E:\git\ACCIONES-SEGURIDAD-PASO-A-PASO.md
```

---

## 🔑 CREDENCIALES A REEMPLAZAR

En `E:\master.env`, busca y reemplaza:

```env
# LÍNEA 1 - Supabase
SUPABASE_URL=https://zvehtloitnuglyjtxwye.supabase.co
SUPABASE_KEY=<NUEVA-KEY-PASO-1>  ← Cambiar esto

# LÍNEA 2 - Gmail SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=honatuya@gmail.com
SMTP_PASS=<NUEVA-APP-PASSWORD-PASO-3>  ← Cambiar esto
SMTP_FROM="Your Name <honatuya@gmail.com>"

# LÍNEA 3 - SerpAPI
SERP_API_KEY=<NUEVA-KEY-PASO-4>  ← Cambiar esto
```

---

## ✅ CHECKLIST RÁPIDO

```
PASO 1 - Supabase
  [ ] URL abierta
  [ ] Regeneré API key
  [ ] Copié nueva key
  [ ] Tiempo: _____ min

PASO 2 - Gmail Password
  [ ] URL abierta
  [ ] Cambié password principal
  [ ] Guardé nueva password
  [ ] Tiempo: _____ min

PASO 3 - Gmail App Password
  [ ] URL en misma pestaña
  [ ] Generé App password
  [ ] Copié password de 16 caracteres
  [ ] Tiempo: _____ min

PASO 4 - SerpAPI
  [ ] URL abierta
  [ ] Regeneré API key
  [ ] Copié nueva key
  [ ] Tiempo: _____ min

PASO 5 - Actualizar master.env
  [ ] Abrí E:\master.env
  [ ] Actualicé SUPABASE_KEY
  [ ] Actualicé SMTP_PASS
  [ ] Actualicé SERP_API_KEY
  [ ] Guardé con Ctrl+S
  [ ] Tiempo: _____ min

PASO 6 - Git Filter-Branch
  [ ] PowerShell (Admin) abierto
  [ ] Ejecuté git filter-branch
  [ ] Ejecuté git push --force --all
  [ ] Ejecuté git push --force --tags
  [ ] Tiempo: _____ min

PASO 7 - Verificación
  [ ] git log -- .env (sin resultados)
  [ ] git ls-files | findstr .env (sin resultados)
  [ ] .gitignore tiene .env
  [ ] Tiempo: _____ min

TOTAL: _____ min (meta: 45 min)
```

---

## 🎯 DESPUÉS DE COMPLETAR

```
1. ❌ NO borres el Notepad con credenciales temporales
   (Úsalo para comparar si algo falla)

2. ✅ Borra las credenciales ANTIGUAS de tu historial
   (o al menos borra el Notepad después de 1 hora)

3. ✅ Verifica que los servicios funcionan:
   - Supabase: Intenta acceder al dashboard
   - Gmail: Intenta enviar un email SMTP
   - SerpAPI: Intenta hacer una query en /app/tools/io-prospector

4. ✅ Ejecuta pnpm install (para setup husky):
   cd E:\git
   pnpm install
```

---

## 🚨 SI ALGO FALLA

| Problema | Solución |
|----------|----------|
| Git push rechazado | Intenta: `git push -u origin main --force` |
| Google: No genera App password | Activa 2-Step Verification primero |
| Supabase: Error al regenerar | Refresca la página, intenta de nuevo |
| filter-branch: Permission denied | Cierra VS Code, PowerShell como Admin |

---

## 📞 PREGUNTAS FRECUENTES

**P: ¿Puedo hacer los pasos en otro orden?**
R: NO. Sigue el orden: 1→2→3→4→5→6→7

**P: ¿Cuánto tiempo tarda git filter-branch?**
R: 1-2 minutos. Paciencia.

**P: ¿Qué pasa si fallo en PASO 6?**
R: Contacta soporte. No intentes de nuevo sin ayuda.

**P: ¿Qué hago si pierdo una credencial?**
R: Puedes regenerarla de nuevo. Ve a paso 1, 3, o 4.

---

**Documento:** Seguridad - Quick Reference  
**Tiempo Total:** 45 minutos  
**Criticidad:** 🔴 AHORA MISMO
