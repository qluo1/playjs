"""
"""
import os
import socket

APP_SETTINGS = {

}

HOST = socket.gethostname()
PORT = 5001

DEBUG = True


# om2 mongodb
MONGO_HOST = os.environ.get("MONGO_HOST", "d48965-026")
MONGO_PORT = int(os.environ.get("MONGO_PORT", 20727))

# using om2 secondary as main storage.
MONGO_CFG = (MONGO_HOST, MONGO_PORT)


