# Aventuras Cada Día

Aplicación web infantil para practicar hábitos, evaluar actividades con cinco animales y consultar premios semanales. Inspirada en el prototipo académico **COM100CIA.pdf**. Las ilustraciones de los animales y los íconos del sol y la luna se extrajeron del PDF aportado para el proyecto.

## Funcionalidades

- Inicio personalizado y progreso diario.
- 11 actividades predefinidas, 8 activas inicialmente, agrupadas por mañana, tarde y noche.
- Evaluación por actividad con tigre, zorro, pingüino, tortuga u oso perezoso.
- Cierre diario, celebración y animal dominante; calendario mensual y resumen semanal.
- Premios configurables por animal y registro opcional de un premio por semana.
- Área para padres: crear, editar, activar, desactivar y eliminar actividades; configurar premios y cambiar nombre.
- PIN **opcional** para evitar cambios accidentales (no es autenticación segura).
- Persistencia local, exportación/importación de respaldos JSON y restablecimiento.
- Diseño adaptable a celular, tableta y computadora; sin API ni base de datos.

## Ejecutar localmente

Necesitas Node.js 20 o superior:

```bash
npm run dev
```

Luego abre **http://localhost:4173**. No hace falta `npm install` porque el proyecto no utiliza dependencias de terceros. También puedes verificar la lógica:

```bash
npm run check
npm test
```

> La aplicación usa módulos JavaScript; no abras `index.html` directamente desde `file://`, utiliza el servidor local.

## Subir a GitHub

1. Crea un repositorio vacío en GitHub (recomendado: propiedad de la estudiante).
2. Extrae el ZIP y sube **todo el contenido de la carpeta** a la raíz del repositorio, incluyendo `index.html`, `src`, `public` y `vercel.json`.
3. Es importante subir las ilustraciones de la carpeta `public`.

## Publicar en Vercel

1. Inicia sesión con la cuenta de la propietaria del repositorio.
2. Selecciona **Add New → Project** e importa el repositorio.
3. Framework Preset: **Other**.
4. Build Command: **vacío / sin ejecutar**. Output Directory: **`.`** (raíz del repositorio).
5. Deploy.

Al ser un sitio estático no hacen falta variables de entorno ni servicios adicionales. La configuración JSON de Vercel incluye cabeceras de protección básicas.

**Importante sobre Hobby:** si los commits pertenecen a colaboradores ajenos a la propietaria, Vercel puede restringir despliegues en función del tipo de repositorio y las reglas del plan. Para la presentación, lo más sencillo es que la estudiante sea quien suba y despliegue el código final.

## Cómo usar

1. **Actividades**: toca una responsabilidad y elige un animal según el esfuerzo.
2. **Terminar mi día**: aparece una vez evaluadas todas las actividades habilitadas; el resultado queda en el calendario.
3. **Calendario**: puedes revisar y corregir días anteriores. Si se modifica una evaluación, el día debe finalizarse nuevamente.
4. **Premios**: se calcula el animal más frecuente de todas las evaluaciones de los días finalizados de la semana. Un empate se resuelve a favor del animal de mayor puntuación. Un adulto puede registrar una recompensa semanal.
5. **Zona de papás**: personaliza las actividades y premios, activa un PIN, exporta una copia y gestiona el historial local.

## Datos y límites

- Se usa `localStorage`. El historial **no se sincroniza** entre navegadores, dispositivos o cuentas.
- Al borrar datos del navegador o usar navegación privada, pueden perderse los registros. Exporta copias periódicamente.
- La aplicación está pensada para una demostración académica y **no** ofrece autenticación real, almacenamiento remoto, datos multiusuario ni protección avanzada de PIN.
- No integra analítica, publicidad ni seguimiento de personas.
- Las ilustraciones proceden del material aportado para este proyecto; confirmar derechos antes de cualquier uso público/comercial externo al trabajo escolar.

## Estructura

```text
index.html          Entrada web
src/app.js          Vistas e interacciones
src/data.js         Actividades, niveles, fechas y cálculo de puntajes
src/store.js        Validación y almacenamiento local
src/styles.css      Estilos base y componentes
src/refinement.css  Sistema de diseño refinado, animaciones y adaptabilidad
public/*.webp       Animales extraídos del PDF (accesibles en /public/)
public/favicon.svg  Identidad del proyecto
server.mjs          Servidor de desarrollo sin dependencias
vercel.json         Configuración para publicación
 tests/              Pruebas automatizadas
```
