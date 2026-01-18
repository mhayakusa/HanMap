import os
from flask import Flask, render_template, request,session

app = Flask(__name__)
app.secret_key = 'abcdefghijihgfe'
#app.permanent_session_lifetime = timedelta(minutes=3) 

@app.route('/')
def main():
    session.permanent = True  
    session["start"] = True 
    return render_template('index.html')

@app.route('/index.html')
def index():
    session.permanent = True  
    session["start"] = True 
    return render_template('index.html')

@app.route('/Kansai_Map.html')
def Kansai_Map():
    session.permanent = True  
    session["start"] = True 
    return render_template('Kansai_Map.html')

@app.route('/Hyougo_Map.html')
def Hyougo_Map():
    session.permanent = True  
    session["start"] = True 
    return render_template('Hyougo_Map.html')

@app.route('/Explanation.html')
def Explanation():
    session.permanent = True  
    session["start"] = True 
    return render_template('Explanation.html')

@app.route('/manual.html')
def manual():
    session.permanent = True  
    session["start"] = True 
    return render_template('manual.html')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)