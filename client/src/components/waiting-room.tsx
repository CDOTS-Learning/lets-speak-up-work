import type { GameState } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Play } from "lucide-react";
import { PlayerList } from "./player-list";
import { getSocket } from "@/lib/socket";
import { useI18n } from "@/i18n";

interface WaitingRoomProps {
  gameState: GameState;
  myPlayerId: string;
  roomCode: string;
}

export function WaitingRoom({ gameState, myPlayerId, roomCode }: WaitingRoomProps) {
  const { t } = useI18n();
  const isHost = gameState.players[0]?.id === myPlayerId;
  const canStart = gameState.players.length >= 3 && gameState.players.length <= 6;

  const handleStartGame = () => {
    const socket = getSocket();
    socket.emit("start_game");
  };

  return (
    <div className="space-y-6">
      {/* Waiting Room Header */}
      <Card className="border-2 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="py-12 text-center space-y-4">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{t("lobby.title")}</h2>
            <p className="text-muted-foreground">
              {gameState.players.length < 3
                ? t("lobby.waitingMore")
                : t("lobby.ready", { count: gameState.players.length, max: gameState.maxPlayers })}
            </p>
          </div>
          {isHost && canStart && (
            <Button
              data-testid="button-start-game"
              onClick={handleStartGame}
              size="lg"
              className="gap-2"
            >
              <Play className="w-5 h-5" />
              {t("lobby.start")}
            </Button>
          )}
          {isHost && !canStart && (
            <p className="text-sm text-muted-foreground">
              {t("lobby.need")}
            </p>
          )}
          {!isHost && (
            <p className="text-sm text-muted-foreground">
              {t("lobby.waitingHost")}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Players List */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            {t("lobby.players", { count: gameState.players.length, max: gameState.maxPlayers })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PlayerList
            players={gameState.players}
            myPlayerId={myPlayerId}
          />
        </CardContent>
      </Card>

      {/* Game Info */}
      <Card className="border">
        <CardHeader>
          <CardTitle className="text-lg">{t("lobby.readyTitle")}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>{t("lobby.info")}</p>
          <p>{t("home.rule2")}</p>
          <p>{t("home.rule3")}</p>
        </CardContent>
      </Card>
    </div>
  );
}
