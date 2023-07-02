from flask import Flask,request
import mysql.connector as mysql

app = Flask(__name__)

# trial_data

@app.route("/info")
def info():
    return {
            "taskdata" :
            [
                {"id": 1, "name": 'Brush your teeth', "status": 'true'},
                {"id": 2, "name": 'Take Bath', "status": 'true'},
                {"id": 3, "name": 'Do Competitive Coding' , "status": 'true'}
            ]
    }

@app.route('/add_task' , methods = ['POST'])
def add_task():
    data = request.get_json()
    tname = data["taskname"]
    pty = data["priority"]

    ### insert into database
    ### print(tname , pty )
    
    
    return {
        "result":"success"
    }


@app.route('/delete_task' , methods = ['POST'])
def delete_task():
    data = request.get_json()
    tid = data["taskid"]

    ### delete into database
    ### print(tname , pty )
    
    print("Task Id : " , tid)

    return {
        "result":"successfully deleted  "
    }
if __name__ == "__main__":
    app.run(debug = True)