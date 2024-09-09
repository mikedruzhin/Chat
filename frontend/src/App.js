import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { PageNotFound } from './Components/NoPage';
import { SignUpForm } from './Components/SignUpForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignUpForm />} />
        <Route path="/" element={<PageNotFound />} /> 
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
