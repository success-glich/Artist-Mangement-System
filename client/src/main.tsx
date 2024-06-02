import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./router"
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from './components/ui/toaster';

//* Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient} >
      <App />
      <Toaster />

    </QueryClientProvider>

  </React.StrictMode>,
)
