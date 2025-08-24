import tempfile
import whisper
import os

MODEL_SIZE = os.environ.get("WHISPER_MODEL", "tiny")
_model = None

def warmup_whisper():
    _load_model()

def _load_model():
    global _model
    if _model is None:
        _model = whisper.load_model(MODEL_SIZE)

def transcribe_whisper(raw_bytes: bytes, filename: str | None = None) -> str:
    _load_model()
    suffix = filename if filename and "." in filename else ".wav"
    with tempfile.NamedTemporaryFile(suffix=suffix, delete=True) as tmp:
        tmp.write(raw_bytes)
        tmp.flush()
        result = _model.transcribe(tmp.name, fp16=False)
    return result.get("text", "").strip()
