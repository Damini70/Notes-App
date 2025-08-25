import { useState } from 'react';
import './App.css';
import Accordian from './components/Accordian';
import { ToastProvider } from './components/ui/CustomToast/ToastContext';
import Routing from './components/Routing';
import SearchDropdown from './components/SearchDropdown';
 import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

function App() {
  // const [hasDraggedOver, setHasDraggedOver] = useState(false);
  // const [content,setContent]=useState("");
  // const [other,setOther]=useState("HEy")
  const queryClient = new QueryClient()

  // const handleDragOver = (e: React.DragEvent<HTMLHeadingElement>) => {
  //   if (!hasDraggedOver) { 
  //     setOther(content)
  //     setHasDraggedOver(true);
  //   }
  // };

  // const handleDragLeave = () => {
  //   setHasDraggedOver(false); // Reset when leaving
  // };

  return (
    // <ToastProvider>
    // <Routing/>
    // </ToastProvider>
    <QueryClientProvider client={queryClient}>
      <SearchDropdown/>
    </QueryClientProvider>
    
  );
}

export default App;
