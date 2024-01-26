modules:
	npm install

run:
	lsof -i :3000 | awk 'NR!=1 {print $$2}' | xargs -r kill -9
	npm start