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
        - Visit anagora.org/prompt to execute this file in the Agora of Flancia.
        - Visit e.g. anagora.org/prompt/foo to prompt known models with 'foo'.
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

@click.command(cls=AgoraCmd)
@click.argument('s', type=click.STRING)
def prompt(s):
    """A simple utility to redirect to generation providers."""
    gen = f"https://anagora.org/{s}"
    click.echo(gen)

if __name__ == '__main__':
    prompt()
