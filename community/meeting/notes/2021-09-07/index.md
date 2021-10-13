# Podman Community Meeting
## September 7, 2021 11:00 a.m. Eastern (UTC-4)

### Attendees (18 total)
Tom Sweeney, Jhon Honce, Dan Walsh, Chris Evich, Urvashi Mohnani, Nalin Dahyabhai, Eduardo Santiago, Matt Heon, Paul Holzinger, Erik Bernoth, Charlie Doern, Chris Evich, Scott McCarty, Anders Björklund, Lokesh Mandvekar, Valentin Rothberg, Guillaume Rose, Rudolf Vesely

## Meeting Start: 11:03 a.m.
### BlueJeans [Recording](https://bluejeans.com/s/16n3v6p@XWp/)


## Official Debian/Ubuntu Packages Updates
### Reinhard Tartler/Lokesh Mandvekar
#### (1:42 in the video)

- Debian 11/bullseye ships with kernel 5.10 and Podman 3.0.
- Podman 3.2 from Debian experimental also works well per Reinhard's local testing.
- Debian "unstable" is now open for development. Work on shipping Podman 3.3 is currently underway.
- Upcoming Ubuntu 21.10 release will likely include podman 3.2
- Reinhard would like assistance with:
    - Identifying and upgrading package dependencies in Debian
    - Filing bugs on what needs to be upgraded
    - Preparing package uploads on the GitLab instance at salsa.debian.org
- Reinhard's contact info: siretart AT debian DOT org, siretart on GitHub

## Podman machine Updates
### Matt Heon
#### (4:17 in the video)

In the past few weeks, a number of significant developments in desktop containerization.  Due to that, we've seen an upswing in activity due to Podman machine and Podman in general.

Two requests we're getting are the ability to mount a Docker compatible socket natively on the host.  So you would not have to worry about sshing from your Mac or Windows machine into a Linux host.

The second request is volume mount, which is not handled automatically now in podman machine.  Lots of discussion about this, but no clear path forward at the moment, and we're hoping to change that.

At the Cabal meeting next Thursday, September 15, at 10:00 a.m. EDT (UTC-4), we will be discussing the direction for Podman machine and volume mounts, and would love community involvement.

## Containerized DNA Analysis
### Erik Bernoth
#### (8:27 in the video)

Started a new project where friends are analyzing DNA.   Looking to find out what the small markers are.  In the picture, fly eyes colors are noted and can be used to denote the familial connections of the flies.

Showed a tutorial for one of the tools, one included the read for DNA.  Showed FASTQ that showed all the data points, including metadata.  From this, they get a quality marker.

The output shows a lot of dots and some char when there's a significant match.  From this data, you can figure out if you have a mutation or not.   Also, other essential markers that decide eye color and such.  This takes a lot of computing power.

There are vertical and horizontal analyzers that are needed.  There are tools used, and Erik showed a script his friend uses, which takes a lot of time and does some multiprocessing.  It takes a long time to complete.

Can this be containerized?  That's in his current project, and he is wondering if we have possible ways to containerize it.  Erik would like input.  

Looking to build a way to use Podman to containerize this.  

##### Meeting notes from Erik:

1. Intro [sequencing data crunching process](https://github.com/ecerami/ecerami.github.io/blob/master/samtools_primer.md).
2. YSEQ Specialty: [Whole Genome Sequence with 400 bases (WGS400)](https://www.yseq.net/product_info.php?products_id=175886)
3. [STR Example](https://genomes.yseq.net/WGS/400SE/STR_examples/)
4. [BWA Pipeline](https://gist.github.com/tkrahn/7dfc51c2bb97a6d654378a21ea0a96d4)
5. [Result Summary Example](https://genomes.yseq.net/WGS/400SE/16672/16672_result_summary.txt) and [Full Example (opt.)](https://genomes.yseq.net/WGS/400SE/16672/)
Future: [Nanopore?](https://genomebiology.biomedcentral.com/articles/10.1186/s13059-020-1935-5)

## Using Podman in an IDE
### Chris Short
#### (23:14 in the video)

[Video](https://drive.google.com/file/d/1Elb5Pb8z7tkKRaBnewRBvDsby2bWduza/view)

Showed VSCode with the Remote Development extension installed, which he is running on his Mac.  This can work on WSL/Windows too.  In theory, you can create a container within it.   It's looking at his local ssh config.   He could be anywhere in the world and could run anything he wanted from his Linux machine.

He ssh's into his Linux machine from VSCode, and VSCode opens up what it needs to the machine.    He now has a terminal instance from his Mac on the remote Fedora box.  So he's in the IDE using a terminal on his Fedora box and can run Podman commands as needed.

Chris blurred out several data points for privacy reasons.

He then showed the website on his Mac that he had run via Podman.

Jhon Honce noted that we have people using the Docker plugin in VSCode to use Podman.  It would be nice to get a Podman plugin at some point for VSCode.

## Open Forum/Questions?
#### (32:52 in the video)

Dan is trying to get Docker Security Bench translated into Podman Security Bench.  A long-term project and community involvement would be great.

[Discord server](https://discord.com/channels/852634929845239818/852634929845239824) is now up and bridged with the [Podman Matrix room](https://matrix.to/#/#podman:matrix.org).  

## Topics for Next Meeting

Rootless container networking - Paul Holzinger
Podman Security Bench - Dan Walsh

## Next Meeting: Tuesday October 5, 2021, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Thursday September 16, 2021, 10:00 a.m. Eastern (UTC-4)

### Meeting End: 11:40 a.m. Eastern (UTC-4)


## BlueJeans Chat copy/paste:
```
Me10:59 AM
Please sign in here; https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Me11:06 AM
I can't hear Lokesh, is it just me?
Valentin Rothberg11:06 AM
I hear him
Dan Walsh11:06 AM
I hear him fine
Lokesh Mandvekar11:06 AM
i'm done
Dan Walsh11:06 AM
Tom back to you
Lokesh Mandvekar11:06 AM
tom, back to you
Dan Walsh11:07 AM
We can not hear you tom
Me11:07 AM
Matt, please take it
Matt Heon11:07 AM
Tom, no audio from you
cevich11:07 AM
I blame Tom's cat.
jhonce11:08 AM
Network issues are now spreading...
Me11:09 AM
I can hear now, had to reset all the audio options.
It flicked off when I plugged my headset in
Erik Bernoth11:11 AM
We still can’t hear you
Erik Bernoth11:27 AM
Thanks, Scott. Good to know that someone already knows some about this topic area. :)
Scott McCarty (fatherlinux)11:31 AM
LOL, oh man I LOVED bioinformatics
I miss that work
Maybe that will be my retirement :-)
Lokesh Mandvekar11:39 AM
Mehul is pronounced May-houl :)
Erik Bernoth11:39 AM
Matrix also works well from the browser btw
Scott McCarty (fatherlinux)11:40 AM
https://discord.gg/sKgupVHaGg
```
