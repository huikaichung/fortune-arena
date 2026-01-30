import { useFortuneStore } from './store/fortuneStore';
import { IntroStage } from './components/IntroStage';
import { FormStage } from './components/FormStage';
import { CastingStage } from './components/CastingStage';
import { ReadingsStage } from './components/ReadingsStage';
import './App.css';

function App() {
  const { stage, error, setError, reset } = useFortuneStore();

  const renderStage = () => {
    switch (stage) {
      case 'intro':
        return <IntroStage />;
      case 'form':
        return <FormStage />;
      case 'casting':
      case 'loading':
        return <CastingStage />;
      case 'readings':
      case 'consensus':
        return <ReadingsStage />;
      default:
        return <IntroStage />;
    }
  };

  return (
    <div className="app">
      {error && (
        <div className="error-toast">
          <span>❌ {error}</span>
          <button onClick={() => { setError(null); reset(); }}>關閉</button>
        </div>
      )}
      
      {renderStage()}
    </div>
  );
}

export default App;
