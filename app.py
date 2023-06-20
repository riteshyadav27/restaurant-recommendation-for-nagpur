from flask import Flask,request,jsonify
import cloudpickle

model = cloudpickle.load(open('./model.pkl','rb'))

app=Flask(__name__)

@app.route('/')
def home():
    return "Hello World"

@app.route('/predict',methods=['POST'])
def predict():
    lat = float(request.form.get('lat'))
    lon = float(request.form.get('lon'))
    rad = float(request.form.get('rad'))
    cat = request.form.get('cat')

    
    result = model(lat,lon,rad,cat)
    # result = {'lat':lat,'lon':lon,'rad':rad,'cat':cat}

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)