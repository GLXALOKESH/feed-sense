from transformers import pipeline
import os

MODEL_NAME = os.environ.get("SENTIMENT_MODEL", "distilbert-base-uncased-finetuned-sst-2-english")
_clf = None

def warmup_sentiment():
    _load_pipeline()
    _ = analyze_sentiment("Warmup completed.")

def _load_pipeline():
    global _clf
    if _clf is None:
        _clf = pipeline("sentiment-analysis", model=MODEL_NAME, device=-1)

def analyze_sentiment(text: str):
    _load_pipeline()
    out = _clf(text)[0]
    return {"label": out["label"], "score": float(out["score"])}
