from flask import Flask, jsonify
from flask_cors import CORS
#USE: set FLASK_APP=flaskBE.py in CMD to create the environment var
# To see changes without ropening use: set FLASK_DEBUG=1
#Then do flask run
#using http://http:127.0.0.1:5000/
app = Flask(__name__)
CORS(app)

@app.route("/")
@app.route("/mount")     #Allows two routes to lead to same function
def home():
    return jsonify(webTitle='York University Campus Store')

if __name__ == '__main__':
    app.run(debug=True)
