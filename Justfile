# For docs, see: https://github.com/casey/just/blob/master/README.adoc

# vars
cwd := invocation_directory()

# Setup command
setup:
  @echo "No setup script for {{cwd}} found. Skipping."

# Test command
test: build
  @echo "Test script not found!" && exit 1

# Build this project
build: setup build-docs
  @echo "No build step for {{cwd}}. Skipping."

# Setup docs
setup-docs: setup
  @cd {{cwd}}/docs; bundle install --path vendor/bundle
  @cd {{cwd}}/docs; bundle exec just-the-docs rake search:init

# Build docs
build-docs: setup-docs
  @cd {{cwd}}/docs; bundle exec jekyll build --incremental

# Start docs server
serve-docs: build-docs
  @cd {{cwd}}/docs; bundle exec jekyll serve --incremental

alias docs := serve-docs

# Run yarn commands
yarn +CMD='': setup
  @cd {{cwd}}/src; yarn {{CMD}}

alias y := yarn

# Generate CHANGELOG.md
changelog:
  @./.utils/bin/git-chglog \
    --config .github/chglog/config.yml \
    --output CHANGELOG.md \
    ..$(git describe --tags $(git rev-list --tags --max-count=1))
