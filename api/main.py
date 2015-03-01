#!/usr/bin/env python

from flask import Flask, Response, request
from flup.server.fcgi import WSGIServer
from functools import wraps
import json
import alarms

app = Flask(__name__)
app.debug = False

def json_response(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        ret = func(*args, **kwargs)
        if isinstance(ret, tuple) and len(ret) == 2:
            resp = Response(json.dumps(ret[0]), status=ret[1], mimetype="application/json")
        else:
            resp = Response(json.dumps(ret[0]), status=200, mimetype="application/json")
        return resp
    return wrapper

def auth_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        mac = request.form.get("hmac-sha256")
        if mac == None:
            return "unauthorized", 403
        else:
            return func(*args, **kwargs)
    return wrapper

@app.route("/api", methods=["GET", "POST"])
@json_response
@auth_required
def api_index():
    return "ok", 404

@app.route("/api/alarms")
@json_response
@auth_required
def get_alarms():
    a = alarms.all_alarms()
    return {"alarms":a}, 200

@app.route("/api/alarms/create", methods=["POST"])
@json_response
@auth_required
def create_alarm():
    day = request.form.get("day")
    hour = request.form.get("hour")
    minute = request.form.get("minute")
    second = request.form.get("second")
    id = request.form.get("id")

    error = alarms.create(id, day, hour, minute, second)
    if error == None:
        return "ok", 200
    elif error == "id exists":
        return {"error":"alarm with id %s already exists" % id}, 400
    else:
        return {"error":"field %s was missing or invalid" % error}, 400

@app.route("/api/alarms/delete", methods=["POST"])
@json_response
@auth_required
def delete_alarm():
    id = request.form.get("alarm_id")
    ok = alarms.delete(id)
    if ok:
        return "ok", 200
    else:
        return {"error": "failed to delete alarm %s" % id}, 400

if __name__ == "__main__":
    SOCK = "/home/dev/sockets/alarm.fcgi.sock"
    WSGIServer(app, bindAddress=SOCK, umask=777).run()
