from flask import Flask,request
import mysql.connector as mysql

mydb = mysql.connect(host = "localhost",user = "root" , passwd = "password",  database = "task_schedule")
cur = mydb.cursor()
print(mydb)

app = Flask(__name__)

# trial_data

@app.route("/info")
def info():

    cur.execute("SELECT * from  info where status = 0  ORDER BY FIELD(Priority,'high','medium','low'),deadline ")
    result = cur.fetchall()

    data = []
    for val in result:
        curdata = dict()
        curdata["id"] = val[0]
        curdata["name"] = val[1]
        curdata["priority"] = val[2]  
        curdata["deadline"] = val[4]  
        data.append(curdata)

    return {
            "taskdata" : data
    }

@app.route('/add_task' , methods = ['POST'])
def add_task():
    data = request.get_json()
    tname = data["taskname"]
    pty = data["priority"]
    ddl = data["deadline"]

    ### insert into database
    ### print(tname , pty )

    cur.execute("SELECT * from  info;")
    result = cur.fetchall()
    LEN = len(result)

    try:
        cur.execute(" insert into info values({},'{}','{}',0,'{}');".format(LEN+1 , tname , pty,ddl))
        mydb.commit()
    except:
        return{
            "result":"failure"
        }
    
    return {
        "result":"success"
    }


@app.route('/delete_task' , methods = ['POST'])
def delete_task():
    data = request.get_json()
    tid = data["taskid"]

    ### delete into database

    cur.execute("update info set status = 1 where taskid = {};".format(tid))
    mydb.commit()
    print("Task Id : " , tid)

    return {
        "result":"successfully deleted  "
    }


if __name__ == "__main__":
    app.run(debug = True)