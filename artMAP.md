# artMAP
artMAP made the identification of EMS-induced mutations in Arabidopsis easy.


## Introduction
Mapping-by-sequencing is a rapid method for identifying both natural as well as induced variations in the genome. However, it requires extensive bioinformatics expertise along with the computational infrastructure to analyze the sequencing data and these requirements have limited its widespread adoption. In the current study, we develop an easy to use tool, artMAP, to discover ethyl methanesulfonate (EMS) induced mutations in the Arabidopsis genome. The artMAP pipeline consists of well-established tools including TrimGalore, BWA, BEDTools, SAMtools, and SnpEff which were integrated in a Docker container. artMAP provides a graphical user interface and can be run on a regular laptop and desktop, thereby limiting the bioinformatics expertise required. artMAP can process input sequencing files generated from single or paired-end sequencing. The results of the analysis are presented in interactive graphs which display the annotation details of each mutation. Due to its ease of use, artMAP made the identification of EMS-induced mutations in Arabidopsis possible with only a few mouse click.

## Installation

1. First, install **Docker** on your computer. Docker can be installed from https://docs.docker.com/install/
1. Another requirement for running the artMAP is **docker-compose**. For Mac and Windows, docker-compose is a part of docker installation. However, for Linux, you need to install it from https://docs.docker.com/compose/install/. 
1. Place the docker-compose.yml file (link) in the desired folder from where you want to run artMAP
1. Finally, to run artMAP open your command prompt and navigate to the folder where the docker-compose.yml file is placed. Next, type ```docker-compose up``` which will pull the artMAP and run it on port 3000. Now the tool is accessible on http://localhost:3000

Now you are ready to use artMAP for analyzing EMS-induced mutations in Arabidopsis. 

## Credits
[![N|Solid](https://www.artin.cz/wp-content/themes/artin/img/logo.png)](https://www.artinsolutions.com/)
[![N|Solid](http://innovationadvisors.cz/sites/all/files/reference_ceitec_logo.png)](https://www.ceitec.eu/)


## License MIT