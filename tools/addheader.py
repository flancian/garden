#!/usr/bin/python3
# not proud of this but it works (tm).
import pathlib
import titlecase

for filename in pathlib.Path('.').glob('**/*.md'):
    f = open(filename, 'r')
    f_rw = open(filename, 'w')
    print('file: %s' % filename)
    lines = f.readlines()
    if lines:
        if lines[0].startswith('#'):
            print(filename, 'has a header')
            print('---')
        else:
            sanitized_filename = str(filename).replace('-', ' ')
            sanitized_filename = sanitized_filename.replace('.md', '')
            sanitized_filename = sanitized_filename.replace('journal/', '')
            header = '# ' + titlecase.titlecase(sanitized_filename) + '\n'
            print('adding header:', header)
            lines.insert(0, header)
            # uncomment when this actually works.
            # f_rw.writelines(lines)
            print('---')
