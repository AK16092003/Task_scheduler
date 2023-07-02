from flask import Flask
import mysql.connector as mysql

app = Flask(__name__)

@app.route("/info")
def info():
    return {
            "taskdata" :
            [
                {"id": 1, "name": 'Brush your teeth', "status": 'true'},
                {"id": 2, "name": 'Take Bath', "status": 'true'},
                {"id": 3, "name": 'Do Competitive Coding' , "status": 'false'}
            ]
    }

if __name__ == "__main__":
    app.run(debug = True)