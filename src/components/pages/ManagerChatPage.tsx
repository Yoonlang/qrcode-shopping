import styled from "@emotion/styled";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import {
  IconButton,
  List,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { SERVER_URL } from "@/components/const";

const ChatContainer = styled(Paper)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  border-radius: 0;
  background-color: #ffffff;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: var(--color-blue, #1976d2);
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderTitle = styled(Typography)`
  flex-grow: 1;
  font-weight: bold;
  margin-left: 12px;
`;

const ChatHistoryList = styled(List)`
  flex-grow: 1;
  overflow-y: auto;
  padding: 24px;
`;

const MessageBubble = styled(Paper)<{ isai?: number }>`
  padding: 12px 16px;
  margin-bottom: 16px;
  max-width: 70%;
  width: fit-content;
  align-self: ${(props) => (props.isai ? "flex-start" : "flex-end")};
  background-color: ${(props) => (props.isai ? "#ffffff" : "#1976d2")};
  color: ${(props) => (props.isai ? "#000000" : "#ffffff")};
  border-radius: 12px;
  border-bottom-left-radius: ${(props) => (props.isai ? "0" : "12px")};
  border-bottom-right-radius: ${(props) => (props.isai ? "12px" : "0")};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  word-break: break-all;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 16px 24px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
`;

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string;
}

const ManagerChatPage = () => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [aiStatus, setAiStatus] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "ai",
      content:
        "안녕하세요! 매니저 페이지 인공지능 에이전트입니다. 코드 수정이나 배포 요청을 언제든 편하게 입력해 주세요.",
    },
  ]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const targetMessage = inputText;
    const newUserMsg: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: targetMessage,
    };
    
    setMessages((prev) => [...prev, newUserMsg]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch(`${SERVER_URL}/v1/ai-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: targetMessage }),
      });

      if (!response.body) throw new Error("서버 응답이 없습니다.");

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      let done = false;
      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          const events = chunk.split("\n\n").filter(Boolean);
          
          for (const ev of events) {
            if (ev.startsWith("data: ")) {
              const dataStr = ev.replace("data: ", "");
              try {
                const parsed = JSON.parse(dataStr);
                if (parsed.type === "status") {
                  setAiStatus(parsed.message);
                } else if (parsed.type === "result") {
                  const newAiMsg: ChatMessage = {
                    id: Date.now().toString(),
                    role: "ai",
                    content: parsed.reply
                  };
                  setMessages((prev) => [...prev, newAiMsg]);
                  setAiStatus("");
                } else if (parsed.type === "error") {
                  throw new Error(parsed.error);
                }
              } catch (e) {
                // JSON parse error or incomplete chunk
              }
            }
          }
        }
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
         id: (Date.now() + 1).toString(),
         role: "ai",
         content: `통신 에러: ${(err as Error).message}`
      };
      setMessages((prev) => [...prev, errorMsg]);
      setAiStatus("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push(`/${currentLocale}/manager`);
  };

  return (
    <ChatContainer elevation={0}>
      <ChatHeader>
        <IconButton color="inherit" onClick={handleBack}>
          <ArrowBackIcon />
        </IconButton>
        <SmartToyIcon style={{ marginLeft: "8px" }} />
        <HeaderTitle variant="h6">AI 에이전트 채널</HeaderTitle>
      </ChatHeader>

      <ChatHistoryList>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} isai={msg.role === "ai" ? 1 : 0}>
              <Typography variant="body1">{msg.content}</Typography>
            </MessageBubble>
          ))}
          {isLoading && aiStatus && (
            <MessageBubble isai={1}>
              <Typography variant="body2" color="textSecondary" style={{ fontStyle: "italic" }}>
                🤖 {aiStatus.split('\n').map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </Typography>
            </MessageBubble>
          )}
          {isLoading && !aiStatus && (
            <MessageBubble isai={1}>
              <Typography variant="body2" color="textSecondary">
                ...
              </Typography>
            </MessageBubble>
          )}
        </div>
      </ChatHistoryList>

      <InputContainer>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="AI 개발자에게 명령을 입력하세요"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.nativeEvent.isComposing) return;
            if (e.key === "Enter") void handleSend();
          }}
          size="small"
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={isLoading}
          style={{ marginLeft: "12px" }}
        >
          <SendIcon />
        </IconButton>
      </InputContainer>
    </ChatContainer>
  );
};

export default ManagerChatPage;
