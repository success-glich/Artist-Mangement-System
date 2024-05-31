import app from "./src/app";
import { config } from "./src/config/config";
import { checkConnection } from "./src/config/db";
import createTables from "./src/config/setup";

const port = config.port || 8001

const startServer = async () => {

    //*  Check the database connection
      await checkConnection(); 
    //* Initialize database 
    await createTables()
  
    app.listen(port, () => {
      console.log(`Server is running on port :: ${port}`);
    });
  };
  
  startServer().catch(error => {
    console.error('Failed to start the server:', error);
  });