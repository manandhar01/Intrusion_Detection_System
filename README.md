# IDS_GUI

### This is the backend of the IDS. This repository contains references two other repositories which are included as submodules and are needed for proper operation of the project.

## Hardware Requirements

1. Intel Core i5 or equivalent processor
1. Nvidia GPU

## Software Requirements

1. Linux OS  
   The backed server is dependent on some core Linux programs that are not available on Windows. So, Linux OS is required to run the server.

1. Node.js  
   Node.js is needed to spin up the server and npm is needed to install the dependencies of the project.

1. Python  
   The AI model for the IDS has been developed using Python and several python modules are needed for running the model to predict the data.

## Submodule Repositories

1. [webgui](https://github.com/abhinandanshrestha/webgui)  
   This repository contains the frontend of the project developed using React.js.

2. [Intrusion-Detection-System-Using-Fewshot-Learning](https://github.com/ManandharSudip4/Intrusion-Detection-System-Using-Fewshot-Learning)  
   This repository contains the AI model of the project written in python.

## Getting Started

1.  Clone the repo with `--recursive` flag so that the submodules are cloned with proper names.  
    `git clone --recursive https://github.com/manandhar01/ids_gui.git`

## Running the app

**NOTE :: The following steps assumes that you have Node.js and npm already installed in the system.**

1.  Navigate to the cloned project directory.  
    `cd ids_gui`

1.  Install necessary node modules for the backend.  
    `npm install`

1.  Start the backend server with superuser privileges. The server listens to port **3001**. Port can be changed in **index.js** file at the root directory of the project.

    **NOTE :: Make sure that all the python packages mentioned in the `AI/requirements.txt` has been installed in a virtual environment and the virtual environment is activated before starting the backend server.**

    `sudo node index.js`

1.  Navigate to **frontend** directory in a new terminal window.  
    `cd ids_gui/frontend`

1.  Install necessary node modules for the frontend.  
    `npm install`

1.  Start the frontend server. The server listens to port **3000**.  
    `npm start`

## Screenshots

1. Landing Page
   ![Landing Page](./screenshots/1.png)
1. Traffic Page
   ![Traffic Page](./screenshots/2.png)
1. Traffic Details
   ![Show More Page](./screenshots/3.png)
1. Form Page
   ![Form Page](./screenshots/4.png)
1. Form Data Prediction
   ![Prediction](./screenshots/5.png)
1. Prediction from CSV data
   ![Prediction](./screenshots/6.png)
   ![Prediction](./screenshots/7.png)
1. Logs
   ![Logs](./screenshots/8.png)
1. Scatter Page
   ![Scatter Plot](./screenshots/9.png)
1. Bar Graph
   ![Bar Graph](./screenshots/10.png)
1. Pie Chart
   ![Pie Chart](./screenshots/11.png)
