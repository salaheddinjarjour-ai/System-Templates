"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Hash, Lock, Search, Plus, Phone, Video, Info, Smile, Paperclip, AtSign, MoreHorizontal } from "lucide-react";
import { chatChannels, chatDMs, channelMessages } from "@/lib/mockData";

type Message = { id: number; sender: string; initials: string; text: string; time: string; mine?: boolean };

const avatarColors: Record<string, string> = {
  HM: "#7C3AED", SN: "#10B981", FA: "#F59E0B", IK: "#3B82F6",
  AH: "#EF4444", NA: "#F97316", AK: "#7C3AED",
};

export default function ChatPage() {
  const [activeChannel, setActiveChannel] = useState<string>("general");
  const [activeDM, setActiveDM] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Record<string, Message[]>>(channelMessages);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  useEffect(() => { scrollToBottom(); }, [messages, activeChannel, activeDM]);

  const currentKey = activeDM ? `dm_${activeDM}` : activeChannel;
  const currentMessages = messages[currentKey] ?? [];

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      sender: "You",
      initials: "AK",
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      mine: true,
    };
    setMessages((prev) => ({ ...prev, [currentKey]: [...(prev[currentKey] ?? []), newMsg] }));
    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const activeChannelInfo = chatChannels.find(c => c.id === activeChannel);
  const activeDMInfo = chatDMs.find(d => d.id === activeDM);
  const headerTitle = activeDM ? activeDMInfo?.name : `# ${activeChannel}`;
  const headerSub = activeDM ? activeDMInfo?.role : `${activeChannelInfo?.members ?? 0} members`;

  return (
    <div>
      <div className="page-header" style={{ marginBottom: 16 }}>
        <div>
          <h1 className="page-title">Team Chat</h1>
          <p className="page-subtitle">Real-time messaging — channels & direct messages</p>
        </div>
      </div>

      <div className="chat-layout">
        {/* Chat Sidebar */}
        <div className="chat-sidebar">
          {/* Workspace Header */}
          <div style={{ padding: "16px 14px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 7, background: "var(--primary-gradient)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "white" }}>T</div>
              <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>TexFlow Team</span>
            </div>
            <div style={{ position: "relative" }}>
              <Search size={13} style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
              <input
                style={{ width: "100%", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 7, padding: "6px 10px 6px 26px", color: "rgba(255,255,255,0.8)", fontSize: 12, outline: "none" }}
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Channels */}
          <div style={{ padding: "12px 8px 4px", overflowY: "auto", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "4px 6px 8px", color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>
              <span>Channels</span>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 2 }}>
                <Plus size={14} />
              </button>
            </div>
            {chatChannels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => { setActiveChannel(ch.id); setActiveDM(null); }}
                style={{
                  width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "7px 10px",
                  borderRadius: 7, background: !activeDM && activeChannel === ch.id ? "rgba(124,58,237,0.25)" : "transparent",
                  border: "none", cursor: "pointer", color: !activeDM && activeChannel === ch.id ? "white" : "rgba(255,255,255,0.6)",
                  fontSize: 13, fontWeight: !activeDM && activeChannel === ch.id ? 600 : 400, marginBottom: 2,
                  textAlign: "left",
                }}
              >
                <Hash size={15} style={{ flexShrink: 0, opacity: 0.7 }} />
                <span style={{ flex: 1 }}>{ch.name}</span>
                {ch.unread > 0 && (
                  <span style={{ background: "var(--primary)", color: "white", borderRadius: "10px", fontSize: 10, fontWeight: 700, padding: "1px 6px", minWidth: 18, textAlign: "center" }}>{ch.unread}</span>
                )}
              </button>
            ))}

            {/* DMs */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 6px 8px", color: "rgba(255,255,255,0.35)", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase" }}>
              <span>Direct Messages</span>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.35)", padding: 2 }}>
                <Plus size={14} />
              </button>
            </div>
            {chatDMs.map((dm) => {
              const initials = dm.name.split(" ").map(w => w[0]).join("");
              return (
                <button
                  key={dm.id}
                  onClick={() => { setActiveDM(dm.id); }}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "6px 10px",
                    borderRadius: 7, background: activeDM === dm.id ? "rgba(124,58,237,0.25)" : "transparent",
                    border: "none", cursor: "pointer", color: activeDM === dm.id ? "white" : "rgba(255,255,255,0.6)",
                    fontSize: 13, marginBottom: 2, textAlign: "left",
                  }}
                >
                  <div style={{ position: "relative", flexShrink: 0 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: avatarColors[initials] ?? "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white" }}>
                      {initials}
                    </div>
                    {dm.online && <span className="online-dot" />}
                  </div>
                  <span style={{ flex: 1 }}>{dm.name}</span>
                  {dm.unread > 0 && (
                    <span style={{ background: "var(--green)", color: "white", borderRadius: "10px", fontSize: 10, fontWeight: 700, padding: "1px 6px" }}>{dm.unread}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* My Status */}
          <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ position: "relative" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--primary-gradient)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "white" }}>AK</div>
              <span className="online-dot" />
            </div>
            <div>
              <div style={{ color: "white", fontSize: 13, fontWeight: 600, lineHeight: 1.2 }}>Ahmed Karimi</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Operations Manager</div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="chat-main">
          {/* Chat Header */}
          <div className="chat-header">
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1 }}>
              {activeDM ? (
                <div style={{ position: "relative" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--primary-gradient)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white" }}>
                    {activeDMInfo?.name.split(" ").map(w => w[0]).join("")}
                  </div>
                  {activeDMInfo?.online && <span style={{ position: "absolute", bottom: 0, right: 0, width: 9, height: 9, background: "var(--green)", borderRadius: "50%", border: "2px solid var(--bg-card)" }} />}
                </div>
              ) : (
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--primary)" }}>
                  <Hash size={18} />
                </div>
              )}
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--text-primary)" }}>{headerTitle}</div>
                <div style={{ fontSize: 12, color: "var(--text-secondary)" }}>
                  {activeDM ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <span style={{ width: 7, height: 7, borderRadius: "50%", background: activeDMInfo?.online ? "var(--green)" : "var(--text-muted)", display: "inline-block" }} />
                      {activeDMInfo?.online ? "Online" : "Offline"} · {headerSub}
                    </span>
                  ) : headerSub}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 6 }}>
              <button className="topbar-icon-btn"><Phone size={16} /></button>
              <button className="topbar-icon-btn"><Video size={16} /></button>
              <button className="topbar-icon-btn"><Search size={16} /></button>
              <button className="topbar-icon-btn"><Info size={16} /></button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {/* Welcome message for empty channels */}
            {currentMessages.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--text-muted)" }}>
                <Hash size={40} style={{ opacity: 0.3, margin: "0 auto 12px" }} />
                <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text-secondary)" }}>
                  {activeDM ? `Start a conversation with ${activeDMInfo?.name}` : `Welcome to #${activeChannel}!`}
                </div>
                <div style={{ fontSize: 13, marginTop: 4 }}>Send the first message below.</div>
              </div>
            )}

            {currentMessages.map((msg, idx) => {
              const isFirst = idx === 0 || currentMessages[idx - 1].sender !== msg.sender;
              return (
                <div key={msg.id} className={`message-bubble ${msg.mine ? "mine" : ""}`}>
                  {!msg.mine && isFirst && (
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: avatarColors[msg.initials] ?? "#7C3AED", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0 }}>
                      {msg.initials}
                    </div>
                  )}
                  {!msg.mine && !isFirst && <div style={{ width: 36, flexShrink: 0 }} />}
                  <div>
                    {isFirst && !msg.mine && (
                      <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-secondary)", marginBottom: 4 }}>
                        {msg.sender}
                        <span style={{ fontWeight: 400, marginLeft: 6, color: "var(--text-muted)" }}>{msg.time}</span>
                      </div>
                    )}
                    <div className="message-content">{msg.text}</div>
                    {msg.mine && (
                      <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4, textAlign: "right" }}>{msg.time} ✓✓</div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chat-input-area">
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", background: "var(--bg-page)", borderRadius: 12, padding: "8px 10px", border: "1px solid var(--border-color)" }}>
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: "4px 2px", marginTop: 2 }}>
                <Plus size={18} />
              </button>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={activeDM ? `Message ${activeDMInfo?.name}` : `Message #${activeChannel}`}
                rows={1}
                style={{ flex: 1, resize: "none", background: "transparent", border: "none", outline: "none", fontSize: 13.5, color: "var(--text-primary)", fontFamily: "inherit", lineHeight: 1.5, paddingTop: 3 }}
              />
              <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4 }}>
                  <Paperclip size={17} />
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4 }}>
                  <AtSign size={17} />
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", padding: 4 }}>
                  <Smile size={17} />
                </button>
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  style={{
                    width: 34, height: 34, borderRadius: 9, background: inputText.trim() ? "var(--primary-gradient)" : "var(--border-color)",
                    border: "none", cursor: inputText.trim() ? "pointer" : "not-allowed", color: inputText.trim() ? "white" : "var(--text-muted)",
                    display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
                  }}
                >
                  <Send size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
