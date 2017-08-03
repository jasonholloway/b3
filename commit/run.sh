#!/bin/bash

main() {
    coproc lambda
    nc -kl 0.0.0.0 7777 <&"${COPROC[0]}" >&"${COPROC[1]}" 
}


lambda() {
    java \
      -classpath $(cat .classpath) \
      -Xdebug \
      -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005,quiet=y \
      woodpigeon.bb.commit.Main
}

main

