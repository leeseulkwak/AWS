import { usePedometer } from './hooks/usePedometer';
import { StepDisplay } from './components/StepDisplay';
import { ProgressBar } from './components/ProgressBar';
import { StatsCard } from './components/StatsCard';
import { GoalSetting } from './components/GoalSetting';
import { Controls } from './components/Controls';
import './App.css';

const App = () => {
  const {
    steps,
    goal,
    isRunning,
    isSupported,
    isDemoMode,
    permissionState,
    stats,
    start,
    stop,
    reset,
    setGoal,
    requestPermission,
    toggleDemoMode,
    addStep,
  } = usePedometer();

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">만보기</h1>
        <p className="app-subtitle">Pedometer</p>
        {isRunning && <span className="status-badge running">Tracking</span>}
      </header>

      <main className="app-main">
        <StepDisplay steps={steps} goal={goal} />

        <ProgressBar
          progress={stats.progress}
          steps={steps}
          goal={goal}
        />

        <StatsCard
          calories={stats.calories}
          distanceDisplay={stats.distanceDisplay}
        />

        <Controls
          isRunning={isRunning}
          isSupported={isSupported}
          isDemoMode={isDemoMode}
          permissionState={permissionState}
          onStart={start}
          onStop={stop}
          onReset={reset}
          onRequestPermission={requestPermission}
          onToggleDemoMode={toggleDemoMode}
          onAddStep={addStep}
        />

        <GoalSetting
          goal={goal}
          onSetGoal={setGoal}
          disabled={isRunning}
        />
      </main>

      <footer className="app-footer">
        <p>Steps x 0.04 kcal = Calories · Steps x 0.762 m = Distance</p>
      </footer>
    </div>
  );
};

export default App;
