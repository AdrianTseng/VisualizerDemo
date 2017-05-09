from flask import Flask
from flask import render_template, abort, send_file
from jinja2 import TemplateNotFound
from flask_restful import Api
from flask_socketio import SocketIO
from .cases import Cases, UpdateCase, CaseEntities
import config


app = Flask(__name__, static_folder="../static")
app.config.from_object(config)

app.jinja_env.variable_start_string = '{{ '
app.jinja_env.variable_end_string = ' }}'

io = SocketIO(app)


@app.route("/")
def index():
    test_cases = [each.declare() for each in CaseEntities]
    return render_template("layout.html", title="Demo", entities=test_cases)


@app.route('/partials/<path:content>.html')
def partials(content):
    try:
        return render_template("/partials/%s.html" % content, module=content)
    except TemplateNotFound:
        abort(404)


@app.route('/static/<path:filename>')
def static_files(filename):
    return send_file(filename)

api = Api(app=app, prefix="/api")

api.add_resource(Cases, "/cases")
api.add_resource(UpdateCase, "/update/<string:state>")
