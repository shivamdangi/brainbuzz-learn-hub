import { useMemo, useState } from "react";
import { Send, X, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// NOTE: For security, do not commit real keys. Replace locally for testing.
const OPENROUTER_API_KEY = "sk-or-v1-REPLACE_WITH_YOUR_OPENROUTER_KEY";
const OPENROUTER_MODEL = "stepfun/step-3.5-flash:free";


const escapeHtml = (raw = "") =>
  raw
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const markdownToHtml = (raw = "") => {
  const safe = escapeHtml(raw);
  const lines = safe.split("\n");
  const rendered = [];
  let inList = false;

  const inline = (txt) =>
    txt
      .replace(/`([^`]+)`/g, "<code class=\"rounded bg-foreground/10 px-1 py-0.5 text-[11px]\">$1</code>")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href=\"$2\" target=\"_blank\" rel=\"noreferrer\" class=\"underline\">$1</a>');

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^[-*]\s+/.test(trimmed)) {
      if (!inList) {
        rendered.push('<ul class=\"list-disc pl-5\">');
        inList = true;
      }
      rendered.push(`<li>${inline(trimmed.replace(/^[-*]\s+/, ""))}</li>`);
      continue;
    }

    if (inList) {
      rendered.push("</ul>");
      inList = false;
    }

    if (trimmed === "") {
      rendered.push('<div class=\"h-2\"></div>');
      continue;
    }

    if (/^###\s+/.test(trimmed)) {
      rendered.push(`<h3 class=\"text-sm font-semibold\">${inline(trimmed.replace(/^###\s+/, ""))}</h3>`);
    } else if (/^##\s+/.test(trimmed)) {
      rendered.push(`<h2 class=\"text-sm font-semibold\">${inline(trimmed.replace(/^##\s+/, ""))}</h2>`);
    } else if (/^#\s+/.test(trimmed)) {
      rendered.push(`<h1 class=\"text-sm font-semibold\">${inline(trimmed.replace(/^#\s+/, ""))}</h1>`);
    } else {
      rendered.push(`<p>${inline(trimmed)}</p>`);
    }
  }

  if (inList) rendered.push("</ul>");
  return rendered.join("");
};

const BOT_SYSTEM_PROMPT = `You are EdAI, the BrainBuzz Academy assistant.
Your job is to help prospective students/parents with concise answers based on this website.
Important context:
- BrainBuzz Academy provides tutoring for Classes 1-10 (CBSE & ICSE).
- Typical subjects shown include: English, Hindi, Mathematics, Science, EVS.
- You can share contact details when asked:
  - Email: info.brainbuzz.academy@gmail.com
  - Phone/WhatsApp: +91-9690724441
  - Location: Baraut, Uttar Pradesh, India 250611
- If users ask to enroll, counseling, admission, or connect with the team, strongly suggest visiting the Contact page.
- If asked about teachers, provide only brief/general info and suggest visiting Explore for full profiles.
- Keep answers short, friendly, and practical.
- Do not invent pricing/schedules if not known. Say you can connect them to the team via Contact page.`;

export const EdAIChatbot = ({ onNavigateToContact }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I’m EdAI ✨ I can help with subjects, teachers, and getting you to contact/admissions quickly.",
    },
  ]);

  const quickActions = useMemo(
    () => [
      "What subjects do you offer?",
      "How do I contact BrainBuzz?",
      "Show me teacher info",
      "I want to enroll",
    ],
    [],
  );

  const sendMessage = async (text) => {
    const content = text.trim();
    if (!content || loading) return;

    const nextMessages = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "BrainBuzz EdAI Assistant",
        },
        body: JSON.stringify({
          model: OPENROUTER_MODEL,
          messages: [
            { role: "system", content: BOT_SYSTEM_PROMPT },
            ...nextMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch chat response");
      }

      const data = await response.json();
      const answer = data?.choices?.[0]?.message?.content?.trim() ||
        "I couldn’t generate a response right now. Please try again.";

      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);

      if (content.toLowerCase().includes("enroll") || content.toLowerCase().includes("admission") || content.toLowerCase().includes("contact")) {
        setTimeout(() => {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "Would you like me to open the Contact page for you now?",
            },
          ]);
        }, 350);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I’m having trouble connecting right now. You can still reach BrainBuzz at info.brainbuzz.academy@gmail.com or +91-9690724441.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
      {open && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-sm rounded-2xl border border-primary/20 bg-background/95 shadow-2xl backdrop-blur-sm">
          <div className="flex items-center justify-between rounded-t-2xl bg-gradient-hero px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              <div>
                <p className="text-sm font-semibold">EdAI Assistant</p>
                <p className="text-[11px] text-white/85">BrainBuzz helper</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="max-h-[55vh] space-y-3 overflow-y-auto p-3">
            {messages.map((m, idx) => (
              <div
                key={`${m.role}-${idx}`}
                className={`rounded-xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto w-fit max-w-[90%] bg-primary text-primary-foreground"
                    : "mr-auto max-w-[90%] bg-muted text-foreground"
                }`}
              >
                {m.role === "assistant" ? (<div className="space-y-1" dangerouslySetInnerHTML={{ __html: markdownToHtml(m.content) }} />) : m.content}
              </div>
            ))}
            {loading && <div className="text-xs text-muted-foreground">EdAI is typing...</div>}
          </div>

          <div className="flex flex-wrap gap-2 px-3 pb-2">
            {quickActions.map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="rounded-full border border-border bg-card px-2 py-1 text-[11px] text-muted-foreground hover:bg-muted"
              >
                {q}
              </button>
            ))}
            <button
              onClick={onNavigateToContact}
              className="rounded-full border border-primary/30 bg-primary/10 px-2 py-1 text-[11px] text-primary"
            >
              Open Contact Page
            </button>
          </div>

          <form
            className="flex items-center gap-2 border-t p-3"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask EdAI..."
              className="h-9"
            />
            <Button type="submit" size="icon" className="h-9 w-9" disabled={loading}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open EdAI chatbot"
        className="group flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 text-white shadow-2xl ring-4 ring-blue-200/40 transition hover:scale-105"
      >
        <div className="text-center leading-tight">
          <Sparkles className="mx-auto mb-0.5 h-3.5 w-3.5" />
          <span className="text-[12px] font-black tracking-wide">EdAI</span>
        </div>
      </button>
    </div>
  );
};
