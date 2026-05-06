package com.readeron.app

import android.content.Context
import android.util.Log
import com.google.mediapipe.tasks.genai.llminference.LlmInference
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.File

/**
 * Singleton Gemma Inference Manager
 * Powered by Google AI Edge LiteRT (formerly TFLite).
 * Optimized for Samsung Galaxy A54 (Exynos 1380) and Gemma 2B (4-bit).
 * Version 0.0.1 feature 0.0.36
 */
class GemmaInferenceManager private constructor(private val context: Context) {

    companion object {
        private const val TAG = "GemmaInference"

        @Volatile
        private var instance: GemmaInferenceManager? = null

        fun getInstance(context: Context): GemmaInferenceManager =
            instance ?: synchronized(this) {
                instance ?: GemmaInferenceManager(context.applicationContext).also { instance = it }
            }
    }

    private var llmInference: LlmInference? = null

    /**
     * Initialize the Gemma model from a local file path.
     * @param modelPath Absolute path to the .bin, .task, or .tflite model file.
     * @return "Success: ..." or "Error: ..."
     */
    suspend fun initLlm(modelPath: String): String {
        return withContext(Dispatchers.IO) {
            try {
                Log.d(TAG, "=== GemmaInferenceManager v0.0.29 [A54 Optimized] ===")
                Log.d(TAG, "Target model path: $modelPath")

                // Release previous resources
                close()

                val modelFile = File(modelPath)
                if (!modelFile.exists()) {
                    return@withContext "Error: El archivo no existe en '$modelPath'. Asegúrate de que la ruta sea correcta."
                }

                if (!modelFile.canRead()) {
                    return@withContext "Error: No se puede leer el archivo. Concede permisos de almacenamiento."
                }

                val sizeMb = modelFile.length() / (1024 * 1024)
                Log.i(TAG, "Loading model: ${modelFile.name} ($sizeMb MB)")

                // Configure LlmInference
                // Note: On A54 (Exynos 1380), MediaPipe automatically selects the best backend.
                val options = LlmInference.LlmInferenceOptions.builder()
                    .setModelPath(modelPath)
                    .setMaxTokens(1024) 
                    .build()

                Log.d(TAG, "Attempting LiteRT LLM initialization...")
                llmInference = LlmInference.createFromOptions(context, options)

                Log.i(TAG, "Gemma 4 E2B-it initialized successfully on Samsung A54")
                "Success: IA Gemma activada (${sizeMb}MB). Motor LiteRT listo."

            } catch (e: Exception) {
                val errorMsg = e.message ?: e.toString()
                Log.e(TAG, "Initialization failed: $errorMsg", e)
                
                if (errorMsg.contains("OpenCL")) {
                    "Error: Fallo en aceleración GPU (OpenCL). Intenta con un modelo compatible con CPU."
                } else if (errorMsg.contains("OutOfMemory")) {
                    "Error: Memoria insuficiente. Cierra otras aplicaciones pesadas."
                } else {
                    "Error al inicializar Gemma: $errorMsg"
                }
            }
        }
    }

    /**
     * Generate a text response.
     */
    suspend fun generateResponse(prompt: String): String? {
        return withContext(Dispatchers.IO) {
            try {
                val inference = llmInference ?: return@withContext "Error: IA no inicializada."

                Log.d(TAG, "Inference started for prompt: ${prompt.take(50)}...")
                val result = inference.generateResponse(prompt)
                Log.d(TAG, "Inference completed.")
                
                result

            } catch (e: Exception) {
                Log.e(TAG, "Generation error", e)
                "Error en la IA: ${e.message}"
            }
        }
    }

    /**
     * Check readiness.
     */
    fun isInitialized(): Boolean = llmInference != null

    /**
     * Cleanup.
     */
    fun close() {
        try {
            llmInference?.close()
            Log.d(TAG, "Gemma resources released")
        } catch (e: Exception) {
            Log.e(TAG, "Error closing", e)
        } finally {
            llmInference = null
        }
    }
}

