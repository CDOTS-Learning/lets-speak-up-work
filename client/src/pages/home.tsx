
import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Users, Play, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getSocket, connectSocket } from "@/lib/socket";
import { useI18n, LangToggle } from "@/i18n";

export default function Home() {
  const [, setLocation] = useLocation();
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isJoining, setIsJoining] = useState(false);
  const { toast } = useToast();
  const { t, tServer } = useI18n();

  const handleCreateRoom = async () => {
    if (!playerName.trim()) {
      toast({
        variant: "destructive",
        title: t("toast.nameReqTitle"),
        description: t("toast.nameReqCreate"),
      });
      return;
    }
    setIsCreating(true);
    connectSocket();
    const socket = getSocket();
    socket.emit("create_room", playerName.trim(), (newRoomCode: string) => {
      setIsCreating(false);
      // Remember our name for this room so reconnect/reload keeps the same identity.
      try {
        sessionStorage.setItem(`lsu_name_${newRoomCode}`, playerName.trim());
      } catch {
        /* ignore storage errors */
      }
      setLocation(`/game/${newRoomCode}?created=true`); // ✅ updated with created=true
    });
  };

  const handleJoinRoom = async () => {
    if (!playerName.trim()) {
      toast({
        variant: "destructive",
        title: t("toast.nameReqTitle"),
        description: t("toast.nameReqJoin"),
      });
      return;
    }
    if (!roomCode.trim()) {
      toast({
        variant: "destructive",
        title: t("toast.codeReqTitle"),
        description: t("toast.codeReq"),
      });
      return;
    }
    setIsJoining(true);
    connectSocket();
    const socket = getSocket();
    socket.emit(
      "join_room",
      roomCode.trim().toUpperCase(),
      playerName.trim(),
      (success: boolean, error?: string) => {
        setIsJoining(false);
        if (success) {
          const code = roomCode.trim().toUpperCase();
          // Remember our name for this room so reconnect/reload keeps the same identity.
          try {
            sessionStorage.setItem(`lsu_name_${code}`, playerName.trim());
          } catch {
            /* ignore storage errors */
          }
          setLocation(`/game/${code}`);
        } else {
          toast({
            variant: "destructive",
            title: t("toast.joinFailTitle"),
            description: error ? tServer(error) : t("toast.joinFail"),
          });
        }
      }
    );
  };

  return (

    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="w-full max-w-2xl space-y-8 relative">
        <div className="absolute right-0 -top-2 md:-top-4"><LangToggle /></div>
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {t("app.title")}
            </h1>
            <Sparkles className="w-10 h-10 text-primary" />
          </div>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto">
            {t("home.subtitle")}
          </p>
        </div>

        {/* Player Name Input */}
        <Card className="border-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {t("home.yourName")}
            </CardTitle>
            <CardDescription>{t("home.yourNameDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              data-testid="input-player-name"
              type="text"
              placeholder={t("home.namePlaceholder")}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && playerName.trim()) {
                  handleCreateRoom();
                }
              }}
              maxLength={20}
              className="text-lg"
            />
          </CardContent>
        </Card>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Create Room */}
          <Card className="border-2 hover-elevate transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Play className="w-5 h-5 text-primary" />
                {t("home.create")}
              </CardTitle>
              <CardDescription>{t("home.createDesc")}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                data-testid="button-create-room"
                onClick={handleCreateRoom}
                disabled={!playerName.trim() || isCreating}
                className="w-full"
                size="lg"
              >
                {isCreating ? t("home.creating") : t("home.createBtn")}
              </Button>
            </CardContent>
          </Card>

          {/* Join Room */}
          <Card className="border-2 hover-elevate transition-all">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                {t("home.join")}
              </CardTitle>
              <CardDescription>{t("home.joinDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="room-code">{t("home.roomCode")}</Label>
                <Input
                  data-testid="input-room-code"
                  id="room-code"
                  type="text"
                  placeholder={t("home.roomCodePlaceholder")}
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && playerName.trim() && roomCode.trim()) {
                      handleJoinRoom();
                    }
                  }}
                  maxLength={6}
                  className="uppercase"
                />
              </div>
              <Button
                data-testid="button-join-room"
                onClick={handleJoinRoom}
                disabled={!playerName.trim() || !roomCode.trim() || isJoining}
                className="w-full"
                size="lg"
                variant="secondary"
              >
                {isJoining ? t("home.joining") : t("home.joinBtn")}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Game Rules */}
        <Card className="border">
          <CardHeader>
            <CardTitle className="text-lg">{t("home.howTo")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <div className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                1
              </span>
              <p>{t("home.rule1")}</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                2
              </span>
              <p>{t("home.rule2")}</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                3
              </span>
              <p>{t("home.rule3")}</p>
            </div>
            <div className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-semibold text-xs">
                4
              </span>
              <p>{t("home.rule4")}</p>             
            </div>
<div className="flex gap-3">
              <span className="flex-shrink-0 flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-primary/10 text-primary font-semibold text-xs whitespace-nowrap">
                {t("home.noteLabel")}
              </span>
              <p>{t("home.note")}</p>             
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
