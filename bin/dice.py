#!/usr/bin/env python3
# First time I use [[click]] ~ anagora.org/click, it looks cool like the other [[pallets project]], [[flask]], which we use in [[agora server]].
# https://click.palletsprojects.com/en/8.1.x/arguments/
# https://click.palletsprojects.com/en/8.1.x/options/

import click
import math
import random
import sys

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

def rand(n):
    proof = []
    for i in range(2, n+1):
        r = random.randint(1, i)
        if i == 2:
            proof.append(f"You throw a fair coin and it lands [[{bool(r)}]].")
        else:
            proof.append(f"You throw a die of [[{i}]] sides and it comes up [[{r}]].")
        
    return "\n".join(reversed(proof))

@click.command(cls=AgoraCmd)
@click.argument('n', type=click.INT)
def dice(n):
    """A simple randomness generator, imitating those we know and love from R^4 :)."""
    proof = rand(n)
    click.echo(proof)

if __name__ == '__main__':
    dice()
