#!/usr/bin/env python3
# https://click.palletsprojects.com/en/8.1.x/arguments/
# https://click.palletsprojects.com/en/8.1.x/options/

import click
import glob
import os
import re
import subprocess
import sys


def parse_stance_from_line(line):
    """Detects voting or delegation stances in a line of markdown."""
    line_clean = line.strip()

    # Delegation: #delegate [[Person]] or #delegate @user
    m_del = re.search(r'#delegate\s+(\[\[([^\]]+)\]\]|@?([\w-]+))', line, re.IGNORECASE)
    if m_del:
        target = m_del.group(2) or m_del.group(3)
        return "DELEGATE", f"[[{target}]]", line_clean

    # For: #for, #vote for, #vote yes, #vote assent
    if re.search(r'#(vote\s+)?(for|assent|yes|in-favor)\b', line, re.IGNORECASE):
        return "FOR", "[[For]] / [[Assent]]", line_clean

    # Against: #against, #vote against, #vote no, #vote block
    if re.search(r'#(vote\s+)?(against|block|no|dissent)\b', line, re.IGNORECASE):
        return "AGAINST", "[[Against]] / [[Block]]", line_clean

    # Abstain: #vote abstain, #vote stand-aside, #neutral
    if re.search(r'#(vote\s+)?(abstain|stand-aside|neutral)\b', line, re.IGNORECASE):
        return "ABSTAIN", "[[Stand Aside]] / [[Abstain]]", line_clean

    return None, None, None


def scan_garden_stances(topic, garden_path=None):
    """Scans the local garden for user stances related to the topic."""
    if garden_path is None:
        garden_path = os.path.expanduser("~/garden")

    if not os.path.exists(garden_path):
        return []

    found = []

    # 1. Directly check topic file (e.g. topic.md, topic.lower().md)
    candidate_files = list(dict.fromkeys([
        os.path.join(garden_path, f"{topic}.md"),
        os.path.join(garden_path, f"{topic.lower()}.md"),
        os.path.join(garden_path, f"{topic.capitalize()}.md"),
        os.path.join(garden_path, f"{topic.replace(' ', '-')}.md"),
        os.path.join(garden_path, f"{topic.replace(' ', '_')}.md"),
    ]))

    for cpath in candidate_files:
        if os.path.isfile(cpath):
            try:
                with open(cpath, "r", encoding="utf-8", errors="ignore") as f:
                    for line in f:
                        kind, label, raw = parse_stance_from_line(line)
                        if kind:
                            found.append((kind, label, raw, os.path.basename(cpath)))
            except Exception:
                pass

    if found:
        return found

    # 2. If not found in topic file, quick search via grep across markdown files
    try:
        cmd = [
            "grep", "-rnIEi",
            "--max-count=5",
            "--include=*.md",
            rf"#(for|against|vote|delegate).*(\b{re.escape(topic)}\b|\[\[{re.escape(topic)}\]\])|(\b{re.escape(topic)}\b|\[\[{re.escape(topic)}\]\]).*#(for|against|vote|delegate)",
            garden_path,
        ]
        res = subprocess.run(cmd, capture_output=True, text=True, timeout=1.5)
        if res.returncode == 0 and res.stdout:
            for line in res.stdout.strip().split("\n"):
                parts = line.split(":", 2)
                if len(parts) >= 3:
                    fpath, lineno, text = parts[0], parts[1], parts[2]
                    kind, label, raw = parse_stance_from_line(text)
                    if kind:
                        fname = os.path.relpath(fpath, garden_path)
                        found.append((kind, label, raw, fname))
    except Exception:
        pass

    return found


class AgoraCmd(click.Command):
    def format_help(self, ctx, formatter):
        click.echo("""Usage:
        - Visit anagora.org/vote to execute this file in the Agora of Flancia.
        - Visit e.g. anagora.org/vote/moloch or anagora.org/vote/peace to deliberate and inspect stances.
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
def vote(topic):
    """Liquid Democracy & Sociocratic deliberation action for any topic."""
    click.echo(f"🗳️ **Deliberation & Voting on [[{topic}]]**\n")

    stances = scan_garden_stances(topic)
    if stances:
        click.echo("👤 **Your Recorded Stance in this Garden:**")
        for kind, label, raw, source in stances:
            if kind == "FOR":
                badge = "🟢"
            elif kind == "AGAINST":
                badge = "🔴"
            elif kind == "ABSTAIN":
                badge = "🟡"
            else:
                badge = "🌊"
            click.echo(f"  • {badge} {label} (in `[[{source}]]`)")
            click.echo(f"    > \"{raw}\"")
        click.echo()
    else:
        click.echo(f"👤 **Your Stance in this Garden:** No explicit stance recorded yet for [[{topic}]].\n")

    # The Agora Heterarchical Ballot
    click.echo("⚖️ **The Agora Ballot (Liquid Democracy & Sociocracy):**")
    click.echo(f"  • 🟢 **[[For]] / [[Assent]]**: \"I am #for [[{topic}]]\" or `#vote for` (consent without objection).")
    click.echo(f"  • 🔴 **[[Against]] / [[Block]]**: \"I am #against [[{topic}]]\" or `#vote against` (principled objection).")
    click.echo(f"  • 🟡 **[[Stand Aside]]**: `#vote abstain` (reservations, but will not block the collective).")
    click.echo(f"  • 🌊 **[[Delegate]]**: `#delegate [[person]]` (delegate your voice on this topic to a trusted peer).\n")

    click.echo(f"💡 *In the Agora, you vote by writing in your own garden. Add your stance to [[{topic}]] or your daily journal, and it will federate across the commons.*")


if __name__ == '__main__':
    vote()
