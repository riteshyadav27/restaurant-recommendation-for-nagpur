from flask import Flask,request,jsonify
import cloudpickle

model = cloudpickle.load(open('model.pkl','rb'))

from flask_cors import CORS, cross_origin


app=Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
@cross_origin()

@app.route('/')
def home():
    return "Hello World"

@app.route('/predict',methods=['POST'])
def predict():
    lat = float(request.form.get('lat'))
    lon = float(request.form.get('lon'))
    rad = float(request.form.get('rad'))
    restroom = float(request.form.get('restroom'))
    wifi = float(request.form.get('wifi'))
    cat = request.form.get('cat')

    print(lat)
    print(lon)
    print(rad)
    print(cat)
    print(restroom)
    print(wifi)
    
    result = model(lat,lon,rad,cat,restroom,wifi)
    # result = {'lat':lat,'lon':lon,'rad':rad,'cat':cat}

    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)