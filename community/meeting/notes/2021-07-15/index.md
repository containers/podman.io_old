# Podman Community Cabal Meeting
## July 15, 2021 10:00 a.m. Eastern (UTC-4)

### Attendees (24 total)
 Matt Heon, Mehul Arora, Miloslav Trmac, Nalin Dahyabhai, Paul Holzinger, Pavel Sosin, Reinhard Tartier, Urvashi Mohnani, Valentin Rothberg, Tom Sweeney, Anders Bjorklund, Ashley Cui, Brent Baude, Charlie Doern, Chris Evich, Dan Walsh, Ed Haynes, Ed Santiago, Erik Bernoth, Lokesh Mandvekar.

## Meeting Start: 10:05 a.m.
### Video [Recording](https://drive.google.com/file/d/1hdLMicPfI9NA_MEuGaHGtyIgw6v28Ojg/view) (You'll need to request access to view, we'll try to change that for the next meeting.)

Started out with general discussion of the meetings purpose going forward.  We then went around and did introduction of each of the attendees.

### Copy an image from container storage to another container storage
#### (9:50 in the video)

`podman image scp`  - Ed Santiago wanted an easy way to move stuff from container storage to container storage.  Charlie Doern originally created a PR and after discussion, a number of options were discussed (see [slides](./Podman_Image_SCP.pdf))

Two thoughts are towards sticking with `podman image scp`.  This is doable now with bash scripting, but Dan would like it as a part of command line interface.

Why use "colon colon"?  To keep it away from the ssh protocol, we're using it as a key to note it's a ssh remote call.  Whereas a single colon would be looked at as a transport.

Erik noted he liked the feature.  You don't need to set up registries for different users.  He is concerned it might be confusing to new users.  He would set aside "save" and "load" to backup types of commands.  

The goal is to not tranform the image, it should be exactly the same before and after.  Including multi-layer images.   If the target has some of the layers already in place, you might want only copy the layers that don't exist.

We might look at "git pull" and "git push" for possible examples.

This would allow copying from one machine to another.

Should we use "scp" to "cp" or "copy".  Anders saw a lot of bike shedding with scp versus cp in Kurbernetes.  Something to consider.  We started with "scp" as it does use ssh under the covers and clues the user in.

Should we use "scp://" and be another transport.  The problem with that is it would require another service.

### New Features for `podman play kube`
#### (27:25 in the video)

The play kube command has been growing due to user command.  Customers have been using yamls, find something isn't yet covered, and so we've added commands to satisfy the need.

It would be good to get input from the community about what futher work is needed to `podman play kube`.  If you have ideas, please open a discussion

Dan wonders if we could look at the functionality of Docker Compose and then ingrain them into 'podman play kube'.  A number of use cases have been found in yaml files used for OpenShift.

Looking atwo things:  Be able to build similar to how Docker Compose does based on Docker files.  

Init containers that would be run after a pod infra container.  They would do init/setup jobs, then the rest of the pods would kick off.  This is a standard feature in Kubernetes.

Any further ideas:  Erik thinks this is a key feature and many are using composed.  Play kube is very valuable as it moves things into kubernetes easily.  We could potentially ask someone from OKD or other discussion groups.

Currently play kube and systemd don't play well together, so that would be a nice addition if it can.  Valentin discussed the current status.

We currently don't have a `podman play kube stop`, would that be good?  Erik was asked if this would be useful.  Erik thinks it would be good.

Podman's goal isn't to compete against Kubernetes, but to allow users to move to a single host environment.

### Discussion with Training Team
#### (44:45 in the video)

Doing training and ran into issue and couldn't debug it.  Issue raised with https://github.com/containers/podman/issues/10482

Perhaps we could invite someone from the training team to discuss how the training can be improved/worked on.  Dan thinks it might be just due to the time necessary to develop the training.  May be do it in a container.

### Open discussion
#### (48:55 in the video)

Brent asked if people move on IRC to libera.  Most have.  Lokesh noted the IRC channel is using Matrix.  https://kparal.wordpress.com/2021/06/01/connecting-to-libera-chat-through-matrix/

Cabal meetings purpose "What's the future of Podman" type of discussions.

### Next Meeting: Thursday August 19, 2021 10:00 a.m. EDT (UTC-4)
### Meeting End: 10:56 a.m. Eastern (UTC-4)
