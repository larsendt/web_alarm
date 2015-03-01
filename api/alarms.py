import sqlite3

DB = "../alarms.sqlite"

def convert_field(field, lowbound, highbound):
    field = int(field)
    if field < lowbound or field > highbound:
        raise ValueError("Field is outside bounds")
    return field



def init_db():
    conn = sqlite3.connect(DB)
    conn.execute("""CREATE TABLE IF NOT EXISTS alarms (id TEXT NOT NULL,
                                                       day INTEGER NOT NULL,
                                                       hour INTEGER NOT NULL,
                                                       minute INTEGER NOT NULL,
                                                       second INTEGER NOT NULL)""")
    conn.commit()
    conn.close()

init_db()

def all_alarms():
    conn = sqlite3.connect(DB)
    c = conn.cursor()
    c.execute("SELECT * FROM alarms")

    alarms = []
    for (id, day, hour, minute, second) in c.fetchall():
        alarms.append({"id":id, "day":day, "hour":hour, 
                       "minute":minute, "second":second})
    conn.close()
    return alarms


def create(id, day, hour, minute, second):
    if id == None:
        return "id"

    try:
        day = convert_field(day, 0, 6)
    except:
        return "day"

    try:
        hour = convert_field(hour, 0, 23)
    except:
        return "hour"

    try:
        minute = convert_field(minute, 0, 59)
    except:
        return "minute"

    try:
        second = convert_field(second, 0, 59)
    except:
        return "second"

    conn = sqlite3.connect(DB)
    conn.execute("INSERT INTO alarms VALUES (?,?,?,?,?)", 
            (id, day, hour, minute, second))
    conn.commit()
    conn.close()

    return None

def delete(id):
    conn = sqlite3.connect(DB)
    conn.execute("DELETE FROM alarms WHERE id=?", (id,))
    conn.commit()
    return True
