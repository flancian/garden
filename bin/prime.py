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


def is_prime(k):
    """Fast deterministic primality test."""
    if k < 2:
        return False
    if k in (2, 3):
        return True
    if k % 2 == 0 or k % 3 == 0:
        return False
    d = 5
    while d * d <= k:
        if k % d == 0 or k % (d + 2) == 0:
            return False
        d += 6
    return True


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


def format_primes(primes, limit=1000):
    """Formats a list of primes with wikilinks without ellipsis."""
    total = len(primes)
    if total <= limit:
        return ", ".join(f"[[{p}]]" for p in primes) + f" ({total} total)"
    else:
        shown = ", ".join(f"[[{p}]]" for p in primes[:limit])
        return f"{shown} (first {limit} of {total} total)"


def print_prime_neighborhood(n, is_p, primes):
    """Prints the local context and prime neighborhood around n."""
    next_primes = []
    k = n + 1
    while len(next_primes) < 4:
        if is_prime(k):
            next_primes.append(k)
        k += 1

    click.echo("\nPrime neighborhood:")
    if is_p:
        prev_p = primes[-2] if (primes and len(primes) >= 2) else None
        if prev_p is None:
            # Fall back to search backwards if primes list not available
            k_prev = n - 1
            while k_prev >= 2:
                if is_prime(k_prev):
                    prev_p = k_prev
                    break
                k_prev -= 1

        next_p = next_primes[0]

        prev_primes = primes[-4:-1] if (primes and len(primes) >= 2) else []
        if not prev_primes and prev_p:
            prev_primes = [prev_p]

        if prev_p:
            click.echo(f"  Preceding prime: [[{prev_p}]] (distance -{n - prev_p})")
        click.echo(f"  Following prime: [[{next_p}]] (distance +{next_p - n})")

        relations = []
        if n == 2:
            relations.append("the only even prime")
        if prev_p and n - prev_p == 2:
            relations.append(f"[twin prime](https://en.wikipedia.org/wiki/Twin_prime) with [[{prev_p}]]")
        if next_p - n == 2:
            relations.append(f"[twin prime](https://en.wikipedia.org/wiki/Twin_prime) with [[{next_p}]]")
        if prev_p and n - prev_p == 4:
            relations.append(f"[cousin prime](https://en.wikipedia.org/wiki/Cousin_prime) with [[{prev_p}]]")
        if next_p - n == 4:
            relations.append(f"[cousin prime](https://en.wikipedia.org/wiki/Cousin_prime) with [[{next_p}]]")
        if prev_p and n - prev_p == 6:
            relations.append(f"[sexy prime](https://en.wikipedia.org/wiki/Sexy_prime) with [[{prev_p}]]")
        if next_p - n == 6:
            relations.append(f"[sexy prime](https://en.wikipedia.org/wiki/Sexy_prime) with [[{next_p}]]")
        if relations:
            click.echo(f"  Special relations: {', '.join(relations)}.")

        left_str = ", ".join(f"[[{p}]]" for p in prev_primes)
        right_str = ", ".join(f"[[{p}]]" for p in next_primes[:3])
        if left_str:
            click.echo(f"  Local context: {left_str} < **[[{n}]]** < {right_str}")
        else:
            click.echo(f"  Local context: **[[{n}]]** < {right_str}")
    else:
        prev_p = primes[-1] if primes else None
        if prev_p is None:
            k_prev = n - 1
            while k_prev >= 2:
                if is_prime(k_prev):
                    prev_p = k_prev
                    break
                k_prev -= 1

        next_p = next_primes[0]

        prev_primes = primes[-3:] if primes else []
        if not prev_primes and prev_p:
            prev_primes = [prev_p]

        if prev_p:
            click.echo(f"  Nearest preceding prime: [[{prev_p}]] (distance -{n - prev_p})")
        click.echo(f"  Nearest following prime: [[{next_p}]] (distance +{next_p - n})")
        if prev_p:
            gap = next_p - prev_p
            click.echo(f"  Prime gap containing **[[{n}]]**: {gap} (interval `[[{prev_p}]]` to `[[{next_p}]]`)")
            if gap == 2:
                click.echo(f"  Special: lies between [twin primes](https://en.wikipedia.org/wiki/Twin_prime) [[{prev_p}]] and [[{next_p}]].")
            left_str = ", ".join(f"[[{p}]]" for p in prev_primes)
            right_str = ", ".join(f"[[{p}]]" for p in next_primes[:3])
            if left_str:
                click.echo(f"  Local context: {left_str} < **[[{n}]]** < {right_str}")
            else:
                click.echo(f"  Local context: **[[{n}]]** < {right_str}")


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
        click.echo(f"**[[{n}]]** is *prime*.")
    else:
        click.echo(f"**[[{n}]]** is *not prime* (composite). Want proof? :)")
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

    MAX_FULL_SIEVE = 2_000_000
    primes = sieve_primes(n) if n <= MAX_FULL_SIEVE else []

    print_prime_neighborhood(n, is_p, primes)

    if primes:
        click.echo(f"\nPrimes up to {n}: {format_primes(primes)}.")
    elif n > MAX_FULL_SIEVE:
        click.echo(f"\n(Primes up to {n} omitted to conserve memory).")


if __name__ == '__main__':
    prime()

