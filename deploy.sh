#!/bin/sh -x
yarn build
rsync -avzh dist/ bogaeus:/home/henry/sl
