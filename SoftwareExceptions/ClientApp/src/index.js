import * as React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";


const rootElement = document.getElementById("root");
const Root = () => (    
      <AppRouter />
  )

ReactDOM.render(<Root />, rootElement);

//registerServiceWorker();

