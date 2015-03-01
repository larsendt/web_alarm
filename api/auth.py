import hmac
import hashlib
import time

with open("../password.txt", "r") as f:
    PASSWORD = f.read().rstrip("\n")

def hmac_cmp(mac, form_data, tstamp):
    keys = sorted(form_data.keys())
    datastr = ""
    for key in keys:
        datastr += str(key) + "=" + str(form_data[key]) + ","
    datastr += "hmac-timestamp=" + str(tstamp)
    newdigest = "hmac-sha256=" + hmac.new(PASSWORD, datastr, digestmod=hashlib.sha256).hexdigest()
    if len(newdigest) != len(mac):
        return False
    ok = True
    for (a,b) in zip(newdigest, mac):
        if a != b:
            ok = False
    return ok

def check_auth(mac, form_data):
    if not isinstance(mac, str) and not isinstance(mac, unicode):
        return False

    now = int(time.time()) 
    oks = []
    window = 5
    for i in range(-window, window):
        oks.append(hmac_cmp(mac, form_data, now+i))

    return any(oks)
