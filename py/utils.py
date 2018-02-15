import logging
from datetime import datetime, date as dtdate
import calendar
import collections
import importlib
from functools import wraps
from flask import request, current_app, jsonify
import gevent

log = logging.getLogger(__name__)


def json_default(obj):
    if isinstance(obj, datetime):
        if obj.utcoffset() is not None:
            obj = obj - obj.utcoffset()
        millis = int(
            calendar.timegm(obj.timetuple()) * 1000 + obj.microsecond / 1000)
        return millis
    if isinstance(obj, dtdate):
        return obj.isoformat()

    raise TypeError("%r is not JSON serializable" % obj)


def jsonp(func):
    """Wraps JSONified output for JSONP requests."""

    @wraps(func)
    def decorated_function(*args, **kwargs):
        callback = request.args.get('callback', False)
        mimetype = 'application/javascript'

        if callback:
            data = func(*args, **kwargs).data
            content = str(callback) + '(' + data + ')'
            log.debug("content: %s" % content)
            return current_app.response_class(content, mimetype=mimetype)
        else:
            content = func(*args, **kwargs)
            log.debug("content: %s" % content)
            return content

    return decorated_function


def active_wait(predicate, **kw):
    """ """
    assert callable(predicate)
    timeout = kw.get("timeout", 5)
    raise_timeout = kw.get("raise_timeout", False)

    start = datetime.now()
    while True:
        if predicate():
            break
        else:
            now = datetime.now()
            if (now - start).total_seconds() < timeout:
                gevent.sleep(0.01)
            else:
                if raise_timeout:
                    raise TimeoutError("timeout: %d for %s" % (timeout,
                                                               predicate()))
                return predicate()

    return True


def import_proc(name):
    """ import processor based on string at runtime."""
    components = name.split('.')
    mod = importlib.import_module(".".join(components[:-1]))
    mod = getattr(mod, components[-1])
    return mod


# force convert all unicode, workaround json.dumps error
def convert(data):
    if isinstance(data, bytes):
        return data.decode("utf-8", "ignore")
    elif isinstance(data, collections.Mapping):
        return dict(map(convert, data.iteritems()))
    elif isinstance(data, collections.Iterable):
        return type(data)(map(convert, data))
    else:
        return data
