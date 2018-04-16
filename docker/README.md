Docker image for AraMAP
====================

[ArtinDNA]() is a tool which requires specific environment with a lot of integrated tools. 
This docker image provides all required tools installed by [bioconda](https://bioconda.github.io/)

# Requirements
 - Docker
 - Docker compose
 - Internet connection


# Installation 

> Note: We strongly recommend to use a new version labeled `next`

## Docker compose

Simply use following `docker-compose.yml` file 
and run `docker-compose up` within it's directory.

```yaml
# docker-compose.yml
version: '3'
services:
  web:
    image: "javorka/artin-dna:next"
    ports:
      - "3000:3000"
    volumes:
      - /:/sharedFolder
    network_mode: host
    environment:
      - REFERENCE_GENOME=Arabidopsis_thaliana
```

> Note: Current state of docker image only supports *Arabidopsis_thaliana* as a reference genome

## Custom installation

As you can see from the Docker compose installation, the only things which are needed to set up are:
 - Environment variable `REFERENCE_GENOME` to *Arabidopsis_thaliana* 
 - Network mode to **host** as the internet connection is required to update the ArtinDNA
 - Shared volume as you want to run some samples