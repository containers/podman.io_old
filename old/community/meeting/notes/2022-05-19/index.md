# Podman Community Cabal Meeting Notes

Attendees: Tom Sweeney, Matt Heon, Brent Baude,  Nalin Dahyabhai, Paul Holzinger, Karthik Elango, Charlie Doern, Lokesh Mandvekar, Urvashi Mohnani, Niall Crowe, Lance Lovette, Zachariah Cavazos, Reinhard Tartler, Leon N, Dan Walsh, Valentin Rothberg, Miloslav Trmac, Mohan Bodu


## May 19, 2022 Topics
1. Container Lock Contention - Matt Heon
2. Vendoring and release hygiene - Reinhard Tartler
3. Podman API specgen/create options - Charlie Doern

### Meeting Notes
Video [Recording](https://youtu.be/G4pad4k2Az4)

Meeting start 11:02 a.m. Thursday May 19, 2022

### Container Lock Contention - (1:10 in video) - Matt Heon

Issues that spun up the discussion [here:](https://github.com/containers/podman/issues/11940)

Restarting 100 containers at once does not take a trivial amount of time, and then `podman ps` hangs.  Most other commands hang at too.  Matt is looking for suggestions.  Looking for a fairness doctrine so other things can go on while restart is cranking.

Brent suggested looking into readlocks, but we're using glib locks, and they don't have one currently available.   Having a daemon would help with lock contention, but something to avoid given our design model.

Podman restart goes to do 100 containers, and it does them in a particular order.  At the same time, spin-off ps, it takes less time to run than restart, so it eventually hangs when it tries to ps a container that's locked due to the restart.

As ps refreshes the status of the container, it requires the lock to be held.  If a container exited, ps writes to the database with that new info, so it can not use a read lock.

Potentially the code could be changed to use a read lock. Then if an update is needed, spin-off a thread to wait for the write lock.

Action item to look further.

### Vendoring and release hygiene - (12:53 in video) - Reinhard Tartler

Packaging dependencies up to Podman v4.1.  Most of his time is spent on figuring out dependencies that need to be updated.  The dependencies have caused problems for gzip in the past.  Problems also occur when runtime-tools include features that are not available.

He's needed to update with a snapshot which hasn't made him very comfortable.

New versions haven't been released for image-spec.  Dan will ping the folks in Red Hat who have the ability to merge things that Reinhard is required. https://github.com/opencontainers/runtime-tools/issues/702

A similar issue applies to image-spec: https://github.com/opencontainers/image-spec/issues/918


Podman 4.1 isn't stable yet as he needs to figure out what the dependencies are. It has, however, been uploaded to Debian/experimental today and is being built on the official Debian builders. Also, he needs to write upgrade notes for Podman v3.* to v4.1.  For instance, netavark is not currently available in Debian.  

Brent says not having Netavark would be problematic.  Not much bug fixing going on with CNI.  Theoretically, nothing would break.

Reinhard will be looking to move Netavark to Debian.  He'd love to have some volunteers, cf https://bugs.debian.org/1009713.   Lokesh asked about the golang packaging team requirements, and Reinhard says not much experience is not necessary. https://go-team.pages.debian.net/ for getting started.

Wants to avoid unreleased dependencies.  Introducing libraries to Debian is not always a quick thing to do.

Going forward, we'll need to get Netavark/Aardvark into Debian long term.


### Podman API specgen/create options - (24:47 in video) - Charlie Doern

Last year, Charlie rewired the infra container for pods to a "regular" container.

The Issue
 * Infra container was redesigned to automatically receive most of the pod options.
 * This means the infra spec is filled out with `cmd/podman` before any remote calls kick in
 * When a remote call happens, we cannot marshal the infra spec as that would expose far too many untested options to users that pods should not have
 * This causes all of the work for infra to be undone only to be recreated again in infra within the remote handling code
 
There's a difference in syntax that he's found.  For instance, a SpecGenerator is attached for all types that have a creation process.  

SpecGenerator was first designed for the REST API, primarily for consumption for the JSON API.  It was meant to offset the parsing required in the front-end work.

Having a way to allow users to access infra spec in the API or a specific remote SpecGenerator.  

Paul's concerned that sending the infra is duplicated attributes would be sent across the wire, slowing things down.  We need a single source of truth.  He suggests removing the attributes from the POD spec and adding them only to the infra container.  

Matt is fine with that but thinks it's a Podman v5.0 delivery.

Paul suggests moving from the Pod spec and leave/move it in infra spec.  That way, duplicate fields with different data won't have to be figured out.  Currently, we at times ignore the infra spec.  

So going foward, we'll remove resource limits from the pod spec and will expose the infra spec to the REST API.  The downside is people would need to add the infra spec to the API.

Dan is suggesting a major release for next January, Valentin isn't sure that's a good idea.  Dan asked if we could bump the version of the API.  We also can't break versions of the API, especially a `-1` to a `-2`.

Doing this would potentially detach the client and remote API versions.  It's not a pretty thing to do, but possible.  This is a real user issue.

A pod spec should be a container spec with additional fields.  We'll need to change the infra spec too.


#### Open discussion (: in video) - 45

1.  Looking for major features for Podman for v4.2.  One on the table is better `podman play kube`, possibly sigstore, more mac/windows work, and maybe podman desktop.  
2.  Looking for Podman v4.1.1. to come out in the next few weeks, sometime in early June.

### Next Meeting: Thursday June 16, 2022 11:00 a.m. EDT (UTC-5)
## June 16, 2022 Topics
1.

### Next Community Meeting: Tuesday June 7, 2022 11:00 a.m. EDT (UTC-5)

### Possible Topics:
1.

Meeting finished 11:48 a.m.

Raw Meeting Chat:

```
You
11:00 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
You
11:03 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Matt Heon
11:04 AM
https://github.com/containers/podman/issues/11940
```
