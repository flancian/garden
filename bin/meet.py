#!/usr/bin/env python3
# https://click.palletsprojects.com/en/8.1.x/arguments/
# https://click.palletsprojects.com/en/8.1.x/options/

import click
import os
import re
import sys


def slugify(text):
    """Converts a topic name into a safe room slug."""
    s = re.sub(r'[^\w\s-]', '', text).strip().lower()
    return re.sub(r'[-\s]+', '-', s) or "agora"


def find_custom_meet_link(topic, garden_path=None):
    """Checks the local garden for custom #meet <url> tags associated with the topic."""
    if garden_path is None:
        garden_path = os.path.expanduser("~/garden")

    if not os.path.exists(garden_path):
        return None

    # Check topic.md directly first
    candidates = [
        os.path.join(garden_path, f"{topic}.md"),
        os.path.join(garden_path, f"{topic.lower()}.md"),
    ]

    for candidate in candidates:
        if os.path.exists(candidate):
            try:
                with open(candidate, "r", encoding="utf-8", errors="ignore") as f:
                    for line in f:
                        m = re.search(r'#meet\s+(https?://\S+)', line)
                        if m:
                            return m.group(1)
            except Exception:
                pass

    return None


class AgoraCmd(click.Command):
    def format_help(self, ctx, formatter):
        click.echo("""Usage:
        - Visit anagora.org/meet to execute this file in the Agora of Flancia.
        - Visit e.g. anagora.org/meet/cwg or anagora.org/meet/flancia to launch a video stoa.
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
def meet(topic):
    """Generates a synchronous Video Stoa meeting space for any node."""
    slug = slugify(topic)
    custom_url = find_custom_meet_link(topic)

    primary_url = custom_url or f"https://jitsi.meet.coop/{slug}"
    fallback_url = f"https://meet.jit.si/{slug}"

    click.echo(f"📹 **Video Stoa for [[{topic}]]**\n")
    if custom_url:
        click.echo(f"Found custom meeting room configured in your garden:")
        click.echo(f"👉 **[Launch Custom Video Room]({primary_url})**\n")
    else:
        click.echo(f"👉 **[Launch Video Room (meet.coop)]({primary_url})**")
        click.echo(f"• Alternative fallback: [Launch via meet.jit.si]({fallback_url})\n")

    click.echo(f"📝 Asynchronous coordination & notes: [[stoa/{topic}]]")
    click.echo(f"\n*To designate a custom space, add `#meet <url>` to any subnode under [[{topic}]].*")


if __name__ == '__main__':
    meet()
