SHELL := /bin/bash
TEMP_FILE := $(shell mktemp)

cliaction.release:  ## Release the cli-action
        @bash ./release.sh
