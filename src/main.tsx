import ReactDOM from 'react-dom/client'
import TasksPage from './Tasks.tsx'
import './index.css'
import { store } from './core/state/Index.ts'
import { Provider } from 'react-redux'
import { Input, initTWE } from "tw-elements";
initTWE({ Input }, { allowReinits: true });
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <TasksPage />
    </Provider>
)
