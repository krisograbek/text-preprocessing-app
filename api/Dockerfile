# Docker file for the flask API

FROM python:3.8
WORKDIR /app

COPY ./requirements.txt ./api.py ./text_helpers.py ./.flaskenv ./
COPY ./client ./client
RUN pip install -r ./requirements.txt
# the next step isn't necessary in our case but we want to make sure
# that we are in the production mode
ENV FLASK_ENV production

# EXPOSE 5000
# CMD [ "gunicorn", "-b", ":5000", "api:app" ]
CMD [ "gunicorn", "api:app" ]
