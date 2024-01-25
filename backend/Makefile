reqs:
	pip install -r requirements.txt

run: 
	lsof -i :5000 | awk 'NR!=1 {print $$2}' | xargs -r kill -9
	python3 run.py