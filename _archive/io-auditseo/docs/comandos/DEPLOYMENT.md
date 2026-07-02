# 🚀 COMANDOS PARA CLAUDE CODE — DESPLIEGUES AUTOMÁTICOS

**Versión:** 1.0 | **Aplicable a:** Cualquier app en E:\git\app | **Tiempo:** 1-5 minutos

---

## 📌 TABLA DE CONTENIDOS

1. [Cómo Usar Esta Guía](#cómo-usar)
2. [Comandos por Carpeta](#comandos)
3. [Ejemplos Reales](#ejemplos)
4. [Troubleshooting](#troubleshooting)

---

## 🎯 CÓMO USAR ESTA GUÍA

### El Flujo

```
1. Haces cambios en tu código
2. Commiteas a GitHub
3. Vienes a Claude Code
4. Copias un comando de esta guía
5. Reemplazas [app-name] con tu app
6. Esperas 5-15 minutos
7. ✅ Tu app está actualizada en vivo
```

---

## 📋 COMANDOS POR CARPETA

### 📁 CARPETA: interno/ (Proyecto: iorana-main)

#### Apps disponibles:

- iorana-next
- iorana-dev
- iorana-surf
- io-budget
- io-docusia
- qr-iorana-dev
- ricardoherreravarela

#### Comando genérico:

```
Claude, despliega [app-name] en Coolify desde E:\git\app\interno\[app-name]

Detalles:
- Carpeta: interno
- App: [app-name]
- Proyecto Coolify: iorana-main
- GitHub branch: main
- Esperar: 5-10 minutos
```

#### Ejemplos específicos:

**Desplegar iorana-next:**

```
Claude, despliega iorana-next en Coolify desde E:\git\app\interno\iorana-next

Detalles:
- Carpeta: interno
- App: iorana-next
- Proyecto Coolify: iorana-main
- URL esperada: https://www.iorana.digital
```

**Desplegar io-budget:**

```
Claude, despliega io-budget en Coolify desde E:\git\app\interno\io-budget

Detalles:
- Carpeta: interno
- App: io-budget
- Proyecto Coolify: iorana-main
- URL esperada: https://tools.iorana.digital/budget
```

**Desplegar iorana-dev:**

```
Claude, despliega iorana-dev en Coolify desde E:\git\app\interno\iorana-dev

Detalles:
- Carpeta: interno
- App: iorana-dev
- Proyecto Coolify: iorana-main
- URL esperada: https://dev.iorana.digital
```

---

### 📁 CARPETA: clientes/ (Proyecto: clientes)

#### Apps disponibles:

- resogar
- casaruralasturias

#### Comando genérico:

```
Claude, despliega [app-name] en Coolify desde E:\git\app\clientes\[app-name]

Detalles:
- Carpeta: clientes
- App: [app-name]
- Proyecto Coolify: clientes
- GitHub branch: main
- Esperar: 5-10 minutos
```

#### Ejemplos específicos:

**Desplegar resogar:**

```
Claude, despliega resogar en Coolify desde E:\git\app\clientes\resogar

Detalles:
- Carpeta: clientes
- App: resogar
- Proyecto Coolify: clientes
- URL esperada: https://resogar.com
```

**Desplegar casaruralasturias:**

```
Claude, despliega casaruralasturias en Coolify desde E:\git\app\clientes\casaruralasturias

Detalles:
- Carpeta: clientes
- App: casaruralasturias
- Proyecto Coolify: clientes
- URL esperada: https://casaruralasturias.com
```

---

### 📁 CARPETA: tools/ (Proyecto: tools)

#### Apps disponibles:

- io-auditseo (mcp-auditseo)
- io-ads
- io-crm
- io-design
- io-kw
- io-neruda
- io-prospector

#### Comando genérico:

```
Claude, despliega [app-name] en Coolify desde E:\git\app\tools\[app-name]

Detalles:
- Carpeta: tools
- App: [app-name]
- Proyecto Coolify: tools
- GitHub branch: main
- Esperar: 5-10 minutos
```

#### Ejemplos específicos:

**Desplegar mcp-auditseo:**

```
Claude, despliega mcp-auditseo en Coolify desde E:\git\app\tools\io-auditseo

Detalles:
- Carpeta: tools
- App: mcp-auditseo (ubicada en io-auditseo)
- Proyecto Coolify: tools
- URL esperada: https://tools.iorana.digital/audit-seo
- Tipo: MCP Server
```

**Desplegar io-crm:**

```
Claude, despliega io-crm en Coolify desde E:\git\app\tools\io-crm

Detalles:
- Carpeta: tools
- App: io-crm
- Proyecto Coolify: tools
- URL esperada: https://tools.iorana.digital/crm
```

**Desplegar io-ads:**

```
Claude, despliega io-ads en Coolify desde E:\git\app\tools\io-ads

Detalles:
- Carpeta: tools
- App: io-ads
- Proyecto Coolify: tools
- URL esperada: https://tools.iorana.digital/ads
```

---

## 💡 EJEMPLOS REALES

### Ejemplo 1: Cambios en iorana-next

```
ESCENARIO:
- Actualizaste código en E:\git\app\interno\iorana-next
- Hiciste git commit y push
- Quieres desplegar

QUÉ COPIAS Y PEGAS A CLAUDE:

Claude, despliega iorana-next en Coolify desde E:\git\app\interno\iorana-next

Detalles:
- Carpeta: interno
- App: iorana-next
- Proyecto Coolify: iorana-main
- URL esperada: https://www.iorana.digital
- Cambios: [describe qué cambiaste]

CLAUDE HARÁ:
✅ Verificar cambios en GitHub
✅ Triggerar deployment en Coolify
✅ Esperar a que compile y depliegue
✅ Verificar health check
✅ Reportar: "✅ iorana-next actualizada en https://www.iorana.digital"
```

### Ejemplo 2: Nueva feature en io-budget

```
ESCENARIO:
- Agregaste nueva feature en E:\git\app\interno\io-budget
- Testeaste localmente
- Hiciste push

QUÉ COPIAS Y PEGAS A CLAUDE:

Claude, despliega io-budget en Coolify desde E:\git\app\interno\io-budget

Detalles:
- Carpeta: interno
- App: io-budget
- Proyecto Coolify: iorana-main
- URL esperada: https://tools.iorana.digital/budget
- Cambios: Agregada nueva feature de presupuestos

CLAUDE HARÁ:
✅ Leer cambios
✅ Triggerar deployment
✅ Esperar compilación
✅ Verificar health
✅ Reportar URL en vivo
```

### Ejemplo 3: Múltiples apps a la vez

```
ESCENARIO:
- Cambios en varias apps que están relacionadas
- Quieres deployarlas todas

QUÉ COPIAS Y PEGAS A CLAUDE:

Claude, despliega estas apps en Coolify:

1. iorana-next
   - Carpeta: interno
   - Ruta: E:\git\app\interno\iorana-next
   - URL: https://www.iorana.digital

2. io-budget
   - Carpeta: interno
   - Ruta: E:\git\app\interno\io-budget
   - URL: https://tools.iorana.digital/budget

3. io-crm
   - Carpeta: tools
   - Ruta: E:\git\app\tools\io-crm
   - URL: https://tools.iorana.digital/crm

Proyecto Coolify: iorana-main (interno), tools (tools)
Esperar: 10-15 minutos

CLAUDE HARÁ:
✅ Deployar las 3 apps en paralelo
✅ Reportar estado de cada una
✅ Listar URLs actualizadas
```

---

## 📝 TEMPLATE ESTÁNDAR

Copia y pega este template, reemplaza los valores:

```
Claude, despliega [APP-NAME] en Coolify desde E:\git\app\[CARPETA]\[APP-NAME]

Detalles:
- Carpeta: [CARPETA]
- App: [APP-NAME]
- Proyecto Coolify: [PROYECTO]
- URL esperada: [URL]
- Cambios: [QUÉ CAMBIASTE]
```

### Reemplazo de valores:

| Placeholder         | Ejemplo                    | Notas                       |
| ------------------- | -------------------------- | --------------------------- |
| **[APP-NAME]**      | iorana-next                | Nombre exacto de la carpeta |
| **[CARPETA]**       | interno                    | interno, clientes o tools   |
| **[PROYECTO]**      | iorana-main                | Ver tabla abajo             |
| **[URL]**           | https://www.iorana.digital | URL pública de la app       |
| **[QUÉ CAMBIASTE]** | "Actualizado header"       | Breve descripción           |

---

## 🔗 REFERENCIA RÁPIDA: CARPETA → PROYECTO

```
E:\git\app\interno\*          → Proyecto Coolify: iorana-main
E:\git\app\clientes\*         → Proyecto Coolify: clientes
E:\git\app\tools\*            → Proyecto Coolify: tools
```

---

## 📊 TABLA DE APPS POR CARPETA

### INTERNO (Proyecto: iorana-main)

| App                      | Ruta                             | URL                         | Puerto |
| ------------------------ | -------------------------------- | --------------------------- | ------ |
| **iorana-next**          | app/interno/iorana-next          | www.iorana.digital          | 3000   |
| **iorana-dev**           | app/interno/iorana-dev           | dev.iorana.digital          | 3001   |
| **iorana-surf**          | app/interno/iorana-surf          | surf.iorana.digital         | 3002   |
| **io-budget**            | app/interno/io-budget            | tools.iorana.digital/budget | 3003   |
| **io-docusia**           | app/interno/io-docusia           | tools.iorana.digital/docs   | 3004   |
| **qr-iorana-dev**        | app/interno/qr-iorana-dev        | tools.iorana.digital/qr     | 3005   |
| **ricardoherreravarela** | app/interno/ricardoherreravarela | ricardoherreravarela.com    | 3006   |

### CLIENTES (Proyecto: clientes)

| App                   | Ruta                           | URL                   | Puerto |
| --------------------- | ------------------------------ | --------------------- | ------ |
| **resogar**           | app/clientes/resogar           | resogar.com           | 80/443 |
| **casaruralasturias** | app/clientes/casaruralasturias | casaruralasturias.com | 80/443 |

### TOOLS (Proyecto: tools)

| App               | Ruta                    | URL                             | Puerto |
| ----------------- | ----------------------- | ------------------------------- | ------ |
| **mcp-auditseo**  | app/tools/io-auditseo   | tools.iorana.digital/audit-seo  | 3700   |
| **io-ads**        | app/tools/io-ads        | tools.iorana.digital/ads        | 3701   |
| **io-crm**        | app/tools/io-crm        | tools.iorana.digital/crm        | 3702   |
| **io-design**     | app/tools/io-design     | tools.iorana.digital/design     | 3703   |
| **io-kw**         | app/tools/io-kw         | tools.iorana.digital/kw         | 3704   |
| **io-neruda**     | app/tools/io-neruda     | tools.iorana.digital/neruda     | 3705   |
| **io-prospector** | app/tools/io-prospector | tools.iorana.digital/prospector | 3706   |

---

## ⚡ COMANDOS RÁPIDOS (COPIAR-PEGAR)

### INTERNO

```
Claude, despliega iorana-next en Coolify desde E:\git\app\interno\iorana-next
Detalles: - Carpeta: interno - App: iorana-next - Proyecto: iorana-main - URL: https://www.iorana.digital
```

```
Claude, despliega iorana-dev en Coolify desde E:\git\app\interno\iorana-dev
Detalles: - Carpeta: interno - App: iorana-dev - Proyecto: iorana-main - URL: https://dev.iorana.digital
```

```
Claude, despliega io-budget en Coolify desde E:\git\app\interno\io-budget
Detalles: - Carpeta: interno - App: io-budget - Proyecto: iorana-main - URL: https://tools.iorana.digital/budget
```

### CLIENTES

```
Claude, despliega resogar en Coolify desde E:\git\app\clientes\resogar
Detalles: - Carpeta: clientes - App: resogar - Proyecto: clientes - URL: https://resogar.com
```

```
Claude, despliega casaruralasturias en Coolify desde E:\git\app\clientes\casaruralasturias
Detalles: - Carpeta: clientes - App: casaruralasturias - Proyecto: clientes - URL: https://casaruralasturias.com
```

### TOOLS

```
Claude, despliega mcp-auditseo en Coolify desde E:\git\app\tools\io-auditseo
Detalles: - Carpeta: tools - App: mcp-auditseo - Proyecto: tools - URL: https://tools.iorana.digital/audit-seo
```

```
Claude, despliega io-crm en Coolify desde E:\git\app\tools\io-crm
Detalles: - Carpeta: tools - App: io-crm - Proyecto: tools - URL: https://tools.iorana.digital/crm
```

```
Claude, despliega io-ads en Coolify desde E:\git\app\tools\io-ads
Detalles: - Carpeta: tools - App: io-ads - Proyecto: tools - URL: https://tools.iorana.digital/ads
```

---

## ✅ QUÉ ESPERAR

### Timeline de un despliegue

```
0 min    → Copias comando a Claude
0-1 min  → Claude lee la solicitud
1-2 min  → Claude triggera deployment en Coolify
2-10 min → App se compila y despliega
10-15 min→ Health check verifica que esté OK
15 min   → ✅ Claude reporta: "App actualizada en [URL]"
```

### Qué reporta Claude

```
✅ Despliegue completado
- App: iorana-next
- Proyecto: iorana-main
- URL: https://www.iorana.digital
- Status: Online ✓
- Logs: [últimas 10 líneas]
```

---

## 🐛 TROUBLESHOOTING

| Problema                | Qué decirle a Claude                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------ |
| **App no se actualiza** | "Claude, verifica el status de iorana-next en Coolify. No veo cambios en la URL."    |
| **Error en el build**   | "Claude, hay error en build de io-budget. Revisa los logs."                          |
| **Health check falla**  | "Claude, health check falla en iorana-next. Puede ser problema en /health endpoint." |
| **Rollback necesario**  | "Claude, revierte iorana-next a la versión anterior en Coolify."                     |
| **Ver logs en vivo**    | "Claude, muestra los logs en tiempo real de io-crm desde Coolify."                   |

---

## 📌 NOTAS IMPORTANTES

### ✅ HACER

- Copiar exactamente el comando (respeta mayúsculas/minúsculas)
- Esperar a que Claude confirme que comenzó el deployment
- Verificar la URL después de 15 minutos
- Reportar errores inmediatamente

### ❌ NO HACER

- No modificar el comando, úsalo tal cual
- No pushear código sin que el deployment anterior termine
- No ejecutar múltiples despliegues simultáneamente de la misma app
- No borrar archivos manualmente en Coolify

---

## 🎯 RESUMEN RÁPIDO

```
1. Haces cambios en E:\git\app\[carpeta]\[app]
2. Haces git commit y push
3. Vienes a Claude Code
4. Copias el comando de la tabla de arriba
5. Pegas en Claude
6. Esperas 5-15 minutos
7. ✅ App actualizada en vivo
```

---

**¿Preguntas? Pregunta a Claude:**

"Claude, ¿cómo despliego [app-name]?" y Claude te dirá el comando exacto a usar.
