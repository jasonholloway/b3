#!/bin/bash

main() {
    pushd ../commit
    build
    if[ publish ] then; 
        switchLambda
    fi
    popd
}

build() {
    sbt assembly
}

publish() {
    aws s3api put-object \
        --bucket ${IMAGE_BUCKET} \
        --key commit/${IMAGE_NAME} \
        --body $IMAGE_PATH
}

switchLambda() {
}

main

