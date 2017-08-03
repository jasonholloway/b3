#!/bin/bash
TS_NODE_CACHE_DIRECTORY=${PWD}/.tsnode \
    mocha --compilers ts:ts-node/register,tsx:ts-node/register $@ ./src/**/*.ts
