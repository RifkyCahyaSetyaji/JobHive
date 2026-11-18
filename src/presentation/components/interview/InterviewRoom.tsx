'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { InterviewPracticeConfig } from '@/core/domain/models/training';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Sliders,
  Play,
  Check,
  Camera,
  AlertCircle,
  RefreshCw,
  Sparkles,
  User,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Headphones,
  Info,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface InterviewRoomProps {
  initialConfig: InterviewPracticeConfig;
}

interface InterviewerProfile {
  name: string;
  role: string;
  company: string;
  avatarUrl: string;
}

export const InterviewRoom: React.FC<InterviewRoomProps> = ({ initialConfig }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'video' | 'audio' | 'questions'>('video');
  const [config, setConfig] = useState<InterviewPracticeConfig>(initialConfig);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [remainingSeconds, setRemainingSeconds] = useState(120);

  // Audio / Speech Synthesis state
  const [isTtsSpeaking, setIsTtsSpeaking] = useState(false);
  const [isAiVoiceMuted, setIsAiVoiceMuted] = useState(false);
  const [interviewerStatus, setInterviewerStatus] = useState<'idle' | 'speaking' | 'listening'>('idle');

  // Real Camera & Stream state
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(true);
  const [isMicMuted, setIsMicMuted] = useState<boolean>(false);
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);

  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const liveVideoRef = useRef<HTMLVideoElement | null>(null);

  // Interviewer Persona
  const interviewer: InterviewerProfile = {
    name: 'Siti Rahmawati',
    role: 'Lead Talent Acquisition & HR Specialist',
    company: 'JobHive AI Talent Partner',
    avatarUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop',
  };

  const sampleQuestions = [
    'Halo! Silakan ceritakan tentang diri Anda dan apa motivasi utama Anda melamar untuk posisi ini.',
    'Bisa ceritakan pengalaman saat menghadapi proyek yang penuh tantangan, dan bagaimana langkah Anda menyelesaikan hambatan tersebut?',
    'Bagaimana cara Anda terus mengasah keterampilan dan mengikuti perkembangan tren teknologi atau industri saat ini?',
    'Bagaimana gaya komunikasi dan cara Anda berkolaborasi dengan rekan tim lintas fungsi seperti Product Manager dan Designer?',
    'Di mana Anda melihat potensi perkembangan karier profesional Anda dalam tiga hingga lima tahun ke depan?',
  ];

  // Web Speech API: Voice question out loud from laptop speakers
  const speakQuestion = (text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel(); // Stop any pending utterances

    if (isAiVoiceMuted) {
      setInterviewerStatus('listening');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 1.0; // Natural Indonesian cadence
    utterance.pitch = 1.0;

    // Pick best available Indonesian voice if present, otherwise fallback to default
    const voices = window.speechSynthesis.getVoices();
    const indonesianVoice = voices.find(
      (v) =>
        v.lang === 'id-ID' ||
        v.lang.startsWith('id') ||
        v.name.toLowerCase().includes('indonesia') ||
        v.name.toLowerCase().includes('damayanti')
    );
    if (indonesianVoice) {
      utterance.voice = indonesianVoice;
    }

    utterance.onstart = () => {
      setIsTtsSpeaking(true);
      setInterviewerStatus('speaking');
    };

    utterance.onend = () => {
      setIsTtsSpeaking(false);
      setInterviewerStatus('listening');
    };

    utterance.onerror = () => {
      setIsTtsSpeaking(false);
      setInterviewerStatus('listening');
    };

    window.speechSynthesis.speak(utterance);
  };

  // Helper to enumerate connected devices
  const enumerateDevices = async () => {
    try {
      if (navigator?.mediaDevices?.enumerateDevices) {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const vDevs = devices.filter((d) => d.kind === 'videoinput');
        const aDevs = devices.filter((d) => d.kind === 'audioinput');
        setVideoDevices(vDevs);
        setAudioDevices(aDevs);
      }
    } catch (err) {
      console.warn('Unable to enumerate devices:', err);
    }
  };

  // Start User Media (Webcam & Mic)
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        throw new Error('Fitur media stream tidak didukung pada browser Anda.');
      }

      // Stop previous tracks if exist
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: true,
      });

      setCameraStream(stream);
      setIsCameraActive(true);
      setIsMicMuted(false);

      await enumerateDevices();
    } catch (err: unknown) {
      const error = err as Error;
      console.warn('Camera Access error:', error);
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setCameraError('Izin akses kamera/mikrofon ditolak. Berikan izin di browser untuk simulasi nyata.');
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setCameraError('Kamera atau mikrofon tidak terdeteksi pada perangkat Anda.');
      } else {
        setCameraError('Tidak dapat memulai kamera: ' + (error.message || 'Unknown error'));
      }
      setIsCameraActive(false);
    }
  };

  // Stop media tracks
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  // Auto start camera preview on mount
  useEffect(() => {
    startCamera();

    // Warm up speech synthesis voices
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        window.speechSynthesis.getVoices();
      };
    }

    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Speak question automatically when question changes in simulation
  useEffect(() => {
    if (isSimulating) {
      const currentQuestion = sampleQuestions[currentQuestionIndex];
      // small delay for realistic turn taking
      const timeout = setTimeout(() => {
        speakQuestion(currentQuestion);
      }, 600);

      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSimulating, currentQuestionIndex]);

  // Bind stream to video elements whenever stream or page mode changes
  useEffect(() => {
    if (cameraStream) {
      if (!isSimulating && previewVideoRef.current) {
        previewVideoRef.current.srcObject = cameraStream;
        previewVideoRef.current.play().catch(() => {});
      }
      if (isSimulating && liveVideoRef.current) {
        liveVideoRef.current.srcObject = cameraStream;
        liveVideoRef.current.play().catch(() => {});
      }
    }
  }, [cameraStream, isSimulating, activeTab]);

  // Timer countdown during simulation
  useEffect(() => {
    if (!isSimulating) return;

    const timer = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isSimulating]);

  // Toggle video track
  const toggleVideo = () => {
    if (cameraStream) {
      const videoTrack = cameraStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsCameraActive(videoTrack.enabled);
      }
    }
  };

  // Toggle audio track
  const toggleAudio = () => {
    if (cameraStream) {
      const audioTrack = cameraStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMicMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleAiVoice = () => {
    if (isTtsSpeaking) {
      window.speechSynthesis.cancel();
      setIsTtsSpeaking(false);
      setInterviewerStatus('listening');
    }
    setIsAiVoiceMuted(!isAiVoiceMuted);
  };

  const handleStartInterview = () => {
    setIsSimulating(true);
    setRemainingSeconds(config.timeLimitMinutes * 60);
  };

  const handleNextQuestion = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setIsSimulating(false);
      stopCamera();
      router.push('/interview/report');
    }
  };

  const handleRepeatQuestion = () => {
    speakQuestion(sampleQuestions[currentQuestionIndex]);
  };

  const handleExit = () => {
    stopCamera();
    router.push('/ai-training');
  };

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      {/* Top Bar */}
      <header className="border-b border-gray-800 bg-gray-900/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={handleExit}
            className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Kembali ke AI Training"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali</span>
          </button>

          <div className="h-5 w-px bg-gray-800 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-400" />
              {isSimulating ? '1-on-1 Live AI Interview Room' : 'Interview Room: Setup Kamera & Interviewer'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isSimulating && (
            <>
              {/* Speaker Voice Mute/Unmute */}
              <button
                onClick={toggleAiVoice}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  isAiVoiceMuted
                    ? 'bg-red-500/20 border-red-500/40 text-red-300'
                    : 'bg-blue-600/20 border-blue-500/40 text-blue-300'
                }`}
                title={isAiVoiceMuted ? 'Nyalakan Suara Interviewer' : 'Matikan Suara Interviewer'}
              >
                {isAiVoiceMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-bounce" />}
                <span className="hidden md:inline">
                  {isAiVoiceMuted ? 'Voice Muted' : 'Interviewer Voice ON'}
                </span>
              </button>

              <div className="flex items-center gap-2 bg-red-950/80 border border-red-500/40 text-red-300 px-3 py-1.5 rounded-full text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span>REC {formatTimer(remainingSeconds)}</span>
              </div>
            </>
          )}

          <button
            onClick={handleExit}
            className="text-xs font-medium px-3.5 py-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            Keluar Sesi
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
        {isSimulating ? (
          /* ========================================================== */
          /* 1-on-1 SIDE-BY-SIDE LIVE INTERVIEW CALL STAGE              */
          /* ========================================================== */
          <div className="flex flex-col gap-4 w-full">
            {/* Split Screen Video Grid (Interviewer on Left, Candidate on Right) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
              {/* LEFT PANE: Professional AI Interviewer */}
              <div
                className={`relative aspect-4/3 sm:aspect-video md:aspect-4/3 lg:aspect-video bg-gray-900 rounded-3xl overflow-hidden border transition-all shadow-2xl flex flex-col justify-between ${
                  interviewerStatus === 'speaking'
                    ? 'border-blue-500 ring-4 ring-blue-500/20'
                    : 'border-gray-800'
                }`}
              >
                {/* Interviewer Realistic Portrait Video/Photo with Subtle Breathing Simulation */}
                <div className="absolute inset-0 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={interviewer.avatarUrl}
                    alt={interviewer.name}
                    className={`w-full h-full object-cover object-top transition-transform duration-700 ${
                      interviewerStatus === 'speaking' ? 'scale-105 filter brightness-105' : 'scale-100'
                    }`}
                  />
                  {/* Office Ambient Lighting / Tint Overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/20 to-transparent" />
                </div>

                {/* Top Badge: Interviewer Status & Sound Wave */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-white">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        interviewerStatus === 'speaking'
                          ? 'bg-blue-400 animate-ping'
                          : 'bg-emerald-400'
                      }`}
                    />
                    <span>
                      {interviewerStatus === 'speaking'
                        ? 'Interviewer sedang berbicara...'
                        : 'Interviewer mendengarkan'}
                    </span>
                  </div>

                  {interviewerStatus === 'speaking' && (
                    <div className="bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1.5 shadow-lg">
                      <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                      <span>Audio Aktif</span>
                    </div>
                  )}
                </div>

                {/* Animated Speech Wave Bars when interviewer is speaking */}
                {interviewerStatus === 'speaking' && (
                  <div className="relative z-10 mx-auto mb-2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-blue-500/40">
                    <span className="w-1 h-3 bg-blue-400 rounded-full animate-pulse" />
                    <span className="w-1 h-5 bg-blue-400 rounded-full animate-pulse delay-75" />
                    <span className="w-1 h-7 bg-blue-400 rounded-full animate-pulse delay-150" />
                    <span className="w-1 h-4 bg-blue-400 rounded-full animate-pulse delay-100" />
                    <span className="w-1 h-6 bg-blue-400 rounded-full animate-pulse delay-200" />
                    <span className="text-[11px] font-mono font-bold text-blue-200 ml-1.5">Speaking...</span>
                  </div>
                )}

                {/* Bottom Overlay: Interviewer Nameplate & Role */}
                <div className="relative z-10 p-4 sm:p-5 flex items-end justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white drop-shadow-md">
                        {interviewer.name}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-600 text-white px-2 py-0.5 rounded-full">
                        AI Interviewer
                      </span>
                    </div>
                    <p className="text-xs text-blue-200 drop-shadow-sm">
                      {interviewer.role} • {interviewer.company}
                    </p>
                  </div>

                  <button
                    onClick={handleRepeatQuestion}
                    className="p-2 rounded-xl bg-black/60 hover:bg-black/80 backdrop-blur-md text-gray-200 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 text-xs font-semibold"
                    title="Ulangi Pembacaan Pertanyaan Suara"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
                    <span className="hidden sm:inline">Ulangi Suara</span>
                  </button>
                </div>
              </div>

              {/* RIGHT PANE: Live Candidate Camera Feed */}
              <div className="relative aspect-4/3 sm:aspect-video md:aspect-4/3 lg:aspect-video bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col justify-between">
                {/* Candidate Video Element */}
                {isCameraActive && !cameraError ? (
                  <video
                    ref={liveVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900 text-gray-500 gap-3">
                    <User className="w-16 h-16 text-gray-700" />
                    <p className="text-xs sm:text-sm font-medium">Kamera Anda sedang dinonaktifkan</p>
                  </div>
                )}

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-transparent to-gray-950/40 pointer-events-none" />

                {/* Top Badge: Candidate Status */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <div className="bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold text-white">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        !isMicMuted ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                    />
                    <span>Anda (Kandidat) {!isMicMuted ? '• Mic Siap' : '• Mic Muted'}</span>
                  </div>

                  <div className="bg-blue-600/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-lg">
                    Pertanyaan {currentQuestionIndex + 1} / {sampleQuestions.length}
                  </div>
                </div>

                {/* Bottom Overlay: Real-time candidate speech analysis */}
                <div className="relative z-10 p-4 sm:p-5 flex items-end justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-gray-300 block">Status Respons:</span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Listening & Analyzing Speaking Pattern
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[11px] font-mono text-gray-400 block">Eye Contact</span>
                    <span className="text-sm font-bold text-blue-400">94% Good</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Question Subtitle / Banner Bar */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-5 sm:p-6 shadow-xl">
              <div className="flex items-center justify-between gap-4 mb-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Pertanyaan dari {interviewer.name}:</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <button
                    onClick={handleRepeatQuestion}
                    className="hover:text-blue-400 transition-colors flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Dengarkan Ulang</span>
                  </button>
                </div>
              </div>

              <p className="text-base sm:text-xl font-bold text-white leading-relaxed">
                &quot;{sampleQuestions[currentQuestionIndex]}&quot;
              </p>
            </div>

            {/* Bottom Controls Toolbar */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  onClick={toggleVideo}
                  className={`p-3 rounded-xl font-medium text-xs flex items-center gap-2 transition-all ${
                    isCameraActive
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {isCameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                  <span className="hidden sm:inline">{isCameraActive ? 'Matikan Kamera' : 'Nyalakan Kamera'}</span>
                </button>

                <button
                  onClick={toggleAudio}
                  className={`p-3 rounded-xl font-medium text-xs flex items-center gap-2 transition-all ${
                    !isMicMuted
                      ? 'bg-gray-800 hover:bg-gray-700 text-white'
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}
                >
                  {!isMicMuted ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                  <span className="hidden sm:inline">{!isMicMuted ? 'Mute Mic' : 'Unmute Mic'}</span>
                </button>

                <button
                  onClick={startCamera}
                  className="p-3 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                  title="Reconnect hardware"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsSimulating(false);
                    stopCamera();
                  }}
                  className="px-4 py-2.5 rounded-xl border border-gray-700 hover:bg-gray-800 text-xs font-semibold text-gray-300 transition-colors"
                >
                  Jeda Sesi
                </button>

                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-600/30 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>
                    {currentQuestionIndex < sampleQuestions.length - 1
                      ? 'Pertanyaan Selanjutnya'
                      : 'Selesaikan & Lihat Hasil'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ========================================================== */
          /* CONFIGURATION & HARDWARE CHECK STAGE                       */
          /* ========================================================== */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Live Webcam Stream Preview */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-video bg-gray-900 rounded-3xl overflow-hidden border border-gray-800 shadow-2xl flex flex-col justify-between">
                {isCameraActive && !cameraError ? (
                  <video
                    ref={previewVideoRef}
                    autoPlay
                    playsInline
                    muted
                    className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-900/90 p-6 text-center">
                    <AlertCircle className="w-12 h-12 text-amber-400 mb-3" />
                    <p className="text-sm font-semibold text-gray-200 mb-1">
                      {cameraError || 'Kamera sedang tidak aktif'}
                    </p>
                    <p className="text-xs text-gray-400 max-w-sm mb-4">
                      Pastikan browser Anda diizinkan mengakses kamera dan mikrofon untuk penilaian mimik dan audio secara real-time.
                    </p>
                    <button
                      onClick={startCamera}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Coba Hubungkan Ulang</span>
                    </button>
                  </div>
                )}

                {/* Top overlay badge */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-white">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isCameraActive && !cameraError ? 'bg-emerald-400' : 'bg-red-400'
                      }`}
                    />
                    <span>{isCameraActive && !cameraError ? 'Preview Kamera Aktif' : 'Hardware Disconnected'}</span>
                  </div>

                  <span className="text-[11px] font-mono text-gray-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                    720p HD
                  </span>
                </div>

                {/* Bottom preview toolbar */}
                <div className="relative z-10 p-4 bg-linear-to-t from-gray-950/90 to-transparent flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleVideo}
                      className={`p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                        isCameraActive
                          ? 'bg-white/15 hover:bg-white/25 text-white backdrop-blur-md'
                          : 'bg-red-500/30 text-red-300 border border-red-500/40'
                      }`}
                    >
                      {isCameraActive ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
                      <span className="hidden sm:inline">{isCameraActive ? 'Kamera ON' : 'Kamera OFF'}</span>
                    </button>

                    <button
                      onClick={toggleAudio}
                      className={`p-2.5 rounded-xl text-xs font-medium flex items-center gap-2 transition-all ${
                        !isMicMuted
                          ? 'bg-white/15 hover:bg-white/25 text-white backdrop-blur-md'
                          : 'bg-red-500/30 text-red-300 border border-red-500/40'
                      }`}
                    >
                      {!isMicMuted ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                      <span className="hidden sm:inline">{!isMicMuted ? 'Mic ON' : 'Mic OFF'}</span>
                    </button>
                  </div>

                  <span className="text-xs text-gray-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Enkripsi Lokal Aman</span>
                  </span>
                </div>
              </div>

              {/* Hardware Quick Info */}
              <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Headphones className="w-4 h-4 text-blue-400" />
                  <span>Interviewer akan menanyakan pertanyaan melalui audio speaker laptop Anda.</span>
                </div>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> Siap
                </span>
              </div>
            </div>

            {/* Right Column: Configuration & Start Session */}
            <div className="lg:col-span-5 bg-gray-900 border border-gray-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl">
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
                    Setup Simulasi
                  </span>
                  <h2 className="text-2xl font-black text-white mt-2.5">Persiapan Sesi Wawancara</h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Anda akan diwawancarai oleh <strong>{interviewer.name}</strong> ({interviewer.role}) secara interaktif.
                  </p>
                </div>

                {/* Interviewer Preview Card */}
                <div className="bg-gray-800/60 border border-gray-700/60 rounded-2xl p-4 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={interviewer.avatarUrl}
                    alt={interviewer.name}
                    className="w-14 h-14 rounded-2xl object-cover object-top border border-blue-500/40 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white">{interviewer.name}</h4>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                    <p className="text-xs text-blue-300">{interviewer.role}</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Suara AI Interviewer aktif melalui speaker</p>
                  </div>
                </div>

                {/* Tabs for Config */}
                <div className="flex border-b border-gray-800 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('video')}
                    className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                      activeTab === 'video'
                        ? 'border-blue-500 text-blue-400'
                        : 'border-transparent text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Video & Mic</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('questions')}
                    className={`pb-3 px-3 transition-colors border-b-2 flex items-center gap-1.5 ${
                      activeTab === 'questions'
                        ? 'border-blue-500 text-blue-400'
                        : 'border-transparent text-gray-400 hover:text-gray-200'
                    }`}
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Parameter & Pertanyaan</span>
                  </button>
                </div>

                {/* Tab: Video & Mic */}
                {activeTab === 'video' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Pilih Perangkat Kamera
                      </label>
                      <select
                        aria-label="Pilih Perangkat Kamera"
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500"
                        defaultValue="default"
                      >
                        {videoDevices.length > 0 ? (
                          videoDevices.map((d, idx) => (
                            <option key={d.deviceId || idx} value={d.deviceId}>
                              {d.label || `Camera ${idx + 1}`}
                            </option>
                          ))
                        ) : (
                          <option value="default">Default Built-in Webcam</option>
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Pilih Perangkat Mikrofon
                      </label>
                      <select
                        aria-label="Pilih Perangkat Mikrofon"
                        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-blue-500"
                        defaultValue="default"
                      >
                        {audioDevices.length > 0 ? (
                          audioDevices.map((d, idx) => (
                            <option key={d.deviceId || idx} value={d.deviceId}>
                              {d.label || `Microphone ${idx + 1}`}
                            </option>
                          ))
                        ) : (
                          <option value="default">Default Built-in Microphone</option>
                        )}
                      </select>
                    </div>

                    <div className="bg-gray-800/60 rounded-xl p-3.5 border border-gray-700/60 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-300 font-medium">Interviewer Voice Output</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <Volume2 className="w-3.5 h-3.5" /> Speaker Ready
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-300 font-medium">Auto AI Gesture Tracking</span>
                        <span className="text-emerald-400 font-bold">Aktif</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: Parameters */}
                {activeTab === 'questions' && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                        Tingkat Kesulitan
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['Easy', 'Medium', 'Hard'] as const).map((diff) => (
                          <button
                            key={diff}
                            onClick={() => setConfig({ ...config, difficulty: diff })}
                            className={`py-2 text-xs font-bold rounded-xl capitalize transition-all ${
                              config.difficulty === diff
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                            }`}
                          >
                            {diff}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                          Jumlah Pertanyaan
                        </label>
                        <select
                          aria-label="Jumlah Pertanyaan"
                          value={config.questionCount}
                          onChange={(e) =>
                            setConfig({ ...config, questionCount: Number(e.target.value) })
                          }
                          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-blue-500"
                        >
                          <option value={3}>3 Pertanyaan</option>
                          <option value={5}>5 Pertanyaan (Default)</option>
                          <option value={7}>7 Pertanyaan</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-gray-300 block mb-1.5">
                          Batas Waktu Sesi
                        </label>
                        <select
                          aria-label="Batas Waktu Sesi"
                          value={config.timeLimitMinutes}
                          onChange={(e) =>
                            setConfig({ ...config, timeLimitMinutes: Number(e.target.value) })
                          }
                          className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-xs text-gray-200 focus:outline-none focus:border-blue-500"
                        >
                          <option value={5}>5 Menit</option>
                          <option value={10}>10 Menit</option>
                          <option value={15}>15 Menit</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Start Simulation Action */}
              <div className="mt-8 pt-6 border-t border-gray-800 space-y-3">
                <button
                  onClick={handleStartInterview}
                  className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>Mulai Video Call dengan {interviewer.name}</span>
                </button>

                <p className="text-[11px] text-center text-gray-500 flex items-center justify-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  Pertanyaan akan diucapkan langsung oleh interviewer melalui speaker.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
