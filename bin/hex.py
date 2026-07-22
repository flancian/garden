#!/usr/bin/env python3
# https://click.palletsprojects.com/en/8.1.x/arguments/
# https://click.palletsprojects.com/en/8.1.x/options/

import click
import math
import sys


def get_centered_hex(k):
    """Returns the k-th centered hexagonal number (1-indexed)."""
    if k < 1:
        return None
    return 3 * k * (k - 1) + 1


def check_centered_hex(n):
    """Checks if n is a centered hexagonal number.
    Returns (is_hex, k) if it is, or (False, closest_k) if it isn't.
    """
    if n < 1:
        return False, 1

    # Solve 3k^2 - 3k + 1 - n = 0
    # k = (3 + sqrt(12n - 3)) / 6
    d = 12 * n - 3
    if d < 0:
        return False, 1

    s = math.isqrt(d)
    k_approx = (3 + s) // 6

    # Make sure we check k_approx and its neighbor to find the best fit
    for k in (k_approx, k_approx + 1):
        if get_centered_hex(k) == n:
            return True, k

    return False, k_approx


class AgoraCmd(click.Command):
    def format_help(self, ctx, formatter):
        click.echo("""Usage:
        - Visit anagora.org/hex to execute this file in the Agora of Flancia.
        - Visit e.g. anagora.org/hex/19 to test if 19 is a centered hexagonal number.
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
def hexnum(n):
    """Checks if n is a centered hexagonal number and provides nearest neighbors."""
    is_hex, k = check_centered_hex(n)

    if is_hex:
        click.echo(f"[[{n}]] is the centered hexagonal number #[[{k}]].")
    else:
        click.echo(f"[[{n}]] is *not* a centered hexagonal number.")
        # Find neighbors
        if n < 1:
            h_next = get_centered_hex(1)
            click.echo(f"The first centered hexagonal number is [[{h_next}]] (index #[[1]]).")
        else:
            h1 = get_centered_hex(k)
            h2 = get_centered_hex(k + 1)
            if h1 > n:
                # k was overestimated or we need k-1
                h2 = h1
                k2 = k
                k1 = max(1, k - 1)
                h1 = get_centered_hex(k1)
            else:
                k1 = k
                k2 = k + 1

            if k1 == k2:
                click.echo(f"The closest centered hexagonal number is [[{h1}]] (index #[[{k1}]]).")
            else:
                click.echo(f"The closest centered hexagonal numbers are [[{h1}]] (index #[[{k1}]]) and [[{h2}]] (index #[[{k2}]]).")

    # Always show first 20 centered hexagonal numbers for context
    first_20 = [str(get_centered_hex(i)) for i in range(1, 21)]
    first_20_links = ", ".join(f"[[{x}]]" for x in first_20)
    click.echo(f"\nFirst 20 centered hexagonal numbers: {first_20_links}.")


if __name__ == '__main__':
    hexnum()

