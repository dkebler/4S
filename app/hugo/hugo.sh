#!/bin/bash
pwd
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
echo $DIR
# subl test.sublime-project
hugo --destination="../../public" --buildDrafts --source=$DIR

