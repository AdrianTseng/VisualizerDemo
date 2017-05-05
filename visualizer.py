from flask import render_template, redirect, abort, url_for
from jinja2 import TemplateNotFound
from flask import Flask
import config

__author__ = "郑启明"

app = Flask(__name__, static_folder="static")
app.config.from_object(config)

app.jinja_env.variable_start_string = '{{ '
app.jinja_env.variable_end_string = ' }}'


@app.route("/")
def index():
    try:
        return render_template("layout.html", title="Demo")
    except TemplateNotFound:
        abort(404)


@app.route('/partials/<path:content>.html')
def partials(content):
    try:
        return render_template("/partials/%s.html" % content, module=content)
    except TemplateNotFound:
        abort(404)


@app.route('/static/<path:static_file>')
def statics(static_file):
    return url_for('static', static_file)


app.run()
