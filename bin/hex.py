#!/usr/bin/env python3
# https://click.palletsprojects.com/en/8.1.x/arguments/
# https://click.palletsprojects.com/en/8.1.x/options/

import click
import math
import sys

# I'm not proud (I am a little bit?).
PROOF = [] # :)

class AgoraCmd(click.Command):
    def format_help(self, ctx, formatter):
        click.echo("""Usage:
        - Visit anagora.org/primes to execute this file in the Agora of Flancia.
        - Visit e.g. anagora.org/primes/17 to test if 17 is prime.
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
def hexnum(n, centered=True):
    """Calculates the first n hex numbers: buggy for now, it both under- and over-prints :)."""

    # Going through this from first principles (from memory/deducing this) for fun :) 

    # Why does the first list comprehension I wrote knowing it was wrong not work? 
    # Is it because of its complexity? Note I don't know the 'closed form' for hex numbers yet but I think it exists.
    # To calculate them, I only know you need to add 6 more than after the previous number. 
    # But that can't be (trivially) expressed in a list comprehension.
    # 
    # hexnums = [int(centered) + 6*n for n in range(0,n)]
    # click.echo(f"These are not all hex numbers, but some are: {list(enumerate(hexnums))}")

    # If we could skip one, then two, then three from the list above, 
    # we could exclude all non-hex-numbers.
    # is there something in itertools that can do this for us?
    # I don't think so. Maybe dropwhile with the right lambda?

    # ...anyway, going at it old school.
    # acc = int(centered)
    # for row in range(0, n+1):
    #     acc += 6 * row
    #     click.echo(f"hex({row}) is {acc}.")

    # ...and then https://oeis.org/A003215 to the rescue :)
    # [[crystal ball sequence for hexagonal lattice]]: why does this work?
    # -> https://en.wikipedia.org/wiki/Centered_hexagonal_number
    # It is a cubic polynomial and Wikipedia shows how to convince yourself that it works. 
    # Beautiful :)
    hexnums = [3*n*(n+1)+1 for n in range(0,n+1)]

    for nth, hexnum in enumerate(hexnums):
        click.echo(f"hex({nth}) is {hexnum}.")


if __name__ == '__main__':
    hexnum()
