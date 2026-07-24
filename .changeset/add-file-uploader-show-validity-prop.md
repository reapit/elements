---
'@reapit/elements': minor
---

Added: `showValidity` prop to `FileInput`, `FileUploader.Input`, and `FileUploader.Control`, matching other form controls. `FileUploader.Control` defaults it to whether `errorText` is supplied, so form libraries can defer showing validity until a field is touched.
