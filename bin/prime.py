#!/usr/bin/env python3
# First time I use [[click]] ~ anagora.org/click, it looks cool like the other [[pallets project]], [[flask]], which we use in [[agora server]].
# https://click.palletsprojects.com/en/8.1.x/arguments/
# https://click.palletsprojects.com/en/8.1.x/options/

import click
import math
import sys


def get_prime_factors(n):
    """Computes the full prime factorization of n."""
    factors = []
    d = 2
    temp = abs(n)
    while d * d <= temp:
        while temp % d == 0:
            factors.append(d)
            temp //= d
        d += 1
    if temp > 1:
        factors.append(temp)
    return factors


def get_factor_pairs(n):
    """Returns all proper factor pairs (a, b) such that a * b = n with a <= b."""
    pairs = []
    n_abs = abs(n)
    for i in range(2, math.isqrt(n_abs) + 1):
        if n_abs % i == 0:
            pairs.append((i, n_abs // i))
    return pairs


def get_proper_divisors(n):
    """Returns all proper divisors of n strictly between 1 and n."""
    divs = set()
    n_abs = abs(n)
    for i in range(2, math.isqrt(n_abs) + 1):
        if n_abs % i == 0:
            divs.add(i)
            divs.add(n_abs // i)
    return sorted(list(divs))


def sieve_primes(n):
    """Generates all prime numbers up to n using the Sieve of Eratosthenes."""
    if n < 2:
        return []
    sieve = [True] * (n + 1)
    sieve[0] = sieve[1] = False
    for i in range(2, math.isqrt(n) + 1):
        if sieve[i]:
            for j in range(i * i, n + 1, i):
                sieve[j] = False
    return [i for i, is_p in enumerate(sieve) if is_p]


def format_primes(primes, limit=50):
    """Formats a list of primes with wikilinks, capping output if too long."""
    total = len(primes)
    if total <= limit:
        return ", ".join(f"[[{p}]]" for p in primes)
    else:
        shown = ", ".join(f"[[{p}]]" for p in primes[:limit])
        return f"{shown}, ... ({total} total)"


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


@click.command(cls=AgoraCmd)
@click.argument('n', type=click.INT)
def prime(n):
    """Factors a number using prime decomposition and a [[Sieve of Eratosthenes]]."""
    if n <= 1:
        click.echo(f"[[{n}]] is neither prime nor composite.")
        return

    factors = get_prime_factors(n)
    is_p = (len(factors) == 1)

    if is_p:
        click.echo(f"[[{n}]] is *prime*.")
    else:
        click.echo(f"[[{n}]] is *not prime* (composite). Want proof? :)")
        factor_links = " * ".join(f"[[{f}]]" for f in factors)
        click.echo(f"\nFull prime factorization: {factor_links}")

        pairs = get_factor_pairs(n)
        if pairs:
            click.echo("\nFactor pairs:")
            for a, b in pairs:
                click.echo(f"  [[{n}]] = [[{a}]] * [[{b}]]")

        divs = get_proper_divisors(n)
        if divs:
            divs_str = ", ".join(f"[[{d}]]" for d in divs)
            click.echo(f"\nProper divisors: {divs_str}")

    primes = sieve_primes(n)
    if primes:
        click.echo(f"\nPrimes up to {n}: {format_primes(primes)}.")


if __name__ == '__main__':
    prime()

