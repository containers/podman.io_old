# Podman Community Meeting Notes
## December 6, 2022 11:00 a.m. Eastern (UTC-5)

### Attendees (16 total)
Tom Sweeney, Will Dinyes, Ygal Blum, Chris Evich, Ashley Cui, Paul Holzinger, Nalin Dahyabhai, Giuseppe Scrivano, Preethi Thomas, Matt Heon, Miloslav Trmac, Urvashi Mohnani, Mohan Bodu, Ed Santiago, Martin Jackson, Lance L, Florent Benoit, Brent Baude

## Meeting Start: 11:02 a.m. EST
### BlueJeans [Recording]()

## MinIO Demo
### Will Dinyes - MinIO
#### (1:12 in the video)

#### [Slides](./Podman_and_MinIO_RH_Webniar.pdf)
MinIO’s Interest in Podman is to have a platform to run test cases for their courses.

MinIO is an S3 compatible API, the de facto standard for Object storage

MinIO includes Single Sign On, Object Locking, Encryption & Tamper-proof, Lambda Compute, Protects against code and bit rot protection, and Server Side Bucket Replication.

It's a small server and can be installed just about anywhere. 

Lots of use cases.
    Big Data/Machine Learning
    HDFS replacements
    High-Performance Data lake/warehouse infrastructure
    Cloud Native applications
    
You can move your data without being locked into a particular platform.

He uses Podman and MinIO for the development environment and for quick stand-ups.  MinIO is open-source and free to use.  He can containerize MinIO for even further portability.

#### Demo (7:18 in the video)

Ran Podman on a Mac.  MinIO needs to attach to actual storage.  He ran 'podman machine init -v /tmp/data:/Minio/data' followed by 'podman machine start'

He can now change the data in MinIO after running a large `podman run` command.

It pulled down an image from quay.io, and it brought up the MinIO console.  It showed data for his content that he was using elsewhere.  All very easily and quickly.

Runs on less than 100 MB and can be easily migrated to the cloud.

Potential use cases?  Could it be used for a backup situation?  Yes, it fits this scenario well for S3 backups.  If S3 is being used already, MinIO can actually be dropped in as a replacement.  You can then back up to any cloud that you want.


## Embedding inside an AutoSD Image
### Ygal Blum - Red Hat
#### (16:26 in the video)
#### [Slides](./Podman_in_the_Edge.pdf)

Taking "Build once RUn anywhere to the Edge"
Works on the Ecosystem Engineering and works on Red Hat team looking to envision how to run containers on automobiles.

Build Once, Run Anywhere
    Coined by Sun Microsystems
    Ability to write Java code once and run it anywhere
    Expanded by the use of Container Images
    
Two Base Elements
    Container Image
    Running Instructions

The instructions format may vary:
    Command line arguments
    Docker-Compose file
    Kubernetes YAML
    
Using `podman kube play`, users can reuse K8S YAML file

Podman is daemonless, who will monitor the container when it stops?  Systemd is use.  Tools like `podman generate systemd`, soon "Quadlet" to facilitate this.

OSBuild is a tool for composing O/S images, it allows embedding files and enabling of services in the image.  You can compose an image for an edge device using it.

#### Demo (22:45 in the video)

Showed simulation for the engine and radio.  When the engine goes in reverse, the volume decreased for the radio.  The volume goes up on acceleration, and then up/down on channel changes.

Applied a yaml file to an openshift cluster.  Created a volume and an application, then applied the engine and radio using their yaml files.

It shows an easy way to run Podman or Kubernetes using the same YAML file.

The `podman kube play` command will ignore things it doesn't understand and works well with using/running things in the Kurbernetes space.

He used that command to get the engine, radio up in Podman, with the same messages shown.  So you can reuse Kubernetes Yaml in Podman, which is especially helpful in a test environment when you don't want to use up a lot of CPU time/space.

## Open Forum/Questions?
#### (33:34 in the video)

1)  Quadlet will that be in Podman?  Yes, in Podman v4.4, and set for RHEL 8.8/9.2 is current plans but still under consideration.  Martin has been looking at quadlet lately and has been impressed by it so far.

2) blog.podman.io - new blog site that was demo'd, including a couple of new articles.  Lot's of link tidying up to do, and need to port older blogs.

3) Matt noted that Podman v4.3 is done now.  Podman v4.4 RC in mid to late January 2023.


## Topics for Next Meeting

1) None suggested


## Next Meeting: Tuesday February 7, 2022, 11:00 a.m. Eastern (UTC-5)
## Next Cabal Meeting: Thursday December 15, 2022, 11:00 a.m. Eastern (UTC-5)

### Meeting End: 11:46 a.m. Eastern (UTC-5)

## BlueJeans Chat copy/paste:
```
Brent Baude11:39 AM
https://blog.podman.io/
```
