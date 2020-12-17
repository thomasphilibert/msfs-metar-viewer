# FSPM VFR Map

## How to build the project
First you need to install the fspm (package manager)

```
> npm install -g fspm
```
To debug it run
```
> npm start 
```
And you shound see the app running in localhost
To build the app run
```
> npm run build 
```
It makes an app package in `./fspm-build/vfrmap.tar.gz` 

## Description

It's a map. With your plane moving in it. In the Sim. Without any external apps needing to run.

*And it is an Alpha - Meaning, I didn't try it out on a larger crowd. Before cursing me if something is not right, please just report a bug, it's probably fixable.*

It's here:
https://www.youtube.com/watch?v=L1EkBedOcYw


There's a basic "world" layer, generously hosted  by [Carto](https://carto.com/), using the [OSM](https://www.openstreetmap.org/) data.
There is also a layer you can select with some info about airspaces and nav data from the [OpenAIP](https://www.openaip.net/) database (unfortunatelly not interactive, yet).

There's also some more info about your flight and the missing wind direction.

You can teleport anywhere by clicking on the map and then choosing altitude, speed etc. Please be patient or pause after the teleport, until the space around you warps back into existence.

To install, unzip the file and copy the folder 'fspm-panel-vfrmap' to the MSFS Community folder.

*Beware: I noticed once, on the first install, when I started it first - the game crashed (VFR maps...). After the restart all is good, never crashed the game again. Just in case, when you start it first time, don't do it at the end of the long flight*

