#!/usr/bin/env python3
# https://click.palletsprojects.com/en/8.1.x/arguments/
# https://click.palletsprojects.com/en/8.1.x/options/

import click
import math
import sys


def get_prime_factors(n):
    """Returns unique prime factors of n."""
    factors = []
    d = 2
    temp = abs(n)
    while d * d <= temp:
        while temp % d == 0:
            if d not in factors:
                factors.append(d)
            temp //= d
        d += 1
    if temp > 1 and temp not in factors:
        factors.append(temp)
    return factors


class AgoraCmd(click.Command):
    def format_help(self, ctx, formatter):
        click.echo("""Usage:
        - Visit anagora.org/synth to execute this file in the Agora of Flancia.
        - Visit e.g. anagora.org/synth/440 to render an interactive Web Audio synth for 440 Hz.
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
def synth(n):
    """Renders a Web Audio synth widget for number N and its prime factor harmonics."""
    if n <= 0:
        click.echo("Please enter a positive integer frequency.")
        return

    # Scale frequency into audible pitch range (110 Hz - 1760 Hz) if needed
    base_freq = float(n)
    while base_freq < 100:
        base_freq *= 2
    while base_freq > 2000:
        base_freq /= 2

    factors = get_prime_factors(n)
    harmonics = [round(base_freq * f, 1) for f in (factors if factors else [1])]

    click.echo(f"🎵 **Harmonic Synthesizer for [[{n}]]** (Base: `{base_freq:.1f} Hz`)")
    if factors:
        factor_links = ", ".join(f"[[{f}]]" for f in factors)
        click.echo(f"Prime factor harmonics: {factor_links} → `{harmonics} Hz`\n")

    # Embedded Web Audio API controls
    html_widget = f"""<div class="agora-synth-widget" style="border: 1px solid var(--border-color, #ccc); padding: 12px; border-radius: 8px; max-width: 420px; background: rgba(0,0,0,0.03);">
  <div style="margin-bottom: 8px; font-weight: bold;">🎹 Listen to [[{n}]] ({base_freq:.1f} Hz)</div>
  <button onclick="playAgoraTone('{n}', {base_freq}, {harmonics})" style="padding: 6px 14px; margin-right: 8px; cursor: pointer;">▶ Play Harmony</button>
  <button onclick="stopAgoraTone('{n}')" style="padding: 6px 14px; cursor: pointer;">⏹ Stop</button>
  <script>
    if (!window.agoraSynths) window.agoraSynths = {{}};
    function playAgoraTone(id, base, harm) {{
      stopAgoraTone(id);
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const master = ctx.createGain();
      master.gain.value = 0.15;
      master.connect(ctx.destination);

      const freqs = [base, ...harm];
      const oscs = freqs.map(f => {{
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = f;
        osc.connect(master);
        osc.start();
        return osc;
      }});

      window.agoraSynths[id] = {{ ctx, oscs }};
    }}
    function stopAgoraTone(id) {{
      if (window.agoraSynths && window.agoraSynths[id]) {{
        window.agoraSynths[id].oscs.forEach(o => o.stop());
        window.agoraSynths[id].ctx.close();
        delete window.agoraSynths[id];
      }}
    }}
  </script>
</div>"""
    click.echo(html_widget)


if __name__ == '__main__':
    synth()
