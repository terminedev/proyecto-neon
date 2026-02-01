import './App.css';
import PrivateAccess from 'pages/public-content/PrivateAccess';
import About from 'pages/public-content/About';

export default function App() {
  return (
    <>
      <h1>Proyecto Neón</h1>

      <p>---------------</p>
      <PrivateAccess />
      <p>---------------</p>
      <About />
      <p>---------------</p>
    </>
  )
};

