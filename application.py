from flask import Flask, request, render_template, Response
import sys, os

ROOT = os.path.abspath(os.path.dirname(__file__))
app = Flask(__name__)

app.config.from_object('settings')
try:
	app.config.from_object('local_settings')
except:
	pass

@app.route('/', methods=['GET'])
def home():
	return render_template('home.html')

if __name__ == '__main__':
	app.run()
