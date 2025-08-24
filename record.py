import sounddevice as sd
from scipy.io.wavfile import write
import sys

# Settings
filename = "my_voice.wav"   # Output file name
duration = 5                # Recording duration in seconds
sample_rate = 44100         # Sample rate (CD quality)

# Check if duration is passed as a command line argument
if len(sys.argv) > 1:
    try:
        duration = float(sys.argv[1])
        print(f"🔄 Duration set to {duration} seconds")
    except ValueError:
        print("❌ Invalid duration value, using default duration of 5 seconds")

print("🎤 Recording... Speak now!")
recording = sd.rec(int(duration * sample_rate), samplerate=sample_rate, channels=1, dtype="int16")

sd.wait()  # Wait until recording is finished
write(filename, sample_rate, recording)  # Save as WAV file
print(f"✅ Recording saved as {filename}")
