#! /bin/bash

docker-compose up &

pushd ../commit
export SDB_URL=localhost:8080
export S3_URL=localhost:4569

#PS1='bb>> ' bash --login --noprofile
zsh

unset S3_URL
unset SDB_URL
popd

docker-compose down
