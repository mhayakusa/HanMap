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
#    return render_template('populationmap.html')
@app.route('/index.html')
def index():
    session.permanent = True  
    session["start"] = True 
    return render_template('index.html')
#    return render_template('populationmap.html')
@app.route('/HanMap.html')
def HanMap():
    session.permanent = True  
    session["start"] = True 
    return render_template('HanMap.html')
#    return render_template('populationmap.html')

@app.route('/Hyougo_HanMap.html')
def Hyougo_HanMap():
    session.permanent = True  
    session["start"] = True 
    return render_template('Hyougo_HanMap.html')
#    return render_template('populationmap.html') 

@app.route('/Explanation.html')
def Explanation():
    session.permanent = True  
    session["start"] = True 
    return render_template('Explanation.html')


@app.route('/test.html')
def test():
    session.permanent = True  
    session["start"] = True 
    return render_template('test.html')

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)