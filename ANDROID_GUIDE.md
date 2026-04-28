# ReaderON: Guía de Arquitectura Android (Java)

Esta guía proporciona el código base y la estructura necesaria para implementar **ReaderON** en Android Studio utilizando Java.

## 1. Dependencias (build.gradle)

Añade estas librerías en tu archivo `app/build.gradle`:

```gradle
dependencies {
    // OCR: Google ML Kit
    implementation 'com.google.android.gms:play-services-mlkit-text-recognition:19.0.0'
    
    // Audio: Vosk (Offline Speech to Text)
    implementation 'com.alphacephei:vosk-android:0.3.47'
    
    // IA: Gemini (Google AI SDK)
    implementation 'com.google.ai.client.generativeai:generativeai:0.7.0'
    
    // UI & Multimedia
    implementation 'com.github.canhub:android-image-cropper:4.5.0' // Para recortar fotos
    implementation 'androidx.camera:camera-lifecycle:1.3.1'
}
```

## 2. Módulo de Análisis Sintáctico (Java)

Esta clase maneja la comparación de texto y la generación del formato `.Play` (HTML).

```java
import android.text.Html;
import android.text.Spanned;
import androidx.core.text.HtmlCompat;

public class AccuracyAnalyzer {

    // Algoritmo de Distancia de Levenshtein para comparar palabras
    public static int compareWords(String original, String read) {
        // Implementación simplificada o usar librerías como Apache Commons Lang
        if (original.equalsIgnoreCase(read)) return 100;
        // ... lógica de distancia ...
        return 50; // Ejemplo
    }

    public static String generatePlayFormat(List<WordResult> results) {
        StringBuilder html = new StringBuilder();
        for (WordResult res : results) {
            String colorClass = getStyleForScore(res.getScore());
            html.append("<span style=\"").append(colorClass).append("\">")
                .append(res.getText()).append("</span> ");
        }
        return html.toString();
    }

    private static String getStyleForScore(int score) {
        if (score >= 75) return "color: #15803d;"; // Verde
        if (score >= 55) return "color: #b45309;"; // Amarillo
        if (score >= 31) return "color: #ef4444; background-color: #fef3c7;"; // Rojo fuente, amarillo fondo
        return "color: #ffffff; background-color: #ef4444;"; // Blanco fuente, rojo fondo (Accesibilidad)
    }
}
```

## 3. Grabadora y Persistencia de Archivos

```java
public class AudioRecorderModule {
    private MediaRecorder recorder;
    private String fileName;

    public void startRecording(Context context) {
        fileName = context.getExternalCacheDir().getAbsolutePath() + 
                   "/audio_" + System.currentTimeMillis() + ".mp3";
        
        recorder = new MediaRecorder();
        recorder.setAudioSource(MediaRecorder.AudioSource.MIC);
        recorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
        recorder.setAudioEncoder(MediaRecorder.AudioEncoder.AAC);
        recorder.setOutputFile(fileName);
        
        try {
            recorder.prepare();
            recorder.start();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public void stopRecording() {
        if (recorder != null) {
            recorder.stop();
            recorder.release();
            recorder = null;
        }
    }
}
```

## 4. Integración Gemini (Resumen)

```java
GenerativeModel gm = new GenerativeModel("gemini-1.5-flash", "TU_API_KEY");
GenerativeModelFutures model = GenerativeModelFutures.from(gm);

Content content = new Content.Builder()
    .addText("Resume este texto extrayendo puntos clave y entidades: " + ocrText)
    .build();

ListenableFuture<GenerateContentResponse> response = model.generateContent(content);
Futures.addCallback(response, new FutureCallback<GenerateContentResponse>() {
    @Override
    public void onSuccess(GenerateContentResponse result) {
        String summary = result.getText();
        // Guardar en resumen_ddmmyyyy_hhmm.Play
    }
    // ...
}, executor);
```

## Notas de Diseño (UX/UI)
- **TooltipCompat**: Usa `TooltipCompat.setTooltipText(view, "Texto")` para los labels de los iconos en Long Press.
- **Vosk**: Requiere descargar modelos de idioma (eng/spa) en el almacenamiento del dispositivo para funcionar offline.
