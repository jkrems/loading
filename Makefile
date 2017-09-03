default: build

build:
	rm -rf cjs mjs
	mkdir -p cjs mjs
	node generate.js
