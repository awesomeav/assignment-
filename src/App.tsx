import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login';
import useTravseTree from './hooks/use-traverse-tree';
import explorer from './data/folderData';
import { useState } from 'react';
import FolderComponent from './components/folder';
import { data } from './data/mockData';
import Button from './components/Button';
import TablePage from './pages/Table';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 5 * 60 * 1000
    }
  }
});

function App() {
  const [folderData, setFolderData] = useState(explorer);

  const { insertNode } = useTravseTree();
  const handleInsertNode = (folderId: any, item: any, isFolder: any) => {
    const finalTree = insertNode(folderData, folderId, item, isFolder);
    console.log('finalTree :', finalTree);

    setFolderData(finalTree);
  };

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <>
          <TablePage />
          {/* // work on this */}
          {/* <div className="relative flex items-center">
            {data.map((item: any) => {
              return (
                <img
                  className="w-[220px] inline-block
                  ease-in-out duration-300 p-2 cursor-pointer hover:scale-110"
                  src={item.img}
                />
              );
            })}
          </div> */}
          {/* <Button className="m12" label="->" /> */}
        </>
      </QueryClientProvider>
    </>
  );
}

export default App;
