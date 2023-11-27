import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import Home from './components/Home.tsx'
import  "./index.scss"
import { Provider } from "react-redux";
import { store } from "./store";
import EventDetail from './components/EventDetail.tsx'






const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/detalle/:performanceId",
        element:  <EventDetail/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
  <RouterProvider router={router} />
  </Provider>
)
