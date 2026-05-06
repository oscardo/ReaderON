import React from 'react';
import { motion } from 'motion/react';
import { Camera, RotateCcw, X, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import ReactCrop, { type Crop } from 'react-image-crop';

interface CaptureSectionProps {
  showCropper: boolean;
  cropImageSrc: string;
  crop: Crop;
  setCrop: (crop: Crop) => void;
  onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  onCropComplete: (crop: any) => void;
  onCancelCrop: () => void;
  onConfirmCrop: () => void;
  isProcessing: boolean;
  statusMessage: string;
  onStartPractice: () => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleCapture: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBack: () => void;
}

export const CaptureSection: React.FC<CaptureSectionProps> = ({
  showCropper,
  cropImageSrc,
  crop,
  setCrop,
  onImageLoad,
  onCropComplete,
  onCancelCrop,
  onConfirmCrop,
  isProcessing,
  statusMessage,
  onStartPractice,
  fileInputRef,
  handleCapture,
  onBack
}) => {
  if (showCropper) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-slate-900 z-[200] flex flex-col"
      >
        <div className="flex-1 overflow-auto flex items-center justify-center p-4">
          <ReactCrop 
            crop={crop} 
            onChange={(c) => setCrop(c)} 
            onComplete={onCropComplete}
            className="max-h-full"
          >
            <img 
              src={cropImageSrc} 
              onLoad={onImageLoad} 
              alt="To crop" 
              className="max-h-[80vh] object-contain"
            />
          </ReactCrop>
        </div>
        
        <div className="bg-white/10 backdrop-blur-2xl p-8 flex gap-4 shrink-0">
          <button 
            onClick={onCancelCrop}
            className="flex-1 py-5 bg-white/10 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all"
          >
            CANCEL
          </button>
          <button 
            onClick={onConfirmCrop}
            className="flex-2 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-500/20"
          >
            CONFIRM CROP
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center space-y-12 py-20"
    >
      <div className="relative">
        <div className="w-32 h-32 rounded-[3rem] bg-indigo-600 flex items-center justify-center text-white shadow-2xl shadow-indigo-200 animate-pulse">
          <Camera size={48} strokeWidth={2.5} />
        </div>
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-indigo-600">
          <Sparkles size={24} />
        </div>
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Ready to Scan?</h2>
        <p className="text-slate-500 font-medium max-w-xs mx-auto leading-relaxed">
          Position your camera directly over the text. Good lighting ensures perfect analysis.
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStartPractice}
          disabled={isProcessing}
          className="w-full py-6 bg-slate-900 text-white rounded-[2.5rem] font-black text-sm uppercase tracking-widest shadow-2xl flex items-center justify-center gap-4 group"
        >
          {isProcessing ? (
            <>
              <Loader2 size={24} className="animate-spin text-indigo-400" />
              <span>PROCESSING...</span>
            </>
          ) : (
            <>
              <Camera size={24} />
              <span>OPEN CAMERA</span>
            </>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleCapture} />
        </motion.button>

        <button 
          onClick={onBack}
          className="w-full py-5 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] hover:text-slate-600 transition-colors"
        >
          OR RETURN TO HOME
        </button>
      </div>

      {isProcessing && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-indigo-50 border border-indigo-100 p-6 rounded-[2.5rem] flex items-center gap-4 max-w-sm"
        >
          <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-sm">
             <AlertCircle size={20} />
          </div>
          <p className="text-xs font-bold text-indigo-700 leading-tight">
            {statusMessage || "Analyzing text structure and pronunciation patterns..."}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};
