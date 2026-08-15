#!/usr/bin/env python3
# https://click.palletsprojects.com/en/8.1.x/arguments/
# https://click.palletsprojects.com/en/8.1.x/options/

import click
import datetime
import sys


def get_moon_phase(date_obj):
    """Calculates an approximate moon phase name and emoji for a given date."""
    # Known new moon reference date: 2000-01-06
    ref = datetime.date(2000, 1, 6)
    days = (date_obj - ref).days
    lunation = 29.53058867
    phase = (days % lunation) / lunation

    if phase < 0.03 or phase > 0.97:
        return "🌑 [[New Moon]]"
    elif phase < 0.22:
        return "🌒 [[Waxing Crescent]]"
    elif phase < 0.28:
        return "🌓 [[First Quarter]]"
    elif phase < 0.47:
        return "🌔 [[Waxing Gibbous]]"
    elif phase < 0.53:
        return "🌕 [[Full Moon]]"
    elif phase < 0.72:
        return "🌖 [[Waning Gibbous]]"
    elif phase < 0.78:
        return "🌗 [[Third Quarter]]"
    else:
        return "🌘 [[Waning Crescent]]"


class AgoraCmd(click.Command):
    def format_help(self, ctx, formatter):
        click.echo("""Usage:
        - Visit anagora.org/date to execute this file in the Agora of Flancia.
        - Visit e.g. anagora.org/date/2026-08-15 to render date UX and past year links.
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
@click.argument('date_str', type=click.STRING)
def date_node(date_str):
    """Renders date UX, temporal metadata, and 'On This Day' links for YYYY-MM-DD nodes."""
    try:
        dt = datetime.datetime.strptime(date_str, "%Y-%m-%d").date()
    except ValueError:
        click.echo(f"[[{date_str}]] is not in YYYY-MM-DD date format.")
        return

    prev_day = (dt - datetime.timedelta(days=1)).strftime("%Y-%m-%d")
    next_day = (dt + datetime.timedelta(days=1)).strftime("%Y-%m-%d")

    day_name = dt.strftime("%A")
    month_name = dt.strftime("%B")
    day_of_year = dt.timetuple().tm_yday
    iso_week = dt.isocalendar()[1]
    moon = get_moon_phase(dt)

    click.echo(f"📅 **Date UX for [[{date_str}]]**")
    click.echo(f"◀️ Previous: [[{prev_day}]] | ▶️ Next: [[{next_day}]]\n")

    click.echo(f"• Day of week: [[{day_name}]]")
    click.echo(f"• Month: [[{month_name}]]")
    click.echo(f"• Day of year: [[day/{day_of_year}]] (Week [[week/{iso_week}]])")
    click.echo(f"• Moon phase: {moon}\n")

    # On This Day past links (look back up to 10 years)
    click.echo("📜 **On This Day in Past Years:**")
    past_links = []
    for y_offset in range(1, 11):
        past_year = dt.year - y_offset
        try:
            past_date = datetime.date(past_year, dt.month, dt.day).strftime("%Y-%m-%d")
            past_links.append(f"[[{past_date}]] ({y_offset}y ago)")
        except ValueError:
            # Handles leap day Feb 29 on non-leap years
            continue

    click.echo("  " + " • ".join(past_links))


if __name__ == '__main__':
    date_node()
