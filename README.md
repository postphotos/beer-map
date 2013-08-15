beer-map
========

*Do this:* http://conjurecode.com/python-environment-for-ubuntu-part-1/ to make sure your box is all situated with Python before virtualenv install.

 
*Then run:*
pip install virtualenv
pip install virtualenvwrapper
 
cd into the working directory of beer-map and run:
*mkvirtualenv beermap*

(this creates the virtualenv. You prompt should change, such that (beermap) precedes whatever your prompt is. here's what mine looks like:
*(beermap)beatpanda@lulu:~/dev/leo/beer-map$*

*then run:*
pip install -r requirements.txt
pip install gspread 

This will install dependencies for the app, within virtualenv.

To start the app, run:
*python application.py*


and go to:
*localhost:5000*

To get in to the virtualenv in the future, run
*workon beermap*
