import ReactDOM from "react-dom/client"

import App from "./App"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./Components2/toolkit/Store"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <App />
  </Provider>
)
