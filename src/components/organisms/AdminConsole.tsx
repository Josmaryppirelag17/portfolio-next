"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Terminal,
  Shield,
  Lock,
  CheckCircle2,
  Users,
  Database,
  Clock,
  RefreshCw,
  Trash2,
  Loader2,
} from "lucide-react";
import { soundEngine } from "./SoundEngine";
import {
  type CyberMessage,
  CYBER_MESSAGES_EVENT,
  clearUserCyberMessages,
  getAdminDisplayMessages,
  hasUserCyberMessages,
  loadCyberMessages,
} from "@utils/cyberMessages";
import { trapTabFocus } from "@utils/focusTrap";

interface AdminConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

const ADMIN_CREDENTIALS = { username: "guest", password: "guest" } as const;
const MAX_LOGIN_ATTEMPTS = 5;
const LOGIN_LOCKOUT_MS = 15_000;

export default function AdminConsole({ isOpen, onClose }: AdminConsoleProps) {
  const consoleRef = useRef<HTMLDivElement>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [messages, setMessages] = useState<CyberMessage[]>([]);
  const [activeTab, setActiveTab] = useState<"STATISTICS" | "DB_MESSAGES">(
    "STATISTICS"
  );
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [usingDemoData, setUsingDemoData] = useState(true);
  const [loginLocked, setLoginLocked] = useState(false);

  const loginAttemptsRef = useRef<{ count: number; lockedAt: number }>({ count: 0, lockedAt: 0 });

  const [visitorCount, setVisitorCount] = useState(4821);
  const [latency, setLatency] = useState(24);
  const [cpuUsage, setCpuUsage] = useState(14);

  const refreshMessages = useCallback(() => {
    setMessages(getAdminDisplayMessages());
    setUsingDemoData(!hasUserCyberMessages());
  }, []);

  useEffect(() => {
    if (!loginLocked) return;
    const id = setTimeout(() => {
      loginAttemptsRef.current = { count: 0, lockedAt: 0 };
      setLoginLocked(false);
    }, LOGIN_LOCKOUT_MS);
    return () => clearTimeout(id);
  }, [loginLocked]);

  useEffect(() => {
    if (!isOpen) return;
    const sync = () => {
      setMessages(getAdminDisplayMessages());
      setUsingDemoData(!hasUserCyberMessages());
    };
    sync();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "cyber_messages") sync();
    };
    const onCustom = () => sync();
    window.addEventListener("storage", onStorage);
    window.addEventListener(CYBER_MESSAGES_EVENT, onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(CYBER_MESSAGES_EVENT, onCustom);
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setUsername("");
    setPassword("");
    setErrorMsg("");
    setIsLogged(false);
    soundEngine.playClick();
    onClose();
  }, [onClose]);

  // Keyboard: Escape to close, 1/2 for tab switching, focus trap
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
        return;
      }
      if (isLogged) {
        if (e.key === "1") setActiveTab("STATISTICS");
        if (e.key === "2") { setActiveTab("DB_MESSAGES"); refreshMessages(); }
      }
      if (e.key === "Tab") {
        trapTabFocus(e, consoleRef);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    const closeBtn = consoleRef.current?.querySelector<HTMLElement>('button');
    closeBtn?.focus();
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, isLogged, handleClose, refreshMessages]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginLocked) return;
    setErrorMsg("");
    setIsLoggingIn(true);
    setTimeout(() => {
      if (
        username.trim().toLowerCase() === ADMIN_CREDENTIALS.username &&
        password.trim() === ADMIN_CREDENTIALS.password
      ) {
        loginAttemptsRef.current = { count: 0, lockedAt: 0 };
        setIsLogged(true);
        setErrorMsg("");
        setIsLoggingIn(false);
        soundEngine.playSuccess();
        refreshMessages();
      } else {
        loginAttemptsRef.current.count += 1;
        const remaining = MAX_LOGIN_ATTEMPTS - loginAttemptsRef.current.count;
        if (loginAttemptsRef.current.count >= MAX_LOGIN_ATTEMPTS) {
          loginAttemptsRef.current.lockedAt = Date.now();
          setLoginLocked(true);
          setErrorMsg(`ACCESS LOCKED: TOO MANY ATTEMPTS. COOLDOWN ${LOGIN_LOCKOUT_MS / 1000}s.`);
        } else {
          setErrorMsg(`ACCESS DENIED: INVALID KEYWORDS (${remaining} attempt${remaining === 1 ? "" : "s"} remaining)`);
        }
        setIsLoggingIn(false);
        soundEngine.playError();
      }
    }, 600);
  };

  const clearUserMessages = () => {
    clearUserCyberMessages();
    refreshMessages();
    soundEngine.playSuccess();
  };

  const triggerTelemetryReload = () => {
    setIsRefreshing(true);
    soundEngine.playClick();
    setTimeout(() => {
      setLatency(Math.floor(Math.random() * 18) + 12);
      setCpuUsage(Math.floor(Math.random() * 25) + 8);
      setVisitorCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
      setIsRefreshing(false);
      soundEngine.playSuccess();
    }, 800);
  };

  const userMessageCount = loadCyberMessages().length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        ref={consoleRef}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-2xl bg-[#111232] border-4 border-[#111232] rounded-xl overflow-hidden shadow-[0_0_35px_rgba(253,30,177,0.3)] text-left neo-brutal-border-pink"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-console-title"
      >
        <div className="absolute inset-0 crt-overlay pointer-events-none opacity-20" />

        <div className="flex items-center justify-between border-b border-brand-pink/30 bg-black/40 px-5 py-3.5 relative z-10">
          <div className="flex items-center space-x-2.5">
            <Shield className="text-brand-pink shrink-0 animate-pulse" size={16} />
            <span
              id="admin-console-title"
              className="font-mono text-xs text-brand-pink font-extrabold tracking-widest uppercase"
            >
              [ ACCESS_DECK: RESTRICTED_GATEWAY ]
            </span>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="font-mono text-[10px] text-brand-pale hover:text-brand-pink transition-colors bg-brand-bg px-2 py-0.5 rounded border border-brand-pale/10 cursor-pointer"
          >
            [ DISCONNECT ]
          </button>
        </div>

        <div className="p-6 relative z-10">
          <AnimatePresence mode="wait">
            {!isLogged ? (
              <motion.form
                key="login-view"
                onSubmit={handleLogin}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-5"
              >
                <div className="p-4 bg-brand-bg/95 rounded border border-red-500/20 text-center space-y-2">
                  <div className="flex justify-center space-x-1.5 text-brand-pink">
                    <Lock size={18} className="animate-bounce" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-widest">
                      CREDENTIALS REQUIRED
                    </span>
                  </div>
                  <p className="font-sans text-xs text-brand-pale/80 leading-relaxed max-w-md mx-auto">
                    Local simulation panel. Real form messages are persisted
                    in <code className="text-brand-cyan">localStorage</code>{" "}
                    under key <code className="text-brand-cyan">cyber_messages</code>.
                    Demo credentials: <strong className="text-white">guest</strong> /{" "}
                    <strong className="text-white">guest</strong>.
                  </p>
                </div>

                <div className="space-y-4 max-w-sm mx-auto">
                  <div className="space-y-1">
                    <label
                      htmlFor="admin-username"
                      className="block font-mono text-[9px] text-[#18BEC7] uppercase tracking-wider"
                    >
                      CODENAME_PARAMETER:
                    </label>
                    <input
                      id="admin-username"
                      type="text"
                      required
                      autoComplete="username"
                      placeholder="e.g. guest"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-brand-bg border border-brand-pale/20 rounded px-3 py-2 text-sm font-mono text-brand-pale focus:border-brand-pink focus:outline-none placeholder-brand-pale/20 text-left"
                    />
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="admin-password"
                      className="block font-mono text-[9px] text-[#18BEC7] uppercase tracking-wider"
                    >
                      DECRYPTION_SECRET:
                    </label>
                    <input
                      id="admin-password"
                      type="password"
                      required
                      autoComplete="current-password"
                      placeholder="e.g. guest"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-brand-bg border border-brand-pale/20 rounded px-3 py-2 text-sm font-mono text-brand-pale focus:border-brand-pink focus:outline-none placeholder-brand-pale/20 text-left"
                    />
                  </div>

                  {errorMsg && (
                    <div
                      className="text-[10px] font-mono font-bold text-red-400 text-center animate-pulse"
                      role="alert"
                    >
                      ⚠️ {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoggingIn || loginLocked}
                    className={`w-full py-3 transition-all font-display text-xs tracking-wider uppercase font-extrabold neo-brutal-border flex items-center justify-center space-x-2 cursor-pointer ${
                      isLoggingIn || loginLocked
                        ? "bg-brand-pale/20 text-brand-pale/50 cursor-not-allowed"
                        : "bg-brand-pink text-white hover:bg-brand-lime hover:text-brand-bg"
                    }`}
                  >
                    {isLoggingIn ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>AUTHORIZING_ACCESS...</span>
                      </>
                    ) : (
                      <>
                        <Terminal size={14} />
                        <span>AUTHORIZE_ACCESS()</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="dashboard-view"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between p-3 bg-brand-lime/10 border border-brand-lime/20 rounded-md">
                  <div className="flex items-center space-x-2 text-brand-lime">
                    <CheckCircle2 size={15} />
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest">
                      DECRYPTION KEY ACCEPTED // GATEWAY OPEN
                    </span>
                  </div>
                  <span className="font-mono text-[8px] text-brand-pale/50 uppercase">
                    {usingDemoData ? "DEMO_SEED_ACTIVE" : `${userMessageCount} LIVE_RECORDS`}
                  </span>
                </div>

                <div className="flex border-b border-brand-pale/15 pb-2 justify-start space-x-4">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("STATISTICS");
                      soundEngine.playClick();
                    }}
                    className={`font-mono text-xs uppercase tracking-wider pb-1.5 px-1 border-b-2 transition-all cursor-pointer ${
                      activeTab === "STATISTICS"
                        ? "text-brand-cyan border-brand-cyan font-bold"
                        : "text-brand-pale/50 border-transparent hover:text-brand-pale"
                    }`}
                  >
                    [ LIVE_METRICS.SYS ]
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("DB_MESSAGES");
                      soundEngine.playClick();
                      refreshMessages();
                    }}
                    className={`font-mono text-xs uppercase tracking-wider pb-1.5 px-1 border-b-2 transition-all cursor-pointer ${
                      activeTab === "DB_MESSAGES"
                        ? "text-brand-pink border-brand-pink font-bold"
                        : "text-brand-pale/50 border-transparent hover:text-brand-pale"
                    }`}
                  >
                    [ CONTACT_DATABASE.DAT ] ({messages.length})
                  </button>
                </div>

                <div className="min-h-[250px] overflow-y-auto max-h-[350px] pr-2">
                  <AnimatePresence mode="wait">
                    {activeTab === "STATISTICS" ? (
                      <motion.div
                        key="stats-tab"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-5"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-3.5 bg-brand-bg rounded border border-brand-cyan/25 flex flex-col justify-between">
                            <span className="font-mono text-[8.5px] text-brand-cyan uppercase tracking-wider flex items-center space-x-1.5 mb-1">
                              <Users size={11} />
                              <span>TOTAL_ESTIMATED_VISITORS</span>
                            </span>
                            <div className="font-display font-medium text-2xl text-[#DBEAEC]">
                              {visitorCount}{" "}
                              <span className="text-[10px] text-brand-lime font-mono">
                                LIVE_UPDATES
                              </span>
                            </div>
                          </div>

                          <div className="p-3.5 bg-brand-bg rounded border border-brand-pink/25 flex flex-col justify-between">
                            <span className="font-mono text-[8.5px] text-brand-pink uppercase tracking-wider flex items-center space-x-1.5 mb-1">
                              <Database size={11} />
                              <span>DB_QUERY_LATENCY</span>
                            </span>
                            <div className="font-display font-medium text-2xl text-[#DBEAEC] font-mono">
                              {latency}{" "}
                              <span className="text-[10px] text-brand-pale/50">ms</span>
                            </div>
                          </div>

                          <div className="p-3.5 bg-brand-bg rounded border border-brand-lime/25 flex flex-col justify-between">
                            <span className="font-mono text-[8.5px] text-brand-lime uppercase tracking-wider flex items-center space-x-1.5 mb-1">
                              <Clock size={11} />
                              <span>VIRTUAL_CPU_VECTORS</span>
                            </span>
                            <div className="font-display font-medium text-2xl text-[#DBEAEC] font-mono">
                              {cpuUsage}%{" "}
                              <span className="text-[10px] text-brand-pale/50">THREAD</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-brand-bg/50 border border-brand-pale/10 rounded-lg space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-mono text-[10px] text-brand-cyan uppercase tracking-wider">
                              DIAGNOSTIC_HEALTH_CHECKS:
                            </h4>
                            <button
                              type="button"
                              onClick={triggerTelemetryReload}
                              disabled={isRefreshing}
                              className="font-mono text-[9px] text-[#111232] font-semibold bg-[#DBEAEC] px-2.5 py-1 rounded hover:bg-brand-lime transition-all flex items-center space-x-1.5 cursor-pointer"
                            >
                              <RefreshCw
                                size={10}
                                className={isRefreshing ? "animate-spin" : ""}
                              />
                              <span>
                                {isRefreshing ? "POLLING..." : "REFRESH_INTEGRITY"}
                              </span>
                            </button>
                          </div>

                          <div className="font-mono text-[9.5px] text-brand-pale/70 leading-relaxed bg-[#08091f] p-3 rounded space-y-1">
                            <div>
                              [LOCAL_STORAGE]: cyber_messages →{" "}
                              <span className="text-brand-lime">
                                {userMessageCount} user record(s)
                              </span>
                            </div>
                            <div>
                              [STABILITY]: paracas_integrity_daemon...{" "}
                              <span className="text-brand-lime">STATUS_STABLE</span>
                            </div>
                            <div>
                              [NETWORK]: Ingress pipeline...{" "}
                              <span className="text-brand-lime">PASSING_HEALTHY</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="messages-tab"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-4"
                      >
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="font-mono text-[9px] text-brand-pale/50 uppercase tracking-widest">
                            {usingDemoData
                              ? "DEMO MODE — submit a message from the contact form to replace"
                              : "REGISTROS REALES (localStorage + Neon en servidor)"}
                          </span>
                          {!usingDemoData && (
                            <button
                              type="button"
                              onClick={clearUserMessages}
                              className="font-mono text-[8.5px] text-red-400 hover:text-red-300 transition-colors flex items-center space-x-1 border border-red-500/20 px-2 py-0.5 rounded cursor-pointer"
                            >
                              <Trash2 size={11} />
                              <span>CLEAR_USER_LOGS</span>
                            </button>
                          )}
                        </div>

                        <div className="space-y-3">
                          {messages.map((msg, index) => (
                            <div
                              key={msg.id}
                              className="p-4 bg-brand-bg rounded-lg border border-brand-pale/10 space-y-2.5 relative overflow-hidden"
                            >
                              <div className="absolute top-0 bottom-0 left-0 w-1 bg-brand-pink" />

                              <div className="flex justify-between items-center text-[10px] font-mono border-b border-brand-pale/5 pb-1.5">
                                <div className="space-x-1">
                                  <span className="text-brand-lime font-bold">
                                    NODE_{index + 1}:
                                  </span>
                                  <span className="text-[#DBEAEC] font-semibold">
                                    {msg.name}
                                  </span>
                                  <span className="text-brand-pale/50">
                                    &lt;{msg.email}&gt;
                                  </span>
                                </div>
                                <span className="text-brand-pale/50 uppercase text-[8.5px]">
                                  {msg.timestamp}
                                </span>
                              </div>

                              <p className="font-sans text-xs text-brand-pale/90 leading-relaxed text-left">
                                {msg.message}
                              </p>

                              <div className="flex justify-between items-center border-t border-brand-pale/5 pt-1.5 text-[8.5px] font-mono text-brand-pale/50">
                                <span>DB_INDEX_KEY: {msg.id}.record</span>
                                <span className="text-brand-cyan uppercase">
                                  {msg.id.startsWith("demo_")
                                    ? "DEMO_SEED"
                                    : "TRANS_OK_SECURE"}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex justify-between items-center border-t border-brand-pale/15 pt-5 text-[9px] font-mono text-brand-pale/50 uppercase">
                  <span>OPERATIONAL: JOSMARY_CLUSTER_PORTFOLIO</span>
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogged(false);
                      soundEngine.playClick();
                    }}
                    className="text-brand-pink hover:underline cursor-pointer"
                  >
                    LOCK_TERMINAL
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
