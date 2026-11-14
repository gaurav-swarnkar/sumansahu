# Project cover images

Drop one image per project here (PNG, JPG or WebP, ideally ~1600px wide,
transparent PNG works best on the gradients).

Then connect it in `src/data.ts`:

```ts
import studyPlannerCover from "./imports/project_covers/study-planner.png";
// …
{ id: "study-planner", …, cover: studyPlannerCover },
```

Leave `cover` out to keep the built-in mockup.
