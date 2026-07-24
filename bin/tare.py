#!/usr/bin/env python3
# https://click.palletsprojects.com/en/8.1.x/arguments/
# https://click.palletsprojects.com/en/8.1.x/options/

import click
import sys


def decompose(n):
    """Decomposes n into chunks of 7, 4, 3, 2, and 1."""
    if n <= 0:
        return []
    ret = []
    while n > 7:
        ret.append(7)
        n -= 7
    if n == 6:
        ret.extend([3, 3])
    elif n == 5:
        ret.extend([3, 2])
    else:
        ret.append(n)
    return ret


class AgoraCmd(click.Command):
    def format_help(self, ctx, formatter):
        click.echo("""Usage:
        - Visit anagora.org/tare to execute this file in the Agora of Flancia.
        - Visit e.g. anagora.org/tare/23 to print 23 syllables of the Tara mantra.
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
@click.argument('n', type=click.INT)
def tare(n):
    """Generates [[n]] syllables of the [[Green Tara]] mantra: Om Tare Tuttare Ture Svaha :)"""
    parts = {
        1: '[[Om]]',
        2: '[[Tare]] [[Ture]]',
        3: '[[Tuttare]]',
        4: '[[Tare]] [[Ture]] [[Svaha]]',
        7: '[[Om]] [[Tare]] [[Tuttare]] [[Ture]] [[Svaha]]',
    }

    chunks = decompose(n)
    if not chunks:
        click.echo("Please provide a positive integer count of syllables.")
        return

    mantra_lines = [parts.get(c, f"[[syllables/{c}]]") for c in chunks]
    click.echo(f"[[Green Tara]] mantra breakdown for [[{n}]] syllables:")
    for i, line in enumerate(mantra_lines, 1):
        click.echo(f"  {i}. {line}")

    click.echo(f"\nTotal syllables: [[{n}]]")


if __name__ == '__main__':
    tare()

