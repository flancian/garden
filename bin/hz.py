#!/usr/bin/env python3
# https://click.palletsprojects.com/en/8.1.x/arguments/
# https://click.palletsprojects.com/en/8.1.x/options/

import click
import math
import sys

class AgoraCmd(click.Command):
    def format_help(self, ctx, formatter):
        click.echo("""Usage:
        - Visit anagora.org/hz to execute this file in the Agora of Flancia.
        - Visit e.g. anagora.org/hz/523 to test which note 523hz is the closest to (should return C5)
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
@click.argument('freq', type=click.FLOAT)
def hz(freq):
    """Calculates the closest note to input hz :)"""

    A4 = 440

    # Number of half steps away.
    n = 12 * math.log2(freq / A4)
    n = round(n)
    note_index = n % 12

    notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
    note = notes[note_index]

    octave = 4 + (n // 12)
    if note in ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]:
        # compensate for the fact that octaves are counted from C
        octave += 1

    click.echo(f"hz({freq}) is {note}{str(octave)}.")
    # click.echo(f"hz({freq}) is {note}.")


if __name__ == '__main__':
    hz()
