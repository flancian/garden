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
    """Calculates the closest musical note to an input frequency in Hz."""
    if freq <= 0:
        click.echo("Frequency must be positive.")
        return

    A4 = 440.0

    # Exact continuous half steps from A4
    n_exact = 12 * math.log2(freq / A4)
    n = round(n_exact)

    # Pitch deviation in cents (100 cents = 1 semitone)
    cents = round((n_exact - n) * 100)

    notes = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]
    note_index = n % 12
    note = notes[note_index]

    octave = 4 + (n // 12)
    if note in ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"]:
        # compensate for octave starting at C
        octave += 1

    note_name = f"{note}{octave}"
    cents_str = f" ({'+' if cents > 0 else ''}{cents} cents)" if cents != 0 else " (perfect pitch)"

    click.echo(f"[[hz/{freq}]] is closest to [[{note_name}]] at [[{freq}]] Hz{cents_str}.")
    click.echo(f"Note class: [[{note}]], Octave: [[octave/{octave}]].")


if __name__ == '__main__':
    hz()

