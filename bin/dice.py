#!/usr/bin/env python3
# https://click.palletsprojects.com/en/8.1.x/arguments/
# https://click.palletsprojects.com/en/8.1.x/options/

import click
import random
import sys


class AgoraCmd(click.Command):
    def format_help(self, ctx, formatter):
        click.echo("""Usage:
        - Visit anagora.org/dice to execute this file in the Agora of Flancia.
        - Visit e.g. anagora.org/dice/20 to roll a d20 (and see rolls for all smaller dice!).
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


def roll_tower(n):
    proof = []
    for i in range(2, n + 1):
        r = random.randint(1, i)
        if i == 2:
            coin = "heads" if r == 2 else "tails"
            proof.append(f"Coin flip (d2): [[{coin}]].")
        else:
            proof.append(f"d[[{i}]] roll: [[{r}]].")
    return list(reversed(proof))


@click.command(cls=AgoraCmd)
@click.argument('n', type=click.INT)
def dice(n):
    """Simulates rolling a d[[n]] die along with a polyhedral dice tower."""
    if n < 1:
        click.echo("Please provide a die size of at least 1.")
        return

    main_roll = random.randint(1, n)
    click.echo(f"🎲 Rolling a d[[{n}]]: result is [[{main_roll}]]!\n")

    if n > 1:
        click.echo(f"Dice tower rolls from d[[2]] up to d[[{n}]]:")
        tower = roll_tower(n)
        for line in tower:
            click.echo(f"  • {line}")


if __name__ == '__main__':
    dice()

