import os
import tempfile

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Mozi API")

# Frontend (vite) ko backend call karne dene ke liye
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------------------------------
# Whisper model: pehli request pe load hoga (lazy), taaki server jaldi start ho
# ------------------------------------------------------------
_model = None


def get_model():
    global _model
    if _model is None:
        from faster_whisper import WhisperModel

        # "tiny" / "base" / "small" -- CPU pe "base" theek rehta hai
        _model = WhisperModel("base", device="cpu", compute_type="int8")
    return _model


# ------------------------------------------------------------
# Dummy data (frontend ke App.jsx wale sample data jaisa shape)
# Baad mein isko database se replace karna
# ------------------------------------------------------------
DASHBOARD = {
    "user": {"name": "Shreya", "profileImage": None},
    "skills": [
        {"name": "Articulation", "description": "Improve speech sounds", "exercises": 20, "color": "#FF6B4A", "bg": "#FFE8E0"},
        {"name": "Pronunciation", "description": "Speak words clearly", "exercises": 10, "color": "#1F9E96", "bg": "#E1F3F1"},
        {"name": "Vocabulary", "description": "Build your word bank", "exercises": 24, "color": "#C9890F", "bg": "#FDF1DC"},
        {"name": "Fluency", "description": "Speak with confidence", "exercises": 8, "color": "#B5467A", "bg": "#F8E6EF"},
    ],
    "recentExercises": [
        {"name": "Sound Practice", "subtitle": "/R/ Sound", "duration": "8 min", "progress": 100, "skill": "Articulation"},
        {"name": "Word Builder", "subtitle": "Everyday Words", "duration": "10 min", "progress": 70, "skill": "Vocabulary"},
        {"name": "Speak & Repeat", "subtitle": "Sentence Practice", "duration": "7 min", "progress": 45, "skill": "Fluency"},
    ],
    "streakDays": 9,
    "dailyGoal": {"completedMinutes": 18, "targetMinutes": 20},
    "badgeProgress": {"completed": 2, "needed": 5, "name": "Practice Star"},
}


@app.get("/")
def root():
    return {"status": "ok", "app": "Mozi API"}


@app.get("/api/dashboard")
def dashboard():
    return DASHBOARD


@app.post("/api/transcribe")
async def transcribe(audio: UploadFile = File(...)):
    """Browser se aayi audio (webm/wav/mp3) ko text mein badalta hai."""
    suffix = os.path.splitext(audio.filename or "")[1] or ".webm"
    with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
        tmp.write(await audio.read())
        path = tmp.name

    try:
        segments, info = get_model().transcribe(path)
        text = " ".join(seg.text.strip() for seg in segments)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription failed: {e}")
    finally:
        os.remove(path)

    return {"text": text, "language": info.language}
