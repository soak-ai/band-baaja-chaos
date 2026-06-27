#!/bin/sh
# The preview launcher can't read ~/Downloads (sandbox), so the dev server
# runs from a mirror in /tmp. Run this after editing source to sync it over.
rsync -a --delete --exclude node_modules "/Users/akshitagupta/Downloads/band baaja/app/" /tmp/bbc-preview/app/
