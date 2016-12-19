%~d1
cd "%~p1"
cd file-explorer
call npm install
cd ../server
call npm install
call npm start
call cd ../file-explorer
npm start