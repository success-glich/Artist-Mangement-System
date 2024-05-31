import app from "./src/app";
import { config } from "./src/config/config";
import { checkConnection } from "./src/config/db";

const port = config.port || 8001



const startServer = async () => {
    //*  Check the database connection
      await checkConnection(); 
  
    app.listen(port, () => {
      console.log(`Server is running on port :: ${port}`);
    });
  };
  
  startServer().catch(error => {
    console.error('Failed to start the server:', error);
  });