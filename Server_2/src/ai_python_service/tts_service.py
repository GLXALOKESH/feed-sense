from TTS.api import TTS
import numpy as np
import torch
import os

MODEL_NAME = os.environ.get("TTS_MODEL", "tts_models/en/ljspeech/tacotron2-DDC")

_tts = None
_device = "cuda" if torch.cuda.is_available() else "cpu"

def warmup_tts():
    _load_tts()
    _ = synthesize_tts_wav("Warmup completed.", speed=1.0)

def _load_tts():
    global _tts
    if _tts is None:
        _tts = TTS(MODEL_NAME).to(_device)

def synthesize_tts_wav(text: str, speaker: str | None = None, language: str | None = None, speed: float = 1.0):
    _load_tts()
    wav = _tts.tts(text=text, speaker=speaker, language=language, speed=speed)
    wav = np.asarray(wav, dtype=np.float32)
    sr = getattr(getattr(_tts, "synthesizer", None), "output_sample_rate", 22050)
    return wav, sr
