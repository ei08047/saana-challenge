FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongo-server --port 27017 --db test --collection dummy --type json --file /init.json --jsonArray -vvvvv
