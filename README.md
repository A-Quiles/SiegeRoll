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

