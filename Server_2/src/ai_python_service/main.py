from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
from fastapi.responses import StreamingResponse, JSONResponse
import io
import soundfile as sf

from .tts_service import synthesize_tts_wav, warmup_tts
from .stt_service import transcribe_whisper, warmup_whisper
from .sentiment_service import analyze_sentiment, warmup_sentiment

app = FastAPI(title="Local AI Microservice")

class TTSRequest(BaseModel):
    text: str
    speaker: str | None = None
    language: str | None = None
    speed: float | None = 1.0

class SentimentRequest(BaseModel):
    text: str

@app.on_event("startup")
def warmup_models():
    try:
        warmup_tts()
    except Exception:
        pass
    try:
        warmup_whisper()
    except Exception:
        pass
    try:
        warmup_sentiment()
    except Exception:
        pass

@app.post("/tts")
def tts(req: TTSRequest):
    try:
        wav, sr = synthesize_tts_wav(
            req.text,
            speaker=req.speaker,
            language=req.language,
            speed=req.speed or 1.0
        )
        buf = io.BytesIO()
        sf.write(buf, wav, sr, format="WAV")
        buf.seek(0)
        return StreamingResponse(buf, media_type="audio/wav")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/stt")
async def stt(audio: UploadFile = File(...)):
    try:
        data = await audio.read()
        text = transcribe_whisper(data, filename=audio.filename)
        return JSONResponse({"text": text})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/sentiment")
def sentiment(req: SentimentRequest):
    try:
        result = analyze_sentiment(req.text)
        return JSONResponse(result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
