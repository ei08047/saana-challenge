FROM mongo:3.2

COPY init.json /init.json
CMD mongoimport --host 172.16.0.1 --port 27017 --db test --collection dummy --type json --file /init.json --jsonArray -vvvvv --bypassDocumentValidation