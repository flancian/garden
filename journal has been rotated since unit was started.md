- [[systemd]], you had one job? but OK I guess:
	- #go https://dev.to/brisbanewebdeveloper/amend-journal-has-been-rotated-since-unit-was-started-on-x1-extreme-gen-2-x1e2-5eme
	- by default journalctl logs are stored in /run, which in my servers seems to be tmps + small, and it uses only 10% of space available in that partition.