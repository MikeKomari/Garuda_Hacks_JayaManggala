import { useState, useRef } from "react";
import CloseAudio from "@/components/ui/CloseAudio";
import Toast from "@/components/ui/Toast";
import SpeakerButton from "@/components/ui/SpeakerButton";
import Card from "@/components/ui/ListenRepeat/Card";
import Mic from "@/components/ui/ListenRepeat/Mic";
import toast, { Toaster } from "react-hot-toast";
import useVocalCheck from "@/hooks/useVocalCheck";

const originalText = "Matur nuwun sanget sampun mbantu kula.";

const ListenRepeat = () => {
  const [showToast, setShowToast] = useState(false);
  const [isCorrect] = useState(true);
  const [comment, setComment] = useState<string>("");
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );

  const { vocalCheck, isLoading } = useVocalCheck();
  const [score, setScore] = useState<number | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingRef = useRef(false);
  const handleAudioClick = () => {
    const audio = new Audio("/voice/maturNuwun.mp3");
    audio.play().catch((err) => {
      console.error("Audio playback failed:", err);
    });
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleMicClick = async () => {
    if (!isRecording) {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        audioChunksRef.current = [];
        recordingRef.current = true;
        recorder.ondataavailable = (e) => {
          audioChunksRef.current.push(e.data);
        };
        recorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });
          if (audioBlob.size > 0) {
            // Call vocalCheck and pass audioBlob and originalText
            try {
              const audioFile = new File([audioBlob], "recording.webm", {
                type: "audio/webm",
              });
              const dataFromAPI = await vocalCheck({
                audio: audioFile,
                originalText,
              });

              const inner = JSON.parse(dataFromAPI.data);
              // setOutput();
              const scoreGot = inner.score;
              setScore(scoreGot);
              setComment(inner.comments);

              setShowToast(true);
              setIsRecording(false);
            } catch (err) {
              toast.error("Vocal check failed.");
            }
          } else {
            toast.error("No audio recorded.");
          }
        };
        recorder.start();
        setIsRecording(true);
      } catch {
        toast.error("Microphone access denied or not available.");
        return;
      }
    } else {
      // Stop recording
      if (mediaRecorder && recordingRef.current) {
        setIsRecording(false);
        recordingRef.current = false;
        mediaRecorder.stop();
      }
    }
  };

  return (
    <>
      <Toaster />
      {isLoading && (
        <div className="fixed inset-0 bg-darkGrayBgColor opacity-30 flex items-center justify-center z-50 pointer-events-none">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#FF651D]"></div>
        </div>
      )}
      <div className="flex flex-col min-h-screen pt-20 px-6 relative">
        <div className="flex justify-between items-center">
          <CloseAudio onClick={() => {}} />
          <div className="px-4 py-3 flex items-center justify-center gap-2 border-mainBgColor border-3 rounded-2xl">
            <img src={"/assets/heart.svg"} alt="Heart" />
            <p className="font-bold text-xl text-grayBgColor">5</p>
          </div>
        </div>
        <div className="relative w-full max-w-2xl mt-4">
          <div className="absolute top-1 left-0 w-full h-10 bg-gray-300 z-0 rounded-sm" />
          <div className="relative z-10 bg-white border border-gray-400 h-10 rounded-sm">
            <div className="h-full px-2 py-2">
              <div className="bg-orange-500 h-full animate-pulse rounded" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="font-bold text-2xl pt-4">Listen and Repeat!</h2>
        </div>
        <div className="flex justify-baseline items-center w-full pt-4">
          <div onClick={handleAudioClick} className="cursor-pointer mb-6">
            <SpeakerButton iconSrc="/assets/Speaker.svg" />
          </div>
          <div>
            <Card
              outerColor="#C1C1C1"
              innerColor="#F7F0EB"
              label={originalText}
            />
          </div>
        </div>
        <div className="mt-[6rem] flex justify-center items-center w-full">
          <Mic
            onClick={handleMicClick}
            outerColor={isRecording ? "#FF651D" : "#003257"}
            innerColor={isRecording ? "#FFB88C" : "#004E89"}
          />
        </div>

        {score && score >= 60 ? (
          <Toast
            isVisible={showToast}
            isCorrect={true}
            correctAnswer={comment}
            onClose={handleCloseToast}
            speaking={true}
          />
        ) : (
          <Toast
            isVisible={showToast}
            isCorrect={false}
            correctAnswer={comment}
            onClose={handleCloseToast}
            speaking={false}
          />
        )}
      </div>
    </>
  );
};
export default ListenRepeat;
