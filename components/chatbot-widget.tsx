"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Message {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

const QUICK_REPLIES = [
  "What services do you offer?",
  "How does the process work?",
  "How much does it cost?",
];

const MIN_W = 320;
const MAX_W = 700;
const WIN_H = 520;
const INIT_W = 360;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(Math.max(v, lo), hi);

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Rychlo AI. Ask me anything about our services, how we work, or how we can help your business automate and scale.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState(false);

  // desktop position & width
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const [panelW, setPanelW] = useState(INIT_W);
  const posReady = useRef(false);

  const abortRef = useRef<AbortController | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── mobile detection ──────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ── lock body scroll on mobile when open ──────────────────────────────────
  useEffect(() => {
    if (open && mobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, mobile]);

  // ── init desktop position on first open ───────────────────────────────────
  useEffect(() => {
    if (open && !mobile && !posReady.current) {
      posReady.current = true;
      setPos({
        top: window.innerHeight - WIN_H - 96,
        left: window.innerWidth - INIT_W - 24,
      });
    }
  }, [open, mobile]);

  // ── focus input & scroll to bottom ───────────────────────────────────────
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── drag header to move window ────────────────────────────────────────────
  const onHeaderDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (mobile) return;
      e.preventDefault();
      const el = e.currentTarget;
      el.setPointerCapture(e.pointerId);
      const ox = e.clientX - pos.left;
      const oy = e.clientY - pos.top;

      const onMove = (ev: PointerEvent) => {
        setPos({
          left: clamp(ev.clientX - ox, 0, window.innerWidth - panelW),
          top: clamp(ev.clientY - oy, 0, window.innerHeight - WIN_H),
        });
      };
      const cleanup = () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", cleanup);
        el.removeEventListener("pointercancel", cleanup);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", cleanup);
      el.addEventListener("pointercancel", cleanup);
    },
    [mobile, pos, panelW],
  );

  // ── drag left edge to expand/shrink width ─────────────────────────────────
  const onResizeDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (mobile) return;
      e.preventDefault();
      e.stopPropagation();
      const el = e.currentTarget;
      el.setPointerCapture(e.pointerId);
      const sx = e.clientX;
      const sw = panelW;
      const sl = pos.left;

      const onMove = (ev: PointerEvent) => {
        const dx = sx - ev.clientX;
        const nw = clamp(sw + dx, MIN_W, MAX_W);
        setPanelW(nw);
        setPos((p) => ({ ...p, left: sl - (nw - sw) }));
      };
      const cleanup = () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerup", cleanup);
        el.removeEventListener("pointercancel", cleanup);
      };
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerup", cleanup);
      el.addEventListener("pointercancel", cleanup);
    },
    [mobile, panelW, pos.left],
  );

  // ── send message ──────────────────────────────────────────────────────────
  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    const history = [...messages, userMsg];
    setMessages([...history, { role: "assistant", content: "", streaming: true }]);
    setInput("");
    setLoading(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
        signal: ctrl.signal,
      });

      if (!res.ok || !res.body) throw new Error("stream error");

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let acc = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        for (const line of dec.decode(value, { stream: true }).split("\n")) {
          if (!line.startsWith("data: ")) continue;
          const d = line.slice(6).trim();
          if (d === "[DONE]") break;
          try {
            const delta = JSON.parse(d)?.choices?.[0]?.delta?.content;
            if (delta) {
              acc += delta;
              setMessages((prev) => [
                ...prev.slice(0, -1),
                { role: "assistant", content: acc, streaming: true },
              ]);
            }
          } catch {
            // ignore malformed SSE chunks
          }
        }
      }

      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          role: "assistant",
          content: acc || "Sorry, I didn't get a response. Please try again.",
        },
      ]);
    } catch (err: unknown) {
      if ((err as Error).name === "AbortError") return;
      setMessages((prev) => [
        ...prev.slice(0, -1),
        { role: "assistant", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
      abortRef.current = null;
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  function handleClose() {
    abortRef.current?.abort();
    setOpen(false);
  }

  // ── shared UI ─────────────────────────────────────────────────────────────

  const messageList = (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 overscroll-contain">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
              msg.role === "user"
                ? "bg-blue-600 text-white rounded-br-sm"
                : "bg-zinc-800 text-white/90 rounded-bl-sm"
            }`}
          >
            {msg.role === "assistant" ? (
              <div className="prose prose-invert prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-0 prose-headings:my-1">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {msg.content || (msg.streaming ? "▍" : "")}
                </ReactMarkdown>
                {msg.streaming && msg.content && (
                  <span className="inline-block w-0.5 h-3.5 bg-white/70 animate-pulse ml-0.5 align-middle" />
                )}
              </div>
            ) : (
              msg.content
            )}
          </div>
        </div>
      ))}

      {messages.length === 1 && (
        <div className="flex flex-col gap-2 mt-1">
          {QUICK_REPLIES.map((r) => (
            <button
              key={r}
              onClick={() => sendMessage(r)}
              className="text-left text-xs text-blue-400 border border-blue-500/30 rounded-lg px-3 py-2.5 hover:bg-blue-500/10 active:bg-blue-500/20 transition-colors"
            >
              {r}
            </button>
          ))}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );

  const inputBar = (
    <div className="px-3 py-3 border-t border-zinc-800 bg-zinc-900 shrink-0 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex items-center gap-2 bg-zinc-800 rounded-xl px-3.5 py-2.5">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about our services…"
          disabled={loading}
          className="flex-1 bg-transparent text-white text-sm placeholder:text-zinc-500 outline-none disabled:opacity-50 min-w-0"
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={loading || !input.trim()}
          aria-label="Send message"
          className="text-blue-400 hover:text-blue-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0 p-0.5"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── floating toggle button ── */}
      <button
        onClick={() => (open ? handleClose() : setOpen(true))}
        aria-label={open ? "Close chat" : "Open Rychlo AI chat"}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/50 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} className="text-white" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={22} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {/* ── mobile: bottom sheet ── */}
        {open && mobile && (
          <motion.div
            key="mobile-chat"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 340 }}
            className="fixed inset-x-0 bottom-0 z-40 flex flex-col bg-zinc-950 border border-zinc-800 border-b-0 rounded-t-2xl shadow-2xl"
            style={{ height: "85dvh" }}
          >
            {/* drag pill */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-zinc-700" />
            </div>

            {/* header */}
            <div className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border-b border-zinc-800 shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shrink-0">
                <Bot size={17} className="text-white" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white text-sm font-semibold leading-tight">Rychlo AI</span>
                <span className="text-green-400 text-xs leading-tight flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                  Online
                </span>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close chat"
                className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-zinc-800"
              >
                <X size={18} />
              </button>
            </div>

            {messageList}
            {inputBar}
          </motion.div>
        )}

        {/* ── desktop: draggable + left-resizable ── */}
        {open && !mobile && (
          <motion.div
            key="desktop-chat"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            style={{ top: pos.top, left: pos.left, width: panelW, height: WIN_H }}
            className="fixed z-40 flex flex-col rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/60 overflow-hidden"
          >
            {/* left resize handle — drag left to expand */}
            <div
              onPointerDown={onResizeDown}
              title="Drag to resize"
              className="absolute left-0 top-0 bottom-0 w-2 z-20 cursor-ew-resize group"
            >
              <div className="absolute inset-0 rounded-l-xl bg-blue-500/0 group-hover:bg-blue-500/20 transition-colors duration-150" />
              {/* visual indicator dots */}
              <div className="absolute top-1/2 left-0.5 -translate-y-1/2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="w-0.5 h-0.5 rounded-full bg-blue-400 block" />
                ))}
              </div>
            </div>

            {/* draggable header */}
            <div
              onPointerDown={onHeaderDown}
              className="flex items-center gap-3 px-4 py-3 bg-zinc-900 border-b border-zinc-800 shrink-0 cursor-grab active:cursor-grabbing select-none"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shrink-0">
                <Bot size={17} className="text-white" />
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-white text-sm font-semibold leading-tight">Rychlo AI</span>
                <span className="text-green-400 text-xs leading-tight flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse" />
                  Online
                </span>
              </div>
              <span className="text-zinc-600 text-[10px] mr-2 hidden sm:block pointer-events-none leading-tight text-right">
                drag header to move<br />← left edge to expand
              </span>
              <button
                onClick={handleClose}
                onPointerDown={(e) => e.stopPropagation()}
                aria-label="Close chat"
                className="text-zinc-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-zinc-800 shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            {messageList}
            {inputBar}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
