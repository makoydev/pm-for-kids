import { ActivityPanel } from "./components/ActivityPanel";
import { Board } from "./components/Board";
import { Header } from "./components/Header";
import { EventModal, GlossaryModal, ScoreModal } from "./components/Modals";
import { Sidebar } from "./components/Sidebar";
import { useGame } from "./hooks/useGame";

export function App() {
  const game = useGame();

  function handleReset() {
    if (!game.state.finished && hasProgress()) {
      const ok = window.confirm(
        "Reset the project? Your current week, board, and decisions will be cleared. The project starts fresh from week 1.",
      );
      if (!ok) return;
    }
    game.actions.resetGame();
  }

  function handleFinish() {
    const remaining = game.state.tasks.filter((task) => task.status !== "done").length;
    if (remaining > 0 && !game.state.finished) {
      const ok = window.confirm(
        `Finish the project now? ${remaining} task${remaining === 1 ? "" : "s"} are still not done - the scorecard will lock in your current results.`,
      );
      if (!ok) return;
    }
    game.actions.finishProject();
  }

  function hasProgress() {
    if (game.state.week > 1 || game.state.spent > 0 || game.state.mitigatedRisks.length > 0) return true;
    return game.state.tasks.some((task) => task.status !== "todo");
  }

  return (
    <>
      <Header
        difficulty={game.uiPrefs.difficulty}
        activityCollapsed={game.uiPrefs.activityCollapsed}
        finished={game.state.finished}
        onDifficultyChange={game.setDifficulty}
        onToggleActivity={game.toggleActivity}
        onOpenGlossary={() => game.setGlossaryOpen(true)}
        onReset={handleReset}
        onFinish={handleFinish}
      />
      <main className={`app-shell ${game.uiPrefs.activityCollapsed ? "activity-collapsed" : ""}`}>
        <Sidebar
          scenario={game.scenario}
          state={game.state}
          onAdvanceWeek={game.actions.advanceWeek}
          onMitigateRisk={game.actions.mitigateRisk}
        />
        <Board
          scenario={game.scenario}
          state={game.state}
          difficulty={game.uiPrefs.difficulty}
          onAssignTask={game.actions.assignTask}
          onAdvanceTask={game.actions.advanceTask}
        />
        <ActivityPanel
          collapsed={game.uiPrefs.activityCollapsed}
          log={game.state.log}
          onClear={game.actions.clearLog}
          onClose={() => game.setActivityCollapsed(true)}
        />
      </main>
      <EventModal
        scenario={game.scenario}
        state={game.state}
        difficulty={game.uiPrefs.difficulty}
        onChoose={game.actions.chooseEvent}
      />
      <GlossaryModal open={game.glossaryOpen} onClose={() => game.setGlossaryOpen(false)} />
      <ScoreModal
        open={game.scoreOpen}
        scenario={game.scenario}
        state={game.state}
        onPlayAgain={game.actions.resetGame}
        onClose={() => game.setScoreOpen(false)}
      />
    </>
  );
}
