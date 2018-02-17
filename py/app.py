"""
"""
from __future__ import print_function
from datetime import date as ddate, timedelta
from conf import settings
import flask
from flask import request, jsonify
from utils import jsonp
import logging
import json
import utils
from gsauthn import extract_kerberoId
# project common
import common

log = logging.getLogger(__name__)

app = flask.Flask(__name__, **settings.APP_SETTINGS)


def index():
    """ list api doc. """

    def default_func(o):
        if callable(o):
            return o.__name__
        return o

    api_text = json.dumps(
        ROUTING_MAP,
        sort_keys=True,
        indent=4,
        separators=(',', ': '),
        default=default_func)

    return "<h1>QFIXWeb API Server</h1>" + "<pre>" + api_text + "</pre>"


@jsonp
def test_jsonp():
    """ """
    print(request.args)
    return jsonify({'hello': 'world'})


@jsonp
def kerberosIdByToken():
    """ """
    args = request.args
    try:
        log.info("query kerberosId: %s" % args)
        token = args["GSSSO"]
        return jsonify(extract_kerberoId(token))
    except Exception as e:
        log.exception(e)
        return jsonify({'error': e})

@jsonp
def query_om2_order():
    """ query om2 order history."""

    args = request.args

    try:
        search = args["q"]
        _, orderId = search.split(":")
        hits = dss_lookup(orderId)
        # return result match ES
        data = {'hits': {'hits': hits}}
        return jsonify(data)

    except Exception as e:
        log.exception(e)
        return jsonify({'error': str(e)})


ROUTING_MAP = {
    'index': {
        'url': '/',
        'func': index
    },

    'kerberosByGSSSOToken': {
        'url': "/kerberosByGSSSOToken",
        'func': kerberosIdByToken
    },

    'test': {
        'url': "/test_jsonp",
        'func': test_jsonp
    },
}

for name, mapping in ROUTING_MAP.items():
    assert 'url' in mapping and 'func' in mapping
    assert callable(mapping['func'])
    app.add_url_rule(mapping['url'], name, mapping['func'])

if __name__ == "__main__":
    """ run a debug server. """
    app.run(settings.HOST, settings.PORT, settings.DEBUG)
