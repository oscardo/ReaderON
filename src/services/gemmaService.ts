import { registerPlugin } from '@capacitor/core';

/**
 * Interface for the native Gemma Capacitor Plugin.
 * Version 0.0.1 feature 0.0.26
 */
export interface GemmaPlugin {
  /** Loads the model from the given local file path. */
  initialize(options: { modelPath: string }): Promise<{ status: string }>;
  /** Generates a text response for the given prompt. */
  generateResponse(options: { prompt: string }): Promise<{ value: string }>;
  /** Returns whether the model is currently loaded. */
  isInitialized(): Promise<{ value: boolean }>;
}

// Register the native bridge
const GemmaNative = registerPlugin<GemmaPlugin>('Gemma');

/**
 * High-level service for interacting with on-device Gemma 4 E2B-it.
 *
 * USAGE:
 *   1. Call gemmaService.init('/sdcard/Download/gemma4-e2b-it.bin') once.
 *   2. Then call gemmaService.ask('your prompt') for any feature.
 *
 * The model file must be accessible on the device storage.
 * Tip: Place it in /sdcard/Download/ and grant MANAGE_EXTERNAL_STORAGE.
 */
export const gemmaService = {

  /**
   * Initialize Gemma with the model file path.
   * @param modelPath Full absolute path on the Android device, e.g.:
   *   /sdcard/Download/gemma4-e2b-it.bin
   * @returns Status message from native layer.
   */
  async init(modelPath: string): Promise<string> {
    try {
      const result = await GemmaNative.initialize({ modelPath });
      console.log('[GemmaService] Initialized:', result.status);
      return result.status;
    } catch (error: any) {
      const msg = error?.message || String(error);
      console.error('[GemmaService] Init error:', msg);
      return `Error: ${msg}`;
    }
  },

  /**
   * Send a prompt to Gemma and receive a response.
   * @param prompt The text prompt to send.
   * @returns The generated response text.
   */
  async ask(prompt: string): Promise<string> {
    try {
      const result = await GemmaNative.generateResponse({ prompt });
      return result.value;
    } catch (error: any) {
      const msg = error?.message || String(error);
      console.error('[GemmaService] Generation error:', msg);
      return `Error: ${msg}`;
    }
  },

  /**
   * Check if Gemma is loaded and ready to use.
   * @returns true if the model is initialized.
   */
  async isReady(): Promise<boolean> {
    try {
      const result = await GemmaNative.isInitialized();
      return result.value;
    } catch {
      return false;
    }
  }
};
