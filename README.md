# Description

**Do you need to quickly clean your text?** Feel free to use this [App](https://krisograbek-text-toolbox.herokuapp.com/)

## Sources

This repository is bootstraped from [this template](https://github.com/krisograbek/react-flask-template).

# Demo
![demo](https://user-images.githubusercontent.com/48050596/146919927-66203e7c-e701-48af-8190-04c59df90011.gif)

# Run the project locally

## Prepare the model

### Create and run `virtualenv`

```
$ cd api
$ python3 -m venv venv
$ source venv/bin/activate
```
Note that the above is for Unix-based operating systems. If you are using Windows, then you will do this instead:

```
$ cd api
$ python3 -m venv venv
$ venv\Scripts\activate
```

### Install packages from `requirements.txt`

`(venv) $ pip install -r reqs_local.txt`

### Add the model

This repository does **not** contain the model. It's a bad practice to store big files on Github. The size of our model file (~80MB) is considered big.

If you open the `VGG_training.ipynb` using colab you'll be able to train the same model I used. You'll find the instruction how and where to download the model.
After the steps, your `model/` directory should include `hotdog_vgg.h5`.

We want to use a tflite model for the project. First, we have to convert. To do that, we use the code in `converter.py`:

`(venv) $ python converter.py`

Your `model/` directory should include both `hotdog_vgg.h5` and `hotdog_vgg.tflite` now

## Prepare a Flask API Backend

### Run Flask Backend

```
(venv) $ cd ..
(venv) $ npm run start-api
```

## Prepare Frontend

### Open a second terminal in the project directory

### `npm install`

Installs packages from `package.json`

### `npm start`

Runs the app in the development mode.
### Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


# Deploy Locally

First, navigate to the project directory. Then, run the following commands:
```
$ npm run build
$ cp -r build/* api/client/
$ source venv/bin/activate (linux)
or
$ venv\Scripts\activate (windows)
(venv)$ flask run
```

The app runs in the production mode.
### Open [http://localhost:5000](http://localhost:5000) in your browser


