""" query mongodb

"""
from datetime import datetime
from pprint import pprint
import pymongo
import pytz
from conf import settings


mongo_client = pymongo.MongoClient("mongodb://dss_client:dss_client@%s:%s" % settings.MONGO_CFG)


def query_db_info():
    """ query all available db and info

    """
    info = {}
    # list all db names
    db_names = [i for i in mongo_client.database_names() if i not in ("admin", "local", "test")]

    for name in db_names:
        db = mongo_client.get_database(name)
        colls = db.collection_names()
        app_colls = [i for i in colls if i not in ("system.indexes",)]
        # has_idx = "system.indexes" in colls
        is_cel = True if "dss" in app_colls else False
        is_vk = True if "vk" in app_colls else False
        info[name] = {
            'collections': app_colls,
            # 'index': has_idx,
        }
        if is_cel:
            info[name]['om2'] = True
        if is_vk:
            info[name]['viking'] = True

    return info


db_info = query_db_info()


def tail_engine(name, **kw):
    """ tail engine record

    """

    now = datetime.now()
    sod = datetime(now.year, now.month, now.day, 0, 0, 0)
    sod_utc = sod.astimezone(pytz.utc)

    last = kw.get("last", 10)
    head = kw.get("head", False)
    date = kw.get("date", sod_utc)  # default since SOD

    om2_dbs = dict(filter(lambda x: x[1].get("om2") is True, db_info.items()))

    assert name in om2_dbs, "Error name: {} not found in dbs: {}".format(name, list(om2_dbs.keys()))

    db = om2_dbs[name]
    colls = db["collections"]
    assert "engine" in colls, "Error: db {} no engine {}".format(name, db)

    direct = pymongo.ASCENDING

    if head:
        direct = pymongo.DESCENDING

    cur = mongo_client.get_database(name)\
                      .get_collection("engine")\
                      .find({"timestamp": {"$gt": date}},
                            limit=int(last),
                            sort=[('timestamp', direct)])

    res = [r for r in cur]
    return res


if __name__ == "__main__":
    pprint(query_db_info())
    data = tail_engine("PPSJPCEA", last=5)

    pprint(data)
    print(len(data))
