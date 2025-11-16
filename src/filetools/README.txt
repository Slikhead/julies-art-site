the populatePaintingData.js and populateShopdata.js files are designed to be run individually after items have been added to their respective galleries. 
1. drop files into the destination folders and rename accordingly
2. from the command prompt cd julies-art\
3. type node src/filetools/populatePaintingData.js
4. or node src/filetools/populateShopData.js
the script will search for new images in he galleries and prompt you for series info and captions, it will also delete any orphaned text files that were associated with any deleted imgaes.

the file backupAndPopulate.ps1 will do both of the above processes but also create a ziped backup of the entire website project. 
to run
1. using explorer, browse to julies-art\src\filetools
2. right click backupAndPopulate.ps1 and choose run with powerscript
am just working on a shorcut to a batch file creae a desktop shortcut and run the code
1a. navigate with explorer to filetools then rightclick and run createBackupShortcut.ps1 
2a. this will create a shortcut on the desktop called backup and populate and will have a paintbrush icon
3a. double click the shortcut to:
    i. Run a full project backup
    ii. Populate your Shop and Painting gallery data automatically
    iii. Prompt for new captions or descriptions if needed
    iv. create a date stamped log of the latest changes  


  