#!/usr/bin/env python3
#
# https://click.palletsprojects.com/en/8.1.x/arguments/
# https://click.palletsprojects.com/en/8.1.x/options/
#
# boilerplate shamelessly cloned from prime.py :).

import click
import math
import random
import sys

class AgoraCmd(click.Command):
    def format_help(self, ctx, formatter):
        click.echo("""Usage:
        - Visit anagora.org/tare to execute this file in the Agora of Flancia.
        - Visit e.g. anagora.org/tare/23 to print 23 syllables.
        - In general visit anagora.org/foo, anagora.org/foo/bar to execute e.g. <bin/foo.py bar> from your garden.
        """)

    def __call__(self, *args, **kwargs):
        try:
            return super(AgoraCmd, self).__call__(
                *args, standalone_mode=False, **kwargs)
        except click.MissingParameter as exc:
            exc.ctx = None
            exc.show(file=sys.stdout)
            click.echo()
            try:
                super(AgoraCmd, self).__call__(['--help'])
            except SystemExit:
                sys.exit(exc.exit_code)

def decompose(n, p):
    ret = []
    while n > 7:
        ret.append(7)
        n -= 7
    if n == 6:
        ret.append(3)
        ret.append(3)
    elif n == 5:
        ret.append(3)
        ret.append(2)
    else:
        ret.append(n)

    return ret

@click.command(cls=AgoraCmd)
@click.argument('n', type=click.INT)
def tare(n):
    """Just for fun, as many of these -- partly inspired by an Asimov story :)"""
    parts = {
        1: ['Om'],
        2: ['Tare', 'Ture'],
        3: ['Tuttare'],
        4: ['Tare Ture'],
        7: ['Tare Tuttare Ture'],
        8: ['Tuttare Tuttare Ture'],
    }
    click.echo(decompose(n, parts))

if __name__ == '__main__':
    tare()
