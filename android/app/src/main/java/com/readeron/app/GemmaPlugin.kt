package com.readeron.app

import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

/**
 * Capacitor Plugin bridge for Gemma AI.
 * Exposes initialize, generateResponse, and isInitialized to the JS layer.
 * Version 0.0.1 feature 0.0.26
 */
@CapacitorPlugin(name = "Gemma")
class GemmaPlugin : Plugin() {

    private val scope = CoroutineScope(Dispatchers.Main)
    private lateinit var gemmaManager: GemmaInferenceManager

    override fun load() {
        gemmaManager = GemmaInferenceManager.getInstance(context)
    }

    /** Initializes the Gemma model from the given path. */
    @PluginMethod
    fun initialize(call: PluginCall) {
        val modelPath = call.getString("modelPath") ?: run {
            call.reject("modelPath is required")
            return
        }

        scope.launch {
            val status = gemmaManager.initLlm(modelPath)
            if (status.startsWith("Success")) {
                val ret = JSObject()
                ret.put("status", status)
                call.resolve(ret)
            } else {
                call.reject(status)
            }
        }
    }

    /** Generates a response using the loaded Gemma model. */
    @PluginMethod
    fun generateResponse(call: PluginCall) {
        val prompt = call.getString("prompt") ?: run {
            call.reject("prompt is required")
            return
        }

        if (!gemmaManager.isInitialized()) {
            call.reject("Gemma not initialized. Call initialize() first with the model path.")
            return
        }

        scope.launch {
            val response = gemmaManager.generateResponse(prompt)
            if (response != null) {
                val ret = JSObject()
                ret.put("value", response)
                call.resolve(ret)
            } else {
                call.reject("Gemma failed to generate a response. Check Logcat: GemmaInference")
            }
        }
    }

    /** Returns whether the Gemma model is currently loaded. */
    @PluginMethod
    fun isInitialized(call: PluginCall) {
        val ret = JSObject()
        ret.put("value", gemmaManager.isInitialized())
        call.resolve(ret)
    }
}
