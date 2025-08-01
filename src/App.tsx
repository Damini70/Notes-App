import { useState } from 'react';
import './App.css';
import Accordian from './components/Accordian';
import { ToastProvider } from './components/ui/CustomToast/ToastContext';
import Routing from './components/Routing';

function App() {
  const [hasDraggedOver, setHasDraggedOver] = useState(false);
  const [content,setContent]=useState("");
  const [other,setOther]=useState("HEy")

  const handleDragOver = (e: React.DragEvent<HTMLHeadingElement>) => {
    if (!hasDraggedOver) { 
      setOther(content)
      setHasDraggedOver(true);
    }
  };

  const handleDragLeave = () => {
    setHasDraggedOver(false); // Reset when leaving
  };

  return (
    <ToastProvider>
    <Routing/>
    </ToastProvider>
  );
}

export default App;
