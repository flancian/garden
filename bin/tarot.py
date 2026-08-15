#!/usr/bin/env python3
# https://click.palletsprojects.com/en/8.1.x/arguments/
# https://click.palletsprojects.com/en/8.1.x/options/

import click
import hashlib
import sys

MAJOR_ARCANA = [
    "0. [[The Fool]]",
    "I. [[The Magician]]",
    "II. [[The High Priestess]]",
    "III. [[The Empress]]",
    "IV. [[The Emperor]]",
    "V. [[The Hierophant]]",
    "VI. [[The Lovers]]",
    "VII. [[The Chariot]]",
    "VIII. [[Strength]]",
    "IX. [[The Hermit]]",
    "X. [[Wheel of Fortune]]",
    "XI. [[Justice]]",
    "XII. [[The Hanged Man]]",
    "XIII. [[Death]]",
    "XIV. [[Temperance]]",
    "XV. [[The Devil]]",
    "XVI. [[The Tower]]",
    "XVII. [[The Star]]",
    "XVIII. [[The Moon]]",
    "XIX. [[The Sun]]",
    "XX. [[Judgement]]",
    "XXI. [[The World]]",
]

SUITS = ["Cups", "Pentacles", "Swords", "Wands"]
RANKS = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Page", "Knight", "Queen", "King"]


def get_tarot_card(seed_str):
    """Deterministically draws a Tarot card given a seed string."""
    h = hashlib.sha256(seed_str.encode('utf-8')).hexdigest()
    val = int(h[:8], 16)

    # 22 Major Arcana + 56 Minor Arcana = 78 total
    idx = val % 78

    if idx < 22:
        return MAJOR_ARCANA[idx]
    else:
        minor_idx = idx - 22
        suit = SUITS[minor_idx // 14]
        rank = RANKS[minor_idx % 14]
        return f"[[{rank} of {suit}]]"


class AgoraCmd(click.Command):
    def format_help(self, ctx, formatter):
        click.echo("""Usage:
        - Visit anagora.org/tarot to execute this file in the Agora of Flancia.
        - Visit e.g. anagora.org/tarot/topic or anagora.org/tarot/42 to draw a deterministic card for that node.
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
@click.argument('topic', type=click.STRING)
def tarot(topic):
    """Draws a deterministic Tarot card for any node or seed."""
    card = get_tarot_card(topic)
    click.echo(f"🔮 **Tarot Synchronicity for [[{topic}]]**:")
    click.echo(f"  🎴 Card: {card}")


if __name__ == '__main__':
    tarot()
