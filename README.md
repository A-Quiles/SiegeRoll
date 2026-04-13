# SiegeRoll 🎯

**Generador aleatorio de operadores y loadouts para Rainbow Six Siege**

SiegeRoll es una aplicación web/híbrida creada con Angular e Ionic para seleccionar al azar un operador, su arma y gadget en Rainbow Six Siege.

---

## 🚀 Descripción

- Aplicación basada en **Angular 17** y **Ionic 7**.
- Compatible con versiones móviles nativas usando **Capacitor 5**.
- UI enfocada en una experiencia rápida y visual para elegir operadores, armas y gadgets.
- Ideal para jugadores que buscan una ruleta de operador o un loadout aleatorio para partidas en R6.

---

## 🧰 Tecnologías

- **Angular 17**
- **Ionic 7**
- **Capacitor 5**
- **TypeScript 5**
- **RxJS**
- **Sass / SCSS**

---

## ⚡ Comandos principales

```bash
npm install
npm start
```

Para build de producción:

```bash
npm run build:prod
```

Para servir con Ionic:

```bash
npm run ionic:serve
```

---

## 📲 Capacitor / App nativa

### Android

```bash
npm run build:prod
npx cap add android      # solo la primera vez
npx cap sync android
npx cap open android
```

### iOS (Mac + Xcode)

```bash
npm run build:prod
npx cap add ios          # solo la primera vez
npx cap sync ios
npx cap open ios
```

---

## 🌐 Publicación web

La salida de producción se encuentra en la carpeta `www/`.

Puedes desplegarla en servicios como **Netlify**, **Vercel** o **GitHub Pages**.

---

## 📁 Estructura del proyecto

```text
siegeroll/
├── src/
│   ├── app/
│   │   ├── data/          # Datos de operadores y loadouts
│   │   ├── models/        # Interfaces TypeScript
│   │   ├── services/      # Servicios de lógica y utilidades
│   │   ├── home/          # Página principal
│   │   ├── app.module.ts
│   │   ├── app-routing.module.ts
│   │   └── app.component.ts
│   ├── assets/            # Imágenes, iconos y recursos estáticos
│   ├── environments/      # Configuración de entorno
│   ├── theme/             # Variables y temas globales
│   ├── global.scss
│   └── index.html
├── capacitor.config.ts
├── ionic.config.json
├── angular.json
└── package.json
```

---

## ✨ Características principales

- Ruleta aleatoria de operadores.
- Loadout completo: arma principal, secundaria, gadget y throwable.
- Filtros para atacar/defender.
- Compatibilidad móvil con Ionic + Capacitor.
- Bilingüe según configuración de la app.
- Estilos y animaciones inspirados en Rainbow Six Siege.
- Build lista para despliegue web y nativo.

---

## 🔧 Personalizar operadores

Edita el archivo `src/app/data/operators.ts` para añadir o modificar operadores.

Ejemplo de objeto:

```typescript
{
  id: 'deimos',
  name: 'Deimos',
  role: 'attacker',
  flag: '🇺🇸',
  speed: 2,
  primaries: ['AK-12', 'M4'],
  secondaries: ['P9'],
  gadget: 'Stalker Flare',
  throwables: ['Claymore', 'Hard Breach Charge']
}
```

---

## 📝 Notas

- No olvides ejecutar `npm install` después de clonar el repositorio.
- Usa `npm run build:prod` antes de sincronizar con Capacitor.
- La carpeta `www/` se genera automáticamente en el build.

---

## 📄 Licencia

MIT
