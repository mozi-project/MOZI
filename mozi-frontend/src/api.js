const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export async function fetchDashboard() {
  const res = await fetch(`${API_URL}/api/dashboard`);
  if (!res.ok) throw new Error("Dashboard load nahi hua");
  return res.json();
}

export async function transcribeAudio(blob) {
  const form = new FormData();
  form.append("audio", blob, "speech.webm");
  const res = await fetch(`${API_URL}/api/transcribe`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error("Transcription fail ho gaya");
  return res.json(); // { text, language }
}

// Mic recorder: const rec = await startRecording(); ... const blob = await rec.stop();
export async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const recorder = new MediaRecorder(stream);
  const chunks = [];
  recorder.ondataavailable = (e) => chunks.push(e.data);
  recorder.start();

  return {
    stop: () =>
      new Promise((resolve) => {
        recorder.onstop = () => {
          stream.getTracks().forEach((t) => t.stop());
          resolve(new Blob(chunks, { type: "audio/webm" }));
        };
        recorder.stop();
      }),
  };
}
