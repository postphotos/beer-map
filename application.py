from flask import Flask, request, render_template, Response
import sys, os
import gspread
import json

ROOT = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)

app.config.from_object('settings')
try:
	app.config.from_object('local_settings')
except:
	pass

gdrive_client = gspread.login(app.config['GDRIVE_USER'], app.config['GDRIVE_PASSWORD'])

def _get_json(document_key):
	document = gdrive_client.open_by_key(document_key)
	# get_all_records takes the first row of the spreadsheet and uses it
	# as keys for a dict, which can be turned into valid json"""
	data = document.sheet1.get_all_records()
	#'dumps' is short for 'dump string'
	return json.dumps(data)

def _render_map(document_key, meta = None):
	# This function should be used by all of the functions preceded
	# by the 'route' decorator. Its
	map_json = _get_json(document_key)
	return render_template('map.html', map_json = map_json, meta = meta)


@app.route('/', methods=['GET'])
def home():
	return render_template('home.html')

@app.route('/map-one/', methods=['GET'])
def map_one():
	return _render_map('0AgryR3_lJEaVdEJqQ0dKTEU0VDlCLXFwNWNjS1BDa1E')

if __name__ == '__main__':
	app.run()
