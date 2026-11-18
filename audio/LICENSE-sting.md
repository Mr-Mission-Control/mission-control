# Mission Control launch sting

The files are `mission_control_launch_sting.wav` (48 kHz / 24-bit stereo), `.ogg` (Vorbis q6), and `.mp3` (192 kb/s). Each is 26 s long, at -13.5 LUFS integrated with a -1.0 dBFS peak.

## What it is
This is an original intro made for the Mission Control app. It runs in this order:
- comms-channel hiss with a short beep tone
- wordless radio chatter, made by shaping filtered noise
- a 5-blip countdown
- ignition rumble and a rising sweep
- an original 4-chord synth theme (Dsus2, Bbmaj7, Fadd9, Csus2) with an original arpeggio
- a held D chord and a closing beep

The mood was inspired by Joesef's favorite space songs. It contains **no** melody, lyrics, chord-for-chord progression, or samples from any existing recording, including Knox Hamilton's "Mission Control" and David Bowie's "Space Oddity."

## Sources and license
- Every sound is synthesized from scratch by `make_sting.py` using Python with numpy and scipy (sine and saw oscillators, filtered noise, simple delays). No samples, loops, sound libraries, or AI music services were used.
- The beep tones are plain sine tones at 2525 and 2475 Hz. A pure tone at a frequency can't be copyrighted.
- Created by Lyra Audio-Video Studio for Joesef Franklin Walker (Mr. Mission Control), Nov 18 2026.
- License: **MIT**, the same as the Mission Control app. You may use, modify, and redistribute it under the app's MIT license. To regenerate it, run `python3 make_sting.py`.
