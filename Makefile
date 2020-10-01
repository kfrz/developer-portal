## It may be helpful to set UNAME=root GNAME=root if running locally as the container runs as jenkins by default.
## --- 
#
#
# Sets user, this is helpful to run locally as you most likely do not have a jenkins user on your machine.
UNAME ?= root
# Sets group, this is helpful to run locally as you most likely do not have a jenkins group on your machine.
GNAME ?= root
# Sets default audit level for security scans
AUDIT_LEVEL?= high
# Sets Branch
BRANCH ?= notmaster
# Sets default env 
ENV ?= dev

.PHONY: help
help : Makefile
	@sed -n 's/^##//p' $<

## build:		builds developer-portal container environment
.PHONY: build
build:
	docker build -t developer-portal .

## test:		runs all tests
.PHONY: test 
test: security unit lint accessibility e2e visual

## images:	checks if you are using git-lfs.	
.PHONY: images 
images:
	./prohibit_image_files.sh origin/master HEAD

## security:	runs npm audit at AUDIT_LEVEL
.PHONY: security
security:
	docker run --rm \
		--volume "/application/node_modules" \
		--volume "${PWD}:/application" \
		developer-portal npm audit --audit-level ${AUDIT_LEVEL}


## unit:		runs unit test script 
.PHONY: unit
unit:
	@echo "Running unit tests"
	docker run  --rm \
		--user ${UNAME}:${GNAME} \
		--volume "/application/node_modules" \
		--volume "${PWD}:/application" \
		developer-portal npm run-script test:unit:ci \
	 
## lint:		runs linting 
.PHONY: lint
lint:
	@echo "Running lint tests"
	docker run  --rm \
		--user ${UNAME}:${GNAME} \
		--volume "${PWD}:/application" \
		--volume "/application/node_modules" \
		developer-portal npm run-script lint:ci

## visual:	runs visual regression tests 
.PHONY: visual
visual:
	@echo "Running visual tests"
	docker run --rm \
		--user ${UNAME}:${GNAME} \
		--volume "${PWD}:/application" \
		--volume "/application/node_modules" \
		developer-portal npm run test:visual
	 
## e2e:		runs end to end tests
.PHONY: e2e
e2e:
	@echo "Running e2e tests"
	docker run --rm \
		--user ${UNAME}:${GNAME} \
		--volume "${PWD}:/application" \
		--volume "/application/node_modules" \
		developer-portal npm run-script test:e2e:ci

## accessibility:	runs accessibility tests
.PHONY: accessibility
accessibility:
	@echo "Running accessibility tests"
	docker run --rm \
		--user ${UNAME}:${GNAME} \
		--volume "${PWD}:/application" \
		--volume "/application/node_modules" \
		developer-portal npm run-script test:accessibility:ci

## build_app:	builds the developer-portal website, and copies to host
.PHONY: build_app 
build_app:
	docker run --rm \
		--volume "${PWD}:/application" \
		--volume "/application/node_modules" \
		--env NODE_ENV=production \
		--env BUILD_ENV=${ENV} \
		--user ${UNAME}:${GNAME} \
		developer-portal npm run-script build ${ENV}

## archive:	builds tar ball of local build
.PHONY: archive 
archive:
	tar -C build/${ENV} -cf build/${ENV}.tar.bz2 .