""" simple function to extract gs kerberoId from GSSSO token.
"""
from __future__ import print_function
import sys
import os
import subprocess
import logging
log = logging.getLogger(__name__)

GSAUTHN = "/gns/mw/security/authn/gsauthn-c-current/bin"


def extract_kerberoId(gssso_token):
    """
    example:

    {'Username': 'luosam', 'Last Auth': '1517526018', 'Token Version': '4',
     'GSAuthN_VerifyList on token': '04I27cAAAB1umiAAAAAAAEAAAAAgABAAAABmx1b3NhbQACAAAADjEwLjEzMi4xODkuMjM2AAUAAAAFATPs6QAABgAAAARac5wCAAsAAAAgMTJhMmY2N2E5ZDVmMTFlMGJiNDMwMDIxNWFjZTI2NDgAEAAAAIAEZLOnTjvAQZfHR7xvSynm7COaQinZp087UinQ/P68aZtJZZK2NHFX/NAUU8zEpq3oHacGEbJ70icG0oRnOBZERFDOHi7e+ZxKkozgSTCiWC/KkJWCyN0fiancuLGF8NDA1zRDhUCRnJtowE2EZz+6Si006XwPo27zF2qms0xHdQAAAAAABAAAAEAAAQAAAAZsdW9zYW0AAgAAAA4xMC4xMzIuMTg5LjIzNgAFAAAABQEz7OkAAAYAAAAEWmbXegALAAAAIDEyYTJmNjdhOWQ1ZjExZTBiYjQzMDAyMTVhY2UyNjQ4ABAAAACAI2u4D+st4dFVxJKz6jnglouGvGeF+Ut7aOYXEV54i3CVGnyV01BtRpc2Erx9T02KzSpTqeeSyuqCY1nK86yokt3C8V0awiKTxzn1W9CF+03EAU8rJNVlKy8HBNIV0PN5GYFKm2BuE6CmZR4w8LQ/fqM21jElxN1yJKiGIidyBqs=',
     'Auth Type': '2', 'Your GS ID token is': 'VALID', 'Key Serial': '20180201', 'Last Gen': '0', 'Token Type': 'I',
     'GUID': '12a2f67a9d5f11e0bb4300215ace2648', 'IPAddress': '10.132.189.236'}
    """
    res = []
    p = subprocess.Popen([os.path.join(GSAUTHN, "gsauthn_example"), gssso_token],
                         cwd=GSAUTHN,
                         stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    stdout, stderr = p.communicate()
    out = stdout.split(os.linesep)
    for ln in out:
        if ":" in ln:
            _tmp = ln.split(":", 1)
            res.append((_tmp[0].strip(), _tmp[1].strip()))
    log.info("KerberoId: {}".format(res))
    return dict(res)


if __name__ == "__main__":
    if len(sys.argv) == 2:
        print(extract_kerberoId(sys.argv[1]))
    else:
        print("usage gsauthn.py <GSSSO TOKEN>")
