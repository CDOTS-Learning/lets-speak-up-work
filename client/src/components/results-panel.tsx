import type { GameState, Player } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Check, X, ChevronRight } from "lucide-react";
import { GameCard } from "./game-card";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n";

interface ResultsPanelProps {
  gameState: GameState;
  currentPlayer: Player | undefined;
  myPlayerId: string;
  onNextRound: () => void;
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

// Normalize any legacy values ("good"/"bad") to the new enum ("promotes"/"hinders")
function normalizeRating(r?: string) {
  if (!r) return r;
  if (r === "good") return "promotes";
  if (r === "bad") return "hinders";
  return r;
}

export function ResultsPanel({ gameState, currentPlayer, myPlayerId, onNextRound }: ResultsPanelProps) {
  const { t } = useI18n();
  const isMyTurn = currentPlayer?.id === myPlayerId;
  const name = currentPlayer?.name ?? "";
  const ratingLabel = (r?: string) => {
    const n = normalizeRating(r);
    return n === "promotes" ? t("rate.promotes") : n === "hinders" ? t("rate.hinders") : n ?? "";
  };

  const activeLabel = ratingLabel(gameState.activePlayerRating);

  // Points the active player earned this round: +1 per OTHER player who matched.
  const pointsThisRound = gameState.ratings.filter(
    (r) =>
      r.playerId !== currentPlayer?.id &&
      normalizeRating(r.rating) === normalizeRating(gameState.activePlayerRating)
  ).length;

  return (
    <Card className="border-2">
      <CardHeader>
        <CardTitle>{t("res.title")}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {t("res.rating", { name })} <strong>{activeLabel}</strong>
        </p>
        <p className="text-sm text-muted-foreground">
          {t("res.earnedPrefix", { name })}{" "}
          <strong className="text-primary">
            +{pointsThisRound} {pointsThisRound === 1 ? t("pl.point") : t("pl.points")}
          </strong>{" "}
          {t("res.earnedSuffix")}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Card Set Display */}
        {gameState.selectedCards && (
          <div className="space-y-3">
            <Label className="text-sm text-muted-foreground">
              {t("res.selectedSet", { name })}
            </Label>
            <div className="flex gap-4 justify-center flex-wrap">
              {/* 1. ROLE (Deck 2) */}
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">{t("rate.role")}</Label>
                <GameCard card={gameState.selectedCards.deck2Card} isSelected={false} />
              </div>

              {/* 2. CONTEXT (Deck 3) */}
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">{t("rate.context")}</Label>
                <GameCard card={gameState.selectedCards.deck3Card} isSelected={false} />
              </div>

              {/* 3. STATEMENT (Deck 1) */}
              <div className="space-y-2">
                <Label className="text-xs uppercase tracking-wide text-muted-foreground">{t("rate.statement")}</Label>
                <GameCard card={gameState.selectedCards.deck1Card} isSelected={false} />
              </div>
            </div>
          </div>
        )}

        {/* Ratings Grid */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">{t("res.ratings")}</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {gameState.players.map((player) => {
              const playerRating = gameState.ratings.find((r) => r.playerId === player.id);
              const isActivePlayer = player.id === currentPlayer?.id;

              const normalizedPlayerRating = normalizeRating(playerRating?.rating);
              const matchesActive =
                !isActivePlayer && normalizedPlayerRating === normalizeRating(gameState.activePlayerRating);

              return (
                <div
                  key={player.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-md border",
                    matchesActive ? "border-green-600/60 bg-green-50" : "border-muted"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">
                        {player.name} {player.id === myPlayerId && <span className="text-muted-foreground">{t("res.you")}</span>}
                      </span>
                      {playerRating ? (
                        <span className="text-xs text-muted-foreground">
                          {ratingLabel(playerRating.rating)}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">{t("res.noRating")}</span>
                      )}
                    </div>
                  </div>

                  {!isActivePlayer && playerRating && (
                    <Badge variant={matchesActive ? "default" : "secondary"} className="flex items-center gap-1">
                      {matchesActive ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                      {matchesActive ? t("res.match") : t("res.noMatch")}
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Next Round Button */}
        {isMyTurn ? (
          <div className="text-right">
            <Button onClick={onNextRound} className="gap-1">
              {t("res.next")}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {t("res.waitingNext", { name })}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
