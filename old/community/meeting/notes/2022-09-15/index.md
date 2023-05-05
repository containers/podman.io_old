# Podman Community Cabal Meeting Notes 

Attendees: Matt Heon, Nalin Dahyabhai, Paul Holzinger, Charlie Doern, Lokesh Mandvekar, Niall Crowe, Dan Walsh, Valentin Rothberg, Miloslav Trmac, Mohan Bodu, Eduardo Santiago, Giuseppe Scrivano, Chris Evich, Aditya Rajan, Urvashi Mohnani, Preethi Thomas, Ashley Cui, Joseph Gooch, Reinhard Tartler, Sally O'Malley, Stevan Le Meur, Anders Björklund

## September 15, 2022 Topics
1. Quadlet/Kubernetes.YAML support - Valentin Rothberg
2. ZSTD support update - Dan Walsh
3. Confidential Computing with Podman/crun/libkrun - Dan Walsh
4. Landlock support - Dan Walsh
5. Packaging for podman-desktop - Lokesh Mandvekar
7. Overview of kube apply - Urvashi Mohnani


### Meeting Notes
Video [Recording](https://youtu.be/mAUUGASnmIk)

Meeting start 11:02 a.m. Thursday October 4, 2022

### Quadlet/Kubernetes yaml support - (0:50 in video) - Valentin Rothberg

* Boils down to podman systemd integration
* Recently married systemd and kubenetes integration we have
    * escaping via systemd-escape and a yaml file
    * can give simple k8s yaml files to systemd
* quadlet is good for edge use cases, automotive
    * reallign quadlet with podman
    * future would be to move to a podman generate quadlet workflow instead of generate systemd

### ZSTD Support - (18:29 in video) Dan Walsh

* We have support for this, can be specified in oci what compresion standard to use
* everyone uses gzip, but zstd gives better compression
* when only one file in an image has changed, when you go to pull the update it pulls down the whole image even thoug only one thing has changed
* we have added support to podman to determine what has changed and only pull down those changes and not the whole image
* have opened PRs to containerd and docker to support zstd format, they have bene merged but there is no official release
* older versions of docker will be unhappy with the newer version of compression if we start pushing this everywhere
* stuck in a state trying to figure out how we support older version of docker
* suggestion is to push both versions, gzip and zstd, to the registry and they can be stored under the same name and manifest. But add an annotation/label to the image to identify which compression is used in the image
    * penalty will be pushing two images instead of just one to support both formats
    * if you know your environment will work with zstd no need to push both versions
    * for older container engines, recommendation would be to push with both formats
* proposal that is being worked on and we are making sure it works correctly
* What is the endgame
    * when enough people are no longer on the older container engines we can push for zstd only (may take about 2 years to switch the standard to ZSTD)

### Confidential Computing - (27:05 in video) Dan Walsh

* Needs to compress and encrypt the application
* Encrypt the image and push it, but the image should have the same name
* When you want to run the image in confidential  mode, need to make sure you pull down the confidential image
    * the image manifest will differentiate which one is confidential and which is not
* Still debating what exactly this should be but will have an article out on this soon

### Landlock Support - (31:13 in video) Dan Walsh

* New security mechanism in the linux kernel
* it allows you to specifiy certain paths to an application in such a way that only those paths are allowed to use the app
* for example allows podman to say I am only going to write to /var/lib/containers and if it tries to write to any other location it will be blocked
* want to use this to protect podman from itself
* currently looking into it and researching what needs to be done
* There is a PR open for getting this into the runtime spec
    * https://github.com/opencontainers/runtime-spec/pull/1111
* Will landlock work well with volumes? How difficult will it be to use landlock for container control?

### Podman desktop packaging - (35:52 in video) Lokesh Mandvekar

* Background reading: https://github.com/containers/podman-desktop/issues/112
* Someone has done the packaging and it is avaiable on OBS
* Ask is to support it on official fedora
* Require to package electron (RH may not want to support this)
* Goal is to be able to do "dnf install podman-desktop"
* electron is embedded in podman-desktop and we are providing the package for brew on mac

### Podman kube apply - (49:42 in video) Urvashi Mohnani

* kube apply lets you deploy the generated kube yaml to a k8s cluster directly
* need to pass the kubeconfig file so that correct key and certifactes can be gathered for authentication
* use the k8s API endpoint to make the request to create the k8s resource
* supported types are pods, volumes, and services
    * this can be extended as we add more support to podman generate kube
* Possible features, pass in a container or podname instead of a kube yaml to deploy to the k8s cluster
* get the kube yaml for something already running in a k8s cluster

#### Open discussion (58:21 in video)

1. None

### Next Meeting: Thursday October 20, 2022 11:00 a.m. EDT (UTC-4)
## October 20, 2022 Topics
1. None

### Next Community Meeting: Tuesday October 4, 2022 11:00 a.m. EDT (UTC-4)

### Possible Topics:
1. None

Meeting finished 12:00 p.m.

Raw Meeting Chat:

```
00:00:39.516,00:00:42.516
Urvashi Mohnani: https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both

00:01:17.367,00:01:20.367
Urvashi Mohnani: https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both

00:02:59.904,00:03:02.904
Urvashi Mohnani: https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both

00:04:28.274,00:04:31.274
Ed Santiago Munoz: Very choppy here too

00:08:17.367,00:08:20.367
Valentin Rothberg: https://www.redhat.com/sysadmin/kubernetes-workloads-podman-systemd

00:08:27.068,00:08:30.068
Urvashi Mohnani: https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both

00:12:28.550,00:12:31.550
Joseph Gooch: static const char *supported_container_keys[] = {
  "ContainerName",
  "Image",
  "Environment",
  "Exec",
  "NoNewPrivileges",
  "DropCapability",
  "AddCapability",
  "RemapUsers",
  "RemapUidStart",
  "RemapGidStart",
  "RemapUidRanges",
  "RemapGidRanges",
  "Notify",
  "SocketActivated",
  "ExposeHostPort",
  "PublishPort",
  "KeepId",
  "User",
  "Group",
  "HostUser",
  "HostGroup",
  "Volume",
  "PodmanArgs",
  "Label",
  "Annotation",
  "RunInit",
  "VolatileTmp",
  "Timezone",
  NULL
}

00:12:40.612,00:12:43.612
Joseph Gooch: Currently in quadlet ^^^

00:14:00.468,00:14:03.468
Joseph Gooch: https://github.com/containers/quadlet  From the readme, the file formats and container setup docs are very readable (and exciting)

00:16:00.536,00:16:03.536
Valentin Rothberg: Here's a doc: https://github.com/containers/podman/blob/main/docs/kubernetes_support.md

00:16:52.968,00:16:55.968
Reinhard Tartler: I completely missed that documentation. I'll check whether it's included in the Debian package!

00:18:20.409,00:18:23.409
Sally O'Malley: Thanks, Valentin!

00:18:33.328,00:18:36.328
Joseph Gooch: Another comment on Quadlet - moving it towards golang, and introducing GoLang text templates would be pretty killer

00:19:24.193,00:19:27.193
Valentin Rothberg: Thanks for the questions and feedback! Please reach out if you have any questions.

For updates, I suggest following this GitHub issue: https://github.com/containers/podman/issues/15686

00:26:17.470,00:26:20.470
Sally O'Malley: Is there a podman issue for the zstd support?

00:27:16.513,00:27:19.513
Valentin Rothberg: @Sally: Podman already supports ZSTD but there is no issue (yet) for the idea of shipping an image in GZIP and ZSTD in a manifest list (or "image index" in OCI terminology)

00:27:27.585,00:27:30.585
Sally O'Malley: thanks, got it

00:28:46.082,00:28:49.082
Aditya Rajan: OCI to Confidential Image https://github.com/virtee/oci2cw

00:28:51.876,00:28:54.876
Florent Benoit: Is there support planned for SOCI as well https://github.com/awslabs/soci-snapshotter in Podman ?

00:29:10.790,00:29:13.790
Urvashi Mohnani: https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both

00:33:33.010,00:33:36.010
Aditya Rajan: https://github.com/opencontainers/runtime-spec/pull/1111

00:36:07.090,00:36:10.090
Lokesh Mandvekar: https://github.com/containers/podman-desktop/issues/112

00:38:08.871,00:38:11.871
Christopher Evich: For RHEL, people could use an EPEL package maybe?

00:44:23.989,00:44:26.989
Florent Benoit: we're also on flathub https://flathub.org/apps/details/io.podman_desktop.PodmanDesktop

00:53:20.887,00:53:23.887
Urvashi Mohnani: https://asciinema.org/a/WCZc8x3NFkaH2v4OvlOny08Hn

00:55:57.118,00:56:00.118
Aditya Rajan: Yes

00:56:03.182,00:56:06.182
Aditya Rajan: kubectl edit deployment name

00:57:30.545,00:57:33.545
Aditya Rajan: kubectl get -o yaml
```
